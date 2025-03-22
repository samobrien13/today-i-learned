"use client";

import { useElementDimensions } from "@/hooks/use-element-dimensions";
import { cssVar } from "@/lib/colours";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef } from "react";

type HeadingProps = {
    children: React.ReactNode;
};

function Heading({ children }: HeadingProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [{ width, height, top, left }, measure] = useElementDimensions(ref);
    const gradientX = useMotionValue(0.5);
    const gradientY = useMotionValue(0.5);
    const background = useTransform(
        () =>
            `conic-gradient(from 0deg at calc(${
                gradientX.get() * 100
            }% - ${left}px) calc(${gradientY.get() * 100}% - ${top}px),
                hsl(${cssVar("--chart-1")}),
                hsl(${cssVar("--chart-2")}),
                hsl(${cssVar("--chart-3")}),
                hsl(${cssVar("--chart-4")}),
                hsl(${cssVar("--chart-5")})
            )`,
    );

    return (
        <div
            className="flex items-center justify-center"
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
