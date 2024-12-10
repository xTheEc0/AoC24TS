// Advent of Code - Day 10 - Part One

export function part1(input: string): number {
    const map = parseInput(input);
    let sumOfScores = 0;

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 0) {
                const reachableNines = new Set<string>();
                exploreTrail(map, x, y, reachableNines);
                sumOfScores += reachableNines.size;
            }
        }
    }

    return sumOfScores;
}

export function parseInput(input: string): number[][] {
    return input
        .replaceAll('\r', '')
        .split('\n')
        .filter(Boolean)
        .map((line) => Array.from(line).map(Number));
}

export function exploreTrail(map: number[][], x: number, y: number, reachableNines?: Set<string>): number {
    if (x < 0 || y < 0 || y >= map.length || x >= map[0].length || map[y][x] === -1) {
        return 0;
    }

    if (map[y][x] === 9) {
        if (reachableNines) {
            reachableNines.add(`${x},${y}`);
        }
        return 1;
    }

    const originalHeight = map[y][x];
    map[y][x] = -1;

    const pathCount =
        (y > 0 && map[y - 1][x] === originalHeight + 1 ? exploreTrail(map, x, y - 1, reachableNines) : 0) +
        (y < map.length - 1 && map[y + 1][x] === originalHeight + 1 ? exploreTrail(map, x, y + 1, reachableNines) : 0) +
        (x > 0 && map[y][x - 1] === originalHeight + 1 ? exploreTrail(map, x - 1, y, reachableNines) : 0) +
        (x < map[0].length - 1 && map[y][x + 1] === originalHeight + 1 ? exploreTrail(map, x + 1, y, reachableNines) : 0);

    map[y][x] = originalHeight;

    return pathCount;
}
