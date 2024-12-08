// Advent of Code - Day 4
import { expect, test } from 'bun:test';
import { part1, part2 } from '../src/day04';

let input = '';
try {
    input = await Bun.file('src/day04/resources/input.txt').text();
} catch (e) {
    // ignore
}

const testInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`.trim();

test('part one test', () => {
    expect(part1(testInput)).toBe(18);
});

if (input !== '') {
    test('part one answer', () => {
        expect(part1(input)).toBe(2406);
    });
}

test('part two test', () => {
    expect(part2(testInput)).toBe(9);
});

if (input !== '') {
    test('part two answer', () => {
        expect(part2(input)).toBe(1807);
    });
}
