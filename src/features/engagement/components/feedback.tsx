"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddFeedback, useFeedback } from "@/features/engagement/hooks/use-feedback";

type FeedbackProps = {
    slug: string;
};

function Feedback({ slug }: FeedbackProps) {
    const { data: feedback, isPending, isError } = useFeedback(slug);
    const { mutate: addFeedback } = useAddFeedback(slug);

    if (isPending) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return null;
    }

    return feedback ? (
        <p>Thanks for your feedback!</p>
    ) : (
        <form
            action={(formData) => addFeedback(formData)}
            className="flex flex-col gap-4"
        >
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea name="feedback" />
            <Button type="submit">Submit</Button>
        </form>
    );
}

export default Feedback;
