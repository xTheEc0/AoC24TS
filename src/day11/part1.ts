// Advent of Code - Day 11 - Part One

export function part1(input: string, t = 25): number {
    const initialStones = parseInput(input);
    const memo = new Map<string, bigint>();
    const counts = new Map<bigint, bigint>();
    for (const n of initialStones) {
        counts.set(n, (counts.get(n) || 0n) + 1n);
    }
    let total = 0n;
    for (const [n, count] of counts.entries()) {
        const stonesFromN = totalStones(n, t, memo);
        total += stonesFromN * count;
    }
    return Number(total);
}

function parseInput(input: string): bigint[] {
    return input
        .trim()
        .split(/\s+/)
        .map((s) => BigInt(s));
}

function stonesAfterBlink(n: bigint): bigint[] {
    // Rule 1: Zero becomes one
    if (n === 0n) {
        return [1n];
    }
    const s = n.toString();

    if (s.length % 2 === 0) {
        // Rule 2: Even number of digits
        const L = s.length;
        let leftS = s.slice(0, L / 2);
        let rightS = s.slice(L / 2);

        leftS = leftS.replace(/^0+/, '') || '0';
        rightS = rightS.replace(/^0+/, '') || '0';

        const leftN = BigInt(leftS);
        const rightN = BigInt(rightS);
        return [leftN, rightN];
    }
    // Rule 3: Multiply by 2024
    return [n * 2024n];
}

function totalStones(n: bigint, t: number, memo: Map<string, bigint>): bigint {
    if (t === 0) {
        return 1n;
    }
    const key = `${n},${t}`;
    if (memo.has(key)) {
        const value = memo.get(key);
        if (value !== undefined) {
            return value;
        }
    }
    const nextStones = stonesAfterBlink(n);
    let total = 0n;
    for (const m of nextStones) {
        total += totalStones(m, t - 1, memo);
    }
    memo.set(key, total);
    return total;
}
