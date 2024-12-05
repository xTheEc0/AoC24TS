// Advent of Code - Day 5 - Part One

export function parseInput(input: string): { rules: Map<number, number[]>; updates: number[][] } {
    const rules: Map<number, number[]> = new Map();
    const updates: number[][] = [];

    const [rulesInput, updatesInput] = input.replaceAll('\r', '').trim().split('\n\n');

    for (const rule of rulesInput.split('\n')) {
        const [x, y] = rule.split('|').map(Number);
        if (!rules.has(x)) {
            rules.set(x, []);
        }
        rules.get(x)?.push(y);
    }

    for (const updateLine of updatesInput.split('\n')) {
        const update = updateLine.split(',').map(Number);
        updates.push(update);
    }

    return { rules, updates };
}

export function part1(input: string): number {
    let sum = 0;

    const { rules, updates } = parseInput(input);

    for (const update of updates) {
        if (isUpdateValid(update, rules)) {
            sum += getMiddlePageNumber(update);
        }
    }

    return sum;
}

export function isUpdateValid(update: number[], rules: Map<number, number[]>): boolean {
    for (let i = 0; i < update.length - 1; i++) {
        for (let j = i + 1; j < update.length; j++) {
            const dependentPages = rules.get(update[j]) || [];
            if (dependentPages.includes(update[i])) {
                return false;
            }
        }
    }
    return true;
}

export function getMiddlePageNumber(update: number[]): number {
    return update[Math.floor(update.length / 2)];
}
