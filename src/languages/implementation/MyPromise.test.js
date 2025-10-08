import {MyPromise} from "./MyPromise";

describe('MyPromise', () => {
    it('should resolve with correct value', async () => {
        const myPromise = new MyPromise((resolve) => {
            resolve('success')
        })

        const value = await myPromise
        expect(value).toBe('success')
    })

    it('should reject with correct reason', async () => {
        const myPromise = new MyPromise((resolve, reject) => {
            reject('fail')
        })

        try {
            await myPromise
        } catch (err) {
            expect(err).toBe('fail')
        }
    })
});