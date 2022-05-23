// let handler = {
//     get(target, key, ctx){
//         console.log(target)
//         console.log(key)
//         console.log(ctx)
//         return function () {
//             ctx.speak(key + "I'am proxy!")
//         }
//     }
// }
//
// let proto = new Proxy({}, handler)

// function debounce(fn, dealy) {
//     let timer = null
//     return function (...args) {
//         if (timer) {
//             clearTimeout(timer)
//             timer = null
//         }
//         timer = setTimeout(fn, dealy, ...args)
//     }
// }
//
// function throttle (fn, delay) {
//     let last = Date.now()
//     return function (...args) {
//         if (Date.now() - last >= delay) {
//             fn.apply(this, args)
//             last = Date.now()
//         }
//     }
// }

// 定义一个初始化的方法
// function createEventBus () {
//     return Object.create(EventBus, {
//         eventStack: {
//             value: {}
//         }
//     })
// }
//
// const EventBus = Object.freeze({
//     on (name, cb) {
//         if (!arguments.length || typeof cb !== 'function') return
//         if (this.eventStack[name]) this.eventStack[name].push(cb)
//         else this.eventStack[name] = [cb]
//     },
//     remove (name, cb) {
//         if (!arguments.length || typeof cb !== 'function' || !this.eventStack[name]?.length) return
//         this.eventStack[name] = this.eventStack[name].filter(fn => fn !== cb)
//     },
//     removeMany (nameArr) {
//         if (!arguments.length) {
//             // 由于createEventBus方法内部将eventStack变成了不可写，所以这里要循环清除，不能直接this.eventStack = {}
//             for (let key of Object.getOwnPropertyNames(this.eventStack)) {
//                 delete this.eventStack[key]
//             }
//             return
//         }
//         if (Array.isArray(nameArr)) {
//             for (let item of nameArr) {
//                 delete this.eventStack[item]
//             }
//         }
//     },
//     once (name, cb) {
//         if (!arguments.length || typeof cb !== 'function') return
//         function __once (...args) {
//             Promise.resolve().then(() => cb(...args))
//             this.remove(name, __once)
//         }
//         this.on(name, __once)
//     },
//     emit (name, ...args) {
//         if (!this.eventStack[name]?.length) return
//         for (let i = this.eventStack[name].length - 1; i >= 0; i-- ) {
//             let fn = this.eventStack[name][i]
//             Promise.resolve().then(() => fn?.(...args))
//         }
//     }
// })
//
// let $EventBus = createEventBus()
//
// function fn1 () {
//     console.log('fn1')
// }
//
// function fn2 () {
//     console.log('fn2')
// }
//
// function fn3 () {
//     console.log('fn3')
// }
//
// function fn4 () {
//     console.log('fn4')
// }
//
// function fn5 () {
//     console.log('fn5')
// }
//
// function fn6 () {
//     console.log('fn6')
// }
//
// function fn7 () {
//     console.log('fn7')
// }
//
// function fn8 () {
//     console.log('fn8')
// }
//
// function fn9 () {
//     console.log('fn9')
// }
//
// function fn10 () {
//     console.log('fn10')
// }
//
// console.log($EventBus)
//
// $EventBus.on('f1', fn1)
// $EventBus.on('f1', fn1)
// $EventBus.on('f1', fn1)
// $EventBus.on('f2', fn2)
// $EventBus.on('f3', fn3)
// $EventBus.on('f4', fn4)
// $EventBus.on('f5', fn5)
// $EventBus.removeMany()
// $EventBus.emit('f1')

let _count = 0

