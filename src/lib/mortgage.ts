function calculateMortgage(
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

    const principalWithOffset = principal - offset;

    const interest = (principalWithOffset * interestRate) / 100 / 12;

    if (interest <= 0 || interest > payment) {
        return acc;
    }

    const newAmount = principal - payment + interest;

    if (newAmount - offset < 0) {
        return acc;
    }

    return calculateMortgage(newAmount, interestRate, payment, offset, [
        ...acc,
        [principalWithOffset, interest],
    ]);
}

export default calculateMortgage;
