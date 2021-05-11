import { h, render, App } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

import NotificationComponent from './Notification.vue'

export interface Instance {
    'top-left': any[];
    'top-right': any[];
    'bottom-left': any[];
    'bottom-right': any[];
    [key: string]: any;
}

export interface NotifyType {
    (options: Options): () => void
    info: (options: Options) => () => void;
    success: (options: Options) => () => void;
    error: (options: Options) => () => void;
    warning: (options: Options) => () => void;
    closeAll?: () => void;
    install: (app: App) => void;
}

export type Placement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface Options {
    id?: string;
    content: string | number;
    title: string | number;
    top?: string | number;
    bottom?: string | number;
    type?: 'info' | 'success' | 'error' | 'warning';
    placement?: Placement,
    duration?: number;
    isShowClose?: boolean;
    isShowIcon?: boolean;
    removeDom?: (id: string) => void;
    close?: (id: string, placement: Placement) => void;
    onClose?: () => void;
    onClosed?: () => void;
}

let instance: Instance = {
    'top-left': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-right': []
}

const msgGap = 15
const initOffsetY = 20
const initOffsetX = 30

const closeNotify = (id: string, placement: Placement) => {
    const instanceList = instance[placement] || []
    const [directionY] = placement.split('-')
    const index = instanceList.findIndex((value: any) => value.el.id === id)
    if (index < 0) return
    let { el } = instanceList[index]
    setTimeout(() => {
        let height = el.offsetHeight
        instanceList.splice(index, 1)
        for (let i = index; i < instanceList.length; i++) {
            let itemTop = parseInt(instanceList[i].el.style[directionY])
            instanceList[i].el.style[directionY] = (itemTop - height - msgGap) + 'px'
        }
    })
}

const notifyInstance: NotifyType = ((options: Options) => {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
        console.warn("[fast-ui]: property 'options' must be an object type!")
        return
    }
    const id = getRandomId('f-notification')
    const placement = options.placement || 'top-right'
    // const direction = placement.startsWith('top') ? 'top' : 'bottom'
    const [directionY, directionX] = placement.split('-')
    options = {
        ...options,
        [directionY]: initOffsetY,
        [directionX]: initOffsetX,
        id,
        removeDom: () => {
            const dom: any = document.getElementById(id)
            dom && dom?.parentNode.removeChild(dom)
        },
    }
    options.close = () => closeNotify(id, placement)
    const instanceList = instance[placement] || []
    if (instanceList.length) {
        for (let i = 0; i< instanceList.length; i++) {
            let distance = instanceList[i].el.offsetHeight || 0
            // options.top = 'unset'
            // options.bottom = 'unset'
            // if (options[directionY] === 'unset') options[directionY] = 0
            options[directionY as 'top' | 'bottom'] += distance + msgGap
        }
    }
    const vnode = h(NotificationComponent, options as any)
    instance[placement].push(vnode)
    render(vnode, document.createElement('div'))
    document.body.appendChild(vnode.el as HTMLElement)
    return () => closeNotify(id, placement)
}) as any

let notifyTypeList = ['info', 'success', 'error', 'warning'] as const
for (const type of notifyTypeList) {
    notifyInstance[type] = (options: Options) => notifyInstance({ ...options, type })
}

export default notifyInstance