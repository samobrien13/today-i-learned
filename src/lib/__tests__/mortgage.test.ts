import { describe, expect, it } from "vitest";
import { calculatePaymentSet, getTableData } from "../mortgage";

describe("mortgage", () => {
    describe(calculatePaymentSet.name, () => {
        it("should return an empty array if any input is NaN", () => {
            expect(calculatePaymentSet(NaN, 5, 100, 0)).toEqual([]);
            expect(calculatePaymentSet(1000, NaN, 100, 0)).toEqual([]);
            expect(calculatePaymentSet(1000, 5, NaN, 0)).toEqual([]);
            expect(calculatePaymentSet(1000, 5, 100, NaN)).toEqual([]);
        });

        it("should handle a zero interest rate correctly", () => {
            const result = calculatePaymentSet(1000, 0, 100, 0);
            expect(result.length).toBe(12);
            expect(result[0][1]).toBe(0); // Interest should be zero
        });

        it("should terminate if payment is less than or equal to interest", () => {
            const result = calculatePaymentSet(1000, 10, 5, 0);
            expect(result).toEqual([]);
        });

        it("should calculate correctly with a simple scenario", () => {
            const result = calculatePaymentSet(1000, 5, 100, 0);
            expect(result.length).toBeGreaterThan(0);
            expect(result[0][0]).toBeCloseTo(1000); // Initial principal
            expect(result[0][1]).toBeCloseTo(4.17, 2); // First month's interest
            expect(result[1][0]).toBeCloseTo(904.17, 2); // Principal after first payment
        });

        it("should handle offset correctly", () => {
            const result = calculatePaymentSet(1000, 5, 100, 100);
            expect(result.length).toBeGreaterThan(0);
            expect(result[0][0]).toBeCloseTo(1000); // initial principal
            expect(result[0][1]).toBeCloseTo(3.75, 2); // First month's interest
        });

        it("should handle offset greater than principal", () => {
            const result = calculatePaymentSet(1000, 5, 100, 1100);
            expect(result.length).toBeGreaterThan(0);
            expect(result[0][0]).toBeCloseTo(1000); // initial principal
        });

        it("should handle a large principal and small payment", () => {
            const result = calculatePaymentSet(100000, 5, 1000, 0);
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe(getTableData.name, () => {
        it("should return an empty array for an empty input", () => {
            expect(getTableData([])).toEqual([]);
        });

        it("should calculate correctly for a single payment set", () => {
            const paymentSet = calculatePaymentSet(500000, 5, 4000, 0);
            const result = getTableData([paymentSet]);
            expect(result.length).toBe(1);
            expect(result[0].yearsToZero).toBe(14);
            expect(result[0].monthsToZero).toBe(10);
            expect(result[0].interestPaid).toBeCloseTo(207749.406);
        });

        it("should calculate correctly for multiple payment sets", () => {
            const paymentSets: [number, number][][] = [
                calculatePaymentSet(10000, 5, 100, 0),
                calculatePaymentSet(10000, 5, 100, 100),
            ];
            const result = getTableData(paymentSets);
            expect(result.length).toBe(2);
            expect(result[0].yearsToZero).toBe(10);
            expect(result[0].monthsToZero).toBe(11);
            expect(result[0].interestPaid).toBeCloseTo(2962.8957);
            expect(result[1].yearsToZero).toBe(10);
            expect(result[1].monthsToZero).toBe(10);
            expect(result[1].interestPaid).toBeCloseTo(2891.653);
        });

        it("should handle years to zero correctly", () => {
            const paymentSet: [number, number][] = Array(25).fill([100, 1]); // Creates a set of 25 months
            const result = getTableData([paymentSet]);
            expect(result[0].yearsToZero).toBe(2);
            expect(result[0].monthsToZero).toBe(1);
        });
    });
});
