export function debounce(fn: Function, delay: number) {
    let timer: any = null
    return (...args: any) => {
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
