// Advent of Code - Day 2 - Part Two

function isStrictlyMonotonic(report: number[]): boolean {
    return (
        report.every((level, index) => index === 0 || level < report[index - 1]) ||
        report.every((level, index) => index === 0 || level > report[index - 1])
    );
}

function hasValidDifferences(report: number[]): boolean {
    for (let i = 1; i < report.length; i++) {
        const diff = Math.abs(report[i] - report[i - 1]);
        if (diff < 1 || diff > 3) {
            return false;
        }
    }
    return true;
}

function isSafeWithDampener(report: number[]): boolean {
    for (let i = 0; i < report.length; i++) {
        // Iterate through all elements
        const subReport = [...report.slice(0, i), ...report.slice(i + 1)];
        if (isStrictlyMonotonic(subReport) && hasValidDifferences(subReport)) {
            return true;
        }
    }
    return false;
}

export function part2(input: string): number {
    const reports = input
        .replaceAll('\r', '')
        .split('\n')
        .filter(Boolean)
        .map((levels) => levels.split(' ').map(Number))
        .filter(isSafeWithDampener);

    return reports.length;
}
