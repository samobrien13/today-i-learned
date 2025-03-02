import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const blogComments = pgTable("blog_comments", {
    slug: text("id").primaryKey(),
    author: varchar("author", { length: 256 }),
    comment: text("comment"),
    approved: boolean("approved").default(false),
});

export const blogLikes = pgTable("blog_likes", {
    slug: text("id").primaryKey(),
    value: boolean("value"), // true for like, false for dislike
});

