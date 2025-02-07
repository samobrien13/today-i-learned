import { Metadata } from "next";

type ToolsData = {
    title: string;
    description: string;
    slug: string;
} & Metadata;

export const THAI_TIME_CONVERTER: ToolsData = {
    title: "Thai Time Converter",
    description: "Enter a time to get the spoken Thai version",
    slug: "thai-time-converter",
};

export const RECIPE_GENERATOR: ToolsData = {
    title: "Recipe Generator",
    description: "Generate a ChatGPT prompt from a list of ingredients",
    slug: "recipe-generator",
};

export const PASSWORD_GENERATOR: ToolsData = {
    title: "Password Generator",
    description: "Generate a secure password",
    slug: "password-generator",
};

export const MORTGAGE_CALCULATOR: ToolsData = {
    title: "Mortgage Calculator",
    description: "Calculate how long it will take to pay off your mortgage",
    slug: "mortgage-calculator",
};

export const TOOLS: ToolsData[] = [
    THAI_TIME_CONVERTER,
    RECIPE_GENERATOR,
    PASSWORD_GENERATOR,
    MORTGAGE_CALCULATOR,
];
