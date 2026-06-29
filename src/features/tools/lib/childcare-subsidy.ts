export type ChildcareSubsidyChildren = "one" | "more";

const ONE_CHILD = {
    baseIncome: 88520,
    basePercentage: 90,
    decrementStep: 5000,
} as const;

const MORE_THAN_ONE_CHILD = {
    baseIncome: 141321,
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

export function calculateChildcareSubsidy(
    income: number,
    children: ChildcareSubsidyChildren,
): number {
    if (isNaN(income)) {
        return 0;
    }

    if (children === "one") {
        return calculateSubsidy(
            income,
            ONE_CHILD.baseIncome,
            ONE_CHILD.basePercentage,
            ONE_CHILD.decrementStep,
        );
    }

    return calculateSubsidy(
        income,
        MORE_THAN_ONE_CHILD.baseIncome,
        MORE_THAN_ONE_CHILD.basePercentage,
        MORE_THAN_ONE_CHILD.decrementStep,
    );
}
