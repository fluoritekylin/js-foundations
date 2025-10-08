const State = {
    pending: 'pending',
    resolved: 'resolved',
    rejected: 'rejected'
}

export class MyPromise {
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
        const resolve = (value) => {
            if (this.state === State.pending) {
                this.state = State.resolved
            }
            this.value = value
            if (this.onFulFillCallback) {
                this.onFulFillCallback(this.value)
            }
        }

        const reject = (reason) => {
            if (this.state === State.pending) {
                this.state = State.rejected
            }
            this.reason = reason
            if (this.onRejectedCallback) {
                this.onRejectedCallback(this.reason)
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            if (this.state === State.resolved) {
                try {
                    let result = onFulfilled(this.value)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            } else if(this.state === State.rejected) {
                try {
                    let result = onRejected(this.reason)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            } else {
                this.onFulFillCallback = onFulfilled
                this.onRejectedCallback = onRejected
            }
        })
    }
}

const myPromise = new MyPromise((resolve) => {
    resolve('success')
})
myPromise
    .then(() => {
        throw new Error('Boom!');
    })
    .then(null,
        (err) => {
            console.log('error', err.message)
        }
    );
const promise = new Promise((resolve, reject) => {
    resolve('success')
})
promise.then(() => {
    throw new Error('Boom!');
})
    .then(null,
        (err) => {
            console.log('error', err.message)
        }
    );