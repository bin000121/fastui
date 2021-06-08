<template>
    <div
        :id="id"
        :class="{
            'f-cascader': true,
            'f-cascader__focus': isShowPanel,
            'f-cascader__disabled': disabled,
            ['f-cascader__' + size]: size !== 'default'
        }"
        ref="cascader"
        @click="togglePanel"
        v-clickOutside="handleHidePanel"
    >
        <input
            type="text"
            class="f-cascader-input"
            readonly
            ref="cascaderIpt"
            autocomplete="off"
            :placeholder="placeholder || '请选择内容'"
        >
        <i class="f-icon-arrow-down-bold icon" :class="{'icon-rotate': isShowPanel}"></i>
        <i
            v-if="clearable && currentValue.length"
            class="f-icon-close-bold iconClose"
            @click.stop="handleClear"
            title="清空所选"
        ></i>

        <template v-if="!disabled">
            <transition
                name="f-select-fade"
                @before-enter="$emit('show')"
                @after-enter="$emit('showed')"
                @before-leave="$emit('hide')"
                @after-leave="$emit('hided')"
            >
                <div
                    :class="{
                        'f-cascader-panel': true,
                        ['f-cascader-panel__' + placement.split('-')[0]]: true,
                        'f-cascader__empty': isEmptyOptions
                    }"
                    v-show="isShowPanel"
                    ref="cascaderPanel"
                    @click.stop
                >
                    <template v-if="isEmptyOptions">
                        <slot name="empty" v-if="$slots.empty"></slot>
                        <span v-else>暂无数据</span>
                    </template>
                    <template v-else>
                        <ul
                            v-for="(item, level) in treeData"
                            :key="level"
                        >
                            <template v-if="item !== 'none'">
                                <li
                                    v-for="subItem in item"
                                    :key="subItem[props.value]"
                                    @click="handleClick(subItem, level)"
                                    @mouseenter="handleHover(subItem, level)"
                                    @mouseleave="handleHoverLeave(subItem)"
                                    :class="{
                                    'is-active': level <= level && isActive(subItem[props.value]),
                                    'options__disabled': subItem[props.disabled],
                                }"
                                    :title="subItem[props.label]"
                                >
                                    {{subItem[props.label]}}
                                    <i
                                        class="f-icon-arrow-right-bold right-icon"
                                        v-if="subItem[props.children]"
                                    ></i>
                                </li>
                            </template>
                        </ul>
                    </template>
                </div>
            </transition>
        </template>
    </div>
</template>

<script lang="ts">
interface OptionsData {
    value: string | number;
    label?: string;
    children?: OptionsData[];
    disabled?: boolean;
    [key: string]: any;
}

interface Props{
    label: string;
    value: string;
    disabled: string;
    children: string;
}

