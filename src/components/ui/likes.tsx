"use client";

import { Button } from "./button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useDislike, useLike, useLikes } from "@/hooks/use-likes";

type LikesProps = {
    slug: string;
};

function Likes({ slug }: LikesProps) {
    const { data: likes, isPending, isError } = useLikes(slug);
    const { mutate: addLike } = useLike(slug);
    const { mutate: addDislike } = useDislike(slug);

    if (isPending || isError) {
        return null;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-2">
                <form action={() => addLike()}>
                    <Button
                        type="submit"
                        variant="outline"
                        disabled={likes.userLiked}
                    >
                        <ThumbsUp />
                        {likes.count}
                    </Button>
                </form>
                <form action={() => addDislike()}>
                    <Button
                        type="submit"
                        variant="outline"
                        disabled={likes.userLiked}
                    >
                        <ThumbsDown />
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Likes;
