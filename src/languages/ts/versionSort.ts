export function versionSort(input: string[]):string[] {
    const PreRelease:Record<string, number> = {
        alpha:0,
        beta:1,
        rc:2,
    }
    const compareArrayFn = (a: string, b: string) => {
        const [coreA, preOrderA] = a.split('-', 2)
        const [coreB, preOrderB] = b.split('-', 2)
        const arrA = coreA?.split('.') ?? []
        const arrB = coreB?.split('.') ?? []
        const len = Math.max(arrA.length, arrB.length)
        for (let i = 0; i < len; i++) {
            const numA = Number(arrA[i] ?? 0)
            const numB = Number(arrB[i] ?? 0)
            if (numA - numB !== 0) return numA - numB
        }
        if (!preOrderA && !preOrderB) return 0
        if (!preOrderA) return 1
        if (!preOrderB) return -1
        return (PreRelease?.[preOrderA] ?? 3) - (PreRelease?.[preOrderB] ?? 3)
    };

    return  [...input].sort((va, vb) => compareArrayFn(va,vb))
}