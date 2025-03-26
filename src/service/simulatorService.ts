interface SimulationResult {
    results: Array<{ month: number; profit: string; balance: string }>;
    finalBalance: string;
    fee: string;
}

export const simulateEarnings = (
    capital: number,
    duration: number,
    type: string
): SimulationResult => {
    let rate = 0;

    switch (duration) {
        case 3:
            rate = 0.01;
            break;
        case 6:
            rate = 0.02;
            break;
        case 9:
            rate = 0.03;
            break;
        case 12:
            rate = 0.04;
            break;
        default:
            throw new Error('Duration not valid');
    }

    const results = [];
    let balance = capital;

    for (let i = 1; i <= duration; i++) {
        const profit = type === 'compound' ? balance * rate : capital * rate;
        balance += profit;
        results.push({
            month: i,
            profit: profit.toFixed(2),
            balance: balance.toFixed(2),
        });
    }

    let feeRate = 0.02;
    if (capital > 1000) feeRate = 0.01;
    if (capital > 10000) feeRate = 0.005;
    if (capital > 50000) feeRate = 0.0025;
    const fee = balance * feeRate;

    return {
        results,
        finalBalance: (balance - fee).toFixed(2),
        fee: fee.toFixed(2),
    };
};