import {
    defineComponent,
    ref,
    watch,
    computed,
    onMounted,
    onUnmounted
} from 'vue'
import type { PropType } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'
import { isEmpty } from '/@/utils/utils'
export default defineComponent({
    emits: ['change', 'update:value', 'clear', 'show', 'showed', 'hide', 'hided'],
    props: {
        value: {
            type: Array as PropType<(string | number)[]>,
            required: true
        },
        placeholder: String,
        disabled: Boolean,
        clearable: Boolean,
        placement: {
            type: String,
            default: 'bottom-left',
            validator: (val: string) => ['bottom-left', 'top-left'].includes(val)
        },
        size: {
            type: String,
            default: 'default',
            validator: (val: string) => ['small', 'default', 'large'].includes(val)
        },
        options: Array as PropType<OptionsData[]>,
        props: {
            type: Object as PropType<Props>,
            default: (): Props => ({
                label: 'label',
                value: 'value',
                children: 'children',
                disabled: 'disabled'
            })
        },
        onlyShowLast: Boolean,
        trigger: {
            type: String,
            default: 'click',
            validator: (val: string) => ['click', 'hover'].includes(val)
        },
        hoverShowTime: {
            type: Number,
            default: 250
        },
        format: Function as PropType<(labelList: string[]) => string>,
        separator: {
            type: String,
            default: '/'
        },
        filterable: Boolean,
        foldTag: Boolean,
        stopOnSelect: Boolean,
    },
    setup (props, { emit }) {
        const id = getRandomId('f-cascader')
        const cascader = ref(null)
        const cascaderIpt = ref(null)
        const cascaderPanel = ref(null)
        let cascaderDom: HTMLElement
        let cascaderIptDom: HTMLInputElement
        let cascaderPanelDom: HTMLElement
        const isFocus = ref(false)
        const isShowPanel = ref(false)
        const isEmptyOptions = ref(isEmpty(props.options))
        const currentValue = ref([] as (string | number)[])
        const currentLabel: any = ref([] as string[])
        const treeData: any = ref([])

        const {
            label: labelKey,
            value: valueKey,
            children: childrenKey,
            disabled: disabledKey
        } = props.props

        const level = ref(0)

        const isActive = computed(() => {
            return (val: number | string) => currentValue.value.includes(val)
        })

        const togglePanel = () => {
            if (props.disabled) return
            isShowPanel.value = !isShowPanel.value
        }

        const handleHidePanel = () => {
            if (props.disabled) return
            isShowPanel.value = false
        }

        // 按下esc关闭级联面板
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isShowPanel.value || props.disabled) return
            if (e.key === 'Escape' && e.keyCode === 27) handleHidePanel()
        }

        // 清空Input
        const handleClear = () => {
            cascaderIptDom.value = ''
            currentLabel.value = []
            currentValue.value = []
            emit('clear')
            emit('update:value', [])
            handleHidePanel()
        }

        let timer: NodeJS.Timer
        const handleHover = (data: OptionsData, levelNum: number) => {
            if (data?.disabled) return
            if (props.trigger === 'hover' &&
                !isEmpty(data.children) &&
                !props.stopOnSelect
            ) timer = setTimeout(() => handleChoseOption(data, levelNum), props.hoverShowTime)
        }

        const handleHoverLeave = (data: OptionsData) => {
            if (data?.disabled) return
            if (props.trigger === 'hover' &&
                !isEmpty(data.children) &&
                !props.stopOnSelect &&
                timer
            ) clearTimeout(timer)
        }

        const handleClick = (data: OptionsData, levelNum: number) => {
            if (data?.disabled) return
            if (props.trigger === 'click' ||
                isEmpty(data.children) ||
                props.stopOnSelect
            ) handleChoseOption(data, levelNum)
        }

        // 处理函数
        const handleChoseOption = (data: OptionsData, levelNum: number) => {
            if (data.disabled) return
            const {
                [labelKey]: label,
                [valueKey]: value,
                [childrenKey]: children = []
            } = data
            currentLabel .value = currentLabel.value.slice(0, levelNum)
            currentValue.value = currentValue.value.slice(0, levelNum)
            currentLabel.value[levelNum] = label
            currentValue.value[levelNum] = value
            // 最后一级没必要在向外触发一遍
            if (props.stopOnSelect && children?.length) {
                handleResLabel()
                emit('update:value', currentValue.value)
            }
            // 判断是否走到了最后一级
            if (children?.length) {
                level.value = levelNum + 1
                treeData.value = treeData.value.slice(0, levelNum + 1)
                treeData.value[levelNum + 1] = children
            }
            else { // 在没有下级children的情况下关闭级联面板
                handleResLabel()
                handleHidePanel()
                emit('update:value', currentValue.value)
            }
        }

        // 处理返回的label样式
        const handleResLabel = () => {
            // 判断是否只显示最后一级
            if (props.onlyShowLast) currentLabel.value = currentLabel.value.slice(-1)
            // 如果存在format，那就将结果通过format包装后返回
            cascaderIptDom.value = props?.format?.(currentLabel.value) || currentLabel.value.join(` ${props.separator} `)
        }

        // 拼凑出选项面板的数据
        const getOptions = () => {
            if (props.disabled) return []
            currentLabel.value = []
            // 私有函数，用作递归
            const _getOptions = (data: OptionsData[]) => {
                let val = props.value[idx]
                if (!val) return
                for (const item of data) {
                    if (item[valueKey] !== val) continue
                    idx ++
                    currentLabel.value.push(item[labelKey])
                    if (!item?.[childrenKey]?.length) return
                    treeData.push(item[childrenKey])
                    _getOptions(item[childrenKey])
                }
            }
            let treeData = [props.options]
            if (!props?.value?.length) return treeData
            // 往下走说明props.value有值
            let idx = 0
            _getOptions(props.options!)
            handleResLabel()
            return treeData
        }

        //获取所有路径
        const flatOptions = () => {
            let labelList: any = []
            let valueList: any = []
            const _flatOptions = (options: OptionsData[], labelArr = [], valueArr = []) => {
                let _labelList: any = [...labelArr]
                let _valueList: any = [...valueArr]
                for (const item of options) {
                    const {
                        [labelKey]: label,
                        [valueKey]: value,
                        [childrenKey]: children
                    } = item
                    _labelList.push(label)
                    _valueList.push(value)
                    if (children?.length){
                        _flatOptions(children, _labelList, _valueList)
                    } else {
                        labelList.push(_labelList)
                        valueList.push(_valueList)
                    }
                }
            }
            _flatOptions(props.options!)
            return {
                labelList,
                valueList
            }
        }

        // 初始化级联面板的y轴定位
        const initCascaderPanelPosition = () => {
            if (props.disabled) return
            const [y] = props.placement.split('-')
            // 增加一点距离是因为要留出三角箭头的位置
            const height = cascaderDom.offsetHeight + 10
            let yValue = y === 'top' ? -15 : 15
            cascaderDom.style.setProperty('--translateY', `${yValue}px`)
            cascaderDom.style.setProperty('--height', `${height}px`)
        }

        watch(() => props.disabled, (newV: boolean) => {
            if (!newV) initCascaderPanelPosition()
        })

        watch(() => isShowPanel.value, (newV: boolean) => {
            if (newV) {
                treeData.value = getOptions()
                level.value = treeData.value?.length - 1 || 0
                currentValue.value = props.value ? [...props.value!] : []
            }
        })

        watch(() => props.options, (newV: OptionsData[] | undefined) => {
            isEmptyOptions.value = isEmpty(newV)
        }, { immediate: true, deep: true })

        watch(() => [props.placement, props.size], () => {
            initCascaderPanelPosition()
        })

        onMounted(() => {
            cascaderDom = cascader.value!
            cascaderIptDom = cascaderIpt.value!
            cascaderPanelDom = cascaderPanel.value!
            initCascaderPanelPosition()
            if (!isEmpty(props.value)) getOptions()
            console.log(flatOptions())
            document.addEventListener('keydown', handleKeyDown)
        })
        onUnmounted(() => {
            document.removeEventListener('keydown', handleKeyDown)
        })
        return{
            id,
            cascader,
            cascaderIpt,
            cascaderPanel,
            isFocus,
            isShowPanel,
            isEmptyOptions,
            treeData,
            currentValue,
            currentLabel,
            isActive,
            level,
            togglePanel,
            handleHidePanel,
            handleClick,
            handleHover,
            handleHoverLeave,
            handleClear,
            handleKeyDown,
        }
    }
})
</script>

