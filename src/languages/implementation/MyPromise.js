const State = {
    pending: 'pending',
    resolved: 'resolved',
    rejected: 'rejected'
}
class MyPromise {
    state
    value
    reason
    onFulFillCallback
    onRejectedCallback
    constructor(executor) {
        this.state = State.pending
        this.value = undefined
        this.reason = undefined
        this.onFulFillCallback = null
        this.onRejectedCallback = null

        /* resolve & reject 要绑定新建的Promise实例，因此：
        *  要用箭头函数，使this指向当前实例
        *  定义在constructor里可以与constructor共享闭包作用域
        * */
        const resole = (value) => {
            console.log('resole in constructor, this: ', this)
            if(this.state === State.pending) {
                this.state = State.resolved
            }
            this.value = value
            if(this.onFulFillCallback) {
                this.onFulFillCallback(this.value)
            }
        }

        const reject = (reason) => {
            if(this.state === State.pending) {
                this.state = State.rejected
            }
            this.reason = reason
            if(this.onRejectedCallback) {
                this.onRejectedCallback(this.reason)
            }
        }

        try {
            executor(resole, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        if(this.state === State.resolved) {
            onFulfilled(this.value)
        } else if(this.state === State.rejected) {
            onRejected(this.reason)
        } else {
           this.onFulFillCallback = onFulfilled
           this.onRejectedCallback = onRejected
        }
    }
}

const promise = new Promise((resolve, reject) => {
    reject('fail')
})
promise.then(null, (error) => console.log('promise: ', error))

export {MyPromise}