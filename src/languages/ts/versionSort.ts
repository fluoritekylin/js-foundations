export function versionSort(input: string[]):string[] {
    const splits = input.map((version) => version.split('.'));
    const compareArrayFn = (a, b) => {
        const len = Math.max(a.length, b.length)
        for (let i=0;i<len;i++) {
            const numA = Number(a[i] ?? 0)
            const numB = Number(b[i] ?? 0)
            if (numA - numB !==0) return numA - numB
        }
        return 0
    };

    splits.sort(compareArrayFn)
    return splits.map((item) => item.join('.'))
}