<style scoped lang="scss">
.f-cascader{
    --translateY: 15px;
    --height: 20px;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    display: inline-flex;
    transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;
    font-size: 14px!important;
    &:not(.f-cascader__disabled):hover{
        border-color: var(--primary);
        i.iconClose{
            display: inline-block;
        }
    }
    i.icon, i.iconClose{
        color: #bbb;
        font-size: 14px;
        position: absolute;
        top: 50%;
        right: calc(.45em);
        transition: transform .2s ease-in-out;
        transform: translateY(-50%);
    }
    i.icon-rotate{
        transform: translateY(-50%) rotate(180deg);
    }
    i.iconClose{
        box-sizing: border-box;
        display: none;
        background-color: #ccc;
        border-radius: 50%;
        color: #fff;
        width: 14px;
        height: 14px;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
        transition: background-color .2s ease-in-out;
        &:hover{
            background-color: #aaa;
        }
    }
}
.f-cascader__large .f-cascader-input{
    height: 38px!important;
    line-height: 38px!important;
    padding: 6px 24px 6px 12px;
    font-size: 16px;
}
.f-cascader__small .f-cascader-input{
    height: 22px!important;
    line-height: 22px!important;
    font-size: 12px!important;
    padding: 2px 24px 2px 12px;
}
.f-cascader__focus{
    border-color: var(--primary);
    box-shadow: 0 0 0 .2em rgba(var(--primary-rgba),.15);
}
.f-cascader__disabled{
    opacity: .65;
    .f-cascader-input{
        background-color: #f2f2f2;
        cursor: not-allowed;
    }
}
.f-cascader-input{
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    line-height: 30px;
    outline: none;
    border-radius: 5px;
    overflow: hidden;
    border: 0;
    padding: 4px 24px 4px 12px;
    font-size: 14px;
}
.f-cascader-panel{
    display: flex;
    box-sizing: border-box;
    box-shadow: 0 2px 7px #bbb;
    background-color: #fff;
    position: absolute;
    left: 0;
    border-radius: 5px;
    z-index: 999;
    ul{
        padding: 4px 0;
        height: 180px;
        margin: 0;
        overflow-x: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar{
            width: 6px;
        }
        &::-webkit-scrollbar-thumb{
            background-color: #ddd;
            border-radius: 20px;
            &:hover{
                background-color: #ccc;
            }
        }
        &:not(:last-child){
            border-right: 1px solid #ddd;
        }
        li{
            min-width: 120px;
            max-width: 150px;
            line-height: 20px;
            user-select: none;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
            font-size: 14px;
            padding: 6px 26px 6px 15px;
            position: relative;
            cursor: pointer;
            color: #333;
            transition: background-color .15s ease-in-out;
            &:not(.options__disabled):hover{
                background-color: #f2f2f2;
            }
        }
        li.options__disabled{
            opacity: .35;
            cursor: not-allowed;
        }
        li.is-active{
            color: var(--primary);
            background-color: #f2f2f2;
            font-weight: bold;
        }
        i.right-icon{
            font-size: 12px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: calc(.4em);
        }
    }
}

.f-cascader__empty{
    min-width: 100px;
    padding: 10px 12px;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 14px;
}
.f-cascader-panel__top{
    bottom: var(--height)
}
.f-cascader-panel__bottom{
    &::before, &::after{
        content: '';
        position: absolute;
        left: calc(.85em);
        top: -12px;
        display: block;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-bottom-color: #fff;
        z-index: 2;
    }
    &::after{
        top: -13px;
        border-bottom-color: #ddd;
        z-index: 1;
    }
    top: var(--height)
}
</style>