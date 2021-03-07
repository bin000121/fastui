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
