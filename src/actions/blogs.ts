"use server";

import { BLOG_ARTICLES } from "@/data/blog";

export const getBlogs = async (tags: string[], offset: number) => {
    return BLOG_ARTICLES.filter((article) =>
        tags.length > 0 ? article.tags.some((tag) => tags.includes(tag)) : true,
    ).slice(offset, offset + 10);
};
