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

export function setCssVar(name: string, color: HSL) {
    document.documentElement.style.setProperty(
        `--${name}`,
        `${color.h}, ${color.s}%, ${color.l}%`,
    );
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
export type OKLCH = {
    l: number;
    c: number;
    h: number;
};

type XYZ = {
    x: number;
    y: number;
    z: number;
};

type Oklab = {
    l: number;
    a: number;
    b: number;
};

export function oklabToHsl(oklab: Oklab): HSL {
    return rgbToHSL(linearSrgbToRgb(xyzToLinearSrgb(oklabToXyz(oklab))));
}

export function oklchToRGB({ l, c, h }: OKLCH): RGB {
    const { l: lab_l, a, b } = oklchToOklab({ l, c, h });

    const { x, y, z } = oklabToXyz({ l: lab_l, a, b });
    const { r: lr, g: lg, b: lb } = xyzToLinearSrgb({ x, y, z });
    const { r, g, b: rgb_b } = linearSrgbToRgb({ r: lr, g: lg, b: lb });
    const clamp = (val: number) =>
        Math.max(0, Math.min(Math.round(val * 255), 255));

    return { r: clamp(r), g: clamp(g), b: clamp(rgb_b) };
}

function oklchToOklab({ l, c, h }: OKLCH): Oklab {
    // Handle achromatic colors (greys)
    if (c < 0.000001 || isNaN(h)) {
        return { l, a: 0, b: 0 };
    }

    const h_rad = (h * Math.PI) / 180;
    const a = c * Math.cos(h_rad);
    const b = c * Math.sin(h_rad);
    return { l, a, b };
}

function oklabToXyz({ l, a, b }: Oklab): XYZ {
    // Oklab to non-linear LMS
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.291485548 * b;

    // Non-linear LMS to linear LMS
    const l_cubed = l_ * l_ * l_;
    const m_cubed = m_ * m_ * m_;
    const s_cubed = s_ * s_ * s_;

    // Linear LMS to XYZ
    const x =
        1.2270138511 * l_cubed - 0.5577999807 * m_cubed + 0.281256149 * s_cubed;
    const y =
        -0.0405801784 * l_cubed +
        1.1122568696 * m_cubed -
        0.0716766787 * s_cubed;
    const z =
        -0.0763812845 * l_cubed -
        0.4214819784 * m_cubed +
        1.5861632204 * s_cubed;

    return { x, y, z };
}

function xyzToLinearSrgb({ x, y, z }: XYZ) {
    const lr = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
    const lg = -0.969266 * x + 1.8760108 * y + 0.041556 * z;
    const lb = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
    return { r: lr, g: lg, b: lb };
}

/**
 * Step 4: Converts linear sRGB to sRGB (gamma correction).
 */
function linearSrgbToRgb({ r: lr, g: lg, b: lb }: RGB): RGB {
    const nonlinear = (c: number) => {
        // Note: Clipping linear values to 0-1 range before gamma correction
        const v = Math.max(0, Math.min(1, c));
        return v <= 0.0031308
            ? v * 12.92
            : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
    };
    return { r: nonlinear(lr), g: nonlinear(lg), b: nonlinear(lb) };
}

export function rgbToOklch({ r, g, b }: RGB): OKLCH {
    const {
        r: lr,
        g: lg,
        b: lb,
    } = rgbToLinearSrgb({ r: r / 255, g: g / 255, b: b / 255 });
    const { x, y, z } = linearSrgbToXyz({ r: lr, g: lg, b: lb });
    const { l, a, b: oklab_b } = xyzToOklab({ x, y, z });
    return oklabToOklch({ l, a, b: oklab_b });
}

function rgbToLinearSrgb({ r, g, b }: RGB): RGB {
    const linear = (c: number) =>
        c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return {
        r: linear(r),
        g: linear(g),
        b: linear(b),
    };
}

function linearSrgbToXyz({ r, g, b }: RGB): XYZ {
    const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
    const y = r * 0.2126729 + g * 0.7151522 + b * 0.072175;
    const z = r * 0.0193339 + g * 0.119192 + b * 0.9503041;
    return { x, y, z };
}

function xyzToOklab({ x, y, z }: XYZ): Oklab {
    // XYZ to LMS (cone response)
    const l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
    const m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
    const s = 0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z;

    // Apply non-linearity (cube root)
    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);

    // LMS to Oklab
    const oklab_l = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const b = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

    return { l: oklab_l, a, b };
}

function oklabToOklch({ l, a, b }: Oklab): OKLCH {
    // Calculate Chroma (C)
    const c = Math.sqrt(a * a + b * b);

    // Calculate Hue (h)
    const h_rad = Math.atan2(b, a);
    const h_deg = (h_rad * 180) / Math.PI;

    // Normalize hue to be between 0 and 360
    // If c is 0 (or very close), hue is undefined (NaN)
    const h = c < 0.000001 ? NaN : (h_deg + 360) % 360;

    return { l, c, h };
}

export function hslToOklch(hsl: HSL): OKLCH {
    return rgbToOklch(hslToRGB(hsl));
}

export const hexToOklch = (hex: HEX): OKLCH => {
    return rgbToOklch(hexToRGB(hex));
};

export function validateOklch(oklch: OKLCH): boolean {
    return (
        oklch.l >= 0 &&
        oklch.l <= 1 &&
        oklch.c >= 0 &&
        oklch.c <= 0.4 &&
        oklch.h >= 0 &&
        oklch.h <= 360
    );
}

export function oklchToHSL(oklch: OKLCH): HSL {
    return rgbToHSL(oklchToRGB(oklch));
}

export function oklchToHex(oklch: OKLCH): HEX {
    return rgbToHex(oklchToRGB(oklch));
}

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
