"use server";

import { BLOG_ARTICLES } from "@/data/blog";

const PAGE_SIZE = 5;

export const getBlogs = async (tags: string[], offset = 0) => {
    return {
        total: BLOG_ARTICLES.length,
        next:
            offset + PAGE_SIZE < BLOG_ARTICLES.length
                ? offset + PAGE_SIZE
                : null,
        previous: offset > 0 ? offset - PAGE_SIZE : null,
        blogs: BLOG_ARTICLES.filter((article) =>
            tags.length > 0
                ? article.tags.some((tag) => tags.includes(tag))
                : true,
        ).slice(offset, offset + PAGE_SIZE),
    };
};
