import { describe, test, expect } from "vitest";
import {
    HSL,
    RGB,
    HEX,
    validateHSL,
    hslToRGB,
    hslToHex,
    validateHEX,
    hexToRGB,
    hexToHSL,
    validateRGB,
    rgbToHSL,
    rgbToHex,
    validateOklch,
    rgbToOklch,
    oklchToRGB,
    oklchToHSL,
    hslToOklch,
    oklchToHex,
    hexToOklch,
} from "../colours"; // adjust the import path as needed

describe("colours", () => {
    describe(validateOklch.name, () => {
        test("should return true for valid OKLCH values", () => {
            expect(validateOklch({ l: 0, c: 0, h: 0 })).toBe(true);
            expect(validateOklch({ l: 1, c: 0.4, h: 360 })).toBe(true);
            expect(validateOklch({ l: 0.5, c: 0.2, h: 180 })).toBe(true);
        });

        test("should return false for invalid OKLCH values", () => {
            expect(validateOklch({ l: -0.1, c: 0.2, h: 180 })).toBe(false);
            expect(validateOklch({ l: 1.1, c: 0.2, h: 180 })).toBe(false);
            expect(validateOklch({ l: 0.5, c: -0.1, h: 180 })).toBe(false);
            expect(validateOklch({ l: 0.5, c: 0.5, h: 180 })).toBe(false);
            expect(validateOklch({ l: 0.5, c: 0.2, h: -1 })).toBe(false);
            expect(validateOklch({ l: 0.5, c: 0.2, h: 361 })).toBe(false);
        });
    });

    describe(rgbToOklch.name, () => {
        test("should convert black RGB to OKLCH", () => {
            const rgb = { r: 0, g: 0, b: 0 };
            const oklch = rgbToOklch(rgb);
            expect(oklch.l).toBeCloseTo(0);
            expect(oklch.c).toBeCloseTo(0);
        });

        test("should convert white RGB to OKLCH", () => {
            const rgb = { r: 255, g: 255, b: 255 };
            const oklch = rgbToOklch(rgb);
            expect(oklch.l).toBeCloseTo(1);
            expect(oklch.c).toBeCloseTo(0);
        });

        test("should convert red RGB to OKLCH", () => {
            const rgb = { r: 255, g: 0, b: 0 };
            const oklch = rgbToOklch(rgb);
            expect(oklch.l).toBeCloseTo(0.628, 2);
            expect(oklch.c).toBeCloseTo(0.258, 2);
            expect(oklch.h).toBeCloseTo(29.23, 2);
        });
    });

    describe(oklchToRGB.name, () => {
        test("should convert black OKLCH to RGB", () => {
            const oklch = { l: 0, c: 0, h: 0 };
            const rgb = oklchToRGB(oklch);
            expect(rgb).toEqual({ r: 0, g: 0, b: 0 });
        });

        test("should convert white OKLCH to RGB", () => {
            const oklch = { l: 1, c: 0, h: 0 };
            const rgb = oklchToRGB(oklch);
            expect(rgb).toEqual({ r: 255, g: 255, b: 255 });
        });

        test("should convert red OKLCH to RGB", () => {
            const oklch = { l: 0.628, c: 0.258, h: 29.23 };
            const rgb = oklchToRGB(oklch);
            expect(rgb.r).toBeCloseTo(255, 0);
            expect(rgb.g).toBeCloseTo(0, 0);
            expect(rgb.b).toBeCloseTo(0, 0);
        });
    });


    describe(validateHSL.name, () => {
        test("should return true for valid HSL values", () => {
            expect(validateHSL({ h: 0, s: 0, l: 0 })).toBe(true);
            expect(validateHSL({ h: 360, s: 100, l: 100 })).toBe(true);
            expect(validateHSL({ h: 180, s: 50, l: 50 })).toBe(true);
        });

        test("should return false for invalid HSL values", () => {
            expect(validateHSL({ h: -1, s: 50, l: 50 })).toBe(false);
            expect(validateHSL({ h: 361, s: 50, l: 50 })).toBe(false);
            expect(validateHSL({ h: 180, s: -1, l: 50 })).toBe(false);
            expect(validateHSL({ h: 180, s: 101, l: 50 })).toBe(false);
            expect(validateHSL({ h: 180, s: 50, l: -1 })).toBe(false);
            expect(validateHSL({ h: 180, s: 50, l: 101 })).toBe(false);
        });
    });

    describe(validateHEX.name, () => {
        test("should return true for valid HEX values", () => {
            expect(validateHEX("#000000")).toBe(true);
            expect(validateHEX("#FFFFFF")).toBe(true);
            expect(validateHEX("#ff0000")).toBe(true);
            expect(validateHEX("#00ff00")).toBe(true);
            expect(validateHEX("#0000ff")).toBe(true);
            expect(validateHEX("000000")).toBe(true);
            expect(validateHEX("FFFFFF")).toBe(true);
            expect(validateHEX("#FFF")).toBe(true);
            expect(validateHEX("FFF")).toBe(true);
        });

        test("should return false for invalid HEX values", () => {
            expect(validateHEX("#GGGGGG")).toBe(false);
            expect(validateHEX("#12345")).toBe(false);
            expect(validateHEX("#1234567")).toBe(false);
            expect(validateHEX("")).toBe(false);
            expect(validateHEX("#")).toBe(false);
        });
    });

    describe(validateRGB.name, () => {
        test("should return true for valid RGB values", () => {
            expect(validateRGB({ r: 0, g: 0, b: 0 })).toBe(true);
            expect(validateRGB({ r: 255, g: 255, b: 255 })).toBe(true);
            expect(validateRGB({ r: 128, g: 128, b: 128 })).toBe(true);
        });

        test("should return false for invalid RGB values", () => {
            expect(validateRGB({ r: -1, g: 0, b: 0 })).toBe(false);
            expect(validateRGB({ r: 256, g: 0, b: 0 })).toBe(false);
            expect(validateRGB({ r: 0, g: -1, b: 0 })).toBe(false);
            expect(validateRGB({ r: 0, g: 256, b: 0 })).toBe(false);
            expect(validateRGB({ r: 0, g: 0, b: -1 })).toBe(false);
            expect(validateRGB({ r: 0, g: 0, b: 256 })).toBe(false);
        });
    });
    describe(oklchToHSL.name, () => {
        test("should convert red OKLCH to HSL", () => {
            const oklch = { l: 0.628, c: 0.258, h: 29.23 };
            const hsl = oklchToHSL(oklch);
            expect(hsl.h).toBeCloseTo(0, 0);
            expect(hsl.s).toBeCloseTo(100, 0);
            expect(hsl.l).toBeCloseTo(50, 0);
        });
    });

    describe(hslToOklch.name, () => {
        test("should convert red HSL to OKLCH", () => {
            const hsl = { h: 0, s: 100, l: 50 };
            const oklch = hslToOklch(hsl);
            expect(oklch.l).toBeCloseTo(0.628, 2);
            expect(oklch.c).toBeCloseTo(0.258, 2);
            expect(oklch.h).toBeCloseTo(29.23, 2);
        });
    });

    describe(oklchToHex.name, () => {
        test("should convert red OKLCH to HEX", () => {
            const oklch = { l: 0.628, c: 0.258, h: 29.23 };
            const hex = oklchToHex(oklch);
            expect(hex).toBe("#ff0000");
        });
    });

    describe(hexToOklch.name, () => {
        test("should convert red HEX to OKLCH", () => {
            const hex = "#ff0000";
            const oklch = hexToOklch(hex);
            expect(oklch.l).toBeCloseTo(0.628, 2);
            expect(oklch.c).toBeCloseTo(0.258, 2);
            expect(oklch.h).toBeCloseTo(29.23, 2);
        });
    });
    describe(hslToRGB.name, () => {
        test("should convert black HSL to RGB", () => {
            const hsl: HSL = { h: 0, s: 0, l: 0 };
            const rgb: RGB = hslToRGB(hsl);
            expect(rgb).toEqual({ r: 0, g: 0, b: 0 });
        });
        test("should convert white HSL to RGB", () => {
            const hsl: HSL = { h: 0, s: 0, l: 100 };
            const rgb: RGB = hslToRGB(hsl);
            expect(rgb).toEqual({ r: 255, g: 255, b: 255 });
        });
        test("should convert red HSL to RGB", () => {
            const hsl: HSL = { h: 0, s: 100, l: 50 };
            const rgb: RGB = hslToRGB(hsl);
            expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
        });
        test("should convert green HSL to RGB", () => {
            const hsl: HSL = { h: 120, s: 100, l: 50 };
            const rgb: RGB = hslToRGB(hsl);
            expect(rgb).toEqual({ r: 0, g: 255, b: 0 });
        });
        test("should convert blue HSL to RGB", () => {
            const hsl: HSL = { h: 240, s: 100, l: 50 };
            const rgb: RGB = hslToRGB(hsl);
            expect(rgb).toEqual({ r: 0, g: 0, b: 255 });
        });
        test("should handle saturation of 0", () => {
            const hsl: HSL = { h: 180, s: 0, l: 50 };
            const rgb: RGB = hslToRGB(hsl);
            expect(rgb).toEqual({ r: 128, g: 128, b: 128 });
        });
    });
    describe(hslToHex.name, () => {
        test("should convert black HSL to HEX", () => {
            const hsl: HSL = { h: 0, s: 0, l: 0 };
            const hex: HEX = hslToHex(hsl);
            expect(hex).toBe("#000000");
        });
        test("should convert white HSL to HEX", () => {
            const hsl: HSL = { h: 0, s: 0, l: 100 };
            const hex: HEX = hslToHex(hsl);
            expect(hex).toBe("#ffffff");
        });
        test("should convert red HSL to HEX", () => {
            const hsl: HSL = { h: 0, s: 100, l: 50 };
            const hex: HEX = hslToHex(hsl);
            expect(hex).toBe("#ff0000");
        });
    });
    describe(hexToRGB.name, () => {
        test("should convert black HEX to RGB", () => {
            const hex: HEX = "#000000";
            const rgb: RGB = hexToRGB(hex);
            expect(rgb).toEqual({ r: 0, g: 0, b: 0 });
        });
        test("should convert white HEX to RGB", () => {
            const hex: HEX = "#FFFFFF";
            const rgb: RGB = hexToRGB(hex);
            expect(rgb).toEqual({ r: 255, g: 255, b: 255 });
        });
        test("should convert red HEX to RGB", () => {
            const hex: HEX = "#FF0000";
            const rgb: RGB = hexToRGB(hex);
            expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
        });
        test("should handle HEX without # prefix", () => {
            const hex: HEX = "00FF00";
            const rgb: RGB = hexToRGB(hex);
            expect(rgb).toEqual({ r: 0, g: 255, b: 0 });
        });
        test("should return black for invalid HEX", () => {
            const hex: HEX = "invalid";
            const rgb: RGB = hexToRGB(hex);
            expect(rgb).toEqual({ r: 0, g: 0, b: 0 });
        });
    });
    describe(hexToHSL, () => {
        test("should convert black HEX to HSL", () => {
            const hex: HEX = "#000000";
            const hsl: HSL = hexToHSL(hex);
            expect(hsl).toEqual({ h: 0, s: 0, l: 0 });
        });
        test("should convert white HEX to HSL", () => {
            const hex: HEX = "#FFFFFF";
            const hsl: HSL = hexToHSL(hex);
            expect(hsl).toEqual({ h: 0, s: 0, l: 100 });
        });
        test("should convert red HEX to HSL", () => {
            const hex: HEX = "#FF0000";
            const hsl: HSL = hexToHSL(hex);
            expect(hsl).toEqual({ h: 0, s: 100, l: 50 });
        });
    });
    describe(rgbToHSL.name, () => {
        test("should convert black RGB to HSL", () => {
            const rgb: RGB = { r: 0, g: 0, b: 0 };
            const hsl: HSL = rgbToHSL(rgb);
            expect(hsl).toEqual({ h: 0, s: 0, l: 0 });
        });
        test("should convert white RGB to HSL", () => {
            const rgb: RGB = { r: 255, g: 255, b: 255 };
            const hsl: HSL = rgbToHSL(rgb);
            expect(hsl).toEqual({ h: 0, s: 0, l: 100 });
        });
        test("should convert red RGB to HSL", () => {
            const rgb: RGB = { r: 255, g: 0, b: 0 };
            const hsl: HSL = rgbToHSL(rgb);
            expect(hsl).toEqual({ h: 0, s: 100, l: 50 });
        });
        test("should convert green RGB to HSL", () => {
            const rgb: RGB = { r: 0, g: 255, b: 0 };
            const hsl: HSL = rgbToHSL(rgb);
            expect(hsl).toEqual({ h: 120, s: 100, l: 50 });
        });
        test("should convert blue RGB to HSL", () => {
            const rgb: RGB = { r: 0, g: 0, b: 255 };
            const hsl: HSL = rgbToHSL(rgb);
            expect(hsl).toEqual({ h: 240, s: 100, l: 50 });
        });
    });
    describe(rgbToHex.name, () => {
        test("should convert black RGB to HEX", () => {
            const rgb: RGB = { r: 0, g: 0, b: 0 };
            const hex: HEX = rgbToHex(rgb);
            expect(hex).toBe("#000000");
        });
        test("should convert white RGB to HEX", () => {
            const rgb: RGB = { r: 255, g: 255, b: 255 };
            const hex: HEX = rgbToHex(rgb);
            expect(hex).toBe("#ffffff");
        });
        test("should convert red RGB to HEX", () => {
            const rgb: RGB = { r: 255, g: 0, b: 0 };
            const hex: HEX = rgbToHex(rgb);
            expect(hex).toBe("#ff0000");
        });
        test("should pad with zeros for small values", () => {
            const rgb: RGB = { r: 0, g: 10, b: 5 };
            const hex: HEX = rgbToHex(rgb);
            expect(hex).toBe("#000a05");
        });
    });
});
describe("Round-trip Conversions", () => {
    test("OKLCH → RGB → OKLCH should approximately preserve values", () => {
        const original = { l: 0.7, c: 0.1, h: 150 };
        const rgb = oklchToRGB(original);
        const result = rgbToOklch(rgb);
        expect(Math.abs(result.l - original.l)).toBeLessThan(0.01);
        expect(Math.abs(result.c - original.c)).toBeLessThan(0.01);
        expect(Math.abs(result.h - original.h)).toBeLessThan(0.1);
    });
    test("HSL → RGB → HSL should approximately preserve values", () => {
        const original: HSL = { h: 210, s: 75, l: 60 };
        const rgb: RGB = hslToRGB(original);
        const result: HSL = rgbToHSL(rgb);
        expect(result.h).toBeCloseTo(original.h, 0);
        expect(result.s).toBeCloseTo(original.s, 0);
        expect(result.l).toBeCloseTo(original.l, 0);
    });
    test("RGB → HSL → RGB should preserve values", () => {
        const original: RGB = { r: 100, g: 150, b: 200 };
        const hsl: HSL = rgbToHSL(original);
        const result: RGB = hslToRGB(hsl);
        expect(result.r).toBeCloseTo(original.r, 0);
        expect(result.g).toBeCloseTo(original.g, 0);
        expect(result.b).toBeCloseTo(original.b, 0);
    });
    test("HEX → RGB → HEX should preserve values", () => {
        const original: HEX = "#1a2b3c";
        const rgb: RGB = hexToRGB(original);
        const result: HEX = rgbToHex(rgb);
        expect(result.toLowerCase()).toBe(original.toLowerCase());
    });
});
