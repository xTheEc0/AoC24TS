// Advent of Code - Day 8
import { expect, test } from 'bun:test';
import { part1, part2 } from '../src/day08';

let input = '';
try {
    input = await Bun.file('src/day08/resources/input.txt').text();
} catch (e) {
    // ignore
}

const testInput = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`.trim();

test('part one test', () => {
    expect(part1(testInput)).toBe(14);
});

if (input !== '') {
    test('part one answer', () => {
        expect(part1(input)).toBe(222);
    });
}

test('part two test', () => {
    expect(part2(testInput)).toBe(34);
});

if (input !== '') {
    test('part two answer', () => {
        expect(part2(input)).toBe(884);
    });
}
