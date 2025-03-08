"use server";

import { BLOG_ARTICLES } from "@/data/blog";

const PAGE_SIZE = 5;

export const getBlogs = async (tags: string[], page = 1) => {
    return {
        total: Math.ceil(BLOG_ARTICLES.length / PAGE_SIZE),
        next: page < BLOG_ARTICLES.length / PAGE_SIZE ? page + 1 : null,
        previous: page >= 0 ? page - 1 : null,
        blogs: BLOG_ARTICLES.filter((article) =>
            tags.length > 0
                ? article.tags.some((tag) => tags.includes(tag))
                : true,
        ).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    };
};
