interface resObjType {
    [key: string] : string | boolean
}

const getType = (value: any): string => Object.prototype.toString.call(value)

export function isEmpty(data: any) {
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

    if (resObj[getType(data)]) return true

    // 只有对象和数组会往下执行
    if (Array.isArray(data)) return !!data.length

    // 最后是对象
    if (JSON.stringify(data) === '{}') return true

    // {  } 这种情况
    return !!Object.keys(data).length
}
