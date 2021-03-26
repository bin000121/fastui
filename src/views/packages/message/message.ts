import { App, render, h } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

import MsgComponent from './Message.vue'

const instanceList: any[] = []
let idNum = 1
const msgGap = 15
const initOffsetTop = 20
const close = (id: string, userOnClose: any) => {
    console.log(userOnClose)
    userOnClose?.()
    console.log(111)
}
const MsgInstance: any = (options: optionsType) => {
    // 页面上最多8条信息
    if (instanceList.length > 10) return
    const container: HTMLDivElement = document.createElement('div')
    if (typeof options === 'string') {
        // 如果传入string且直接调用，那就默认是info类型
        options = {
            message: options
        }
    }
    const userOnClose = options.onClose
    const id = getRandomId('f-message') + '-' + (idNum++)

    options = {
        ...options,
        onClose: () => {
            console.log(222)
            close(id, userOnClose)
        },
        id,
        handleTop: () => {
            const index = instanceList.findIndex((value: any) => value.el.id === id)
            if (index === -1) return
            // 记录该条消息的高度，为后续每一个消息都减去这个高度
            const removeHeight = instanceList[index].el.offsetHeight
            instanceList.splice(index, 1)
            if (instanceList.length > 1) {
                for (let i = 0; i< instanceList.length; i++) {
                    console.log(i)
                    const topNum = parseInt(instanceList[i].component.props.top, 10)
                    instanceList[i].component.props.top = topNum - removeHeight - msgGap + 'px'
                }
            }
        },
        removeDom: (id: string) => {
            const dom: any = document.getElementById(id)
            dom.parentNode.removeChild(dom)

        },

    }
    options.top = options.top || initOffsetTop
    // 防止每一条消息重叠
    for (let i = 0; i< instanceList.length; i++) {
        let height = instanceList[i].el.offsetHeight || 0
        options.top += height + msgGap
    }
    // if (instanceList.length > 0) {
    //     let lastMsgVnode = instanceList.slice(-1)[0]
    //     options.top = parseInt(lastMsgVnode.component.props.top, 10) + lastMsgVnode.el.offsetHeight + msgGap + 'px'
    // }
    const vnode = h(MsgComponent, options as any)
    // vnode.props.onDestroy = () => {
    //     console.log(1111)
    //     console.log(vnode)
    //     render(null, container)
    // }
    render(vnode, container)
    console.log(vnode)
    instanceList.push(vnode)
    console.log(instanceList)
    document.body.appendChild(container.children[0])
}


['info', 'success', 'error', 'warning'].forEach((type: any) => {
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



interface optionType {
    id?: string;
    top?: string | number;
    type?: string;
    message?: string | boolean | number;
    duration?: number;
    isShowClose?: boolean;
    handleTop?: () => void;
    removeDom?: (id: string) => void;
    onClose?: (id: string) => void;
}

type optionsType = string | optionType

interface MessageType {
    (options: optionsType):  () => void;
    info: (options: optionsType) => void;
    success: (options: optionsType) => void;
    error: (options: optionsType) => void;
    warning: (options: optionsType) => void;
}

export default {
    install(app: App) {
        app.provide('$message', MsgInstance)
    }
}
