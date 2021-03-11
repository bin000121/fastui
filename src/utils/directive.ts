import { App, ObjectDirective } from 'vue'
import hljs from 'highlight.js'

// v-clickOutside

const clickOutside: ObjectDirective = {
    created: (el, binding, vnode: any) => {
        el.handle = (e: MouseEvent) => {
            const { instance, value }: any = binding
            console.log(binding)
            // const instance = vnode.ref.i.ctx
            if (!instance.showOptionList) return
            if (!el.contains(e.target)) {
                value()
                // instance.changeFocusOrBlur('blur')
            }
        }
    },
    mounted: el => {
        document.addEventListener('click', el.handle)
    },
    updated: (el) => {

    },
    unmounted: el => {
        document.removeEventListener('click', el.handle)
    }
}

// v-highlight

const highlight: ObjectDirective = {
    mounted: (el) => {
        const blocks = el.querySelectorAll('pre code')
        blocks.forEach((block: any) => {
            hljs.highlightBlock(block)
        })
    }
}

// v-copy

const copy: ObjectDirective = {
    created: (el, binding) => {
        el.__copyValue = binding.value
        el.handleCopy = () => {
            const inputDom: any = document.createElement('input')
            inputDom.value = el.__copyValue
            const body = document.body
            body.appendChild(inputDom)
            inputDom.select()
            try {
                if (document.execCommand('coppy', false)) {
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
    }
}


export default {
    install (app: App) {
        app.directive('clickOutside', clickOutside)
        app.directive('highlight', highlight)
        app.directive('copy', copy)
    }
}
