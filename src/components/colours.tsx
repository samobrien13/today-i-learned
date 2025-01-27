"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import tailwindConfig from "../../tailwind.config";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const tailwindColours = tailwindConfig.theme.colors as Record<
    string,
    string | Record<string, string>
>;

const colours: string[] = [];

Object.keys(tailwindColours).forEach((key) => {
    const colour = tailwindColours[key];

    if (typeof colour === "string") {
        colours.push(key);
    } else {
        Object.keys(colour).forEach((subKey) => {
            if (subKey === "DEFAULT") {
                colours.push(key);
            } else {
                colours.push(`${key}-${subKey}`);
            }
        });
    }
});

type Colour = {
    name: string;
} & HSL;

type HSL = {
    h: number;
    s: number;
    l: number;
};

function Colours() {
    const { theme } = useTheme();
    const { toast } = useToast();
    const [customColours, setCustomColours] = useState<Map<string, Colour>>(
        new Map(),
    );

    useEffect(() => {
        // Update as a callback to ensure the latest theme is used
        setCustomColours(() => {
            const newPalette: Map<string, Colour> = new Map();
            colours.forEach((key) => {
                const value = window
                    .getComputedStyle(document.documentElement)
                    .getPropertyValue(`--${key}`);
                newPalette.set(key, {
                    name: key,
                    h: Number(value.split(" ")[0]),
                    s: Number(value.split(" ")[1].replace("%", "")),
                    l: Number(value.split(" ")[2].replace("%", "")),
                });
            });
            return newPalette;
        });
    }, [theme]);

    const css = Array.from(customColours.values())
        .map((color) => `--${color.name}: ${color.h} ${color.s}% ${color.l}%`)
        .join(";\n\t\t\t\t\t");

    return (
        <>
            <style>{`
                .theme-custom {
                    ${css}
                }
            `}</style>
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
                                    onValueChange={(value) =>
                                        setCustomColours(
                                            new Map(
                                                customColours.set(color.name, {
                                                    ...color,
                                                    h: value[0],
                                                }),
                                            ),
                                        )
                                    }
                                />
                                <Slider
                                    className="h-4"
                                    value={[color.s]}
                                    step={0.1}
                                    min={0}
                                    max={100}
                                    onValueChange={(value) =>
                                        setCustomColours(
                                            new Map(
                                                customColours.set(color.name, {
                                                    ...color,
                                                    s: value[0],
                                                }),
                                            ),
                                        )
                                    }
                                />
                                <Slider
                                    className="h-4"
                                    value={[color.l]}
                                    step={0.1}
                                    min={0}
                                    max={100}
                                    onValueChange={(value) =>
                                        setCustomColours(
                                            new Map(
                                                customColours.set(color.name, {
                                                    ...color,
                                                    l: value[0],
                                                }),
                                            ),
                                        )
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <div
                                    className="ml-auto mr-0 h-8 w-8 rounded-md"
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
                    toast({
                        title: "CSS variables copied to clipboard",
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