function limitAsync (argList, limit, handler) {
    // 存放结果
    let results = []
    return new Promise((resolve, reject) => {
        try {
            // 一上来立马发送出去最大限度的请求数
            for (let i = 0; i < limit; i++) {
                __handler(i)
            }
            let index = limit - 1
            function __handler (i) {
                _count++
                console.log(`我执行的次数：${_count}`)
                // 够数了就不在执行了
                if (results.length === argList.length) {
                    return Promise.allSettled(results).then(resolve)
                }
                // 用promise包装一下方便后续继续then
                let p = Promise.resolve().then(() => handler(argList[i]))
                p.finally(() => __handler(++index))
                results.push(p)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let index = 0

function test (time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (time > 2) resolve(time)
            else reject(time)
        }, time)
    })
}


// async function asyncPool(array, poolLimit, iteratorFn) {
//     const ret = []; // 存储所有的异步任务
//     const executing = []; // 存储正在执行的异步任务
//     for (const item of array) {
//         // 调用iteratorFn函数创建异步任务
//         const p = Promise.resolve().then(() => iteratorFn(item, array));
//         ret.push(p); // 保存新的异步任务
//
//         // 当poolLimit值小于或等于总任务个数时，进行并发控制
//         if (poolLimit <= array.length) {
//             // 当任务完成后，从正在执行的任务数组中移除已完成的任务
//             const e = p.then(() => executing.splice(executing.indexOf(e), 1));
//             executing.push(e); // 保存正在执行的异步任务
//             if (executing.length >= poolLimit) {
//                 await Promise.race(executing); // 等待较快的任务执行完成
//             }
//         }
//     }
//     return Promise.all(ret)
// }



// let testArr = new Array(5).fill(0).map(() => parseInt((Math.random() * 3000)))
// let testArr = new Array(10).fill(0).map((v, i) => (i + 1) * 1000)
// console.log(testArr)
// limitAsync(arr2, 2, test).then(res => {
//     let time = Date.now() - last
//     console.log('limitAsync耗时：',time, res)
// })
// asyncPool(arr2, 2, test).then(res => {
//     let time = Date.now() - last
//     console.log('asyncPool耗时：',time, res)
// })
// let obj = {
//     a:1,
//     b:2,
//     c:3
// }
//
// let obj2 = Object.create(obj)
//
// obj2.d = 4
// obj2.e = {aa: 1, bb: 2, cc: 3}
// obj2.f = [1,2,3,4,5]
// console.log(obj2)
//
// function deepClone (obj) {
//     if (typeof obj !== 'object') return obj
//     let cloneObj = {}
//     for (let key of Object.getOwnPropertyNames(obj)) {
//         cloneObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
//     }
//     return cloneObj
// }
//
// let obj3 = deepClone(obj2)
// obj3.a = 1
//
// console.log(obj2)
// console.log(obj3)

// let p1 = Promise.resolve(12)
// let p2 = new Promise(resolve => {
//     setTimeout(() => {
//         resolve('3秒后我将决议成功')
//     }, 3000)
// })
//
// let p3 = new Promise(resolve => {
//     setTimeout(() => {
//         resolve('1秒后我将决议成功')
//     }, 1000)
// })
//
// let p4 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('2秒后我将决议失败')
//     }, 2000)
// })
//
//
// Promise.myAll = function myAll(pList) {
//     if (!Array.isArray(pList) || !pList?.length) return pList
//     let res = [], count = 0
//     function handle (idx, val, resolve) {
//         res[idx] = val
//         if (res.length === pList.length) resolve(res)
//     }
//     return new Promise((resolve, reject) => {
//         for(let i = 0; i < pList.length; i++) {
//             Promise.resolve(pList[i]).then(res => handle(i, res, resolve)).catch(err => reject(err))
//         }
//     })
// }
//
// Promise.myRace = function myRace(pList) {
//     if (!Array.isArray(pList) || !pList?.length) return pList
//     return new Promise((resolve, reject) => {
//         for(let item of pList) {
//             Promise.resolve(item).then(resolve).catch(reject)
//         }
//     })
// }
//
//
// Promise.myAllSettled = function myAllSettled(pList) {
//     if (!Array.isArray(pList) || !pList?.length) return pList
//     let res = [], count = 0
//     function handle (idx, val, resolve) {
//         res[idx] = val
//         count ++
//         if (count === pList.length) resolve(res)
//     }
//     return new Promise((resolve, reject) => {
//         for(let i = 0; i < pList.length; i++) {
//             Promise.resolve(pList[i]).then(res => handle(i, {status: 'fulfilled', value: res}, resolve)).catch(err => {
//                 handle(i, {status: 'rejected', reason: err}, resolve)
//             })
//         }
//     })
// }
//
//
// Promise.allSettled([p1, p4, p3]).then(res => {
//     console.log('allSettled:', res)
// })
//
// Promise.myAllSettled([p1, p4, p3]).then(res => {
//     console.log('myAllSettled:', res)
// })
//
// Promise.all([p1, p2, p3]).then(res => {
//     console.log('all:', res)
// })
//
// Promise.myAll([p1, p2, p3]).then(res => {
//     console.log('myAll:', res)
// })
//
// Promise.race([p2, p3]).then(res => {
//     console.log('race:', res)
// })
//
// Promise.myRace([p2, p3]).then(res => {
//     console.log('myRace:', res)
// })


// console.dir(Promise)
// console.log(new Promise(cb => cb(2)))


// function MyPromise (cb) {
//     const fulfilled = 'fulfilled'
//     const pending = 'pending'
//     const rejected = 'rejected'
//     this.state = pending
//     this.result = undefined
//     this.reason = undefined
//     this.onFulfilledStack = []
//     this.onRejectedStack = []
//     const resolve = (val) => {
//         if (this.state === pending) {
//             this.state = fulfilled
//             this.result = val
//             this.onFulfilledStack.forEach(fn => fn())
//         }
//     }
//
//     const reject = err => {
//         if (this.state === pending) {
//             this.state = rejected
//             this.reason = err
//             this.onRejectedStack.forEach(fn => fn())
//         }
//     }
//
//     try {
//         cb(resolve, reject)
//     } catch (e) {
//         reject(e)
//     }
// }
//
// function handleThen (retPromise, ret, resolve, reject) {
//     if (retPromise === ret) return reject(new TypeError('不能自己等待自己！'))
//     let lock = false
//     try {
//         if (['function', 'object'].includes(typeof ret)) {
//             let thenFn = ret.then
//             // 如果存在then函数属性，那么就当他是一个promise了
//             if (typeof thenFn === 'function') {
//                 // 那么肯定要等他决议，并且只能执行一次
//                 thenFn.call(ret, res => {
//                     if (lock) return
//                     lock = true // 锁上
//                     // 如果res也是一个promise，那么肯定要等他决议后的返回值用来给最外层的promise来决议
//                     if (res instanceof MyPromise) handleThen(retPromise, res, resolve, reject)
//                     else resolve(res)
//                 }, err => {
//                     if (lock) return
//                     lock = true // 锁上
//                     reject(err)
//                 })
//             }
//         } else {
//             // 如果传入的是一个立即值，那么就直接决议
//             resolve(ret)
//         }
//     } catch (e) {
//         lock = true
//         reject(e)
//     }
//
// }
//
// MyPromise.prototype[Symbol.toStringTag] = 'Promise'
// MyPromise.prototype.then = function then (onFulfilled, onRejected) {
//     let retPromise = new MyPromise((resolve, reject) => {
//         const __then = val => handleThen(retPromise, val, resolve, reject)
//         if (typeof onFulfilled === 'function' && this.state === 'fulfilled')__then(onFulfilled(this.result))
//         if (typeof onRejected === 'function' && this.state === 'rejected') __then(onRejected(this.reason))
//         if (this.state === 'pending') {
//             this.onFulfilledStack.push(() => {
//                 __then(onFulfilled(this.result))
//             })
//
//             this.onRejectedStack.push(() => {
//                 __then(onRejected(this.reason))
//             })
//         }
//     })
//
//     return retPromise
// }
//
//
// MyPromise.resolve = function resolve(val) {
//     if (val instanceof MyPromise) {
//         console.log('yes')
//         return val
//     }
//     return new MyPromise(resolve => {
//         resolve(val)
//     })
// }
//
// MyPromise.reject = function reject(val) {
//     return new MyPromise((resolve, reject) => {
//         reject(val)
//     })
// }

// function myNwe (fn, ...rest) {
//     if (typeof fn !== 'function') return new TypeError('第一个参数必须是函数！')
//     // 1.创建一个对象obj
//     // 2.这个obj就是传入fn内部的this
//     // 3.obj的原型被设置成传入函数的prototype对象
//     // 4.如果传入函数的返回值不是一个有效的对象，那么就返回obj，反之则为fn的返回值
//     let obj = {}
//     let result = fn.call(obj, ...rest)
//     Object.setPrototypeOf(obj, fn.prototype)
//     if (!result || ['function', 'object'].includes(typeof result)) return obj
//     return result
// }
//
// function myInstanceof (source, target) {
//     if (typeof source !== 'object' || typeof target !== 'function') return new TypeError('传入参数的类型不正确！')
//     // 只检查三层的原型链查找
//     // 检查3层内的原型链上的对象是否与目标函数的prototype属性是同一个东西
//     let obj = Object.getPrototypeOf(source)
//     for (let i = 0; i < 2; i++) {
//         if (obj === target.prototype) return true
//         obj = Object.getPrototypeOf(obj)
//     }
//     return false
// }
//
// const myTypeOf = (val) => {
//     let type = Object.prototype.toString.call(val)
//     return type.slice(8, -1).toLowerCase()
// }

// function Foo (a, b, c) {
//     this.a = a
//     this.b = b
//     this.c = c
// }
//
//
// console.log(Foo)


Function.prototype.myCall = function myCall (thisArg, ...args) {
    thisArg.fn = this
    thisArg.fn(...args)
    delete thisArg.fn
}

Function.prototype.myApply = function myCall (thisArg, args) {
    thisArg.fn = this
    thisArg.fn(...args)
    delete thisArg.fn
}

// myBind方法要兼容new操作符
Function.prototype.myBind = function myCall (thisArg = window, ...args) {
    // 形如fn.bind(obj),那么此刻的this就是fn
    let fn = this
    // 创建一个空函数，等下会设置他的prototype来做一个参照
    function __Prototype () {}
    function Fbind (...args2) {
        return fn.apply(
            // 如果使用了new（即 new Fbind()），那么这里的this就是被new时创建的新对象，由于new的原理，this instanceof __Prototype必是true，那么就使用被new时创建的新对象作为this
            (
                this instanceof __Prototype ?  this : thisArg
            ),
            args.concat(args2)
        )
    }
    // 设置参照
    __Prototype.prototype = this.prototype
    // 这里其实可以这样做：Fbind.prototype = this.prototype，再用new包一层的原因是方便以后对返回的Fbind做拓展，可能会涉及到在Fbind.prototype上做新的方法、属性添加，如果不包一层会会对this.prototype产生污染。
    Fbind.prototype = new __Prototype()
    return Fbind
}

function foo (a, b) {
    this.aaa = a
    this.bbb = b
}

let foo2 = new foo(1, 2)

function sleep (delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, delay)
    })
}

