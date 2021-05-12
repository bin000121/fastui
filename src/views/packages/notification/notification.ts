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
    left?: string | number;
    right?: string | number;
    offsetX?: number | string;
    offsetY?: number | string;
    icon?: string;
    type?: 'info' | 'success' | 'error' | 'warning';
    placement?: Placement,
    duration?: number;
    isShowClose?: boolean;
    isShowIcon?: boolean;
    isShowBar?: boolean;
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

type Direction = 'top' | 'bottom' | 'left' | 'right';

const msgGap = 15
const initOffsetY = 20
const initOffsetX = 30

const closeNotify = (id: string, placement: Placement) => {
    const instanceList = instance[placement] || []
    const [directionY] = placement.split('-')
    const index = instanceList.findIndex((value: any) => value.el.id === id)
    if (index < 0) return
    let { el } = instanceList[index]
    let height = el.offsetHeight
    instanceList.splice(index, 1)
    for (let i = index; i < instanceList.length; i++) {
        let itemTopStr = instanceList[i].el.style[directionY].slice(4, -1)
        instanceList[i].el.style[directionY] = `calc(${itemTopStr} - ${height + msgGap}px)`
    }
}

const _formatValue = (val: string | number) => typeof val === 'number' ? val + 'px' : val

const notifyInstance: NotifyType = ((options: Options) => {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
        console.warn("[fast-ui]: property 'options' must be an object type!")
        return
    }
    let placement = options?.placement || 'top-right'
    // 一个方向上的消息在页面中最多存在10条
    if (instance[placement].length >= 10) {
        console.warn(`[fast-ui]: There are up to 10 messages in the ${placement} corner of the page!`)
        return
    }
    if (!placement ||
        !['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(placement)
    ) placement = 'top-right'
    const id = getRandomId('f-notification')
    const [directionY, directionX] = placement.split('-') as Array<Direction>
    options = {
        [directionY]: _formatValue(options.offsetY || initOffsetY),
        [directionX]: _formatValue(options.offsetX || initOffsetX),
        ...options,
        id,
        removeDom: () => {
            const dom: any = document.getElementById(id)
            dom && dom?.parentNode.removeChild(dom)
        },
    }
    options.close = () => closeNotify(id, placement)
    const instanceList = instance[placement] || []
    if (instanceList.length) {
        let init = 0
        for (let i = 0; i< instanceList.length; i++) {
            let distance = instanceList[i].el.offsetHeight || 0
            init += distance + msgGap
        }
        options[directionY] = `calc(${options[directionY]} + ${init}px)`
    }
    const vnode = h(NotificationComponent, options as any)
    instance[placement].push(vnode)
    render(vnode, document.createElement('div'))
    document.body.appendChild(vnode.el as HTMLElement)
    return options.close
}) as any

let notifyTypeList = ['info', 'success', 'error', 'warning'] as const
for (const type of notifyTypeList) {
    notifyInstance[type] = (options: Options) => notifyInstance({ ...options, type })
}

export default notifyInstance