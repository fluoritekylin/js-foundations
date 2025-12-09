//蚂蚁
function sleep(secs) {
//todo
    new Promise((resolve) => {
        setTimeout(resolve, secs)
    })
}

(async function () {
    await sleep(2000)
    console.log('some thing')
})()


function dispatch(str) {
//todo
}

dispatch('display1')
dispatch('display2').printIn('done')
dispatch('display3').wait('wait').printIn('done')
dispatch('display4').waitFirst('wait first').printIn('done')

//滴滴
class Scheduler {
    //todo
    max = 0
    queue = []
    constructor(max){
        //todo
        this.max = max
    }
    add(promiseCreator) {
        //todo
        this.queue.push(promiseCreator)
    }

    run() {
        //todo
        this.queue.forEach((item) => {
            this.queue.pop()
            item()
        })
    }
}

const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
})

const scheduler = new Scheduler(3)
const addTask = (time, order) => {
    scheduler.add(() => timeout(time))
        .then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

scheduler.run()
// max = 3
// output 3 2 4 1