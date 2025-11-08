"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    hexToOklch,
    validateOklch,
    oklchToRGB,
    oklchToHex,
    oklchToHSL,
    hslToOklch,
    rgbToOklch,
} from "@/lib/colours";
import { ToolData } from ".";

function ColourConverter({ title, description }: ToolData) {
    const [hsl, setHSL] = useState<HSL>({ h: 0, s: 0, l: 0 });
    const [rgb, setRGB] = useState<RGB>({ r: 0, g: 0, b: 0 });
    const [hex, setHEX] = useState<HEX>("#000000");
    const [oklch, setOklch] = useState({ l: 0, c: 0, h: 0 });

    const [okLightnessError, setOKLightnessError] = useState(false);
    const [okChromaError, setOKChromaError] = useState(false);
    const [okHueError, setOKHueError] = useState(false);

    const [hueError, setHueError] = useState(false);
    const [saturationError, setSaturationError] = useState(false);
    const [lightnessError, setLightnessError] = useState(false);

    const [redError, setRedError] = useState(false);
    const [greenError, setGreenError] = useState(false);
    const [blueError, setBlueError] = useState(false);

    const [hexError, setHexError] = useState(false);

    const clearErrors = () => {
        setOKLightnessError(false);
        setOKChromaError(false);
        setOKHueError(false);
        setHueError(false);
        setSaturationError(false);
        setLightnessError(false);
        setRedError(false);
        setGreenError(false);
        setBlueError(false);
        setHexError(false);
    };

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                <div className="flex flex-row gap-8">
                    <HexColorPicker
                        className="flex-1"
                        color={hex}
                        onChange={(value) => {
                            setHEX(value);
                            setRGB(hexToRGB(value));
                            setHSL(hexToHSL(value));
                            setOklch(hexToOklch(value));
                        }}
                    />
                    <div
                        className="flex-1 rounded-lg"
                        style={{
                            backgroundColor: hex,
                        }}
                    />
                </div>
                <div>
                    <h2 className="leading-loose">Oklch</h2>
                    <div className="flex flex-col gap-3 md:flex-row">
                        <div className="flex flex-1 flex-col gap-2">
                            <Label htmlFor="oklch-l">Lightness</Label>
                            <Input
                                id="oklch-l"
                                type="number"
                                step={0.01}
                                min={0}
                                max={1}
                                value={isNaN(oklch.l) ? "" : oklch.l}
                                onChange={(e) => {
                                    const newOklch = {
                                        ...oklch,
                                        l: parseFloat(e.target.value),
                                    };
                                    setOklch(newOklch);

                                    if (validateOklch(newOklch)) {
                                        setHSL(oklchToHSL(newOklch));
                                        setRGB(oklchToRGB(newOklch));
                                        setHEX(oklchToHex(newOklch));
                                        clearErrors();
                                    } else {
                                        setOKLightnessError(true);
                                    }
                                }}
                            />
                            <div className="text-destructive h-5 text-sm">
                                {okLightnessError
                                    ? "Must be between 0 and 1"
                                    : null}
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <Label htmlFor="oklch-c">Chroma</Label>
                            <Input
                                id="oklch-c"
                                type="number"
                                value={isNaN(oklch.c) ? "" : oklch.c}
                                step={0.01}
                                min={0}
                                max={0.4}
                                onChange={(e) => {
                                    const newOklch = {
                                        ...oklch,
                                        c: parseFloat(e.target.value),
                                    };
                                    setOklch(newOklch);

                                    if (validateOklch(newOklch)) {
                                        setHSL(oklchToHSL(newOklch));
                                        setRGB(oklchToRGB(newOklch));
                                        setHEX(oklchToHex(newOklch));
                                        clearErrors();
                                    } else {
                                        setOKChromaError(true);
                                    }
                                }}
                            />
                            <div className="text-destructive h-5 text-sm">
                                {okChromaError
                                    ? "Must be between 0 and 0.4"
                                    : null}
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <Label htmlFor="oklch-h">Hue</Label>
                            <Input
                                id="oklch-h"
                                type="number"
                                value={isNaN(oklch.h) ? "" : oklch.h}
                                step={1}
                                min={0}
                                max={360}
                                onChange={(e) => {
                                    const newOklch = {
                                        ...oklch,
                                        h: parseFloat(e.target.value),
                                    };
                                    setOklch(newOklch);

                                    if (validateOklch(newOklch)) {
                                        setHSL(oklchToHSL(newOklch));
                                        setRGB(oklchToRGB(newOklch));
                                        setHEX(oklchToHex(newOklch));
                                        clearErrors();
                                    } else {
                                        setOKHueError(true);
                                    }
                                }}
                            />
                            <div className="text-destructive h-5 text-sm">
                                {okHueError
                                    ? "Must be between 0 and 360"
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="leading-loose">HSL</h2>
                    <div className="flex flex-col gap-3 md:flex-row">
                        <div className="flex flex-1 flex-col gap-2">
                            <Label htmlFor="hsl-h">Hue</Label>
                            <Input
                                id="hsl-h"
                                type="number"
                                step={1}
                                min={0}
                                max={360}
                                value={isNaN(hsl.h) ? "" : hsl.h}
                                onChange={(e) => {
                                    const newHSL = {
                                        ...hsl,
                                        h: parseFloat(e.target.value),
                                    };
                                    setHSL(newHSL);

                                    if (validateHSL(newHSL)) {
                                        setOklch(hslToOklch(newHSL));
                                        setRGB(hslToRGB(newHSL));
                                        setHEX(hslToHex(newHSL));
                                        clearErrors();
                                    } else {
                                        setHueError(true);
                                    }
                                }}
                            />
                            <div className="text-destructive h-5 text-sm">
                                {hueError ? "Must be between 0 and 360" : null}
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <Label htmlFor="hsl-s">Saturation</Label>
                            <Input
                                id="hsl-s"
                                type="number"
                                value={isNaN(hsl.s) ? "" : hsl.s}
                                step={1}
                                min={0}
                                max={100}
                                onChange={(e) => {
                                    const newHSL = {
                                        ...hsl,
                                        s: parseFloat(e.target.value),
                                    };
                                    setHSL(newHSL);

                                    if (validateHSL(newHSL)) {
                                        setOklch(hslToOklch(newHSL));
                                        setRGB(hslToRGB(newHSL));
                                        setHEX(hslToHex(newHSL));
                                        clearErrors();
                                    } else {
                                        setSaturationError(true);
                                    }
                                }}
                            />
                            <div className="text-destructive h-5 text-sm">
                                {saturationError
                                    ? "Must be between 0 and 100"
                                    : null}
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <Label htmlFor="hsl-l">Lightness</Label>
                            <Input
                                id="hsl-l"
                                type="number"
                                value={isNaN(hsl.l) ? "" : hsl.l}
                                step={1}
                                min={0}
                                max={100}
                                onChange={(e) => {
                                    const newHSL = {
                                        ...hsl,
                                        l: parseFloat(e.target.value),
                                    };
                                    setHSL(newHSL);

                                    if (validateHSL(newHSL)) {
                                        setOklch(hslToOklch(newHSL));
                                        setRGB(hslToRGB(newHSL));
                                        setHEX(hslToHex(newHSL));
                                        clearErrors();
                                    } else {
                                        setLightnessError(true);
                                    }
                                }}
                            />
                            <div className="text-destructive h-5 text-sm">
                                {lightnessError
                                    ? "Must be between 0 and 100"
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="leading-loose">RGB</h2>
                    <div className="flex flex-col gap-3 md:flex-row">
                        <div className="flex flex-1 flex-col gap-2">
                            <Label htmlFor="rgb-r">Red</Label>
                            <Input
                                id="rgb-r"
                                type="number"
                                value={isNaN(rgb.r) ? "" : rgb.r}
                                step={1}
                                min={0}
                                max={255}
                                onChange={(e) => {
                                    const newRGB = {
                                        ...rgb,
                                        r: parseInt(e.target.value),
                                    };
                                    setRGB(newRGB);

                                    if (validateRGB(newRGB)) {
                                        setOklch(rgbToOklch(newRGB));
                                        setHSL(rgbToHSL(newRGB));
                                        setHEX(rgbToHex(newRGB));
                                        clearErrors();
                                    } else {
                                        setRedError(true);
                                    }
                                }}
                            />
                            <div className="text-destructive h-5 text-sm">
                                {redError ? "Must be between 0 and 255" : null}
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <Label htmlFor="rgb-g">Green</Label>
                            <Input
                                id="rgb-g"
                                type="number"
                                value={isNaN(rgb.g) ? "" : rgb.g}
                                step={1}
                                min={0}
                                max={255}
                                onChange={(e) => {
                                    const newRGB = {
                                        ...rgb,
                                        g: parseInt(e.target.value),
                                    };
                                    setRGB(newRGB);

                                    if (validateRGB(newRGB)) {
                                        setOklch(rgbToOklch(newRGB));
                                        setHSL(rgbToHSL(newRGB));
                                        setHEX(rgbToHex(newRGB));
                                        clearErrors();
                                    } else {
                                        setGreenError(true);
                                    }
                                }}
                            />
                            <div className="text-destructive h-5 text-sm">
                                {greenError
                                    ? "Must be between 0 and 255"
                                    : null}
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <Label htmlFor="rgb-b">Blue</Label>
                            <Input
                                id="rgb-b"
                                type="number"
                                value={isNaN(rgb.b) ? "" : rgb.b}
                                step={1}
                                min={0}
                                max={255}
                                onChange={(e) => {
                                    const newRGB = {
                                        ...rgb,
                                        b: parseInt(e.target.value),
                                    };
                                    setRGB(newRGB);

                                    if (validateRGB(newRGB)) {
                                        setOklch(rgbToOklch(newRGB));
                                        setHSL(rgbToHSL(newRGB));
                                        setHEX(rgbToHex(newRGB));
                                        clearErrors();
                                    } else {
                                        setBlueError(true);
                                    }
                                }}
                            />
                            <div className="text-destructive h-5 text-sm">
                                {blueError ? "Must be between 0 and 255" : null}
                            </div>
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
                                setOklch(hexToOklch(newHex));
                                setRGB(hexToRGB(newHex));
                                setHSL(hexToHSL(newHex));
                                clearErrors();
                            } else {
                                setHexError(true);
                            }
                        }}
                    />
                    <div className="text-destructive h-5 text-sm">
                        {hexError ? "Invalid hex code" : null}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export { ColourConverter };
