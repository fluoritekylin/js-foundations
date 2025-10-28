function mySetInterval(callback: () => void, delay: number): () => void {
    let isCleared = false
    let timerId: string | number | NodeJS.Timeout | undefined
    function tick() {
        if (isCleared) return
        callback()
        timerId = setTimeout(() => {
            tick()
        }, delay)

    }
    tick()
    return () => {
        isCleared = true
        clearTimeout(timerId)
    }
}

function countDown(targetTime: Date) {
    const now = new Date()
    const diffSec = Math.floor((targetTime.getTime() - now.getTime())/1000);
    const stop = mySetInterval(() => {
        const now = new Date()
        const diffSec = Math.floor((targetTime.getTime() - now.getTime())/1000);
        console.log('now ', now)
        const hour = Math.floor(diffSec/3600)
        const min = Math.floor((diffSec%3600)/60)
        const sec = diffSec % 60
        console.log(`${hour}:${min}:${sec} is remaining`)
    }, 1000)
    if (diffSec <= 0) {
        console.log('Time has come')
        stop?.()
        return
    }
}

countDown(new Date('2025-10-28T23:50:00'))