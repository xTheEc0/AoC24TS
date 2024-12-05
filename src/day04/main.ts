// Advent of Code - Day 4
import { part1, part2 } from '.';

void (async () => {
    try {
        const input: string = await Bun.file('src/day04/resources/input.txt').text();

        console.log('--- Part One ---');
        console.log('Result', part1(input));

        console.log('--- Part Two ---');
        console.log('Result', part2(input));
    } catch (err) {
        console.error(err);
    }
})();
