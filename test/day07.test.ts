// Advent of Code - Day 7
import { expect, test } from 'bun:test';
import { part1, part2 } from '../src/day07';

let input = '';
try {
    input = await Bun.file('src/day07/resources/input.txt').text();
} catch (e) {
    // ignore
}

const testInput = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`.trim();

test('part one test', () => {
    expect(part1(testInput)).toBe(3749);
});

if (input !== '') {
    test('part one answer', () => {
        expect(part1(input)).toBe(6392012777720);
    });
}

test('part two test', () => {
    expect(part2(testInput)).toBe(11387);
});

if (input !== '') {
    test('part two answer', () => {
        expect(part2(input)).toBe(61561126043536);
    });
}
