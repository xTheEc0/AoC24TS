// Advent of Code - Day 9 - Part One

export function part1(input: string): number {
    const disk = parseInput(input);
    compactDisk(disk);
    const checksum = calculateChecksum(disk);
    return checksum;
}

export function parseInput(input: string): (number | '.')[] {
    const disk: (number | '.')[] = [];
    const digits = input.trim().split('').map(Number);
    let isFile = true;
    let fileID = 0;

    for (const length of digits) {
        if (isFile) {
            for (let i = 0; i < length; i++) {
                disk.push(fileID);
            }
            fileID++;
        } else {
            for (let i = 0; i < length; i++) {
                disk.push('.');
            }
        }
        isFile = !isFile;
    }

    return disk;
}

function compactDisk(disk: (number | '.')[]): void {
    while (true) {
        const leftmostFreeIndex = disk.indexOf('.');
        const rightmostFileIndex = findRightmostFileBlockIndex(disk);

        // If there is no free space or no files, break the loop
        if (leftmostFreeIndex === -1 || rightmostFileIndex === -1) {
            break;
        }

        // If the leftmost free index is after the rightmost file block, then no more moves can be made
        if (leftmostFreeIndex > rightmostFileIndex) {
            break;
        }

        // Move the rightmost file block to the leftmost free space
        const fileID = disk[rightmostFileIndex] as number;
        disk[rightmostFileIndex] = '.';
        disk[leftmostFreeIndex] = fileID;
    }
}

function findRightmostFileBlockIndex(disk: (number | '.')[]): number {
    for (let i = disk.length - 1; i >= 0; i--) {
        if (disk[i] !== '.') {
            return i;
        }
    }
    return -1; // No file blocks found
}

export function calculateChecksum(disk: (number | '.')[]): number {
    let checksum = 0;
    for (let position = 0; position < disk.length; position++) {
        const block = disk[position];
        if (block !== '.') {
            checksum += position * (block as number);
        }
    }
    return checksum;
}
