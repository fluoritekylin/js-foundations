function mySetInterval(fn, time) {
    function tick() {
        fn()
        setTimeout(tick, time)
    }
    setTimeout(tick, time)
}

// mySetInterval(() => console.log(250), 250)

const countdown = (n) => {
    if(n === 0) return
    console.log('now:', n)
    setTimeout(() => countdown(n-1), 1000)
}

// countdown(3)