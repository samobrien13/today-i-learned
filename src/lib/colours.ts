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

export function hslToRGB(hsl: HSL): RGB {
    let r: number, g: number, b: number;
    const { h } = hsl;
    let { s, l } = hsl;
    s /= 100;
    l /= 100;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number): number => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
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
    return rgbToHex(hslToRGB(hsl));
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
    return rgbToHSL(hexToRGB(hex));
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
    const l: number = (max + min) / 2;
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
    return { h, s, l };
}

export function rgbToHex(rgb: RGB): HEX {
    const { r, g, b } = rgb;
    return `#${((r << 16) + (g << 8) + b).toString(16).padStart(6, "0")}`;
}
