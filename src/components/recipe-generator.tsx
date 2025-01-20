"use client";

import useLocalStorage from "@/hooks/useLocalStorage";

import { ingredients } from "@/data/ingredients";

import { Button } from "@/components/ui/button";
import { CopyCheckIcon } from "lucide-react";
import Image from "next/image";
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
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Recipe Generator",
    description: "Generate a recipe from a list of ingredients.",
};

export default function RecipeGenerator() {
    const [selectedIngredients, setSelectedIngredients] = useLocalStorage<
        Array<string>
    >("input", []);

    const query =
        "Generate a recipe using some but definitely not all of the following ingredients: " +
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
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle>Recipe Generator</CardTitle>
                <CardDescription>
                    Generate a recipe from a list of ingredients.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex w-full flex-col gap-2">
                {ingredients.map(({ title, items }) => {
                    return (
                        <section
                            key={title}
                            className="flex flex-col space-y-2 rounded-xl border border-gray-200 p-2"
                        >
                            <div className="flex flex-row justify-between">
                                <h3 className="font-semibold text-gray-400">
                                    {title}
                                </h3>
                                <Button
                                    variant="outline"
                                    onClick={() => onSelectAll(title)}
                                >
                                    <CopyCheckIcon />
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
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
                                                onCheckedChange={(checked) =>
                                                    onChange(checked, name)
                                                }
                                            />
                                            <Label htmlFor={id}>{name}</Label>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    );
                })}
                <Button asChild variant="outline" disabled>
                    <a
                        href={
                            selectedIngredients.length === 0
                                ? undefined
                                : `https://chatgpt.com?q=${query}`
                        }
                        target="_blank"
                    >
                        Generate
                        <Image
                            src="/chat-gpt.svg"
                            alt="ChatGPT"
                            width={24}
                            height={24}
                        />
                    </a>
                </Button>
            </CardContent>
        </Card>
    );
}
