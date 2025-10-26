function chunk(array, size) {
    const len = array.length
    const res = []
    let index = -1
    for (let i = 0; i < len; i++) {
        if(i % size === 0) {
            index++
            res[index] = []
        }
        res[index].push(array[i])
    }
    return res
}

function chunkByReduce(array, size) {
    return array.reduce((acc, curr, index) => {
        const groupIndex = Math.floor(index / size)
        if(!acc[groupIndex]) {
            acc[groupIndex] = []
        }
        acc[groupIndex].push(curr)
        return acc
    }, [])
}

function chunkBySlice(array, size) {
    const res = []
    for (let i = 0; i < array.length; i+=size) {
        res.push(array.slice(i, i+size))
    }
    return res
}
console.log(chunk(['a','b','c','d','e'], 3))
console.log(chunkByReduce(['a','b','c','d','e'], 3))
console.log(chunkBySlice(['a','b','c','d','e'], 3))