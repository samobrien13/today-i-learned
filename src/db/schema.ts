import {
    boolean,
    index,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const blogComments = pgTable(
    "blog_comments",
    {
        id: serial("id").primaryKey(),
        slug: text("slug"),
        author: varchar("author", { length: 256 }),
        comment: text("comment"),
        approved: boolean("approved").default(false),
        created_at: timestamp("created_at").defaultNow(),
    },
    (table) => [index("blog_comments_slug_index").on(table.slug)],
);

export const blogLikes = pgTable(
    "blog_likes",
    {
        id: serial("id").primaryKey(),
        slug: text("slug"),
        value: boolean("value"), // true for like, false for dislike
        created_at: timestamp("created_at").defaultNow(),
    },
    (table) => [index("blog_likes_slug_index").on(table.slug)],
);
