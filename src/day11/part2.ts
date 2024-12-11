// Advent of Code - Day 11 - Part Two
import { parseInput, totalStones } from './part1';

export function part2(input: string): number {
    const initialStones = parseInput(input);
    const memo = new Map<string, bigint>();
    const counts = new Map<bigint, bigint>();
    for (const n of initialStones) {
        counts.set(n, (counts.get(n) || 0n) + 1n);
    }
    let total = 0n;
    for (const [n, count] of counts.entries()) {
        const stonesFromN = totalStones(n, 75, memo);
        total += stonesFromN * count;
    }
    return Number(total);
}
