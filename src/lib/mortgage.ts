function calculateMortgage(
    interestRate: number,
    principal: number,
    payment: number,
    acc: number[] = [],
) {
    if (isNaN(interestRate) || isNaN(principal) || isNaN(payment)) {
        return acc;
    }

    const interest = (principal * interestRate) / 100 / 12;
    console.log(interest);

    if (interest > payment) {
        return acc;
    }

    const newAmount = principal - payment + interest;

    console.log(newAmount);

    if (newAmount <= 0) {
        return acc;
    }

    return calculateMortgage(interestRate, newAmount, payment, [
        ...acc,
        principal,
    ]);
}

export default calculateMortgage;
