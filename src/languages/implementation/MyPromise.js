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
        *
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

const myPromise = new MyPromise((resolve) => {
    console.log('executor this: ', this)
    resolve('success')
})
myPromise.then((value) => console.log('my myPromise value: ', value))
const myPromise1 = new MyPromise((resolve, reject) => {
    reject('fail')
})
myPromise1.then(null,(value) => console.log('my myPromise: ', value))

const promise = new Promise((resolve, reject) => {
    reject('fail')
})
promise.then(null, (error) => console.log('promise: ', error))