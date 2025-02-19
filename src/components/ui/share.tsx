"use client";

import { useToast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";
import { Button } from "./button";

type ShareProps = {
    title: string;
    text?: string;
    url?: string;
};

function Share({ title, text, url }: ShareProps) {
    const { toast } = useToast();

    return (
        <Button
            size="icon"
            variant="ghost"
            onClick={() => {
                const shareUrl = url ?? window.location.href;
                if (
                    navigator.canShare({
                        title: title,
                        text: text,
                        url: shareUrl,
                    })
                ) {
                    navigator.share({
                        title: title,
                        text: text,
                        url: shareUrl,
                    });
                } else {
                    navigator.clipboard.writeText(url ?? window.location.href);
                    toast({
                        title: "URL copied to clipboard",
                        duration: 2000,
                    });
                }
            }}
        >
            <Share2 />
        </Button>
    );
}

export default Share;
