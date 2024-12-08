// Advent of Code - Day 8 - Part Two

import { type Position, type Antenna, parseInput } from './part1';

export function part2(input: string): number {
    const { antennas, numRows, numCols } = parseInput(input);

    // Group antennas by frequency
    const antennasByFreq: Map<string, Antenna[]> = new Map();
    for (const antenna of antennas) {
        if (!antennasByFreq.has(antenna.freq)) {
            antennasByFreq.set(antenna.freq, []);
        }
        antennasByFreq.get(antenna.freq)?.push(antenna);
    }

    // Collect antinode positions
    const antinodePositions = new Set<string>();

    for (const [freq, antennaList] of antennasByFreq.entries()) {
        const linesProcessed = new Set<string>();

        // For each unique pair of antennas with the same frequency
        for (let i = 0; i < antennaList.length; i++) {
            const antennaA = antennaList[i];
            const { x: x0, y: y0 } = antennaA.position;

            // If there is only one antenna of this frequency, it doesn't create antinodes
            if (antennaList.length === 1) {
                continue;
            }

            for (let j = i + 1; j < antennaList.length; j++) {
                const antennaB = antennaList[j];
                const { x: x1, y: y1 } = antennaB.position;

                // Compute the direction vector between A and B
                let dx = x1 - x0;
                let dy = y1 - y0;

                // Reduce the direction vector to its simplest form
                const gcdValue = gcd(Math.abs(dx), Math.abs(dy));
                dx = dx / gcdValue;
                dy = dy / gcdValue;

                // Ensure consistent representation of the direction vector
                // This accounts for negative steps
                if (dx === 0) {
                    dy = dy > 0 ? 1 : -1;
                } else if (dy === 0) {
                    dx = dx > 0 ? 1 : -1;
                } else {
                    if (dx < 0) {
                        dx = -dx;
                        dy = -dy;
                    }
                }

                const lineKey = `${dx},${dy}`;

                // Avoid processing the same line multiple times
                const sortedPositions = [antennaA.position, antennaB.position].sort((a, b) => (a.x !== b.x ? a.x - b.x : a.y - b.y));
                const lineUniqueKey = `${lineKey},${sortedPositions[0].x},${sortedPositions[0].y}`;

                if (linesProcessed.has(lineUniqueKey)) {
                    continue;
                }
                linesProcessed.add(lineUniqueKey);

                // Collect positions along the line in both directions
                collectAntinodePositions(antinodePositions, sortedPositions[0], { dx, dy }, numCols, numRows);
                collectAntinodePositions(antinodePositions, sortedPositions[0], { dx: -dx, dy: -dy }, numCols, numRows);
            }

            // Also include the antenna's own position if it's in line with others
            antinodePositions.add(`${x0},${y0}`);
        }
    }

    // Return the number of unique antinode positions
    return antinodePositions.size;
}

function collectAntinodePositions(
    antinodePositions: Set<string>,
    start: Position,
    step: { dx: number; dy: number },
    numCols: number,
    numRows: number,
): void {
    let x = start.x + step.dx;
    let y = start.y + step.dy;

    while (x >= 0 && x < numCols && y >= 0 && y < numRows) {
        antinodePositions.add(`${x},${y}`);
        x += step.dx;
        y += step.dy;
    }
}

function gcd(a: number, b: number): number {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
