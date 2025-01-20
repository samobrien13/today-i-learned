type BlogData = {
    title: string;
    description: string;
    date: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
};

export const HOW_TO_TELL_THE_TIME_THAI_STYLE: BlogData = {
    title: "How to tell the time Thai style",
    description: "Learn how to tell the time Thai style",
    date: "2025-01-19",
    slug: "how-to-tell-the-time-thai-style",
    metaTitle: "How to tell the time Thai style",
    metaDescription: "Learn how to tell the time Thai style",
};

export const DOTFILES: BlogData = {
    title: "Dotfiles",
    description: "My dotfiles setup; Neovim, Zsh, and more",
    date: "2025-01-21",
    slug: "dotfiles",
    metaTitle: "Dotfiles",
    metaDescription: "My dotfiles setup; Neovim, Zsh, and more",
};

export const BLOG_ARTICLES: BlogData[] = [
    DOTFILES,
    HOW_TO_TELL_THE_TIME_THAI_STYLE,
];
