import { THAI_TIME_CONVERTER } from "./thai-time-converter";
import { MORTGAGE_CALCULATOR } from "./mortgage-calculator";
import { RECIPE_GENERATOR } from "./recipe-generator";
import { PASSWORD_GENERATOR } from "./password-generator";

import { Metadata } from "next";
import { ReactNode } from "react";

export type ToolData = {
    title: string;
    description: string;
    slug: string;
    component: ReactNode;
} & Metadata;

export const TOOLS: ToolData[] = [
    THAI_TIME_CONVERTER,
    MORTGAGE_CALCULATOR,
    RECIPE_GENERATOR,
    PASSWORD_GENERATOR,
];
