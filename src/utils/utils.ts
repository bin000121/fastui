// 获取滚动条宽度
export function getScrollbarWidth(): number {
    return window.innerWidth - document.body.offsetWidth
}

interface IsEmptyResObjType {
    [key: string] : boolean
}

// 获取传入数据类型
const _getType = (value: any): string => Object.prototype.toString.call(value)


// 监测是否空类型
export function isEmpty(data: any) {
    let resObj: IsEmptyResObjType = {
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

interface IsEqualResObjType {
    [key: string] : boolean
}

// 检测是否相等
// export function isEqual (value: any, value2: any) {
//     const _isEmptyArray = (data: any[], data2: any[]) => {
//         if (data.length !== data2.length) return false
//         let length = data.length
//         for (const item of data) {
//             return
//         }
//         return false
//     }
//
//     const _isEmptyObject = (data: object, data2: object) => {
//         let length = Object.keys(data).length
//         let length2 = Object.keys(data2).length
//         if (length !== length2) return false
//         for (let key in data) {
//             if (!data2?[key]) return false
//             let value = data[key]
//             let value2 = data[key]
//             isEqual(value, value2)
//         }
//     }
//
//     let simpleObj: IsEqualResObjType = {
//
//     }
//
//     let resObj: IsEqualResObjType = {
//         '[object Boolean]': value === value2,
//         '[object Number]': value === value2,
//         '[object RegExp]': false,
//         '[object Error]': false,
//         '[object Function]': false,
//         '[object Null]': value === value2,
//         '[object Undefined]': value === value2,
//         '[object Array]': _isEmptyArray(value, value2),
//         '[object Object]': _isEmptyObject(value, value2)
//     }
//
//     // 如果类型都不对，那就当然不相等
//     if (_getType(value) !== _getType(value2)) return false
//     return resObj[_getType(value)]
// }



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

// 是否有效单位
export function isCorrectUnit (unit: string | number | undefined) {
    if (!unit) return '0px'
    if (typeof unit === 'number') return unit + 'px'
    const reg = /px|%|vw|vh|em|rem/
    let match = (unit! as string).match(reg)
    return match?.length ? parseInt(unit! as string) + match[0] : '0px'
}

