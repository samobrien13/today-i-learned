import { describe, expect, it } from "vitest";
import {
    calculateAnnualChildcareBenefit,
    calculateChildcareSubsidy,
} from "../lib/childcare-subsidy";

describe("childcare-subsidy", () => {
    describe(calculateChildcareSubsidy.name, () => {
        describe("one child", () => {
            it("returns 0 when income is NaN", () => {
                expect(calculateChildcareSubsidy(NaN, "one")).toBe(0);
            });

            it("returns the base 90% for incomes at or below the threshold", () => {
                expect(calculateChildcareSubsidy(0, "one")).toBe(90);
                expect(calculateChildcareSubsidy(50000, "one")).toBe(90);
                expect(calculateChildcareSubsidy(88520, "one")).toBe(90);
            });

            it("stays at 90% for income just over the threshold", () => {
                expect(calculateChildcareSubsidy(88521, "one")).toBe(90);
                expect(calculateChildcareSubsidy(93000, "one")).toBe(90);
            });

            it("decreases by 1% for each full $5000 over the threshold", () => {
                expect(calculateChildcareSubsidy(93520, "one")).toBe(89);
                expect(calculateChildcareSubsidy(98520, "one")).toBe(88);
                expect(calculateChildcareSubsidy(138520, "one")).toBe(80);
            });

            it("floors to 0% for very high incomes", () => {
                expect(calculateChildcareSubsidy(1000000, "one")).toBe(0);
            });
        });

        describe("more than one child", () => {
            it("returns the base 95% for incomes at or below the threshold", () => {
                expect(calculateChildcareSubsidy(0, "more")).toBe(95);
                expect(calculateChildcareSubsidy(100000, "more")).toBe(95);
                expect(calculateChildcareSubsidy(141321, "more")).toBe(95);
            });

            it("stays at 95% for income just over the threshold", () => {
                expect(calculateChildcareSubsidy(141322, "more")).toBe(95);
                expect(calculateChildcareSubsidy(144000, "more")).toBe(95);
            });

            it("decreases by 1% for each full $3000 over the threshold", () => {
                expect(calculateChildcareSubsidy(144321, "more")).toBe(94);
                expect(calculateChildcareSubsidy(147321, "more")).toBe(93);
                expect(calculateChildcareSubsidy(171321, "more")).toBe(85);
            });

            it("floors to 0% for very high incomes", () => {
                expect(calculateChildcareSubsidy(1000000, "more")).toBe(0);
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
