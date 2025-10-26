function unique(array) {
    const seenMap = new Set()
    const res = []
    array.forEach((item) => {
        if(!seenMap.has(item)) {
            res.push(item)
            seenMap.add(item)
        }
    })
    return res
}

function uniqueByIndexOf(array) {
    return array.filter((item, index) => array.indexOf(item) === index)
}

function uniqueByReduce(array) {
    return array.reduce((acc, curr) => {
        if(!acc.includes(curr)) {
            acc.push(curr)
        }
        return acc
    },[])
}
console.log(unique([1,2,4,12,3,4,2,1]))
console.log(uniqueByIndexOf([1,2,4,12,3,4,2,1]))
console.log(uniqueByReduce([1,2,4,12,3,4,2,1]))