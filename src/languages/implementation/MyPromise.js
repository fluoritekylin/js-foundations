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
        this.onFulFillCallback = []
        this.onRejectedCallback = []

        /* resolve & reject 要绑定新建的Promise实例，因此：
        *  要用箭头函数，使this指向当前实例
        *  定义在constructor里可以与constructor共享闭包作用域
        * */
        const resolve = (value) => {
            if (this.state === State.pending) {
                this.state = State.resolved
                this.value = value
                if (this.onFulFillCallback.length > 0) {
                    this.onFulFillCallback.forEach(fn => {
                        fn(this.value)
                    })
                    this.onFulFillCallback = []
                }
            }
        }

        const reject = (reason) => {
            if (this.state === State.pending) {
                this.state = State.rejected
                this.reason = reason
                if (this.onRejectedCallback.length > 0) {
                    this.onRejectedCallback.forEach(fn => {
                        fn(this.reason)
                    })
                    this.onRejectedCallback = []
                }
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val
        onRejected = typeof onRejected === 'function' ? onRejected : (err) => {
            throw err
        }

        function resolvePromise(newPromise, result, resolve, reject) {
            if(newPromise === result) {
                return reject(new TypeError('Chaining cycle detected for promise'))
            }
            if (result instanceof MyPromise) {
                result.then(resolve, reject)
            } else {
                resolve(result)
            }
        }

        const newPromise = new MyPromise((resolve, reject) => {
            if (this.state === State.resolved) {
                queueMicrotask(() => {
                    try {
                        let result = onFulfilled(this.value)
                        resolvePromise(newPromise, result, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            } else if (this.state === State.rejected) {
                queueMicrotask(() => {
                    try {
                        let result = onRejected(this.reason)
                        resolvePromise(newPromise, result, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            } else {
                this.onFulFillCallback.push(() => {
                    try {
                        let result = onFulfilled(this.value)
                        resolvePromise(newPromise,result, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
                this.onRejectedCallback.push(() => {
                    try {
                        let result = onRejected(this.reason)
                        resolvePromise(newPromise,result, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
            }
        })

        return newPromise
    }
    static resolve(value) {
        if (value instanceof MyPromise) {
            /*根据实现规范，如果参数是一个promise，原封不动地返回这个promise*/
            return value
        }
        return new Promise((resolve, reject) => {
            resolve(value)
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