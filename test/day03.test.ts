// Advent of Code - Day 3
import { expect, test } from 'bun:test';
import { part1, part2 } from '../src/day03';

let input = '';
try {
    input = await Bun.file('src/day03/resources/input.txt').text();
} catch (e) {
    // ignore
}

test('part one test', () => {
    expect(part1('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))')).toBe(161);
});

if (input !== '') {
    test('part one answer', () => {
        expect(part1(input)).toBe(162813399);
    });
}

test('part two test', () => {
    expect(part2(`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`)).toBe(48);
});

if (input !== '') {
    test('part two answer', () => {
        expect(part2(input)).toBe(53783319);
    });
}
