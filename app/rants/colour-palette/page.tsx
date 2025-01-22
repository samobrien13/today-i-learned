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
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
                    ${Array.from(customColours.values())
                        .map(
                            (color) =>
                                `--${color.name}: ${color.h} ${color.s}% ${color.l}%`,
                        )
                        .join(";\n\t\t\t\t\t")}
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
                    <BlogHeading>Default</BlogHeading>
                    <BlogParagraph>
                        Default background is used for the background of the
                        page. Default foreground is used for text.
                    </BlogParagraph>
                    <BlogHeading>Card</BlogHeading>
                    <Card className="flex flex-col gap-2 p-4">
                        <CardTitle>Title</CardTitle>
                        <CardDescription>
                            Cards use a different shade for the background and
                            the foreground. They also make use of the border
                            colour.
                        </CardDescription>
                    </Card>
                    <div className="pb-20">
                        <HoverCard>
                            <HoverCardTrigger>
                                <BlogHeading>Popover</BlogHeading>
                                <BlogParagraph>
                                    Popovers are used for displaying information
                                    in elements like tooltips or dropdowns.
                                </BlogParagraph>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <BlogParagraph>
                                    Like this hover card
                                </BlogParagraph>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    <BlogHeading>Primary</BlogHeading>
                    <BlogParagraph>
                        Primary colours are used for primary actions or
                        elements.
                    </BlogParagraph>
                    <Button>Primary Button</Button>
                    <BlogHeading>Secondary</BlogHeading>
                    <BlogParagraph>
                        Secondary colours are used for secondary actions or
                        elements.
                    </BlogParagraph>
                    <Button variant="secondary">Secondary Button</Button>
                    <BlogHeading>Muted</BlogHeading>
                    <BlogParagraph>
                        Muted colours are used for elements that are not the
                        primary focus, and secondary text.
                    </BlogParagraph>
                    <BlogHeading>Accent</BlogHeading>
                    <BlogParagraph>
                        Accent colours are used for highlighting elements and
                        mild hover effects.
                    </BlogParagraph>
                    <BlogHeading>Destructive</BlogHeading>
                    <BlogParagraph>
                        Destructive colours are used for destructive actions.
                    </BlogParagraph>
                    <Button variant="destructive">Destructive Button</Button>
                    <BlogHeading>Border</BlogHeading>
                    <BlogParagraph>Default border colour</BlogParagraph>
                    <BlogHeading>Input, Ring</BlogHeading>
                    <BlogParagraph>
                        Input is used for the border colour of input elements.
                        Ring is used for the border colour of focused input
                    </BlogParagraph>
                    <Input placeholder="Input" />
                    <BlogHeading>Custom</BlogHeading>
                    <BlogParagraph>
                        Finally we have a set of chart colours that are used
                        whenever a splash of colour is needed.
                    </BlogParagraph>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Value (HSL)</TableCell>
                                <TableCell>Slider</TableCell>
                                <TableCell className="text-right">
                                    Colour
                                </TableCell>
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
                                            className="h-4"
                                            value={[color.s]}
                                            step={0.1}
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
                                            className="h-4"
                                            value={[color.l]}
                                            step={0.1}
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
