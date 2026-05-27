"use server";

import { blogLikes } from "@/db/schema";
import { db } from "@/db";
import { and, count, eq } from "drizzle-orm";
import { getAnonymousId } from "@/lib/user";

export const addLike = async (slug: string) => {
    const anonymousId = await getAnonymousId();

    await db.insert(blogLikes).values({
        anonymous_id: anonymousId,
        slug,
        value: true,
    });
};

export const addDislike = async (slug: string) => {
    const anonymousId = await getAnonymousId();

    await db.insert(blogLikes).values({
        anonymous_id: anonymousId,
        slug,
        value: false,
    });
};

export const getLikes = async (slug: string) => {
    const anonymousId = await getAnonymousId();

    const likeCount = await db
        .select({
            count: count(),
        })
        .from(blogLikes)
        .where(and(eq(blogLikes.slug, slug), eq(blogLikes.value, true)));

    const userLiked = await db.query.blogLikes.findFirst({
        where: and(
            eq(blogLikes.slug, slug),
            eq(blogLikes.anonymous_id, anonymousId),
        ),
    });

    return {
        userLiked: !!userLiked,
        count: likeCount[0].count,
    };
};
