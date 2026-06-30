export type ChildcareSubsidyChildren = "one" | "more";

const BASE_RATE = {
    baseIncome: 88520,
    basePercentage: 90,
    decrementStep: 5000,
} as const;

const HIGHER_RATE = {
    baseIncome: 141321,
    maxIncome: 367563,
    basePercentage: 95,
    decrementStep: 3000,
} as const;

function calculateSubsidy(
    income: number,
    baseIncome: number,
    basePercentage: number,
    decrementStep: number,
): number {
    if (income <= baseIncome) {
        return basePercentage;
    }

    const increments = Math.floor((income - baseIncome) / decrementStep);

    return Math.max(0, basePercentage - increments);
}

export function calculateChildcareSubsidy(income: number): number {
    if (isNaN(income)) {
        return 0;
    }

    return calculateSubsidy(
        income,
        BASE_RATE.baseIncome,
        BASE_RATE.basePercentage,
        BASE_RATE.decrementStep,
    );
}

export function calculateHigherChildcareSubsidy(
    income: number,
    children: ChildcareSubsidyChildren,
): number {
    if (isNaN(income)) {
        return 0;
    }

    if (children === "one" || income > HIGHER_RATE.maxIncome) {
        return calculateSubsidy(
            income,
            BASE_RATE.baseIncome,
            BASE_RATE.basePercentage,
            BASE_RATE.decrementStep,
        );
    }

    return calculateSubsidy(
        income,
        HIGHER_RATE.baseIncome,
        HIGHER_RATE.basePercentage,
        HIGHER_RATE.decrementStep,
    );
}

export function calculateAnnualChildcareBenefit(
    subsidyPercentage: number,
    daysAttendedPerWeek: number,
    dailyCost: number,
): number {
    if (
        isNaN(subsidyPercentage) ||
        isNaN(daysAttendedPerWeek) ||
        isNaN(dailyCost)
    ) {
        return 0;
    }

    return Math.round(
        (subsidyPercentage * daysAttendedPerWeek * dailyCost * 52) / 100,
    );
}
