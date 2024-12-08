// Advent of Code - Day 5
import { expect, test } from 'bun:test';
import { part1, part2 } from '../src/day05';

let input = '';
try {
    input = await Bun.file('src/day05/resources/input.txt').text();
} catch (e) {
    // ignore
}

const testInput = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`.trim();

test('part one test', () => {
    expect(part1(testInput)).toBe(143);
});

if (input !== '') {
    test('part one answer', () => {
        expect(part1(input)).toBe(4462);
    });
}

test('part two test', () => {
    expect(part2(testInput)).toBe(123);
});

if (input !== '') {
    test('part two answer', () => {
        expect(part2(input)).toBe(6767);
    });
}
