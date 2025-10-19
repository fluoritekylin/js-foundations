new Promise((resolve, _) => resolve('success')).then(() => {
    throw new Error('Boom!');
})
    .then(null,
        (err) => {
            console.log('throw err in onRejected', err)
        }
    )
.catch((err) => console.log('throw err in catch: ',err))

new Promise((_, reject) => reject('reject1'))
.then((val) => console.log('reject in fulfill', val))
.catch((err) => console.log('reject in catch:', err))

//错误被then里的onReject捕获到，不会再触发catch
new Promise((_, reject) => reject('reject2'))
    .then(null, (reason) => console.log('reject in onRejected: ', reason))
    .catch((err) => console.log('reject in catch: ', err))

new Promise((resolve) => {
    resolve('success1')
    //Promise一旦状态被确定（resolve或者reject），就不会改变。因此resolve之后的error不会被捕获
    throw new Error('throw error')
})
    .then((val) => {
        console.log('onfulfilled in then: ', val)
    })
    .catch((err) => console.log('reject in catch: ', err))

new Promise((resolve) => {
    //异常在resolve之前，错误捕获会变成reject，后面的resolve不会被执行
    throw new Error('throw error')
    resolve('success2')
})
    .then((val) => {
        console.log('onfulfilled in then: ', val)
    })
    .catch((err) => console.log('reject in catch: ', err))

//返回的Promise是pending状态，链式调用被暂停，后续then不会执行
Promise.resolve('resolve').then((value) => {
    console.log('resolved val in first then: ', value)
    return new Promise(() => {})
})
.then((val) => console.log('second then:', val))

Promise.reject(new Promise((resolve) => resolve(1)))
.catch((err) => console.log('reject Promise: ', err))