import { App, ObjectDirective, DirectiveBinding } from 'vue'
import { highlightBlock } from 'highlight.js'
import $msg from '/@/views/packages/message'

// v-clickOutside

const nodeObj: any = {}

const newClickOutsideHandler = (el: any, binding: DirectiveBinding<any>) => {
    const { instance, value }: any = binding
    return (e: MouseEvent) => {
        if (!instance ||
            !e.target ||
            el.contains(e.target) ||
            el === e.target
        ) return
        value()
    }
}
const clickName = 'ontouchstart' in window ? 'touchstart' : 'click';
document.addEventListener(clickName, (e: MouseEvent | TouchEvent) => {
    for (const item in nodeObj) {
        nodeObj[item].__clickOutside(e)
    }
})

const clickOutside: ObjectDirective = {
    beforeMount: (el, binding) => {
        const { instance: { id }, value }: any = binding
        if (!value) {
            console.warn(`[v-clickOutside]: binding.value is not a function`)
            return
        }
        nodeObj[id] = el
        el.__clickOutside = newClickOutsideHandler(el, binding)
    },
    updated: (el, binding) => {
        el.__clickOutside = newClickOutsideHandler(el, binding)
    },
    unmounted: (el, binding) => {
        const { instance: { id } }: any = binding
        delete nodeObj[id]
        delete el.__clickOutside
    }
}

// v-highlight

const highlight: ObjectDirective = {
    mounted: (el: any) => {
        const blocks = el.querySelectorAll('pre code')
        blocks.forEach((block: any) => {
            highlightBlock(block)
        })
    }
}

// v-copy

const copy: ObjectDirective = {
    beforeMount: (el, binding) => {
        el.__copyValue = binding.value
        el.handleCopy = () => {
            const inputDom: any = document.createElement('input')
            inputDom.value = el.__copyValue
            const body = document.body
            body.appendChild(inputDom)
            inputDom.select()
            try {
                if (document.execCommand('copy', false)) {
                    $msg.success('复制成功！')
                }
            } catch (e) {
                $msg.error('复制失败！')
            } finally {
                inputDom.parentNode.removeChild(inputDom)
            }
        }
    },
    mounted: (el) => {
        el.addEventListener('click', el.handleCopy)
    },
    updated: (el, binding) => {
        el.__copyValue = binding.value
    },
    unmounted: el => {
        el.removeEventListener('click', el.handleCopy)
        delete el.__copyValue
    }
}


// v-longPress

const longPress: ObjectDirective = {
    beforeMount: (el, binding) => {
        const { value: handler } = binding
        el.__timer = 0
        el.__start = 0
        el.handleDown = (e: MouseEvent) => {
            e.stopPropagation()
            // 必须是鼠标左键
            if (e.button !== 0) return
            el.__start = Date.now()
            if (el.__timer) clearInterval(el.__timer)
            el.__timer = setInterval(handler, 100)
        }
        el.handleUp = (e: MouseEvent) => {
            e.stopPropagation()
            if (Date.now() - el.__start < 100) handler()
            clearInterval(el.__timer)
            el.__timer = null
        }
    },
    mounted: el => {
        el.addEventListener('mousedown', el.handleDown)
        document.addEventListener('mouseup', el.handleUp)
    },
    unmounted: el => {
        el.removeEventListener('mousedown', el.handleDown)
        document.removeEventListener('mouseup', el.handleUp)
        delete el.__timer
        delete el.__start
    }
}

export default {
    install (app: App) {
        app.directive('clickOutside', clickOutside)
        app.directive('highlight', highlight)
        app.directive('copy', copy)
        app.directive('longPress', longPress)
    }
}
