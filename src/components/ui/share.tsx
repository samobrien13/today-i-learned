"use client";

import { useToast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";

function Share() {
    const { toast } = useToast();

    return (
        <button className="inline-block">
            <Share2
                onClick={() => {
                    if (navigator.canShare()) {
                        navigator.share();
                    } else {
                        navigator.clipboard.writeText(window.location.href);
                        toast({
                            title: "URL copied to clipboard",
                            duration: 2000,
                        });
                    }
                }}
            />
        </button>
    );
}

export default Share;
