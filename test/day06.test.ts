// Advent of Code - Day 6
import { expect, test } from 'bun:test';
import { part1, part2 } from '../src/day06';

let input = '';
try {
    input = await Bun.file('src/day06/resources/input.txt').text();
} catch (e) {
    // ignore
}

const testInput = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.trim();

test('part one test', () => {
    expect(part1(testInput)).toBe(41);
});

if (input !== '') {
    test('part one answer', () => {
        expect(part1(input)).toBe(5177);
    });
}

test('part two test', async () => {
    const result = await part2(testInput);
    expect(result).toBe(6);
});

if (input !== '') {
    test('part two answer', async () => {
        const result = await part2(input);
        expect(result).toBe(1686);
    });
}
