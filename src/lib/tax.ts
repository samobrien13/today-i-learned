type TaxBracket = {
    /** Tax applies when gross is strictly greater than this value. */
    readonly min: number;
    /** Tax applies when gross is less than or equal to this value. */
    readonly max: number;
    /** Marginal rate applied to income within this bracket. */
    readonly rate: number;
    /** Cumulative tax owed at the lower bound of this bracket. */
    readonly base: number;
};

/**
 * Australian resident individual income tax brackets (2025-26 financial year).
 * Source: Australian Taxation Office.
 */
const TAX_BRACKETS: readonly TaxBracket[] = [
    { min: 0, max: 18_200, rate: 0, base: 0 },
    { min: 18_200, max: 45_000, rate: 0.16, base: 0 },
    { min: 45_000, max: 135_000, rate: 0.3, base: 4_288 },
    { min: 135_000, max: 190_000, rate: 0.37, base: 31_288 },
    { min: 190_000, max: Number.POSITIVE_INFINITY, rate: 0.45, base: 51_638 },
];

/**
 * Calculates Australian income tax for a given gross amount based on the
 * 2024-25 resident individual tax table.
 *
 * Negative or zero gross amounts return 0.
 * The result is rounded to two decimal places to avoid floating-point noise.
 */
export const calculateTax = (gross: number): number => {
    if (gross <= 18_200) return 0;

    for (const bracket of TAX_BRACKETS) {
        if (gross > bracket.min && gross <= bracket.max) {
            return roundCents(
                bracket.base + bracket.rate * (gross - bracket.min),
            );
        }
    }

    return 0;
};

const roundCents = (value: number): number => Math.round(value * 100) / 100;

export const calculateEffectiveTaxRate = (gross: number): number => {
    const tax = calculateTax(gross);
    return Math.round((tax * 100) / gross);
};
