<template>
    <div
        :id="id"
        :class="{
            'f-cascader': true,
            'f-cascader__focus': isShowPanel,
            'f-cascader__disabled': disabled,
            ['f-cascader__' + size]: size !== 'default',
            'f-cascader__filter': filterable && !asyncLoad,
        }"
        ref="cascader"
        @click="togglePanel"
        v-clickOutside="handleHidePanel"
    >
        <input
            type="text"
            class="f-cascader-input"
            :readonly="!filterable || !!asyncLoad"
            ref="cascaderIpt"
            autocomplete="off"
            :placeholder="placeholder"
            @input="handleInput"
            @compositionstart="compositionStart"
            @compositionend="compositionEnd"
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
                        [panelClassName]: panelClassName,
                        ['f-cascader-panel__' + placement.split('-')[0]]: true,
                        'f-cascader__empty': isEmptyOptions || !treeData.length
                    }"
                    v-show="isShowPanel"
                    ref="cascaderPanel"
                    @click.stop
                >
                    <template v-if="isEmptyOptions || !treeData.length">
                        <slot name="empty" v-if="$slots.empty"></slot>
                        <span v-else>暂无数据</span>
                    </template>
                    <template v-else>
                        <ul
                            v-for="(item, idx) in treeData"
                            :key="idx"
                        >
                            <li
                                v-for="(subItem, subIdx) in item"
                                :key="subItem[props.value]"
                                @click="handleClick(subItem, idx, subIdx)"
                                @mouseenter="handleHover(subItem, idx, subIdx)"
                                @mouseleave="handleHoverLeave(subItem)"
                                :class="{
                                    'is-active': idx <= level && isActive(subItem[props.value]),
                                    'options__disabled': subItem[props.disabled],
                                }"
                                :title="subItem[props.label]"
                            >
                                <span
                                    v-if="filterable && filterHighlight"
                                    v-html="subItem.filterableLabel ?? subItem[props.label]"
                                ></span>
                                <template v-else>
                                    {{subItem[props.label]}}
                                </template>
                                <i
                                    class="f-icon-arrow-right-bold right-icon"
                                    v-if="isShowPanelLiNextIcon(subItem)"
                                ></i>
                                <span
                                    v-show="subItem.isLoading"
                                    class="f-cascader__loading"
                                ></span>
                            </li>
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

interface Props {
    label: string;
    value: string;
    disabled: string;
    children: string;
}

