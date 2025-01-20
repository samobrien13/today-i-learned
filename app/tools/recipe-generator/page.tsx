import RecipeGenerator from "@/components/recipe-generator";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Recipe Generator",
    description: "Generate a recipe from a list of ingredients.",
};

export default function Page() {
    return (
        <section className="flex-1">
            <RecipeGenerator />
        </section>
    );
}
