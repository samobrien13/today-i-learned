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
            <BlogParagraph>
                A color palette is a set of colors that work well together. It
                can be used to create a cohesive look and feel for a website or
                app.
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
