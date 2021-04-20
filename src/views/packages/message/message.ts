import { h, render, App } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'
import MsgComponent from './Message.vue'

let instanceList: any[] = []
const msgGap = 12
const initOffsetTop = 20
const closeMsg = (id: string) => {
    const index = instanceList.findIndex((value: any) => value.el.id === id)
    if (index < 0) return
    let vnode = instanceList[index]
    // 记录该条要消失的message的高度
    let height = vnode.el.offsetHeight
    instanceList.splice(index, 1)
    // 从该index删除的地方开始，不管有没有清除定时器，一定对应到开始消失的message下标
    for (let i = index; i < instanceList.length; i++) {
        let itemTop = parseInt(instanceList[i].el.style.top)
        instanceList[i].el.style.top = (itemTop - height - msgGap) + 'px'
    }
}

const MsgInstance: MessageType = ((options: optionsType) => {
    // 页面上最多10条信息
    if (instanceList.length >= 10) return
    if (typeof options === 'string') {
        // 如果传入string且直接调用，那就默认是info类型
        options = {
            message: options
        }
    }
    const id = getRandomId('f-message')
    options = {
        top: initOffsetTop,
        ...options,
        closeMsg: () => closeMsg(id),
        id,
        removeDom: () => {
            const dom: any = document.getElementById(id)
            dom && dom?.parentNode.removeChild(dom)
        },
    }
    if (instanceList.length) {
        for (let i = 0; i< instanceList.length; i++) {
            let height = instanceList[i].el.offsetHeight || 0
            options.top += height + msgGap
        }
    }
    const vnode = h(MsgComponent, options as any)
    instanceList.push(vnode)
    render(vnode, document.createElement('div'))
    document.body.appendChild(vnode.el as HTMLElement)
}) as any

let msgTypeList = ['default', 'info', 'success', 'error', 'warning', 'loading'] as const
msgTypeList.forEach(type => {
    MsgInstance[type] = (options: optionsType) => {
        options = typeof options === 'string' ? { type, message: options } : { type, ...options }
        return MsgInstance(options)
    }
})

MsgInstance.closeAllMsg = () => {
    if (!instanceList.length) return
    for (let item of instanceList) {
        item.props.removeDom()
    }
    instanceList = []
}

export interface optType {
    message: string | number;
    id?: string;
    top?: string | number;
    type?: 'default' | 'info' | 'success' | 'error' | 'warning' | 'loading' | string;
    duration?: number;
    isShowClose?: boolean;
    isShowIcon?: boolean;
    removeDom?: (id: string) => void;
    closeMsg?: () => void;
    template?: string;
}

export type optionsType = optType | string

export interface MessageType {
    (options: optionsType): void
    default: (options: optionsType) => void;
    info: (options: optionsType) => void;
    success: (options: optionsType) => void;
    error: (options: optionsType) => void;
    warning: (options: optionsType) => void;
    loading: (options: optionsType) => void;
    closeAllMsg: () => void;
    install: (app: App) => void;
}

export default MsgInstance
