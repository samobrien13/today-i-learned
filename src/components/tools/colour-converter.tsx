"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { COLOUR_CONVERTER } from "@/data/tools";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    hslToHex,
    hslToRGB,
    hexToRGB,
    hexToHSL,
    rgbToHex,
    rgbToHSL,
    type HSL,
    type RGB,
    type HEX,
    validateHSL,
    validateRGB,
    validateHEX,
} from "@/lib/colours";

function ColourConverter() {
    const [hsl, setHSL] = useState<HSL>({ h: 0, s: 0, l: 0 });
    const [rgb, setRGB] = useState<RGB>({ r: 0, g: 0, b: 0 });
    const [hex, setHEX] = useState<HEX>("#000000");

    console.log(hsl, rgb, hex);

    return (
        <Card
            className="mx-auto w-full"
            style={{
                viewTransitionName: `${COLOUR_CONVERTER.slug}-card`,
            }}
        >
            <CardHeader>
                <CardTitle>{COLOUR_CONVERTER.title}</CardTitle>
                <CardDescription>
                    {COLOUR_CONVERTER.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {/* TODO: Add colour picker */}
                <Label>HSL</Label>
                <div className="flex flex-row gap-4">
                    <Input
                        id="hsl-h"
                        type="number"
                        value={hsl.h}
                        onChange={(e) => {
                            const newHSL = {
                                ...hsl,
                                h: parseInt(e.target.value),
                            };
                            setHSL(newHSL);

                            if (validateHSL(newHSL)) {
                                setRGB(hslToRGB(newHSL));
                                setHEX(hslToHex(newHSL));
                            }

                            // TODO: Show error message
                        }}
                    />
                    <Input
                        id="hsl-s"
                        type="number"
                        value={hsl.s}
                        onChange={(e) => {
                            const newHSL = {
                                ...hsl,
                                s: parseInt(e.target.value),
                            };
                            setHSL(newHSL);

                            if (validateHSL(newHSL)) {
                                setRGB(hslToRGB(newHSL));
                                setHEX(hslToHex(newHSL));
                            }
                        }}
                    />
                    <Input
                        id="hsl-l"
                        type="number"
                        value={hsl.l}
                        onChange={(e) => {
                            const newHSL = {
                                ...hsl,
                                l: parseInt(e.target.value),
                            };
                            setHSL(newHSL);

                            if (validateHSL(newHSL)) {
                                setRGB(hslToRGB(newHSL));
                                setHEX(hslToHex(newHSL));
                            }
                        }}
                    />
                </div>
                <Label>RGB</Label>
                <div className="flex flex-row gap-4">
                    <Input
                        id="rgb-r"
                        type="number"
                        value={rgb.r}
                        onChange={(e) => {
                            const newRGB = {
                                ...rgb,
                                r: parseInt(e.target.value),
                            };
                            setRGB(newRGB);

                            if (validateRGB(newRGB)) {
                                setHSL(rgbToHSL(newRGB));
                                setHEX(rgbToHex(newRGB));
                            }
                        }}
                    />
                    <Input
                        id="rgb-g"
                        type="number"
                        value={rgb.g}
                        onChange={(e) => {
                            const newRGB = {
                                ...rgb,
                                g: parseInt(e.target.value),
                            };
                            setRGB(newRGB);

                            if (validateRGB(newRGB)) {
                                setHSL(rgbToHSL(newRGB));
                                setHEX(rgbToHex(newRGB));
                            }
                        }}
                    />
                    <Input
                        id="rgb-b"
                        type="number"
                        value={rgb.b}
                        onChange={(e) => {
                            const newRGB = {
                                ...rgb,
                                b: parseInt(e.target.value),
                            };
                            setRGB(newRGB);

                            if (validateRGB(newRGB)) {
                                setHSL(rgbToHSL(newRGB));
                                setHEX(rgbToHex(newRGB));
                            }
                        }}
                    />
                </div>
                <Label htmlFor="hex">Hex</Label>
                <Input
                    id="hex"
                    type="text"
                    value={hex}
                    onChange={(e) => {
                        const newHex = e.target.value;
                        setHEX(newHex);

                        if (validateHEX(newHex)) {
                            setRGB(hexToRGB(newHex));
                            setHSL(hexToHSL(newHex));
                        }
                    }}
                />
            </CardContent>
        </Card>
    );
}

export { ColourConverter };
