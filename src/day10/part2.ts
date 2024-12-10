// Advent of Code - Day 10 - Part Two

import { parseInput, exploreTrail } from './part1';

export function part2(input: string): number {
  const map = parseInput(input);
  let sumOfRatings = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 0) {
        const rating = exploreTrail(map, x, y);
        sumOfRatings += rating;
      }
    }
  }

  return sumOfRatings;
}
