function debounce(fn, delay, immediate = false) {
    let timer

    /*
    * 每次事件触发时，都重新开启一个定时器；
    * 如果上一个定时器还没到执行时间（即 delay 内又触发了），就清除它；
    * 因此上一次的 fn 永远不会被执行；
    * 只有“最后一次触发”没有被清除，才能等 delay 到达后执行 fn。
    * */
    return () => {
        if (immediate) {
            fn()
            immediate = false
        }
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}

function test() {
    console.log('fn executed at:', Date.now())
}

const debouncedFn = debounce(test, 1000, true)
debouncedFn()
setTimeout(debouncedFn, 100)
setTimeout(debouncedFn, 300)
setTimeout(debouncedFn, 600)
setTimeout(debouncedFn, 2000)

// 600ms的执行
// 2000ms的执行