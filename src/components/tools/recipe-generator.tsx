"use client";

import { unstable_ViewTransition as ViewTransition } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import { ingredients } from "@/data/ingredients";
import { Button } from "@/components/ui/button";
import { CopyCheckIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ChatGPT } from "@/components/ui/icons";
import { RECIPE_GENERATOR } from "@/data/tools";

function RecipeGenerator() {
    const [selectedIngredients, setSelectedIngredients] = useLocalStorage<
        Array<string>
    >("input", []);

    const query =
        "Create a delicious recipe using a selection of the following ingredients: " +
        selectedIngredients.join(", ");

    const onSelectAll = (title: string) => {
        const ingredientItems =
            ingredients
                .find((i) => i.title === title)
                ?.items.map((i) => i.name) ?? [];
        if (ingredientItems.every((i) => selectedIngredients.includes(i))) {
            setSelectedIngredients(
                selectedIngredients.filter(
                    (ingredient) =>
                        !ingredients
                            .find((i) => i.title === title)
                            ?.items.map((i) => i.name)
                            .includes(ingredient),
                ),
            );
        } else {
            setSelectedIngredients([
                ...selectedIngredients,
                ...ingredientItems,
            ]);
        }
    };

    const onChange = (checked: CheckedState, value: string) => {
        if (checked) {
            setSelectedIngredients([...selectedIngredients, value]);
        } else {
            setSelectedIngredients(
                selectedIngredients.filter(
                    (ingredient) => ingredient !== value,
                ),
            );
        }
    };

    return (
        <ViewTransition name={`${RECIPE_GENERATOR.slug}-card`}>
            <Card className="mx-auto w-full">
                <CardHeader>
                    <CardTitle>{RECIPE_GENERATOR.title}</CardTitle>
                    <CardDescription>
                        {RECIPE_GENERATOR.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex w-full flex-col gap-4">
                    {ingredients.map(({ title, items }) => {
                        return (
                            <section
                                key={title}
                                className="flex flex-col gap-4 p-2"
                            >
                                <div className="flex flex-row items-center justify-between">
                                    <h3 className="font-semibold text-muted-foreground">
                                        {title}
                                    </h3>
                                    <Button
                                        variant="outline"
                                        onClick={() => onSelectAll(title)}
                                    >
                                        <CopyCheckIcon />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {items.map(({ id, name }) => {
                                        return (
                                            <div
                                                key={id}
                                                className="flex items-center gap-2"
                                            >
                                                <Checkbox
                                                    id={id}
                                                    name={name}
                                                    value={name}
                                                    checked={selectedIngredients.includes(
                                                        name,
                                                    )}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        onChange(checked, name)
                                                    }
                                                />
                                                <Label htmlFor={id}>
                                                    {name}
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                    <Button asChild disabled className="mt-2">
                        <a
                            href={
                                selectedIngredients.length === 0
                                    ? undefined
                                    : `https://chatgpt.com?q=${query}`
                            }
                            target="_blank"
                        >
                            Generate
                            <ChatGPT />
                        </a>
                    </Button>
                </CardContent>
            </Card>
        </ViewTransition>
    );
}

export { RecipeGenerator };
