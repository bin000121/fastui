import { h, render, App, VNode } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'
import MsgComponent from './Message.vue'

let instanceList: any[] = []
const msgGap = 12
const initOffsetTop = 20
// 只是关闭点击的消息，其dom还在，先执行完退场动画后，才会去移除dom
const closeMsg = (id: string) => {
    const index = instanceList.findIndex((value: any) => value.el.id === id)
    if (index < 0) return
    let vnode = instanceList[index]
    // 记录该条要消失的message的高度
    let height = vnode.el.offsetHeight
    instanceList.splice(index, 1)
    // 从该index删除的地方开始，不管有没有清除定时器，一定对应到开始消失的message下标
    for (let i = index; i < instanceList.length; i++) {
        let itemTop = parseInt(instanceList[i].el.style.top, 10)
        instanceList[i].el.style.top = (itemTop - height - msgGap) + 'px'
    }
}

const MsgInstance: MessageType = ((options: optionsType) => {
    // 页面上最多10条信息
    if (instanceList.length >= 10) return
    if (['string', 'number'].includes(typeof options)) {
        // 如果传入string且直接调用，那就默认是info类型
        options = {
            message: options as Message
        } as optType
    }
    const id = getRandomId('f-message')
    options = {
        top: initOffsetTop,
        ...(options as optType),
        closeMsg: () => closeMsg(id),
        id,
        removeDom: () => {
            const dom: HTMLElement = document.getElementById(id)!
            dom && dom.parentNode!.removeChild(dom)
        },
    }
    options.type = options.type || 'default'
    // 处理template是函数的情况
    if (typeof options.template === 'function') options.template = String(options.template())
    // 当开启合并时

    if (instanceList.length) {
        // 当message或者template相同，且类型也一致时则视为相同实例，予以合并
        if (options.merge) {
            const [k, v] = options.template ? ['template', options.template] : ['message', options.message]
            for (let i = 0; i< instanceList.length; i++) {
                if (instanceList[i].props[k as string] !== v ||
                    instanceList[i].component.props.type !== (options.type || 'default')
                ) continue
                instanceList[i].component.props.mergeCount++
                instanceList[i].component.ctx.stopTimer()
                instanceList[i].component.ctx.startTimer()
                return {
                    el: instanceList[i],
                    close: () => instanceList[i].component.proxy.isShow = false
                } as MsgInstanceRes
            }
        }
        for (let i = 0; i< instanceList.length; i++) {
            let height = instanceList[i].el.offsetHeight || 0
            options.top += height + msgGap
        }
    }
    const vnode = h(MsgComponent, options as any)
    instanceList.push(vnode)
    render(vnode, document.createElement('div'))
    document.body.appendChild(vnode.el as HTMLElement)
    return {
        el: vnode,
        close: () => vnode.component!.proxy!.isShow = false
    } as MsgInstanceRes
}) as any

let msgTypeList = ['default', 'info', 'success', 'error', 'warning', 'loading'] as const
msgTypeList.forEach(type => {
    MsgInstance[type] = (options: optionsType) => {
        options = ['string', 'number'].includes(typeof options) ?
            ({ type, message: options } as optType)
            :
            { type, ...(options as optType) }
        return MsgInstance(options)
    }
})

MsgInstance.closeAllMsg = () => {
    if (!instanceList.length) return
    for (let item of instanceList) {
        item.props.removeDom()
    }
    instanceList.length = 0
}

type messageFn = () => string | number
type Message = string | number | messageFn
type Template = () => string

export interface optType {
    message: Message;
    id?: string;
    top?: string | number;
    type?: string | 'default' | 'info' | 'success' | 'error' | 'warning' | 'loading';
    duration?: number;
    isShowClose?: boolean;
    isShowIcon?: boolean;
    removeDom?: (id: string) => void;
    closeMsg?: () => void;
    template?: string | Template
    merge?: boolean // 开启合并
}

export type optionsType = optType | string | number

export interface MessageType {
    (options: optionsType): MsgInstanceRes
    default: (options: optionsType) => MsgInstanceRes;
    info: (options: optionsType) => MsgInstanceRes;
    success: (options: optionsType) => MsgInstanceRes;
    error: (options: optionsType) => MsgInstanceRes;
    warning: (options: optionsType) => MsgInstanceRes;
    loading: (options: optionsType) => MsgInstanceRes;
    closeAllMsg: () => void;
    install?: (app: App) => void;
}

export interface MsgInstanceRes {
    el: VNode,
    close: () => void
}

export default MsgInstance
