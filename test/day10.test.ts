// Advent of Code - Day 10
import { expect, test } from 'bun:test';
import { part1, part2 } from '../src/day10';

let input = '';
try {
    input = await Bun.file('src/day10/resources/input.txt').text();
} catch (e) {
    // ignore
}

test('part one test one - small', () => {
    expect(
        part1(`0123
1234
8765
9876`),
    ).toBe(1);
});

test('part one test two', () => {
    expect(
        part1(`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`),
    ).toBe(36);
});

if (input !== '') {
    test('part one answer', () => {
        expect(part1(input)).toBe(746);
    });
}

test('part two test one - small', () => {
    expect(
        part2(`012345
123456
234567
345678
4.6789
56789.`),
    ).toBe(227);
});

test('part two test one', () => {
    expect(
        part2(`89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`),
    ).toBe(81);
});

if (input !== '') {
    test('part two answer', () => {
        expect(part2(input)).toBe(1541);
    });
}
