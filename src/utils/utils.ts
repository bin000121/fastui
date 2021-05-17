// 获取滚动条宽度
export function getScrollbarWidth(): number {
    return window.innerWidth - document.body.offsetWidth
}

interface resObjType {
    [key: string] : boolean
}
// 监测是否空类型
export function isEmpty(data: any) {
    const _getType = (value: any): string => Object.prototype.toString.call(value)
    let resObj: resObjType = {
        '[object Boolean]': true,
        '[object Number]': true,
        '[object RegExp]': true,
        '[object Error]': true,
        '[object Function]': true,
        '[object Null]': true,
        '[object Undefined]': true,
        '[object Array]': false,
        '[object Object]': false
    }
    if (resObj[_getType(data)]) return true

    // 只有对象和数组会往下执行
    if (Array.isArray(data)) return !data.length

    // 最后是对象， 空对象的取值数组必定是空。即{} 或者 {  }

    return !!Object.values(data).length
}

// 函数节流
export function throttle (fn: Function, delay: number) {
    let flag = false
    return (...args: any) => {
        if (!flag) {
            fn(...args)
            flag = true
            setTimeout(() => flag = false, delay)
        }
    }
}

// 函数防抖
export function debounce(fn: Function, delay: number) {
    let timer: any = null
    return (...args: any) => {
        // 小于零则立马执行
        if (delay <= 0) {
            fn(...args)
            return
        }
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
            timer = null
        }, delay)
    }
}

export function isFirefox() {
    return window.navigator.userAgent.includes('Firefox')
}

