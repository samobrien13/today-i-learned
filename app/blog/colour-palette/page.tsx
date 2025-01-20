"use client";

import Blog, { BlogParagraph } from "@/components/ui/blog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { COLOUR_PALLETTE } from "@/data/blog";
import { useEffect, useState } from "react";
import { isHex } from "@/lib/colour";

import tailwindConfig from "../../../tailwind.config";

const colours = tailwindConfig.theme.colors as Record<
    string,
    string | Record<string, string>
>;

type Colour = {
    name: string;
    value: string;
};

function ColourPallette() {
    const [palette, setPalette] = useState<Colour[]>([]);

    useEffect(() => {
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

        setPalette(newPalette);
    }, []);

    return (
        <Blog
            title={COLOUR_PALLETTE.title}
            date={COLOUR_PALLETTE.date}
            slug={COLOUR_PALLETTE.slug}
        >
            <BlogParagraph>
                A color palette is a set of colors that work well together. It
                can be used to create a cohesive look and feel for a website or
                app.
            </BlogParagraph>
            <Table>
                <TableBody>
                    {palette.map((color) => (
                        <TableRow key={color.name}>
                            <TableCell>{color.name}</TableCell>
                            <TableCell>{color.value}</TableCell>
                            <TableCell>
                                <div
                                    className="h-8 w-8 rounded-md"
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

export default ColourPallette;
