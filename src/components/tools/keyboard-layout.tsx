"use client";

import {
    type LayoutData,
    layouts,
    Layouts,
    qwertyLayout,
} from "@/lib/keyboard";
import React, { useRef, useEffect, useState, useCallback } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { cssVar } from "@/lib/colours";
import useLocalStorage from "@/hooks/use-local-storage";
import TypingInput from "../ui/typing-input";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { Card, CardContent, CardHeader } from "../ui/card";

export interface KeyboardLayoutCanvasProps {
    keyWidth?: number;
    keyHeight?: number;
    keyGap?: number;
    rowGap?: number;
    padding?: number;
    fontSize?: number;
    backgroundColor?: string;
    keyColor?: string;
    keyPressedColor?: string;
    textColor?: string;
    borderColor?: string;
    borderRadius?: number;
}

const DEFAULT_KEY_GAP = 5;
const DEFAULT_ROW_GAP = 5;
const DEFAULT_PADDING = 10;
const DEFAULT_FONT_SIZE = 16;
const DEFAULT_BG_COLOR = "--background";
const DEFAULT_KEY_COLOR = "--card";
const DEFAULT_KEY_PRESSED_COLOR = "--primary";
const DEFAULT_TEXT_COLOR = "--card-foreground";
const DEFAULT_BORDER_COLOR = "--border";
const DEFAULT_BORDER_RADIUS = 4;

const colorToCanvas = (color: string) => {
    return `hsl(${cssVar(color).split(" ").join(", ")})`;
};

function KeyboardLayout({
    keyGap = DEFAULT_KEY_GAP,
    rowGap = DEFAULT_ROW_GAP,
    padding = DEFAULT_PADDING,
    fontSize = DEFAULT_FONT_SIZE,
    backgroundColor = DEFAULT_BG_COLOR,
    keyColor = DEFAULT_KEY_COLOR,
    keyPressedColor = DEFAULT_KEY_PRESSED_COLOR,
    textColor = DEFAULT_TEXT_COLOR,
    borderColor = DEFAULT_BORDER_COLOR,
    borderRadius = DEFAULT_BORDER_RADIUS,
}: KeyboardLayoutCanvasProps) {
    const { width } = useWindowDimensions();

    const keyWidth = width > 640 ? 50 : width / 20;
    const keyHeight = keyWidth;

    const [targetLayout, setTargetLayout] = useLocalStorage<Layouts>(
        "targetLayout",
        "qwerty",
    );
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set()); // Store codes of pressed keys

    const layout = layouts[targetLayout] ?? qwertyLayout;

    const calculateCanvasSize = useCallback(
        (layoutData: LayoutData): { width: number; height: number } => {
            let maxRowWidth = 0;
            let totalHeight = padding * 2; // Top and bottom padding

            layoutData.forEach((row, rowIndex) => {
                let currentRowWidth = padding * 2; // Left and right padding
                row.forEach((key, keyIndex) => {
                    const width = (key.widthMultiplier ?? 1) * keyWidth; // Use nullish coalescing
                    currentRowWidth += width;
                    if (keyIndex < row.length - 1) {
                        currentRowWidth += keyGap;
                    }
                });
                maxRowWidth = Math.max(maxRowWidth, currentRowWidth);
                totalHeight += keyHeight;
                if (rowIndex < layoutData.length - 1) {
                    totalHeight += rowGap;
                }
            });

            return { width: maxRowWidth, height: totalHeight };
        },
        [keyWidth, keyHeight, keyGap, rowGap, padding],
    );

    const { width: canvasWidth, height: canvasHeight } =
        calculateCanvasSize(layout);

    const drawKeyboard = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            currentLayout: LayoutData,
            currentlyPressedKeys: Set<string>,
        ) => {
            // Clear canvas
            ctx.fillStyle = colorToCanvas(backgroundColor);
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            let currentY = padding;

            const shiftPressed =
                currentlyPressedKeys.has("ShiftLeft") ||
                currentlyPressedKeys.has("ShiftRight");

            currentLayout.forEach((row) => {
                let currentX = padding;
                row.forEach((key) => {
                    const width = (key.widthMultiplier ?? 1) * keyWidth; // Use nullish coalescing
                    const isPressed = currentlyPressedKeys.has(key.code);

                    // Draw Key Background
                    ctx.fillStyle = isPressed
                        ? colorToCanvas(keyPressedColor)
                        : colorToCanvas(keyColor);
                    ctx.strokeStyle = colorToCanvas(borderColor);
                    ctx.lineWidth = 1;

                    // Rounded rectangle path
                    ctx.beginPath();
                    ctx.moveTo(currentX + borderRadius, currentY);
                    ctx.lineTo(currentX + width - borderRadius, currentY);
                    ctx.quadraticCurveTo(
                        currentX + width,
                        currentY,
                        currentX + width,
                        currentY + borderRadius,
                    );
                    ctx.lineTo(
                        currentX + width,
                        currentY + keyHeight - borderRadius,
                    );
                    ctx.quadraticCurveTo(
                        currentX + width,
                        currentY + keyHeight,
                        currentX + width - borderRadius,
                        currentY + keyHeight,
                    );
                    ctx.lineTo(currentX + borderRadius, currentY + keyHeight);
                    ctx.quadraticCurveTo(
                        currentX,
                        currentY + keyHeight,
                        currentX,
                        currentY + keyHeight - borderRadius,
                    );
                    ctx.lineTo(currentX, currentY + borderRadius);
                    ctx.quadraticCurveTo(
                        currentX,
                        currentY,
                        currentX + borderRadius,
                        currentY,
                    );
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    // Draw Key Label
                    ctx.fillStyle = colorToCanvas(textColor);
                    ctx.font = `${fontSize}px Geist Mono`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(
                        shiftPressed && key.shiftLabel
                            ? key.shiftLabel
                            : key.label,
                        currentX + width / 2,
                        currentY + keyHeight / 2,
                    );

                    currentX += width + keyGap;
                });
                currentY += keyHeight + rowGap;
            });
        },
        [
            keyWidth,
            keyHeight,
            backgroundColor,
            keyColor,
            keyPressedColor,
            borderColor,
            textColor,
            fontSize,
            keyGap,
            rowGap,
            padding,
            borderRadius,
        ],
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Could not get 2D context");
            return; // Context could be null
        }

        const scale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(canvasWidth * scale);
        canvas.height = Math.floor(canvasHeight * scale);
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
        ctx.scale(scale, scale);

        drawKeyboard(ctx, layout, pressedKeys);
    }, [layout, pressedKeys, drawKeyboard, canvasWidth, canvasHeight]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setPressedKeys((prev) => {
                if (prev.has(event.code)) return prev;
                const next = new Set(prev);
                next.add(event.code);
                return next;
            });
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            setPressedKeys((prev) => {
                if (!prev.has(event.code)) return prev;
                const next = new Set(prev);
                next.delete(event.code);
                return next;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col gap-4">
                <Card>
                    <CardHeader>
                        <Label>Target Layout</Label>
                        <Select
                            value={targetLayout}
                            onValueChange={(value) => {
                                setTargetLayout(value as Layouts);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a layout" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(layouts).map((layout) => (
                                    <SelectItem key={layout} value={layout}>
                                        {layout}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                        <TypingInput />
                    </CardContent>
                </Card>
            </div>
            <div className="mx-auto flex w-full items-center justify-center">
                <canvas
                    ref={canvasRef}
                    width={canvasWidth}
                    height={canvasHeight}
                />
            </div>
        </div>
    );
}

export { KeyboardLayout };
