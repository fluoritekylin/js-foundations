function throttle(fn, interval) {
    let timer = null
    return () => {
        if (!timer) {
            fn()
            timer = setTimeout(() => {
                timer = null
            }, interval)
        }
    }
}

function test() {
    console.log('fn executed at:', new Date())
}

const throttled = throttle(test, 1000)
console.log('first:', new Date())
throttled()
setTimeout(throttled, 200)
setTimeout(throttled, 400)
setTimeout(throttled, 1000)
setTimeout(throttled, 1600)
setTimeout(throttled, 2000)
