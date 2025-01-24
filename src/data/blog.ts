import { Metadata } from "next";

type BlogData = {
    title: string;
    description: string;
    date: string;
    slug: string;
} & Metadata;

export const HOW_TO_TELL_THE_TIME_THAI_STYLE: BlogData = {
    title: "How to tell the time Thai style",
    description: "Learn how to tell the time Thai style",
    date: "2025-01-19",
    slug: "how-to-tell-the-time-thai-style",
};

export const DOTFILES: BlogData = {
    title: "Dotfiles",
    description: "My dotfiles setup; Neovim, Zsh, and more",
    date: "2025-01-21",
    slug: "dotfiles",
};

export const COLOUR_PALETTE: BlogData = {
    title: "Colour Palette",
    description: "How to create a colour palette",
    date: "2025-01-22",
    slug: "colour-palette",
};

export const HOW_TO_FIND_AND_REPLACE_FROM_THE_COMMAND_LINE: BlogData = {
    title: "How to find and replace from the command line",
    description:
        "Use sed on OSX to find and replace text across multiple files",
    date: "2025-01-25",
    slug: "how-to-find-and-replace-from-the-command-line",
};

export const BLOG_ARTICLES: BlogData[] = [
    HOW_TO_FIND_AND_REPLACE_FROM_THE_COMMAND_LINE,
    COLOUR_PALETTE,
    DOTFILES,
    HOW_TO_TELL_THE_TIME_THAI_STYLE,
];
