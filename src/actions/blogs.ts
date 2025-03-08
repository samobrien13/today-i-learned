"use server";

import { BLOG_ARTICLES } from "@/data/blog";

const PAGE_SIZE = 5;

export const getBlogs = async (tags: string[], cursor?: string) => {
    const index = cursor
        ? BLOG_ARTICLES.findIndex((article) => article.slug === cursor)
        : 0;

    const filteredBlogs = BLOG_ARTICLES.filter((article) =>
        tags.length > 0 ? article.tags.some((tag) => tags.includes(tag)) : true,
    );
    const blogs = filteredBlogs.slice(index, index + PAGE_SIZE);

    return {
        total: filteredBlogs.length,
        next: filteredBlogs[index + PAGE_SIZE]?.slug,
        blogs,
    };
};
