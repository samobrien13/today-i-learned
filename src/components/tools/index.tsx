import { ThaiTimeConverter } from "./thai-time-converter";
import { MortgageCalculator } from "./mortgage-calculator";
import { RecipeGenerator } from "./recipe-generator";
import { PasswordGenerator } from "./password-generator";
import { ColourConverter } from "./colour-converter";
import { RubberDuck } from "./rubber-duck";
import { CurlBuilder } from "./curl-builder";
import { BabyTracker } from "./baby-tracker";

import { Metadata } from "next";
import { ReactNode } from "react";

export const BABY_TRACKER: Tool = {
    title: "Baby Tracker",
    description: "Easily track what goes into and comes out of your baby",
    slug: "baby-tracker",
    tags: ["parenting"],
    component: (props) => <BabyTracker {...props} />,
};

export const RUBBER_DUCK: Tool = {
    title: "Rubber Duck",
    description:
        "No matter what you ask, the rubber duck knows exactly what to suggest!",
    slug: "rubber-duck",
    tags: ["engineering"],
    component: (props) => <RubberDuck {...props} />,
};

export const COLOUR_CONVERTER: Tool = {
    title: "Colour Converter",
    description: "Convert a colour between HSL, RGB and HEX formats",
    slug: "colour-converter",
    tags: ["design"],
    component: (props) => <ColourConverter {...props} />,
};

export const THAI_TIME_CONVERTER: Tool = {
    title: "Thai Time Converter",
    description: "Enter a time to get the spoken Thai version",
    slug: "thai-time-converter",
    tags: ["langauge"],
    component: (props) => <ThaiTimeConverter {...props} />,
};

export const MORTGAGE_CALCULATOR: Tool = {
    title: "Mortgage Calculator",
    description: "Calculate how long it will take to pay off your mortgage",
    slug: "mortgage-calculator",
    tags: ["finance"],
    component: (props) => <MortgageCalculator {...props} />,
};

export const RECIPE_GENERATOR: Tool = {
    title: "Recipe Generator",
    description: "Generate a recipe from a list of ingredients.",
    slug: "recipe-generator",
    tags: ["cooking"],
    component: (props) => <RecipeGenerator {...props} />,
};

export const PASSWORD_GENERATOR: Tool = {
    title: "Password Generator",
    description: "Generate a secure password",
    slug: "password-generator",
    tags: ["security"],
    component: (props) => <PasswordGenerator {...props} />,
};

export const CURL_BUILDER: Tool = {
    title: "cURL Builder",
    description:
        "Build a nicely formatted cURL command from a URL, method, headers and body.",
    slug: "curl-builder",
    tags: ["engineering"],
    component: (props) => <CurlBuilder {...props} />,
};

export type ToolData = {
    title: string;
    description: string;
    slug: string;
    tags: string[];
};

type Tool = ToolData & {
    component: (props: ToolData) => ReactNode;
} & Metadata;

export const TOOLS: Tool[] = [
    BABY_TRACKER,
    CURL_BUILDER,
    RUBBER_DUCK,
    COLOUR_CONVERTER,
    THAI_TIME_CONVERTER,
    MORTGAGE_CALCULATOR,
    RECIPE_GENERATOR,
    PASSWORD_GENERATOR,
];
