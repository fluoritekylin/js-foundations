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

    test('should handle nested Promise returned from then', () => {
        return new MyPromise((resolve) => resolve(3))
            .then((v) => new MyPromise((resolve) => resolve(v + 7)))
            .then((v) => {
                expect(v).toBe(10);
            });
    });

    test('should handle thrown error and continue chain', () => {
        return new MyPromise((resolve) => resolve('x'))
            .then(() => {
                throw 'error';
            })
            .then(null, (err) => err + ' handled')
            .then((v) => {
                expect(v).toBe('error handled');
            });
    });

    test('should detect chaining cycle (promise2 === x)', () => {
        const p = new MyPromise((resolve) => resolve(1));
        const p2 = p.then(() => p2);
        return p2.then(
            () => {
                throw new Error('Should not resolve');
            },
            (err) => {
                expect(err).toBeInstanceOf(TypeError);
                expect(err.message).toMatch(/cycle/i);
            }
        );

    });
});

describe('MyPromise asynchronous behavior', () => {
    test('then should be called asynchronously even for immediate resolve', (done) => {
        const order = [];
        const p = new MyPromise((resolve) => resolve(1));
        order.push('sync-resolve');
        p.then((val) => {
            order.push('then-callback:'+ val);
            expect(order).toEqual(['sync-resolve', 'then-callback:1']);
            done();
        });
        order.push('after-then');
    });

    test('chain of thens should execute in correct async order', (done) => {
        const result = [];
        new MyPromise((resolve) => resolve(1))
            .then((v) => {
                result.push(v);
                return v + 1;
            })
            .then((v) => {
                result.push(v);
                expect(result).toEqual([1, 2]);
                done();
            });
    });

    test('should handle async resolve (setTimeout)', (done) => {
        new MyPromise((resolve) => {
            setTimeout(() => resolve('ok'), 50);
        }).then((v) => {
            expect(v).toBe('ok');
            done();
        });
    });

    test('should handle async reject (setTimeout)', (done) => {
        new MyPromise((_, reject) => {
            setTimeout(() => reject('fail'), 50);
        })
            .then(null, (err) => {
                expect(err).toBe('fail');
                done();
            });
    });

    test('multiple thens on same promise should all fire asynchronously', (done) => {
        const calls = [];
        const p = new MyPromise((resolve) => resolve('value'));
        p.then((v) => calls.push('A:' + v));
        p.then((v) => calls.push('B:' + v));
        setTimeout(() => {
            expect(calls).toEqual(['A:value', 'B:value']);
            done();
        }, 10);
    });

    test('async thrown error in onFulfilled should reject next promise', (done) => {
        new MyPromise((resolve) => resolve('ok'))
            .then(() => {
                queueMicrotask(() => {
                    throw new Error('boom');
                });
            })
            .then(
                () => {
                    throw new Error('Should not resolve');
                },
                (err) => {
                    expect(err).toBeInstanceOf(Error);
                    expect(err.message).toBe('boom');
                    done();
                }
            );
    });

    test('should work when mixing sync and async then', (done) => {
        const result = [];
        const p = new MyPromise((resolve) => {
            queueMicrotask(() => resolve(1));
        });

        p.then((v) => {
            result.push(v);
            return v + 1;
        }).then((v) => {
            result.push(v);
            expect(result).toEqual([1, 2]);
            done();
        });
    });
});

describe('static method resolve basic behavior', () => {
    test('should resolve with a normal value', async () => {
        const p = MyPromise.resolve(42);
        const result = await p;
        expect(result).toBe(42);
    });

    test('should resolve with undefined when no argument', async () => {
        const p = MyPromise.resolve();
        const result = await p;
        expect(result).toBeUndefined();
    });

    test('should return the same MyPromise instance if argument is a MyPromise', async () => {
        const inner = new MyPromise((resolve) => resolve('ok'));
        const outer = MyPromise.resolve(inner);
        expect(outer).toBe(inner); // ✅ 不创建新的实例
    });

    test('should resolve asynchronously when chained',  async () => {
        let flag = false;
        const p =MyPromise.resolve(1).then((v) => {
            expect(flag).toBe(true); // 验证异步
            expect(v).toBe(1);
        });
        flag = true;
        await p
    });
});

describe('static method reject basic behavior', () => {
    test('should reject with a normal reason', async () => {
        const p = MyPromise.reject('error');
        await expect(p).rejects.toBe('error');
    });

    test('should reject with undefined if no reason given', async () => {
        const p = MyPromise.reject();
        await expect(p).rejects.toBeUndefined();
    });

    test('should create a new MyPromise even if reason is a MyPromise', async () => {
        const inner = new MyPromise((resolve) => resolve('ok'));
        const p = MyPromise.reject(inner);
        expect(p).not.toBe(inner); // ✅ reject 总是创建新实例
        await expect(p).rejects.toBe(inner);
    });

    test('should call then reject handler', async () => {
        const p = MyPromise.reject('fail');
        const result = await p.then(
            () => 'resolved',
            (err) => err
        );
        expect(result).toBe('fail');
    });
});

describe('static method all', () => {
    test('Promise.all resolves all values in order', async () => {
        const p1 = new MyPromise((r) => setTimeout(() => r(1), 30));
        const p2 = new MyPromise((r) => setTimeout(() => r(2), 10));
        const p3 = 3; // 普通值
        const result = await MyPromise.all([p1, p2, p3]);
        expect(result).toEqual([1, 2, 3]);
    });

    test('Promise.all with empty array resolves immediately', async () => {
        const result = await MyPromise.all([]);
        expect(result).toEqual([]);
    });

});
