// Advent of Code - Day 8 - Part One

export type Position = { x: number; y: number };
export type Antenna = { position: Position; freq: string };

export function part1(input: string): number {
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
        // For each pair of antennas with the same frequency
        for (let i = 0; i < antennaList.length; i++) {
            const antennaA = antennaList[i];
            for (let j = i + 1; j < antennaList.length; j++) {
                const antennaB = antennaList[j];

                // Compute antinode positions
                const [antinode1, antinode2] = getAntinodePositions(antennaA.position, antennaB.position);

                // Add antinode positions if within map bounds
                if (isWithinBounds(antinode1, numCols, numRows)) {
                    antinodePositions.add(`${antinode1.x},${antinode1.y}`);
                }
                if (isWithinBounds(antinode2, numCols, numRows)) {
                    antinodePositions.add(`${antinode2.x},${antinode2.y}`);
                }
            }
        }
    }

    // Return the number of unique antinode positions
    return antinodePositions.size;
}

export function parseInput(input: string): {
    antennas: Antenna[];
    numRows: number;
    numCols: number;
} {
    const lines = input.trim().split('\n');
    const antennas: Antenna[] = [];
    const numRows = lines.length;
    const numCols = lines[0].length;

    // Parse the input and collect antennas
    for (let y = 0; y < numRows; y++) {
        const line = lines[y];
        for (let x = 0; x < numCols; x++) {
            const char = line[x];
            if (char !== '.') {
                antennas.push({
                    position: { x, y },
                    freq: char,
                });
            }
        }
    }

    return { antennas, numRows, numCols };
}

function getAntinodePositions(a: Position, b: Position): [Position, Position] {
    const antinode1: Position = {
        x: 2 * a.x - b.x,
        y: 2 * a.y - b.y,
    };
    const antinode2: Position = {
        x: 2 * b.x - a.x,
        y: 2 * b.y - a.y,
    };
    return [antinode1, antinode2];
}

function isWithinBounds(pos: Position, numCols: number, numRows: number): boolean {
    return pos.x >= 0 && pos.x < numCols && pos.y >= 0 && pos.y < numRows;
}