function myInstanceOf (obj, Fn) {
    if (!Fn.prototype) return false
    let objProto = Object.getPrototypeOf(obj)
    while (objProto) {
        if (objProto === Fn.prototype) return true
        else objProto = Object.getPrototypeOf(objProto)
    }
    return false
}

function myNew (fn, ...args) {
    if (!fn.prototype) return new Error('你个吊毛传了什么玩意进来？')
    let newObj = {}
    let res = fn.apply(newObj, args)
    Object.setPrototypeOf(newObj, fn.prototype)
    if (['function', 'object'].includes(typeof res)) return res
    return newObj
}

Function.prototype.myCall = function (thisArg = window, ...args) {
    thisArg.fn = this
    let res = thisArg.fn(...args)
    delete thisArg.fn
    return res
}

Function.prototype.myApply = function (thisArg = window, args) {
    thisArg.fn = this
    let res = thisArg.fn(...args)
    delete thisArg.fn
    return res
}

Function.prototype.myBind = function (thisArg = window, ...args) {
    let fn = this
    function empty () {}
    empty.prototype = this.prototype
    resBind.prototype = new empty()
    function resBind (...args2) {
        return fn.apply(
            (
                this instanceof empty && thisArg ? this : thisArg
            ),
            args.concat(args2)
        )
    }
    return resBind
}




