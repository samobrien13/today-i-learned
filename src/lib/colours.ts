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

export type HSL = {
    h: number;
    s: number;
    l: number;
};

export type RGB = {
    r: number;
    g: number;
    b: number;
};

export type HEX = string;

export function validateHSL(hsl: HSL): boolean {
    return (
        hsl.h >= 0 &&
        hsl.h <= 360 &&
        hsl.s >= 0 &&
        hsl.s <= 100 &&
        hsl.l >= 0 &&
        hsl.l <= 100
    );
}

function hue2rgb(p: number, q: number, t: number): number {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

export function hslToRGB(hsl: HSL): RGB {
    let r: number, g: number, b: number;
    const h = hsl.h / 360; // Normalize h to 0-1 range
    let { s, l } = hsl;
    s /= 100;
    l /= 100;
    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}

export function hslToHex(hsl: HSL): HEX {
    // Normalize HSL values
    const h = hsl.h;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    // Handle grayscale case
    if (s === 0) {
        // Convert lightness to 0-255 range and format as hex
        const val = Math.round(l * 255);
        const hexVal = val.toString(16).padStart(2, "0");
        return `#${hexVal}${hexVal}${hexVal}`;
    }

    // Calculate RGB values
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const normalizedH = h / 360;

    const r = Math.round(hue2rgb(p, q, normalizedH + 1 / 3) * 255);
    const g = Math.round(hue2rgb(p, q, normalizedH) * 255);
    const b = Math.round(hue2rgb(p, q, normalizedH - 1 / 3) * 255);

    // Convert RGB to hex
    const toHex = (c: number): string => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function validateHEX(hex: HEX): boolean {
    return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

export function hexToRGB(hex: string): RGB {
    const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!match) return { r: 0, g: 0, b: 0 };
    const [, r, g, b] = match;
    return {
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16),
    };
}

export function hexToHSL(hex: HEX): HSL {
    // Remove the # if present
    hex = hex.replace(/^#/, "");

    // Parse the hex string to RGB values
    let r, g, b;

    // Handle both 3-digit and 6-digit formats
    if (hex.length === 3) {
        r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
        g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
        b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else {
        // Invalid hex, return black
        return { h: 0, s: 0, l: 0 };
    }

    // Normalize RGB values to 0-1 range
    r /= 255;
    g /= 255;
    b /= 255;

    // Find the min and max values to calculate lightness
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    // Calculate lightness
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    // Only calculate hue and saturation if not grayscale
    if (max !== min) {
        // Calculate saturation
        s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);

        // Calculate hue
        if (max === r) {
            h = (g - b) / (max - min) + (g < b ? 6 : 0);
        } else if (max === g) {
            h = (b - r) / (max - min) + 2;
        } else {
            // max === b
            h = (r - g) / (max - min) + 4;
        }

        // Convert hue to degrees
        h = h * 60;
    }

    // Round and normalize values
    h = Math.round(h * 100) / 100;
    s = Math.round(s * 100 * 100) / 100;
    l = Math.round(l * 100 * 100) / 100;

    return { h, s, l };
}

export function validateRGB(rgb: RGB): boolean {
    return (
        rgb.r >= 0 &&
        rgb.r <= 255 &&
        rgb.g >= 0 &&
        rgb.g <= 255 &&
        rgb.b >= 0 &&
        rgb.b <= 255
    );
}

export function rgbToHSL(rgb: RGB): HSL {
    let { r, g, b } = rgb;
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number;
    let l: number = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
            default:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    h = Math.round(h * 360 * 100) / 100;
    s = Math.round(s * 100 * 100) / 100;
    l = Math.round(l * 100 * 100) / 100;
    return { h, s, l };
}

export function rgbToHex(rgb: RGB): HEX {
    const { r, g, b } = rgb;
    return `#${((r << 16) + (g << 8) + b).toString(16).padStart(6, "0")}`;
}
