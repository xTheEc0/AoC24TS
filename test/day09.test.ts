// Advent of Code - Day 9
import { expect, test } from 'bun:test';
import { part1, part2 } from '../src/day09';

let input = '';
try {
    input = await Bun.file('src/day09/resources/input.txt').text();
} catch (e) {
    // ignore
}

const testInput = '2333133121414131402';
test('part one test', () => {
    expect(part1(testInput)).toBe(1928);
});

if (input !== '') {
    test('part one answer', () => {
        expect(part1(input)).toBe(6301895872542);
    });
}

test('part two test', () => {
    expect(part2(testInput)).toBe(2858);
});

if (input !== '') {
    test('part two answer', () => {
        expect(part2(input)).toBe(6323761685944);
    });
}
