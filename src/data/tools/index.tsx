import { ThaiTimeConverter } from "@/components/tools/thai-time-converter";
import { MortgageCalculator } from "@/components/tools/mortgage-calculator";
import { RecipeGenerator } from "@/components/tools/recipe-generator";
import { PasswordGenerator } from "@/components/tools/password-generator";
import { ColourConverter } from "@/components/tools/colour-converter";
import { RubberDuck } from "@/components/tools/rubber-duck";
import { CurlBuilder } from "@/components/tools/curl-builder";

import { Metadata } from "next";
import { ReactNode } from "react";

export const RUBBER_DUCK: ToolData = {
    title: "Rubber Duck",
    description:
        "No matter what you ask, the rubber duck knows exactly what to suggest!",
    slug: "rubber-duck",
    tags: ["engineering"],
    component: <RubberDuck />,
};

export const COLOUR_CONVERTER: ToolData = {
    title: "Colour Converter",
    description: "Convert a colour between HSL, RGB and HEX formats",
    slug: "colour-converter",
    tags: ["design"],
    component: <ColourConverter />,
};

export const THAI_TIME_CONVERTER: ToolData = {
    title: "Thai Time Converter",
    description: "Enter a time to get the spoken Thai version",
    slug: "thai-time-converter",
    tags: ["langauge"],
    component: <ThaiTimeConverter />,
};

export const MORTGAGE_CALCULATOR: ToolData = {
    title: "Mortgage Calculator",
    description: "Calculate how long it will take to pay off your mortgage",
    slug: "mortgage-calculator",
    tags: ["finance"],
    component: <MortgageCalculator />,
};

export const RECIPE_GENERATOR: ToolData = {
    title: "Recipe Generator",
    description: "Generate a recipe from a list of ingredients.",
    slug: "recipe-generator",
    tags: ["cooking"],
    component: <RecipeGenerator />,
};

export const PASSWORD_GENERATOR: ToolData = {
    title: "Password Generator",
    description: "Generate a secure password",
    slug: "password-generator",
    tags: ["security"],
    component: <PasswordGenerator />,
};

export const CURL_BUILDER: ToolData = {
    title: "cURL Builder",
    description:
        "Build a nicely formatted cURL command from a URL, method, headers and body.",
    slug: "curl-builder",
    tags: ["engineering"],
    component: <CurlBuilder />,
};

export type ToolData = {
    title: string;
    description: string;
    slug: string;
    tags: string[];
    component: ReactNode;
} & Metadata;

export const TOOLS: ToolData[] = [
    CURL_BUILDER,
    RUBBER_DUCK,
    COLOUR_CONVERTER,
    THAI_TIME_CONVERTER,
    MORTGAGE_CALCULATOR,
    RECIPE_GENERATOR,
    PASSWORD_GENERATOR,
];
