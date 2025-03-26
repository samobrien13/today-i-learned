"use client";

import { useElementDimensions } from "@/hooks/use-element-dimensions";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef } from "react";

type HeadingProps = {
    children: React.ReactNode;
};

function Heading({ children }: HeadingProps) {
    const ref = useRef<HTMLHeadingElement>(null);
    const [{ width, height, top, left }, measure] = useElementDimensions(ref);
    const gradientX = useMotionValue(0.5);
    const gradientY = useMotionValue(0.5);
    const background = useTransform(
        () =>
            `conic-gradient(from 0deg at calc(${
                gradientX.get() * 100
            }% - ${left}px) calc(${gradientY.get() * 100}% - ${top}px),
                hsl(var(--primary)),
                hsl(var(--foreground)),
                hsl(var(--muted-foreground)),
                hsl(var(--chart-4)),
                hsl(var(--chart-5))
            )`,
    );

    return (
        <div
            className="flex items-center justify-center"
            onTouchMove={(e) => {
                gradientX.set(e.touches[0].clientX / width);
                gradientY.set(e.touches[0].clientY / height);
            }}
            onPointerMove={(e) => {
                gradientX.set(e.clientX / width);
                gradientY.set(e.clientY / height);
            }}
        >
            <motion.h1
                ref={ref}
                className="bg-clip-text p-16 text-center font-mono text-6xl leading-relaxed text-transparent"
                style={{
                    backgroundImage: background,
                    cursor: "none",
                }}
                onPointerEnter={() => measure()}
            >
                {children}
            </motion.h1>
        </div>
    );
}

export { Heading };
