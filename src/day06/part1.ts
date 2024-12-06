// Advent of Code - Day 6 - Part One

export enum Direction {
    North = 'N',
    East = 'E',
    South = 'S',
    West = 'W',
}

export function part1(input: string): number {
    const { grid, guardPosition, guardDirection } = parseInput(input);

    const visitedPositions = new Set<string>();
    visitedPositions.add(`${guardPosition.x},${guardPosition.y}`); // Include starting position

    let currentGuardPosition = { ...guardPosition };
    let currentGuardDirection = guardDirection;

    while (true) {
        const nextPosition = getNextPosition(currentGuardPosition, currentGuardDirection);

        // Only turn if the obstacle is WITHIN the grid and is '#':
        if (!isPositionOutsideGrid(nextPosition, grid) && grid[nextPosition.y][nextPosition.x] === '#') {
            currentGuardDirection = turnRight(currentGuardDirection);
        } else {
            currentGuardPosition = nextPosition;
        }

        // Check for leaving AFTER moving:
        if (isPositionOutsideGrid(currentGuardPosition, grid)) {
            break;
        }

        visitedPositions.add(`${currentGuardPosition.x},${currentGuardPosition.y}`);
    }

    return visitedPositions.size;
}

export function parseInput(input: string): {
    grid: string[][];
    guardPosition: { x: number; y: number };
    guardDirection: Direction;
} {
    const lines = input.replaceAll('\r', '').trim().split('\n');
    const grid: string[][] = [];
    let guardPosition = { x: 0, y: 0 };
    let guardDirection: Direction = Direction.North;

    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        grid[y] = [];
        for (let x = 0; x < line.length; x++) {
            const char = line[x];
            grid[y][x] = char;

            if (['^', '>', 'v', '<'].includes(char)) {
                guardPosition = { x, y };
                guardDirection = getDirectionFromSymbol(char);
                grid[y][x] = '.'; // Replace guard symbol with empty space
            }
        }
    }

    return { grid, guardPosition, guardDirection };
}

export function isPositionOutsideGrid(position: { x: number; y: number }, grid: string[][]): boolean {
    return position.x < 0 || position.x >= grid[0].length || position.y < 0 || position.y >= grid.length;
}

function getDirectionFromSymbol(symbol: string): Direction {
    switch (symbol) {
        case '^':
            return Direction.North;
        case '>':
            return Direction.East;
        case 'v':
            return Direction.South;
        case '<':
            return Direction.West;
        default:
            return Direction.North;
    }
}

export function getNextPosition(position: { x: number; y: number }, direction: Direction): { x: number; y: number } {
    switch (direction) {
        case Direction.North:
            return { x: position.x, y: position.y - 1 };
        case Direction.East:
            return { x: position.x + 1, y: position.y };
        case Direction.South:
            return { x: position.x, y: position.y + 1 };
        case Direction.West:
            return { x: position.x - 1, y: position.y };
        default:
            return position;
    }
}

export function turnRight(direction: Direction): Direction {
    switch (direction) {
        case Direction.North:
            return Direction.East;
        case Direction.East:
            return Direction.South;
        case Direction.South:
            return Direction.West;
        case Direction.West:
            return Direction.North;
        default:
            return direction;
    }
}
