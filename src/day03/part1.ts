// Advent of Code - Day 3 - Part One

const mulRegex: RegExp = /mul\((\d{1,3}),(\d{1,3})\)/g;

export function mulResult(program: string): number {
    const muls = program.matchAll(mulRegex);
    if (!muls) throw new Error('No muls found');
    let result = 0;
    for (const mul of muls) {
        const [_, a, b] = mul;
        result += Number.parseInt(a) * Number.parseInt(b);
    }
    return result;
}

export function part1(input: string): number {
    const program = input.trim();
    return mulResult(program);
}