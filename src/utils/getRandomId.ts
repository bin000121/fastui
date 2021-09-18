// 获取随机id
let seed = 0
export function getRandomId(prefix: string = '') {
    const word = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let Word = word[Math.floor(Math.random() * word.length)]
    return prefix +'_' + Date.now().toString().slice(-4) + Word + seed++
}
