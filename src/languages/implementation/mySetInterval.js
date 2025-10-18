function mySetInterval(fn, delay) {
    let timerId = null
    let isCleared = false

    function tick() {
        if(isCleared) return
        const time = new Date()
        console.log('interval: ', time)
        fn()
        timerId = setTimeout(tick, delay)
    }
    timerId = setTimeout(tick, delay)

    return (() => {
        isCleared = true
        clearTimeout(timerId)
    })
}

function countdownByMyInterval(count) {
    return mySetInterval(() => {
        console.log(count--)
    }, 1000)
}

const stop = countdownByMyInterval(3)
setTimeout(stop, 4000)

const countdown = (n) => {
    if(n === 0) return
    console.log('now:', n)
    setTimeout(() => countdown(n-1), 1000)
}

// countdown(3)