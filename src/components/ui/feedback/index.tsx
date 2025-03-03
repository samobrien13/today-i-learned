import { db } from "@/db";
import { blogComments, blogLikes } from "@/db/schema";
import { and, count, eq } from "drizzle-orm";
import { Button } from "../button";
import { Label } from "../label";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { revalidatePath } from "next/cache";
import { Textarea } from "../textarea";
import { cookies } from "next/headers";

type FeedbackProps = {
    slug: string;
};

async function Feedback({ slug }: FeedbackProps) {
    const anonymousId = (await cookies()).get("anonymous_id")?.value || "";
    const likeCount = (
        await db
            .select({
                count: count(),
            })
            .from(blogLikes)
            .where(and(eq(blogLikes.slug, slug), eq(blogLikes.value, true)))
    )[0].count;
    const userLiked = await db.query.blogLikes.findFirst({
        where: and(
            eq(blogLikes.slug, slug),
            eq(blogLikes.anonymous_id, anonymousId),
        ),
    });
    const userFeedback = await db.query.blogComments.findFirst({
        where: and(
            eq(blogComments.slug, slug),
            eq(blogComments.anonymous_id, anonymousId),
        ),
    });

    const addLike = async () => {
        "use server";

        await db.insert(blogLikes).values({
            anonymous_id: anonymousId,
            slug,
            value: true,
        });

        revalidatePath("/" + slug);
    };

    const addDislike = async () => {
        "use server";

        const cookieStore = await cookies();

        await db.insert(blogLikes).values({
            anonymous_id: cookieStore.get("anonymous_id")?.value,
            slug,
            value: false,
        });
    };

    const addComment = async (formData: FormData) => {
        "use server";

        const comment = formData.get("feedback") as string;

        await db.insert(blogComments).values({
            anonymous_id: anonymousId,
            slug,
            comment,
        });

        revalidatePath("/" + slug);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-2">
                <form action={addLike}>
                    <Button variant="outline" disabled={!!userLiked}>
                        <ThumbsUp />
                        {likeCount}
                    </Button>
                </form>
                <form action={addDislike}>
                    <Button variant="outline" disabled={!!userLiked}>
                        <ThumbsDown />
                    </Button>
                </form>
            </div>
            {userFeedback ? (
                <p>Thanks for your feedback!</p>
            ) : (
                <form action={addComment} className="flex flex-col gap-4">
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea name="feedback" />
                    <Button type="submit">Submit</Button>
                </form>
            )}
        </div>
    );
}

export default Feedback;
