export function calculatePaymentSet(
    principal: number,
    interestRate: number,
    payment: number,
    offset: number,
    acc: [number, number][] = [],
): [number, number][] {
    if (
        isNaN(interestRate) ||
        isNaN(principal) ||
        isNaN(payment) ||
        isNaN(offset)
    ) {
        return acc;
    }

    if (principal < 0) {
        return [...acc, [principal, 0]];
    }

    const principalWithOffset = principal - offset;

    const interest = (principalWithOffset * interestRate) / 100 / 12;

    if (interest > payment) {
        return acc;
    }

    const newAmount = principal - payment + (interest > 0 ? interest : 0);

    return calculatePaymentSet(newAmount, interestRate, payment, offset, [
        ...acc,
        [principal, interest],
    ]);
}

export function getTableData(paymentSets: [number, number][][]) {
    return paymentSets.map((paymentSet) => ({
        yearsToZero: Math.floor(paymentSet.length / 12),
        monthsToZero: paymentSet.length % 12,
        interestPaid: paymentSet.reduce(
            (acc, [, interest]) => acc + interest,
            0,
        ),
    }));
}
