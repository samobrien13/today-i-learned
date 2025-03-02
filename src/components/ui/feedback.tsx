import { db } from "@/db";
import { blogComments, blogLikes } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Input } from "./input";
import { Button } from "./button";
import { Label } from "./label";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { revalidatePath } from "next/cache";
import { Textarea } from "./textarea";

type FeedbackProps = {
    slug: string;
};

async function Feedback({ slug }: FeedbackProps) {
    const comments = await db
        .select()
        .from(blogComments)
        .where(
            and(eq(blogComments.slug, slug), eq(blogComments.approved, true)),
        );
    const likes = await db
        .select()
        .from(blogLikes)
        .where(and(eq(blogLikes.slug, slug), eq(blogLikes.value, true)));

    const addLike = async () => {
        "use server";

        await db.insert(blogLikes).values({
            slug,
            value: true,
        });

        revalidatePath("/" + slug);
    };

    const addDislike = async () => {
        "use server";

        await db.insert(blogLikes).values({
            slug,
            value: false,
        });
    };

    const addComment = async (formData: FormData) => {
        "use server";

        const author = formData.get("author") as string;
        const comment = formData.get("comment") as string;

        await db.insert(blogComments).values({
            slug,
            author,
            comment,
            approved: false,
        });

        revalidatePath("/" + slug);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-2">
                <form action={addLike}>
                    <Button variant="outline">
                        <ThumbsUp />
                        {likes.length}
                    </Button>
                </form>
                <form action={addDislike}>
                    <Button variant="outline">
                        <ThumbsDown />
                    </Button>
                </form>
            </div>
            {comments.map((comment) => (
                <div key={comment.slug}>
                    <h2>{comment.author}</h2>
                    <p>{comment.comment}</p>
                </div>
            ))}
            <form action={addComment} className="flex flex-col gap-4">
                <Label htmlFor="author">Name</Label>
                <Input name="author" />
                <Label htmlFor="comment">Comment</Label>
                <Textarea name="comment" />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}

export default Feedback;