function curry (fn, ...args) {
    return fn.length > args.length ? (...args2) => curry(fn, ...args.concat(args2)) : fn(...args)
}

function add (a, b, c, d, e) {
    console.log(a + b + c + d + e)
}

let fn = curry(add)
// fn(1)(2)(3)(4)(5)

let str = 'https://blog.csdn.net/An1090239782/article/details/117464917?aaa=s&ccc=123&aaa=244&bbb=434'
let url = 'https://juejin.cn/?a=666&b=iloveyou&c=888&a=520&d=youloveme'
function parserUrl (url) {
    try {
        let urlParams = new URL(url).searchParams
        let res = {}
        for (let item of urlParams.entries()) {
            let [k, v] = item
            if (res[k]) res[k].push(v)
            else res[k] = [v]
        }
        return res
    } catch (e) {
        return new Error('输入了无效的url')
    }
}

// console.log(parserUrl(url))
// console.log(parserUrl(str))


function feibo (n) {
    if (n === 1 || n === 2) {
        return [1, 1].join()
    }

    function add (n1, n2, i) {
        let s1 = n2
        let s2 = n1 + n2
        i++
        if (i >= n) return s2
        return add(s1, s2, i)
    }
    return add(1, 1, n - (n - 2))
}

// for (var i = 0; i< 2; i++) {
//     (function (i) {
//         setTimeout(function () {
//             console.log(i)
//         })
//     })(i)
// }

