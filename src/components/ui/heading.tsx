"use client";

import { useElementDimensions } from "@/hooks/use-element-dimensions";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useRef } from "react";

function Heading() {
    const ref = useRef<HTMLDivElement>(null);
    const [{ width, height, top, left }, measure] = useElementDimensions(ref);
    const gradientX = useMotionValue(0.5);
    const gradientY = useMotionValue(0.5);
    const background = useTransform(
        () =>
            `conic-gradient(from 0deg at calc(${
                gradientX.get() * 100
            }% - ${left}px) calc(${
                gradientY.get() * 100
            }% - ${top}px), #0cdcf7, #ff0088, #fff312, #0cdcf7)`,
    );

    return (
        <div
            className="flex items-center justify-center"
            onPointerMove={(e) => {
                gradientX.set(e.clientX / width);
                gradientY.set(e.clientY / height);
            }}
        >
            <motion.div
                ref={ref}
                style={{
                    background,
                    cursor: "none",
                }}
                onPointerEnter={() => measure()}
            >
                <h1 className="text-center font-mono text-5xl text-transparent">
                    Today I Learned
                </h1>
            </motion.div>
        </div>
    );
}

export { Heading };
