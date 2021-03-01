export function isEmpty(data: any) {
    if (['boolean', 'number', 'symbol', 'function'].includes(typeof data)) return false
    if (typeof data === 'string') return !data
    if (Array.isArray(data)) return !!data.length
    let isNull = null
    if (isNull === data) return false
    if (typeof data === 'object') return JSON.stringify(data) === '{}'
    return !!data
}
