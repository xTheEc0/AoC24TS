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
                file = { positions: [] };
                files.set(block, file);
            }
            file.positions.push(i);
        }
    }

    // Get the list of file IDs in decreasing order
    const fileIDs = Array.from(files.keys()).sort((a, b) => b - a);

    // Get the list of free spans, sorted by start index
    let freeSpans = getFreeSpans(disk);

    for (const fileID of fileIDs) {
        const file = files.get(fileID);
        if (!file) {
            continue; // Skip if the file is not found (should not happen)
        }

        const fileLength = file.positions.length;
        const fileStartIndex = file.positions[0];

        // Find the leftmost free span that can fit the file and is to the left of the file's current position
        let targetSpanIndex = -1;
        for (let i = 0; i < freeSpans.length; i++) {
            const span = freeSpans[i];
            if (span.length >= fileLength && span.start < fileStartIndex) {
                targetSpanIndex = i;
                break;
            }
        }

        if (targetSpanIndex !== -1) {
            const targetSpan = freeSpans[targetSpanIndex];
            const targetIndex = targetSpan.start;

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

            // Update the free spans
            // Remove the used portion from the free span
            if (targetSpan.length === fileLength) {
                // The free span is fully used
                freeSpans.splice(targetSpanIndex, 1);
            } else if (targetSpan.length > fileLength) {
                // Adjust the free span (used from the start)
                targetSpan.start += fileLength;
                targetSpan.length -= fileLength;
            }

            // The original positions of the file are now free space
            // Insert as a new free span
            const newFreeSpan = { start: fileStartIndex, length: fileLength };

            // Insert the new free span into freeSpans while maintaining the sorted order
            for (let i = 0; i <= freeSpans.length; i++) {
                if (i === freeSpans.length || freeSpans[i].start > newFreeSpan.start) {
                    freeSpans.splice(i, 0, newFreeSpan);
                    break;
                }
            }

            // Merge adjacent free spans if necessary
            freeSpans = mergeFreeSpans(freeSpans);
        }
        // If no suitable span is found or it's not to the left, the file remains
    }
}

function getFreeSpans(disk: (number | '.')[]): { start: number; length: number }[] {
    const freeSpans: { start: number; length: number }[] = [];
    let index = 0;
    while (index < disk.length) {
        if (disk[index] === '.') {
            const start = index;
            let length = 0;
            while (index < disk.length && disk[index] === '.') {
                index++;
                length++;
            }
            freeSpans.push({ start, length });
        } else {
            index++;
        }
    }
    return freeSpans;
}

function mergeFreeSpans(freeSpans: { start: number; length: number }[]): { start: number; length: number }[] {
    if (freeSpans.length === 0) return [];
    const merged: { start: number; length: number }[] = [];
    let prevSpan = freeSpans[0];
    for (let i = 1; i < freeSpans.length; i++) {
        const currentSpan = freeSpans[i];
        if (prevSpan.start + prevSpan.length === currentSpan.start) {
            // Spans are adjacent; merge them
            prevSpan.length += currentSpan.length;
        } else {
            merged.push(prevSpan);
            prevSpan = currentSpan;
        }
    }
    merged.push(prevSpan);
    return merged;
}
