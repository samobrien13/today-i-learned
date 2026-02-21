import { describe, test, expect } from "vitest";
import {
    validateHSL,
    validateHEX,
    validateRGB,
    validateOklch,
} from "../colours"; // adjust the import path as needed

describe("colours", () => {
    describe(validateOklch.name, () => {
        test("should return true for valid OKLCH values", () => {
            expect(validateOklch({ mode: "oklch", l: 0, c: 0, h: 0 })).toBe(
                true,
            );
            expect(validateOklch({ mode: "oklch", l: 1, c: 0.4, h: 360 })).toBe(
                true,
            );
            expect(
                validateOklch({ mode: "oklch", l: 0.5, c: 0.2, h: 180 }),
            ).toBe(true);
        });

        test("should return false for invalid OKLCH values", () => {
            expect(
                validateOklch({ mode: "oklch", l: -0.1, c: 0.2, h: 180 }),
            ).toBe(false);
            expect(
                validateOklch({ mode: "oklch", l: 1.1, c: 0.2, h: 180 }),
            ).toBe(false);
            expect(
                validateOklch({ mode: "oklch", l: 0.5, c: -0.1, h: 180 }),
            ).toBe(false);
            expect(
                validateOklch({ mode: "oklch", l: 0.5, c: 0.5, h: 180 }),
            ).toBe(false);
            expect(
                validateOklch({ mode: "oklch", l: 0.5, c: 0.2, h: -1 }),
            ).toBe(false);
            expect(
                validateOklch({ mode: "oklch", l: 0.5, c: 0.2, h: 361 }),
            ).toBe(false);
        });
    });

    describe(validateHSL.name, () => {
        test("should return true for valid HSL values", () => {
            expect(validateHSL({ mode: "hsl", h: 0, s: 0, l: 0 })).toBe(true);
            expect(validateHSL({ mode: "hsl", h: 360, s: 100, l: 100 })).toBe(
                true,
            );
            expect(validateHSL({ mode: "hsl", h: 180, s: 50, l: 50 })).toBe(
                true,
            );
        });

        test("should return false for invalid HSL values", () => {
            expect(validateHSL({ mode: "hsl", h: -1, s: 50, l: 50 })).toBe(
                false,
            );
            expect(validateHSL({ mode: "hsl", h: 361, s: 50, l: 50 })).toBe(
                false,
            );
            expect(validateHSL({ mode: "hsl", h: 180, s: -1, l: 50 })).toBe(
                false,
            );
            expect(validateHSL({ mode: "hsl", h: 180, s: 101, l: 50 })).toBe(
                false,
            );
            expect(validateHSL({ mode: "hsl", h: 180, s: 50, l: -1 })).toBe(
                false,
            );
            expect(validateHSL({ mode: "hsl", h: 180, s: 50, l: 101 })).toBe(
                false,
            );
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
            expect(validateRGB({ mode: "rgb", r: 0, g: 0, b: 0 })).toBe(true);
            expect(validateRGB({ mode: "rgb", r: 255, g: 255, b: 255 })).toBe(
                true,
            );
            expect(validateRGB({ mode: "rgb", r: 128, g: 128, b: 128 })).toBe(
                true,
            );
        });

        test("should return false for invalid RGB values", () => {
            expect(validateRGB({ mode: "rgb", r: -1, g: 0, b: 0 })).toBe(false);
            expect(validateRGB({ mode: "rgb", r: 256, g: 0, b: 0 })).toBe(
                false,
            );
            expect(validateRGB({ mode: "rgb", r: 0, g: -1, b: 0 })).toBe(false);
            expect(validateRGB({ mode: "rgb", r: 0, g: 256, b: 0 })).toBe(
                false,
            );
            expect(validateRGB({ mode: "rgb", r: 0, g: 0, b: -1 })).toBe(false);
            expect(validateRGB({ mode: "rgb", r: 0, g: 0, b: 256 })).toBe(
                false,
            );
        });
    });
});
