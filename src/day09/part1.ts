// Advent of Code - Day 9 - Part One (Optimized)

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
    let leftmostFreeIndex = disk.indexOf('.');
    let rightmostFileIndex = disk.length - 1;

    // Move rightmostFileIndex to the last file block
    while (rightmostFileIndex >= 0 && disk[rightmostFileIndex] === '.') {
        rightmostFileIndex--;
    }

    while (true) {
        // If there is no free space or no file blocks left, break
        if (leftmostFreeIndex === -1 || rightmostFileIndex === -1) {
            break;
        }

        // If the leftmostFreeIndex is beyond rightmostFileIndex, break
        if (leftmostFreeIndex >= rightmostFileIndex) {
            break;
        }

        // Move the rightmost file block to the leftmost free space
        const fileID = disk[rightmostFileIndex] as number;
        disk[rightmostFileIndex] = '.';
        disk[leftmostFreeIndex] = fileID;

        // Move leftmostFreeIndex to the next free space
        do {
            leftmostFreeIndex++;
        } while (leftmostFreeIndex < disk.length && disk[leftmostFreeIndex] !== '.');

        if (leftmostFreeIndex >= rightmostFileIndex) {
            break;
        }

        // Move rightmostFileIndex to the previous file block
        do {
            rightmostFileIndex--;
        } while (rightmostFileIndex >= 0 && disk[rightmostFileIndex] === '.');
    }
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
