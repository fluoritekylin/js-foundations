console.log('A')

setTimeout(() => {
    console.log('B: timeout1')

    Promise.resolve().then(() => {
        console.log('C: promise in timeout1')
    })

}, 0)

Promise.resolve().then(() => {
    console.log('D: promise1')
})

setTimeout(() => {
    console.log('E: timeout2')
}, 0)

Promise.resolve().then(() => {
    console.log('F: promise2')
})

console.log('G')

//output
/*
* A
* G
* D: promise1
* F: promise2
* B: timeout1
* E: timeout2 ❌
* C: promise in timeout1 ❌
* */

Promise.resolve().then(() => {
    console.log('1')
    setTimeout(() => console.log('2'), 0)
})

setTimeout(() => console.log('3'), 0)

Promise.resolve().then(() => console.log('4'))

/*
* 1
* 4
* 2 ❌
* 3 ❌
* */