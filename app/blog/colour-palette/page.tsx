"use client";

import Blog, { BlogParagraph } from "@/components/ui/blog";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { COLOUR_PALETTE } from "@/data/blog";
import { useEffect, useState } from "react";
import { isHex } from "@/lib/colour";

import tailwindConfig from "../../../tailwind.config";
import { useTheme } from "next-themes";
import { Link } from "@/components/ui/link";
import { ArrowUpRight } from "lucide-react";

const colours = tailwindConfig.theme.colors as Record<
    string,
    string | Record<string, string>
>;

type Colour = {
    name: string;
    value: string;
};

function ColourPalette() {
    const [palette, setPalette] = useState<Colour[]>([]);
    const { theme } = useTheme();

    useEffect(() => {
        // Update as a callback to ensure the latest theme is used
        setPalette(() => {
            const newPalette: Colour[] = [];
            Object.keys(colours).forEach((key) => {
                const colour = colours[key];

                if (typeof colour === "string") {
                    newPalette.push({
                        name: key,
                        value: window
                            .getComputedStyle(document.documentElement)
                            .getPropertyValue(`--${key}`),
                    });
                } else {
                    Object.keys(colour).forEach((subKey) => {
                        if (subKey === "DEFAULT") {
                            newPalette.push({
                                name: key,
                                value: window
                                    .getComputedStyle(document.documentElement)
                                    .getPropertyValue(`--${key}`),
                            });
                        } else {
                            newPalette.push({
                                name: `${key}-${subKey}`,
                                value: window
                                    .getComputedStyle(document.documentElement)
                                    .getPropertyValue(`--${key}-${subKey}`),
                            });
                        }
                    });
                }
            });
            return newPalette;
        });
    }, [theme]);

    return (
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
                I highly recommend Refactoring UI, written by the creators of
                Tailwind CSS. It&apos;s the only design resource you need for
                learning how to design half decent UI without being a designer.
            </BlogParagraph>
            <BlogParagraph>
                HSL (Hue, Saturation, Lightness) is favoured as a more intuitive
                representation of colour than RGB or Hex.
            </BlogParagraph>
            <BlogParagraph>
                Hue is a colour&apos;s position on the colour wheel, saturation
                is the intensity of the colour, and lightness is how bright the
                colour is relative to black.
            </BlogParagraph>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Value (HSL)</TableCell>
                        <TableCell className="text-right">Colour</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {palette.map((color) => (
                        <TableRow key={color.name}>
                            <TableCell>{color.name}</TableCell>
                            <TableCell>{color.value}</TableCell>
                            <TableCell>
                                <div
                                    className="ml-auto mr-0 h-8 w-8 rounded-md"
                                    style={{
                                        backgroundColor: isHex(color.value)
                                            ? color.value
                                            : `hsl(${color.value})`,
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Blog>
    );
}

export default ColourPalette;
