import { App, render, h } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

import MsgComponent from './Message.vue'

const instanceList: any[] = []
const closeTimeoutList: string[] = []
const msgGap = 15
const initOffsetTop = 20
const close = (id: string) => {
    const index = instanceList.findIndex((value: any) => value.el.id === id)
    if (index < 0) return
    let vnode = instanceList[index]
    let height = vnode.el.offsetHeight
    instanceList.splice(index, 1)
    for (let item of instanceList) {
        let itemTop = item.el.offsetTop
        let timeoutIndex = closeTimeoutList.indexOf(id)
        if (timeoutIndex !== -1) {
            item.el.style.top = initOffsetTop + 'px'
            continue
        }
        item.el.style.top = (itemTop - height - msgGap) + 'px'
        console.log(item.el.style.top)
    }
}
const MsgInstance: any = (options: optionsType) => {
    // 页面上最多10条信息
    if (instanceList.length > 10) return
    const container: HTMLDivElement = document.createElement('div')
    if (typeof options === 'string') {
        // 如果传入string且直接调用，那就默认是info类型
        options = {
            type: 'info',
            message: options
        }
    }
    const id = getRandomId('f-message')
    options = {
        top: initOffsetTop,
        ...options,
        onClose: () => {
            close(id)
        },
        id,
        isCloseTimeout: () => {
            closeTimeoutList.push(id)
        },
        removeDom: () => {
            const dom: any = document.getElementById(id)
            dom && dom?.parentNode.removeChild(dom)
            let index = closeTimeoutList.indexOf(id)
            index >= 0 &&closeTimeoutList.splice(index, 1)
        },
    }
    // 防止每一条消息重叠
    for (let i = 0; i< instanceList.length; i++) {
        let height = instanceList[i].el.offsetHeight || 0
        options.top += height + msgGap
    }
    const vnode = h(MsgComponent, options as any)
    render(vnode, container)
    instanceList.push(vnode)
    document.body.appendChild(container.children[0])
}

(['info', 'success', 'error', 'warning'] as const).forEach((type: string) => {
    MsgInstance[type] = (options: optionsType): void => {
        if (typeof options === 'string') {
            options = {
                type,
                message: options
            }
        }
        return MsgInstance(options)
    }
})

MsgInstance.closeAll = () => {
    for (let item of instanceList) {
        item.type.props.removeDom()
    }
}

interface optionType {
    id?: string;
    top?: string | number;
    type?: 'info' | 'success' | 'error' | 'warning' | string;
    message?: string | boolean | number;
    duration?: number;
    isShowClose?: boolean;
    handleTop?: () => void;
    removeDom?: (id: string) => void;
    isCloseTimeout?: () => void;
    onClose?: () => void;
}

type optionsType = optionType | string

interface MessageType {
    (options: optionsType):  () => void;
    info: (options: optionsType) => void;
    success: (options: optionsType) => void;
    error: (options: optionsType) => void;
    warning: (options: optionsType) => void;
    closeAll: () => void;
}

// export default {
//     install(app: App) {
//         app.provide('$message', MsgInstance as MessageType)
//     }
// }

export default MsgInstance as MessageType
