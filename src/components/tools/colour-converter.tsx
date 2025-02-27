"use client";

import { useState } from "react";
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

    const [hueError, setHueError] = useState(false);
    const [saturationError, setSaturationError] = useState(false);
    const [lightnessError, setLightnessError] = useState(false);

    const [redError, setRedError] = useState(false);
    const [greenError, setGreenError] = useState(false);
    const [blueError, setBlueError] = useState(false);

    const [hexError, setHexError] = useState(false);

    const clearErrors = () => {
        setHueError(false);
        setSaturationError(false);
        setLightnessError(false);
        setRedError(false);
        setGreenError(false);
        setBlueError(false);
        setHexError(false);
    };

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
            <CardContent className="flex flex-col gap-8">
                {/* TODO: Add colour picker */}
                <div className="flex flex-col gap-3 md:flex-row">
                    <div className="flex flex-1 flex-col gap-2">
                        <Label htmlFor="hsl-h">Hue</Label>
                        <Input
                            id="hsl-h"
                            type="number"
                            step={1}
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
                                    clearErrors();
                                } else {
                                    setHueError(true);
                                }
                            }}
                        />
                        <div className="h-5 text-sm text-destructive">
                            {hueError ? "Must be between 0 and 360" : null}
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <Label>Saturation</Label>
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
                                    clearErrors();
                                } else {
                                    setSaturationError(true);
                                }
                            }}
                        />
                        <div className="h-5 text-sm text-destructive">
                            {saturationError
                                ? "Must be between 0 and 100"
                                : null}
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <Label>Lightness</Label>
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
                                    clearErrors();
                                } else {
                                    setLightnessError(true);
                                }
                            }}
                        />
                        <div className="h-5 text-sm text-destructive">
                            {lightnessError
                                ? "Must be between 0 and 100"
                                : null}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                    <div className="flex flex-1 flex-col gap-2">
                        <Label htmlFor="rgb-r">Red</Label>
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
                                    clearErrors();
                                } else {
                                    setRedError(true);
                                }
                            }}
                        />
                        <div className="h-5 text-sm text-destructive">
                            {redError ? "Must be between 0 and 255" : null}
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <Label>Green</Label>
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
                                    clearErrors();
                                } else {
                                    setGreenError(true);
                                }
                            }}
                        />
                        <div className="h-5 text-sm text-destructive">
                            {greenError ? "Must be between 0 and 255" : null}
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <Label>Blue</Label>
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
                                    clearErrors();
                                } else {
                                    setBlueError(true);
                                }
                            }}
                        />
                        <div className="h-5 text-sm text-destructive">
                            {blueError ? "Must be between 0 and 255" : null}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
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
                                clearErrors();
                            } else {
                                setHexError(true);
                            }
                        }}
                    />
                    <div className="h-5 text-sm text-destructive">
                        {hexError ? "Invalid hex code" : null}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export { ColourConverter };
