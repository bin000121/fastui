enum Sex {
    male = 1,
    female = 0,
    null = -1
}
let a: object = {}

let b = {a: 1, b: 2} as const
interface _obj {
    a: string
}

interface _foo {
    (src: string, tar: number): boolean
}

function foo(obj: _obj) {
    return obj
}

let __foo: _foo
__foo = (s: string, ta: number) => {
    return ta > 1
}


