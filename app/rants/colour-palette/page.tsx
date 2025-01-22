"use client";

import Blog, { BlogHeading, BlogParagraph } from "@/components/ui/blog";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { COLOUR_PALETTE } from "@/data/blog";
import { useEffect, useState } from "react";
import tailwindConfig from "../../../tailwind.config";
import { useTheme } from "next-themes";
import { Link } from "@/components/ui/link";
import { ArrowUpRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

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

function ColourPalette() {
    const { theme } = useTheme();
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
                console.log("value", value);
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

    return (
        <>
            <style>{`
                .theme-custom {
                    ${Array.from(customColours.values()).map(
                        (color) => `
                            --${color.name}: ${color.h} ${color.s}% ${color.l}%;
                        `,
                    )}
                }
            `}</style>
            <div className="theme-custom">
                <Blog
                    title={COLOUR_PALETTE.title}
                    date={COLOUR_PALETTE.date}
                    slug={COLOUR_PALETTE.slug}
                >
                    <Link
                        className="flex items-center"
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://www.refactoringui.com/"
                    >
                        <ArrowUpRight strokeWidth={1} />
                        <p className="ml-2 h-7">refactoring ui</p>
                    </Link>
                    <BlogParagraph>
                        I highly recommend Refactoring UI, written by the
                        creators of Tailwind CSS. It&apos;s the only design
                        resource you need for learning how to design half decent
                        UI without being a designer.
                    </BlogParagraph>
                    <BlogParagraph>
                        HSL (Hue, Saturation, Lightness) is favoured as a more
                        intuitive representation of colour than RGB or Hex.
                    </BlogParagraph>
                    <BlogParagraph>
                        Hue is a colour&apos;s position on the colour wheel,
                        saturation is the intensity of the colour, and lightness
                        is how bright the colour is relative to black.
                    </BlogParagraph>
                    <BlogHeading>Background</BlogHeading>
                    <div className="flex flex-col md:flex-row"></div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Value (HSL)</TableCell>
                                <TableCell className="text-right">
                                    Colour
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from(customColours.values()).map((color) => (
                                <TableRow key={color.name}>
                                    <TableCell>{color.name}</TableCell>
                                    <TableCell>
                                        {color.h +
                                            " " +
                                            color.s +
                                            " " +
                                            color.l}
                                    </TableCell>
                                    <TableCell className="flex flex-col gap-3">
                                        <Slider
                                            value={[color.h]}
                                            min={0}
                                            max={360}
                                            onValueChange={(value) =>
                                                setCustomColours(
                                                    new Map(
                                                        customColours.set(
                                                            color.name,
                                                            {
                                                                ...color,
                                                                h: value[0],
                                                            },
                                                        ),
                                                    ),
                                                )
                                            }
                                        />
                                        <Slider
                                            value={[color.s]}
                                            min={0}
                                            max={100}
                                            onValueChange={(value) =>
                                                setCustomColours(
                                                    new Map(
                                                        customColours.set(
                                                            color.name,
                                                            {
                                                                ...color,
                                                                s: value[0],
                                                            },
                                                        ),
                                                    ),
                                                )
                                            }
                                        />
                                        <Slider
                                            value={[color.l]}
                                            min={0}
                                            max={100}
                                            onValueChange={(value) =>
                                                setCustomColours(
                                                    new Map(
                                                        customColours.set(
                                                            color.name,
                                                            {
                                                                ...color,
                                                                l: value[0],
                                                            },
                                                        ),
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
                </Blog>
            </div>
        </>
    );
}

export default ColourPalette;
