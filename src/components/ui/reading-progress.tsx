"use client";

import { useEffect, useState } from "react";
import {
    Progress,
    ProgressTrack,
    ProgressIndicator,
} from "@/components/ui/progress";

function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent =
                docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(100, Math.max(0, scrollPercent)));
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Progress
            value={progress}
            className="sticky top-0 z-50 -mx-4 gap-0 md:-mx-0"
        >
            <ProgressTrack className="h-0.5 rounded-none bg-transparent">
                <ProgressIndicator className="bg-primary" />
            </ProgressTrack>
        </Progress>
    );
}

export { ReadingProgress };
