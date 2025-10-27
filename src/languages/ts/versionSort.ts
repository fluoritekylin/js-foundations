export function versionSort(input: string[]):string[] {
    const splits = input.map((version) => version
            .split('.')
            .map(num => parseInt(num)));
    const getCompareFn = (a, b) => {
        if (a[0] - b[0] !== 0) {
            return a[0] - b[0]
        } else {
            if (a[1] - b[1] !== 0) {
                return a[1] - b[1]
            } else {
                return a[2] - b[2]
            }
        }
    };

    splits.sort(getCompareFn)
    return splits.map((item) => item.join('.'))
}