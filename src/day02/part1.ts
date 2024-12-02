// Advent of Code - Day 2 - Part One

function isLevelSafe(report: number[]): boolean {
    return (
        report.every(
            (level, index) => index === 0 || (level - report[index - 1] >= 1 && level - report[index - 1] <= 3),
        ) ||
        report.every(
            (level, index) => index === 0 || (level - report[index - 1] <= -1 && level - report[index - 1] >= -3),
        )
    );
}

export function part1(input: string): number {
    const reports = input
        .replaceAll('\r', '')
        .split('\n')
        .filter(Boolean)
        .map((level) => level.split(' ').map(Number))
        .filter(isLevelSafe);

    return reports.length;
}