// console.log(Object.getOwnPropertyNames(obj33))
// for (let key in obj33) {
//     console.log(key)
// }


// function deepClone(obj) {
//     if (typeof obj !== 'object' || obj === null) return obj
//     let weakSet = new WeakSet()
//     function dc (obj) {
//         if (weakSet.has(obj)) throw new Error('你个吊毛乱搞对象是不是？')
//         weakSet.add(obj)
//         let keys = Object.getOwnPropertyNames(obj)
//         let newObj = {}
//         for (let key of keys) {
//             newObj[key] = typeof obj[key] === 'object' ? dc(obj[key]) : obj[key]
//         }
//         return newObj
//     }
//     // 这里可以尾调用优化，给靓仔们发挥了
//     return dc(obj)
// }


// let obj111 =  { a: 1, b: { c: 1, d: 2 }}
// obj111.b.c = obj111.b
// let obj222 = deepClone(obj111)
// console.log(obj111)
// console.log(obj222)

function CreateABoy (name) {
    this.name = name
    this.queue = []
    setTimeout(() => this.next())
}
CreateABoy.prototype.sleep = function sleep (delay) {
    this.queue.push(() => {
        setTimeout(() => {
            console.log(`${ delay / 1000}s 之后`)
            this.next()
        }, delay)
    })
    return this
}

CreateABoy.prototype.sayHi = function sayHi () {
    this.queue.push(() => {
        console.log(`大家好我是${this.name}`)
        this.next()
    })
    return this
}

CreateABoy.prototype.play = function play (val) {
    this.queue.push(() => {
        console.log(`我在玩${val}`)
        this.next()
    })
    return this
}

CreateABoy.prototype.next = function next () {
    if (!this.queue.length) return
    let fn = this.queue.shift()
    fn?.()
}
let boy = new CreateABoy('tony')
boy.sayHi().sleep(1000).play('王者').sleep(2000).play('跳一跳')

