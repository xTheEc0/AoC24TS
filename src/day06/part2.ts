// Advent of Code - Day 6 - Part Two

import { type Direction, parseInput, isPositionOutsideGrid, getNextPosition, turnRight } from './part1';

export function part2(input: string): number {
    const { grid, guardPosition: initialGuardPosition, guardDirection: initialGuardDirection } = parseInput(input);

    const numRows = grid.length;
    const numCols = grid[0].length;

    let loopPositionsCount = 0;

    for (let y = 0; y < numRows; y++) {
        for (let x = 0; x < numCols; x++) {
            // Skip if the position is the guard's starting position
            if (x === initialGuardPosition.x && y === initialGuardPosition.y) {
                continue;
            }

            // Only consider empty positions ('.') for placing an obstruction
            if (grid[y][x] === '.') {
                // Make a deep copy of the grid
                const gridCopy = grid.map((row) => [...row]);

                // Place the new obstruction
                gridCopy[y][x] = '#';

                // Simulate the guard's movement
                if (doesGuardGetStuckInLoop(gridCopy, initialGuardPosition, initialGuardDirection)) {
                    loopPositionsCount++;
                }
            }
        }
    }

    return loopPositionsCount;
}

function doesGuardGetStuckInLoop(grid: string[][], guardStartPosition: { x: number; y: number }, guardStartDirection: Direction): boolean {
    let guardPosition = { ...guardStartPosition };
    let guardDirection = guardStartDirection;

    const visitedStates = new Set<string>();
    visitedStates.add(stateToString(guardPosition, guardDirection));

    while (true) {
        const nextPosition = getNextPosition(guardPosition, guardDirection);

        // Check if the guard needs to turn
        if (!isPositionOutsideGrid(nextPosition, grid) && grid[nextPosition.y][nextPosition.x] === '#') {
            guardDirection = turnRight(guardDirection);
        } else {
            guardPosition = nextPosition;
        }

        // Check if the guard has left the grid
        if (isPositionOutsideGrid(guardPosition, grid)) {
            return false; // The guard does not get stuck in a loop
        }

        // Create a unique state string
        const stateStr = stateToString(guardPosition, guardDirection);

        // Check if this state has been visited before
        if (visitedStates.has(stateStr)) {
            return true; // The guard gets stuck in a loop
        }

        visitedStates.add(stateStr);
    }
}

function stateToString(position: { x: number; y: number }, direction: Direction): string {
    return `${position.x},${position.y},${direction}`;
}
