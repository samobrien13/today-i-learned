"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { cssVar, HSL, keys, setCssVar } from "@/lib/colours";

type Colour = {
    name: string;
} & HSL;

function Colours() {
    const { resolvedTheme: theme } = useTheme();
    const [prevTheme, setPrevTheme] = useState(theme);

    const [customColours, setCustomColours] = useState<Map<string, Colour>>(
        new Map(),
    );

    if (theme !== prevTheme) {
        setPrevTheme(theme);
        setCustomColours(() => {
            const newPalette: Map<string, Colour> = new Map();
            keys.forEach((key) => {
                if (key === "transparent") return;
                const value = cssVar(`--${key}`);
                newPalette.set(key, {
                    name: key,
                    h: Number(value.split(" ")[0]),
                    s: Number(value.split(" ")[1].replace("%", "")),
                    l: Number(value.split(" ")[2].replace("%", "")),
                });
            });
            return newPalette;
        });
    }

    const css = Array.from(customColours.values())
        .map((color) => `--${color.name}: ${color.h} ${color.s}% ${color.l}%`)
        .join(";\n\t\t\t\t\t");

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Value (HSL)</TableCell>
                        <TableCell>Slider</TableCell>
                        <TableCell className="text-right">Colour</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from(customColours.values()).map((color) => (
                        <TableRow key={color.name}>
                            <TableCell>{color.name}</TableCell>
                            <TableCell className="md min-w-16">
                                {color.h}
                                <br />
                                {color.s}%
                                <br />
                                {color.l}%
                            </TableCell>
                            <TableCell className="flex w-32 flex-col gap-1">
                                <Slider
                                    className="h-4"
                                    value={[color.h]}
                                    step={0.1}
                                    min={0}
                                    max={360}
                                    onValueChange={(value) => {
                                        setCustomColours(
                                            new Map(
                                                customColours.set(color.name, {
                                                    ...color,
                                                    h: value[0],
                                                }),
                                            ),
                                        );
                                        setCssVar(color.name, {
                                            ...color,
                                            h: value[0],
                                        });
                                    }}
                                />
                                <Slider
                                    className="h-4"
                                    value={[color.s]}
                                    step={0.1}
                                    min={0}
                                    max={100}
                                    onValueChange={(value) => {
                                        setCustomColours(
                                            new Map(
                                                customColours.set(color.name, {
                                                    ...color,
                                                    s: value[0],
                                                }),
                                            ),
                                        );
                                        setCssVar(color.name, {
                                            ...color,
                                            s: value[0],
                                        });
                                    }}
                                />
                                <Slider
                                    className="h-4"
                                    value={[color.l]}
                                    step={0.1}
                                    min={0}
                                    max={100}
                                    onValueChange={(value) => {
                                        setCustomColours(
                                            new Map(
                                                customColours.set(color.name, {
                                                    ...color,
                                                    l: value[0],
                                                }),
                                            ),
                                        );
                                        setCssVar(color.name, {
                                            ...color,
                                            l: value[0],
                                        });
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <div
                                    className="mr-0 ml-auto h-8 w-8 rounded-md"
                                    style={{
                                        backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                className="mt-4 w-full"
                variant="outline"
                onClick={() => {
                    navigator.clipboard.writeText(css);
                    toast("CSS variables copied to clipboard", {
                        duration: 2000,
                    });
                }}
            >
                <Copy />
            </Button>
        </>
    );
}

export { Colours };