interface FilterObj {
    labelList: Array<string[]>;
    valueList: Array<string[]>;
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
import { isEmpty, debounce } from '/@/utils/utils'

export default defineComponent({
    emits: ['change', 'update:value', 'clear', 'show', 'showed', 'hide', 'hided'],
    props: {
        value: {
            type: Array as PropType<(string | number)[]>,
            required: true
        },
        placeholder: {
            type: String,
            default: '请选择内容'
        },
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
        panelClassName: String,
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
        filterHighlight: Boolean,
        filterFunction: {
            type: Function as PropType<(labelFormat: string, keyword: string) => boolean>,
            default: (labelFormat: string, keyword: string) => labelFormat.search(new RegExp(keyword)) !== -1
        },
        debounce: {
            type: Number,
            default: 250,
            validator: (val: number) => val >= 0
        },
        foldTag: Boolean,
        stopOnSelect: Boolean,
        asyncLoad: Function as PropType<(data: OptionsData, callback: (nextOption: OptionsData[], isHasChildren: boolean) => void) => void>
    },
    setup(props, { emit }) {
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
        let onComposition = 'compositionStart'
        let filterObj: FilterObj
        let isLast = false

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

        const isShowPanelLiNextIcon = computed(() => {
            return (data: OptionsData) => props.asyncLoad ? !data.isLast : !isEmpty(data[childrenKey])
        })

        const getFormatLabel = (label: string[]) => props?.format?.(label) ?? label.join(` ${props.separator} `)

        const togglePanel = () => {
            if (props.disabled) return
            // 搜索模式下不允许关闭
            if (isShowPanel.value && props.filterable && !props.asyncLoad) return
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
            cascaderIptDom.placeholder = props.placeholder ?? '请选择内容'
            emit('clear')
            emit('update:value', [])
            emit('change', [])
            handleHidePanel()
        }

        let timer: NodeJS.Timer
        // 移入展开、消失
        const handleHover = (data: OptionsData, levelNum: number) => {
            if (data?.disabled) return
            // 最后一级时Hover无效
            if (props.trigger === 'hover' &&
                !isEmpty(data.children) &&
                !props.stopOnSelect
            ) timer = setTimeout(() => {
                props.asyncLoad ? handleOptionWhenAsyncLoad(data, levelNum) : handleChoseOption(data, levelNum)
            }, props.hoverShowTime)
        }

        const handleHoverLeave = (data: OptionsData) => {
            if (data?.disabled) return
            if (props.trigger === 'hover' &&
                !isEmpty(data.children) &&
                !props.stopOnSelect &&
                timer
            ) clearTimeout(timer)
        }

        // 点击展开
        const handleClick = (data: OptionsData, levelNum: number) => {
            if (data?.disabled) return
            if (props.trigger === 'click' ||
                isEmpty(data.children) ||
                props.stopOnSelect
            ) props.asyncLoad ? handleOptionWhenAsyncLoad(data, levelNum) : handleChoseOption(data, levelNum)
        }

        let isExistNextChildren = true
        // 异步加载数据源处理方式
        const asyncGetOptions = (optionsData: OptionsData[], currentData: OptionsData, isHasChildren = true) => {
            // 传入为false，那么就标记为最后一级的数据
            isExistNextChildren = isHasChildren
            const { level: currentIdx } = currentData
            if (!isEmpty(optionsData)) {
                level.value = currentIdx
                treeData.value[currentIdx] = optionsData
                currentData[childrenKey] = optionsData
            } else isExistNextChildren = false
            if (!isExistNextChildren) optionsData.forEach(value => value.isLast = true)
            currentData.isLoading = false
        }

        // 异步加载时的处理函数
        const handleOptionWhenAsyncLoad = (data: OptionsData, levelNum: number) => {
            const {
                [labelKey]: label,
                [valueKey]: value,
                [childrenKey]: children,
                [disabledKey]: disabled
            } = data
            if (disabled) return
            currentLabel.value = currentLabel.value.slice(0, levelNum)
            currentValue.value = currentValue.value.slice(0, levelNum)
            currentLabel.value[levelNum] = label
            currentValue.value[levelNum] = value
            if (props.stopOnSelect && !data?.isLast) {
                handleResLabel()
                emit('update:value', currentValue.value)
                emit('change', currentValue.value)
            }
            if (data.isLast) {
                handleResLabel()
                handleHidePanel()
                emit('update:value', currentValue.value)
                emit('change', currentValue.value)
            } else if (children?.length) {
                level.value = levelNum + 1
                treeData.value = treeData.value.slice(0, levelNum + 1)
                treeData.value[levelNum + 1] = children
            } else {
                treeData.value = treeData.value.slice(0, levelNum + 1)
                data.level = levelNum + 1
                data.isLoading = true
                props.asyncLoad!(data, (nextOption, isHasChildren) => asyncGetOptions(nextOption, data, isHasChildren))
            }
        }

        // 处理函数
        const handleChoseOption = (data: OptionsData, levelNum: number) => {
            const {
                [labelKey]: label,
                [valueKey]: value,
                [childrenKey]: children = [],
                [disabledKey]: disabled
            } = data
            if (disabled) return
            currentLabel.value = currentLabel.value.slice(0, levelNum)
            currentValue.value = currentValue.value.slice(0, levelNum)
            currentLabel.value[levelNum] = label
            currentValue.value[levelNum] = value
            // 搜索模式下的currentValue.value为二维数组，需要降维
            if (props.filterable) {
                currentValue.value = (currentValue.value as any).flat(1)
            }
            // 最后一级没必要在向外触发一遍
            if (props.stopOnSelect && children?.length) {
                handleResLabel()
                emit('update:value', currentValue.value)
                emit('change', currentValue.value)
            }
            // 如果是选择即停下，那不论如何都标记为最后一级
            isLast = !children?.length || props.stopOnSelect
            // 判断是否走到了最后一级
            if (children?.length) {
                level.value = levelNum + 1
                treeData.value = treeData.value.slice(0, levelNum + 1)
                treeData.value[levelNum + 1] = children
            } else { // 在没有下级children的情况下关闭级联面板
                handleResLabel()
                handleHidePanel()
                emit('update:value', currentValue.value)
                emit('change', currentValue.value)
            }
        }

        // 处理返回的label样式
        const handleResLabel = () => {
            if (props.onlyShowLast) currentLabel.value = currentLabel.value.slice(-1)
            cascaderIptDom.value = getFormatLabel(currentLabel.value)
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
                    idx++
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

        const compositionStart = () => {
            onComposition = 'compositionStart'
        }

        const compositionEnd = (e: InputEvent | any) => {
            handleFilter(e.target.value)
            setTimeout(() => {
                onComposition = 'compositionEnd'
            }, props.debounce)
        }

        const handleInput = debounce((e: InputEvent | any) => {
            if (props.disabled ||
                onComposition === 'compositionStart' ||
                props.asyncLoad
            ) return
            handleFilter(e.target.value)
        }, props.debounce)

        // 过滤、搜索函数
        const handleFilter = (iptVal: string) => {
            if (props.asyncLoad) return
            if (!iptVal) {
                treeData.value = [props.options]
                return
            }
            const { labelList, valueList } = filterObj
            let filterRes = labelList.reduce((pre: any[], cur: string[], idx: number) => {
                let valStr =  getFormatLabel(cur)
                if (props.filterFunction(valStr, iptVal)) {
                    let filterableLabel = props.filterHighlight ?
                        valStr.replace(new RegExp(iptVal, 'g'), (word: string) => `<b style="color: var(--primary)">${word}</b>`)
                        :
                        valStr
                    pre.push({
                        filterableLabel,
                        label: valStr,
                        value: valueList[idx]
                    })
                }
                return pre
            }, [])
            treeData.value = isEmpty(filterRes) ? [] : [filterRes]
        }

        // 搜索模式下打开、关闭级联面板的处理函数
        const handleShowOrHideWhenFilterable = (flag: boolean) => {
            if (props.disabled ||
                !props.filterable ||
                !props?.value?.length ||
                props.asyncLoad
            ) return
            const formatLabel = getFormatLabel(currentLabel.value)
            cascaderIptDom.value = flag ? '' : isLast ? formatLabel : cascaderIptDom.placeholder
            cascaderIptDom.placeholder = flag ? formatLabel : props.placeholder
        }

        // 获取所有路径
        const flatOptions = () => {
            if (props.disabled) return
            let labelList: Array<string[]> = []
            let valueList: Array<string[]> = []
            const _flatOptions = (options: OptionsData[], labelArr: string[] = [], valueArr: string[] = []) => {
                for (const item of options) {
                    const {
                        [labelKey]: label,
                        [valueKey]: value,
                        [childrenKey]: children,
                        [disabledKey]: disabled
                    } = item
                    if (disabled) continue
                    let _labelList: string[] = [...labelArr]
                    let _valueList: string[] = [...valueArr]
                    _labelList.push(label)
                    _valueList.push(value)
                    if (children?.length) _flatOptions(children, _labelList, _valueList)
                    else {
                        labelList.push(_labelList)
                        valueList.push(_valueList)
                    }
                }
            }
            _flatOptions(props.options!)
            filterObj = {
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
                currentValue.value = props?.value?.length ? [...props.value!] : []
            }
            handleShowOrHideWhenFilterable(newV)
        })

        watch(() => props.options, (newV: OptionsData[] | undefined) => {
            isEmptyOptions.value = isEmpty(newV)
        }, { immediate: true, deep: true })

        watch(() => [props.placement, props.size], () => {
            initCascaderPanelPosition()
        })

        watch(() => props.filterable, (newV: boolean) => {
            if (newV && !props.asyncLoad) flatOptions()
        }, { immediate: true })

        onMounted(() => {
            cascaderDom = cascader.value!
            cascaderIptDom = cascaderIpt.value!
            cascaderPanelDom = cascaderPanel.value!
            initCascaderPanelPosition()
            if (!isEmpty(props.value)) getOptions()
            document.addEventListener('keydown', handleKeyDown)
        })
        onUnmounted(() => {
            document.removeEventListener('keydown', handleKeyDown)
        })
        return {
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
            isShowPanelLiNextIcon,
            togglePanel,
            handleHidePanel,
            handleClick,
            handleHover,
            handleHoverLeave,
            handleClear,
            handleKeyDown,
            handleInput,
            compositionStart,
            compositionEnd,
        }
    }
})
</script>

<style scoped lang="scss">
.f-cascader {
    --translateY: 15px;
    --height: 20px;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    display: inline-flex;
    transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;
    font-size: 14px !important;
    &:not(.f-cascader__disabled):hover {
        border-color: var(--primary);

        i.iconClose {
            display: inline-block;
        }
    }

    i.icon, i.iconClose {
        color: #bbb;
        font-size: 14px;
        position: absolute;
        top: 50%;
        right: calc(.45em);
        transition: transform .2s ease-in-out;
        transform: translateY(-50%);
        cursor: pointer;
    }

    i.icon-rotate {
        transform: translateY(-50%) rotate(180deg);
    }

    i.iconClose {
        box-sizing: border-box;
        display: none;
        background-color: #ccc;
        border-radius: 50%;
        color: #fff;
        width: 14px;
        height: 14px;
        text-align: center;
        font-size: 12px;
        transition: background-color .2s ease-in-out;

        &:hover {
            background-color: #aaa;
        }
    }
}

.f-cascader__large .f-cascader-input {
    height: 38px !important;
    line-height: 38px !important;
    padding: 6px 24px 6px 12px;
    font-size: 16px;
}

.f-cascader__small .f-cascader-input {
    height: 22px !important;
    line-height: 22px !important;
    font-size: 12px !important;
    padding: 2px 24px 2px 12px;
}

.f-cascader__focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 .2em rgba(var(--primary-rgba), .15);
}

