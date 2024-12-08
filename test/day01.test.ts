// Advent of Code - Day 1
import { expect, test } from 'bun:test';
import { part1, part2 } from '../src/day01';

let input = '';
try {
    input = await Bun.file('src/day01/resources/input.txt').text();
} catch (e) {
    // ignore
}

const testInput = `
3   4
4   3
2   5
1   3
3   9
3   3`.trim();

test('part one test', () => {
    expect(part1(testInput)).toBe(11);
});

if (input !== '') {
    test('part one answer', () => {
        expect(part1(input)).toBe(1660292);
    });
}

test('part two test', () => {
    expect(part2(testInput)).toBe(31);
});

if (input !== '') {
    test('part two answer', () => {
        expect(part2(input)).toBe(22776016);
    });
}
