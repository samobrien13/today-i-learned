import { formatCss, Hsl, Oklch, Rgb } from "culori";

export const keys = [
    "background",
    "foreground",
    "card",
    "card-foreground",
    "popover",
    "popover-foreground",
    "primary",
    "primary-foreground",
    "secondary",
    "secondary-foreground",
    "muted",
    "muted-foreground",
    "accent",
    "accent-foreground",
    "destructive",
    "destructive-foreground",
    "border",
    "input",
    "ring",
    "chart-1",
    "chart-2",
    "chart-3",
    "chart-4",
    "chart-5",
];

export function cssVar(name: string) {
    if (typeof getComputedStyle === "undefined") {
        return "";
    }
    return getComputedStyle(document.documentElement).getPropertyValue(name);
}

export function setCssVar(name: string, color: Hsl) {
    document.documentElement.style.setProperty(
        `--${name}`,
        formatCss({ mode: "hsl", h: color.h, s: color.s, l: color.l }),
    );
}

export function validateOklch(oklch: Oklch): boolean {
    return (
        oklch.l >= 0 &&
        oklch.l <= 1 &&
        oklch.c >= 0 &&
        oklch.c <= 0.4 &&
        (oklch.h === undefined || (oklch.h >= 0 && oklch.h <= 360))
    );
}

export function validateHSL(hsl: Hsl): boolean {
    return (
        (hsl.h === undefined || (hsl.h >= 0 && hsl.h <= 360)) &&
        hsl.s >= 0 &&
        hsl.s <= 100 &&
        hsl.l >= 0 &&
        hsl.l <= 100
    );
}

export function validateHEX(hex: string): boolean {
    return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

export function validateRGB(rgb: Rgb): boolean {
    return (
        rgb.r >= 0 &&
        rgb.r <= 255 &&
        rgb.g >= 0 &&
        rgb.g <= 255 &&
        rgb.b >= 0 &&
        rgb.b <= 255
    );
}