.f-cascader__disabled {
    opacity: .65;

    .f-cascader-input {
        background-color: #f2f2f2;
        cursor: not-allowed;
    }
}

.f-cascader-input {
    box-sizing: border-box;
    cursor: pointer;
    width: 100%;
    height: 30px;
    line-height: 30px;
    outline: none;
    border-radius: 5px;
    overflow: hidden;
    border: 0;
    padding: 4px 24px 4px 12px;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.f-cascader-panel {
    display: flex;
    box-sizing: border-box;
    box-shadow: 0 2px 7px #bbb;
    background-color: #fff;
    position: absolute;
    left: 0;
    border-radius: 5px;
    z-index: 999;

    ul {
        padding: 4px 0;
        height: 180px;
        margin: 0;
        overflow-x: hidden;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #ddd;
            border-radius: 20px;

            &:hover {
                background-color: #ccc;
            }
        }

        &:not(:last-child) {
            border-right: 1px solid #ddd;
        }

        li {
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

            &:not(.options__disabled):hover {
                background-color: #f2f2f2;
            }
        }

        li.options__disabled {
            opacity: .35;
            cursor: not-allowed;
        }

        li.is-active {
            color: var(--primary);
            background-color: #f2f2f2;
            font-weight: bold;
        }

        i.right-icon, span.f-cascader__loading {
            font-size: 12px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: calc(.4em);
            z-index: 1;
        }
        span.f-cascader__loading{
            width: 12px;
            height: 12px;
            right: -2px;
            border: 2px solid #ddd;
            border-top-color: var(--primary);
            border-radius: 50%;
            background-color: #fff;
            animation: f-switch__loading-rotate 1s infinite linear;
            z-index: 2;
        }
    }
}
.f-cascader__filter {
    .f-cascader-input{
        cursor: text;
    }
    .f-cascader-panel{
        ul li {
            max-width: 100%!important;

        }
    }
}
.f-cascader__empty {
    min-width: 100px;
    padding: 10px 12px;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 14px;
}

.f-cascader-panel__top {
    bottom: var(--height)
}

.f-cascader-panel__bottom {
    &::before, &::after {
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

    &::after {
        top: -13px;
        border-bottom-color: #ddd;
        z-index: 1;
    }

    top: var(--height)
}
</style>