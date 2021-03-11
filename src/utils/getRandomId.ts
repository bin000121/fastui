export function getRandomId(prefix: string = '') {
    const word = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let num = word[Math.floor(Math.random() * word.length)] + Math.floor(Math.random() * 100)
    return prefix +'-' + Date.now().toString() + num
}
