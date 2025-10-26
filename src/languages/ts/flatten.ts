function flatten(array: any[], depth: number = Number.POSITIVE_INFINITY): any[] {
    const res: any[] = []
    function flat(array: any[], level: number) {
        array.forEach((item) => {
            if (Array.isArray(item) && level > 0) {
                flat(item, level-1)
            } else {
                res.push(item)
            }
        })

    }
    flat(array, depth)
    return res
}

function flattenByStack(array: any[], depth: number = Number.POSITIVE_INFINITY): any[] {
    const res = []
    const stack = [...array]
    let level = depth
    while (stack.length > 0) {
        const item = stack.shift()
        if (Array.isArray(item) && level > 0) {
            stack.unshift(...item)
            level--
        } else {
            res.push(item)
        }
    }

    return res
}
console.log(flatten([1, [2, [3, 4]]]))
console.log(flattenByStack([1, [2, [3, [4]]]], 2))