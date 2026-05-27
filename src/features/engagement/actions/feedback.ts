"use server";

import { db } from "@/db";
import { blogComments } from "@/db/schema";
import { getAnonymousId } from "@/lib/user";
import { and, eq } from "drizzle-orm";

export async function getFeedback(slug: string) {
    const anonymousId = await getAnonymousId();

    const userComments = await db.query.blogComments.findFirst({
        where: and(
            eq(blogComments.slug, slug),
            eq(blogComments.anonymous_id, anonymousId),
        ),
    });

    return !!userComments;
}

export async function addFeedback(formData: FormData, slug: string) {
    const comment = formData.get("feedback") as string;
    const anonymousId = await getAnonymousId();

    await db.insert(blogComments).values({
        anonymous_id: anonymousId,
        slug,
        comment,
    });

    return true;
}
