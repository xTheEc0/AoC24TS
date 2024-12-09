// Advent of Code - Day 9 - Part Two

import { parseInput, calculateChecksum } from './part1';

export function part2(input: string): number {
    const disk = parseInput(input);
    compactDiskWholeFiles(disk);
    const checksum = calculateChecksum(disk);
    return checksum;
}

function compactDiskWholeFiles(disk: (number | '.')[]): void {
    // Identify files and their positions
    const files = new Map<number, { positions: number[] }>();

    for (let i = 0; i < disk.length; i++) {
        const block = disk[i];
        if (block !== '.') {
            let file = files.get(block);
            if (!file) {
                // .get returns undefined if the key is not found...
                file = { positions: [] };
                files.set(block, file);
            }
            file.positions.push(i);
        }
    }

    // Get the list of file IDs in decreasing order
    const fileIDs = Array.from(files.keys()).sort((a, b) => b - a);

    for (const fileID of fileIDs) {
        const file = files.get(fileID);
        if (!file) {
            // .get returns undefined if the key is not found...
            continue;
        }
        const fileLength = file.positions.length;
        const fileStartIndex = file.positions[0];

        // Find the leftmost free span of free space that can fit the file
        const targetIndex = findLeftmostFreeSpan(disk, fileLength);

        // Only move the file if the free span is to the left of the file's current position
        if (targetIndex !== -1 && targetIndex < fileStartIndex) {
            // Move the file to the new position
            // Clear the old positions
            for (const pos of file.positions) {
                disk[pos] = '.';
            }

            // Update the disk with the file at the new position
            for (let i = 0; i < fileLength; i++) {
                disk[targetIndex + i] = fileID;
            }

            // Update the file's positions
            file.positions = [];
            for (let i = 0; i < fileLength; i++) {
                file.positions.push(targetIndex + i);
            }
        }
        // If no suitable span is found or it is not to the left, the file remains
    }
}

function findLeftmostFreeSpan(disk: (number | '.')[], length: number): number {
    // Search for free spans across the entire disk
    for (let i = 0; i <= disk.length - length; i++) {
        let canFit = true;
        for (let j = 0; j < length; j++) {
            if (disk[i + j] !== '.') {
                canFit = false;
                break;
            }
        }
        if (canFit) {
            return i;
        }
    }
    return -1; // No suitable span found
}
