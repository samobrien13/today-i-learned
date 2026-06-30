import { describe, expect, it } from "vitest";
import {
    calculateAnnualChildcareBenefit,
    calculateChildcareSubsidy,
    calculateHigherChildcareSubsidy,
} from "../lib/childcare-subsidy";

describe("childcare-subsidy", () => {
    describe(calculateChildcareSubsidy.name, () => {
        it("returns 0 when income is NaN", () => {
            expect(calculateChildcareSubsidy(NaN)).toBe(0);
        });

        it("returns the base 90% for incomes at or below the threshold", () => {
            expect(calculateChildcareSubsidy(0)).toBe(90);
            expect(calculateChildcareSubsidy(50000)).toBe(90);
            expect(calculateChildcareSubsidy(88520)).toBe(90);
        });

        it("stays at 90% for income just over the threshold", () => {
            expect(calculateChildcareSubsidy(88521)).toBe(90);
            expect(calculateChildcareSubsidy(93000)).toBe(90);
        });

        it("decreases by 1% for each full $5000 over the threshold", () => {
            expect(calculateChildcareSubsidy(93520)).toBe(89);
            expect(calculateChildcareSubsidy(98520)).toBe(88);
            expect(calculateChildcareSubsidy(138520)).toBe(80);
        });

        it("floors to 0% for very high incomes", () => {
            expect(calculateChildcareSubsidy(1000000)).toBe(0);
        });
    });

    describe(calculateHigherChildcareSubsidy.name, () => {
        it("returns 0 when income is NaN", () => {
            expect(calculateHigherChildcareSubsidy(NaN, "one")).toBe(0);
            expect(calculateHigherChildcareSubsidy(NaN, "more")).toBe(0);
        });

        describe("one child", () => {
            it("uses the base rate (90%) regardless of income", () => {
                expect(calculateHigherChildcareSubsidy(0, "one")).toBe(90);
                expect(calculateHigherChildcareSubsidy(88520, "one")).toBe(90);
                expect(calculateHigherChildcareSubsidy(93520, "one")).toBe(89);
                expect(calculateHigherChildcareSubsidy(98520, "one")).toBe(88);
            });

            it("floors to 0% for very high incomes", () => {
                expect(calculateHigherChildcareSubsidy(1000000, "one")).toBe(0);
            });
        });

        describe("more than one child", () => {
            it("returns the base 95% for incomes at or below the threshold", () => {
                expect(calculateHigherChildcareSubsidy(0, "more")).toBe(95);
                expect(calculateHigherChildcareSubsidy(100000, "more")).toBe(
                    95,
                );
                expect(calculateHigherChildcareSubsidy(141321, "more")).toBe(
                    95,
                );
            });

            it("stays at 95% for income just over the threshold", () => {
                expect(calculateHigherChildcareSubsidy(141322, "more")).toBe(
                    95,
                );
                expect(calculateHigherChildcareSubsidy(144000, "more")).toBe(
                    95,
                );
            });

            it("decreases by 1% for each full $3000 over the threshold", () => {
                expect(calculateHigherChildcareSubsidy(144321, "more")).toBe(
                    94,
                );
                expect(calculateHigherChildcareSubsidy(147321, "more")).toBe(
                    93,
                );
                expect(calculateHigherChildcareSubsidy(171321, "more")).toBe(
                    85,
                );
            });

            it("falls back to the base rate above the higher rate maximum income", () => {
                // Above 367,563 the higher rate no longer applies, so the base
                // 90% rate (with $5000 decrement) is used instead.
                // floor((367564 - 88520) / 5000) = 55, so 90 - 55 = 35
                expect(calculateHigherChildcareSubsidy(367564, "more")).toBe(
                    35,
                );
                expect(calculateHigherChildcareSubsidy(1000000, "more")).toBe(
                    0,
                );
            });
        });
    });

    describe(calculateAnnualChildcareBenefit.name, () => {
        it("returns 0 for NaN inputs", () => {
            expect(calculateAnnualChildcareBenefit(NaN, 3, 200)).toBe(0);
            expect(calculateAnnualChildcareBenefit(50, NaN, 200)).toBe(0);
            expect(calculateAnnualChildcareBenefit(50, 3, NaN)).toBe(0);
        });

        it("returns 0 when subsidy percentage is 0", () => {
            expect(calculateAnnualChildcareBenefit(0, 5, 200)).toBe(0);
        });

        it("returns 0 when no days are worked", () => {
            expect(calculateAnnualChildcareBenefit(90, 0, 200)).toBe(0);
        });

        it("calculates the full year benefit at 90% for 1 day at $200/day", () => {
            // 90 * 1 * 200 * 52 / 100 = 9,360
            expect(calculateAnnualChildcareBenefit(90, 1, 200)).toBe(9360);
        });

        it("calculates the full year benefit at 50% for 3 days at $200/day", () => {
            // 50 * 3 * 200 * 52 / 100 = 15,600
            expect(calculateAnnualChildcareBenefit(50, 3, 200)).toBe(15600);
        });

        it("scales linearly with the daily cost", () => {
            const at200 = calculateAnnualChildcareBenefit(80, 5, 200);
            const at150 = calculateAnnualChildcareBenefit(80, 5, 150);
            expect(at150).toBe(Math.round((at200 * 150) / 200));
        });
    });
});
