// Advent of Code - Day 5 - Part Two
import { parseInput, isUpdateValid, getMiddlePageNumber } from './part1';

export function part2(input: string): number {
    let sum = 0;
    const { rules, updates } = parseInput(input);

    for (const update of updates) {
        if (!isUpdateValid(update, rules)) {
            const sortedUpdate = sortUpdate(update, rules);
            sum += getMiddlePageNumber(sortedUpdate);
        }
    }

    return sum;
}

function sortUpdate(update: number[], rules: Map<number, number[]>): number[] {
    const sorted = [...update];
    let swapped: boolean;
    do {
        swapped = false;
        for (let i = 0; i < sorted.length - 1; i++) {
            for (let j = i + 1; j < sorted.length; j++) {
                if (rules.has(sorted[i]) && rules.get(sorted[i])?.includes(sorted[j])) {
                    [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
                    swapped = true;
                }
            }
        }
    } while (swapped);
    return sorted;
}
