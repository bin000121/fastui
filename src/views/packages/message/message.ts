import { App, render, h } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

import MsgComponent from './Message.vue'

const instanceList: any[] = []
const msgGap = 15
const initOffsetTop = 20
let heightTop = 0
const close = (id: string) => {
    const index = instanceList.findIndex((value: any) => value.el.id === id)
    if (index < 0) return
    let vnode = instanceList[index]
    let height = vnode.el.offsetHeight
    heightTop += height + msgGap
    instanceList.splice(index, 1)
    for (let item of instanceList) {
        let itemTop = item.el.offsetTop
        item.el.style.top = (itemTop - heightTop) + 'px'
        console.log(item.el.style.top)
    }
    heightTop = 0
}
// const handleTop = (index: number) => {
//     if (index === -1) return
//     // 记录该条消息的高度，为后续每一个消息都减去这个高度
//     const removeHeight = instanceList[index].el.offsetHeight
//     instanceList.splice(index, 1)
//     if (instanceList.length > 1) {
//         for (let i = 0; i< instanceList.length; i++) {
//             const topNum = parseInt(instanceList[i].component.props.top, 10)
//             instanceList[i].component.props.top = topNum - removeHeight - msgGap + 'px'
//         }
//     }
// }
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
        removeDom: () => {
            const dom: any = document.getElementById(id)
            dom && dom?.parentNode.removeChild(dom)
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
