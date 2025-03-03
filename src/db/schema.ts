import {
    boolean,
    index,
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
} from "drizzle-orm/pg-core";

export const blogComments = pgTable(
    "blog_comments",
    {
        id: serial("id").primaryKey(),
        anonymous_id: text("anonymous_id"),
        slug: text("slug"),
        comment: text("comment"),
        created_at: timestamp("created_at").defaultNow(),
    },
    (table) => [
        index("blog_comments_slug_index").on(table.slug),
        uniqueIndex("blog_comments_anonymous_id_index").on(
            table.anonymous_id,
            table.slug,
        ),
    ],
);

export const blogLikes = pgTable(
    "blog_likes",
    {
        id: serial("id").primaryKey(),
        anonymous_id: text("anonymous_id"),
        slug: text("slug"),
        value: boolean("value"), // true for like, false for dislike
        created_at: timestamp("created_at").defaultNow(),
    },
    (table) => [
        index("blog_likes_slug_index").on(table.slug),
        uniqueIndex("blog_likes_anonymous_id_index").on(
            table.anonymous_id,
            table.slug,
        ),
    ],
);
