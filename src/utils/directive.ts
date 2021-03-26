import { App, ObjectDirective, DirectiveBinding } from 'vue'
import { highlightBlock } from 'highlight.js'

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
                    console.log('复制完成')
                }
            } catch (e) {
                console.log('复制失败！')
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


export default {
    install (app: App) {
        app.directive('clickOutside', clickOutside)
        app.directive('highlight', highlight)
        app.directive('copy', copy)
    }
}
