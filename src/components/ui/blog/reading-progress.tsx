"use client";

import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";

function ReadingProgress() {
    const [progress, setProgress] = useState(0);
    const [isStuck, setIsStuck] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsStuck(!entry.isIntersecting);
            },
            { threshold: 0 },
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div ref={sentinelRef} className="h-0 w-full" aria-hidden />
            <Progress
                value={progress}
                className="sticky top-0 z-50 -mx-4 -mt-12 -mb-6 gap-0 transition-opacity duration-300 md:mx-0"
                style={{ opacity: isStuck ? 1 : 0 }}
            />
        </>
    );
}

export { ReadingProgress };
