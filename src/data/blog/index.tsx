import { PLEASE_DONT_VALIDATE_MY_NAME } from "./rants/please-dont-validate-my-name";
import { HOW_TO_FIND_AND_REPLACE_FROM_THE_COMMAND_LINE } from "./rants/how-to-find-and-replace-from-the-command-line";
import { DESIGN_SYSTEM } from "./rants/design-system";
import { DOTFILES } from "./rants/dotfiles";
import { HOW_TO_TELL_THE_TIME_THAI_STYLE } from "./rants/how-to-tell-the-time-thai-style";

import { Metadata } from "next";
import { ReactNode } from "react";

export type BlogData = {
    title: string;
    description: string;
    date: string;
    slug: string;
    component: ReactNode;
} & Metadata;

export const BLOG_ARTICLES: BlogData[] = [
    PLEASE_DONT_VALIDATE_MY_NAME,
    HOW_TO_FIND_AND_REPLACE_FROM_THE_COMMAND_LINE,
    DESIGN_SYSTEM,
    DOTFILES,
    HOW_TO_TELL_THE_TIME_THAI_STYLE,
];
