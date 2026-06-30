import { describe, test, expect } from "vitest";
import { calculateTax } from "../tax";

describe("tax", () => {
    describe(calculateTax.name, () => {
        describe("nil bracket ($0 – $18,200)", () => {
            test("returns 0 for zero gross", () => {
                expect(calculateTax(0)).toBe(0);
            });

            test("returns 0 for negative gross", () => {
                expect(calculateTax(-100)).toBe(0);
                expect(calculateTax(-1)).toBe(0);
            });

            test("returns 0 at the lower boundary ($0)", () => {
                expect(calculateTax(0)).toBe(0);
            });

            test("returns 0 at the upper boundary ($18,200)", () => {
                expect(calculateTax(18_200)).toBe(0);
            });

            test("returns 0 mid-bracket", () => {
                expect(calculateTax(10_000)).toBe(0);
                expect(calculateTax(5_432.1)).toBe(0);
            });
        });

        describe("16c bracket ($18,201 – $45,000)", () => {
            test("returns 16c at the lower boundary ($18,201)", () => {
                expect(calculateTax(18_201)).toBe(0.16);
            });

            test("returns 16c per dollar over $18,200", () => {
                expect(calculateTax(19_000)).toBe(128);
                expect(calculateTax(20_000)).toBe(288);
                expect(calculateTax(30_000)).toBe(1_888);
            });

            test("returns $4,288 at the upper boundary ($45,000)", () => {
                expect(calculateTax(45_000)).toBe(4_288);
            });

            test("rounds fractional cents to two decimal places", () => {
                expect(calculateTax(18_201.5)).toBe(0.24);
                expect(calculateTax(18_205)).toBe(0.8);
            });
        });

        describe("30c bracket ($45,001 – $135,000)", () => {
            test("returns $4,288.30 at the lower boundary ($45,001)", () => {
                expect(calculateTax(45_001)).toBe(4_288.3);
            });

            test("returns $4,288 + 30c per dollar over $45,000", () => {
                expect(calculateTax(50_000)).toBe(5_788);
                expect(calculateTax(75_000)).toBe(13_288);
                expect(calculateTax(100_000)).toBe(20_788);
            });

            test("returns $31,288 at the upper boundary ($135,000)", () => {
                expect(calculateTax(135_000)).toBe(31_288);
            });
        });

        describe("37c bracket ($135,001 – $190,000)", () => {
            test("returns $31,288.37 at the lower boundary ($135,001)", () => {
                expect(calculateTax(135_001)).toBe(31_288.37);
            });

            test("returns $31,288 + 37c per dollar over $135,000", () => {
                expect(calculateTax(150_000)).toBe(36_838);
                expect(calculateTax(175_000)).toBe(46_088);
            });

            test("returns $51,638 at the upper boundary ($190,000)", () => {
                expect(calculateTax(190_000)).toBe(51_638);
            });
        });

        describe("45c bracket ($190,001 and over)", () => {
            test("returns $51,638.45 at the lower boundary ($190,001)", () => {
                expect(calculateTax(190_001)).toBe(51_638.45);
            });

            test("returns $51,638 + 45c per dollar over $190,000", () => {
                expect(calculateTax(200_000)).toBe(56_138);
                expect(calculateTax(250_000)).toBe(78_638);
                expect(calculateTax(500_000)).toBe(191_138);
            });

            test("handles very large gross amounts", () => {
                expect(calculateTax(1_000_000)).toBe(416_138);
                expect(calculateTax(10_000_000)).toBe(4_466_138);
            });
        });
    });
});
