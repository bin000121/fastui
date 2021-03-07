export function debounce(fn: Function, delay: number, isFirst?: boolean) {
    let timer: any = null
    return (...args: any) => {
        if (isFirst) {
            fn(...args)
            isFirst = false
        }
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
            timer = null
        }, delay)
    }
}
