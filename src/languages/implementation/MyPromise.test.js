import {MyPromise} from "./MyPromise";

describe('MyPromise constructor', () => {
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

describe('MyPromise then chain', () => {
    it('should then chain pass resolved value', () => {
        new MyPromise((resolve) => resolve(1))
            .then((value) => value + 1)
            .then(val => val * 2)
            .then((value) => {
                expect(value).toBe(4)
            })
    });

    test('should catch thrown error in then', () => {
        return new MyPromise((resolve) => resolve(5))
            .then(() => {
                throw new Error('Boom!');
            })
            .then(
                null,
                (err) => {
                    expect(err.message).toBe('Boom!');
                }
            );
    });

    test('should support value passthrough when no onFulfilled is provided', () => {
        return new MyPromise((resolve) => resolve('A'))
            .then() // no callbacks
            .then((v) => {
                expect(v).toBe('A');
            });
    });
    test('should propagate rejection down the chain', () => {
        return new MyPromise((_, reject) => reject('Fail'))
            .then(() => 'ok') // skipped
            .then(
                null,
                (err) => {
                    expect(err).toBe('Fail');
                }
            );
    });
    //
    // test('should handle nested Promise returned from then', () => {
    //     return new MyPromise((resolve) => resolve(3))
    //         .then((v) => new MyPromise((resolve) => resolve(v + 7)))
    //         .then((v) => {
    //             expect(v).toBe(10);
    //         });
    // });
    //
    // test('should handle thrown error and continue chain', () => {
    //     return new MyPromise((resolve) => resolve('x'))
    //         .then(() => {
    //             throw 'error';
    //         })
    //         .then(null, (err) => err + ' handled')
    //         .then((v) => {
    //             expect(v).toBe('error handled');
    //         });
    // });
    //
    // test('should detect chaining cycle (promise2 === x)', () => {
    //     const p = new MyPromise((resolve) => resolve(1));
    //     const p2 = p.then(() => p2); // self-reference
    //     return p2.then(
    //         () => {
    //             throw new Error('Should not resolve');
    //         },
    //         (err) => {
    //             expect(err).toBeInstanceOf(TypeError);
    //             expect(err.message).toMatch(/cycle/i);
    //         }
    //     );
    // });
});