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
            v-if="clearable"
            class="f-icon-close-bold iconClose"
            @click.stop="handleClear"
        ></i>

        <template v-if="isRenderPanel">
            <transition
                name="f-select-fade"
                @before-enter="$emit('show')"
                @after-enter="$emit('showed')"
                @before-leave="$emit('hide')"
                @after-leave="$emit('hided')"
            >
                <div
                    class="f-cascader-panel"
                    v-show="isShowPanel"
                    ref="cascaderPanel"
                    @click.stop
                >
                    <ul
                        v-for="(item, level) in treeData"
                        :key="level"
                    >
                        <template v-if="item !== 'none'">
                            <li
                                v-for="subItem in item"
                                :key="subItem[props.value]"
                                @click="handleClick(subItem, level)"
                                :class="{
                                    'is-active': isActive(subItem[props.value]),
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
} from 'vue'
import type { PropType } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'
import { isEmpty } from '/@/utils/utils'
export default defineComponent({
    emits: ['change', 'update:value', 'clear', 'show', 'showed', 'hide', 'hided'],
    props: {
        value: {
            type: Array as PropType<string[] | number[]>,
            required: true
        },
        placeholder: String,
        disabled: Boolean,
        closeable: Boolean,
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
        stopLevel: Number,
        trigger: {
            type: String,
            default: 'click',
            validator: (val: string) => ['click', 'hover'].includes(val)
        },
        format: Function as PropType<(labelList: string[]) => string>,
        separator: {
            type: String,
            default: '/'
        },
        filterable: Boolean,
        clearable: Boolean,
        foldTag: Boolean,
        stopOnSelect: Boolean,
        alwaysSelectLast: Boolean
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
        const isRenderPanel = ref(true)
        // const currentValue: any = ref([])
        // const currentLabel: any = ref([])
        let currentValue: Array<string | number> = []
        let currentLabel: string[] = []
        const treeData: any = ref([])

        const {
            label: labelKey,
            value: valueKey,
            children: childrenKey,
            disabled: disabledKey
        } = props.props

        let level = 0

        const isActive = computed(() => {
            return (val: number | string) => currentValue.includes(val)
        })

        const togglePanel = () => {
            if (props.disabled) return
            isShowPanel.value = !isShowPanel.value
        }

        const handleHidePanel = () => {
            if (props.disabled) return
            isShowPanel.value = false
        }

        // 清空Input
        const handleClear = () => {
            emit('clear')
            console.log('清空事件！')
        }

        const handleClick = (data: OptionsData, level: number) => {
            if (data.disabled) return
            currentLabel[level] = data[labelKey]
            currentValue[level] = data[valueKey]
            // 在没有下级children的情况下关闭级联面板
            if (data?.[childrenKey]?.length) treeData.value[level + 1] = data[childrenKey]
            else {
                // 如果存在format，那就将结果通过format包装后返回
                cascaderIptDom.value = props?.format?.(currentLabel) || currentLabel.join(` ${props.separator} `)
                handleHidePanel()
                emit('update:value', currentValue)
            }
        }

        // 拼凑出选项面板的数据
        const getOptions = () => {
            // 私有函数，用作递归
            const _getOptions = (data: OptionsData[]) => {
                let val = props.value[idx]
                if (!val) return
                for (const item of data) {
                    if (item[valueKey] !== val) continue
                    idx ++
                    if (!item?.[childrenKey]?.length) return
                    treeData.push(item[childrenKey])
                    _getOptions(item[childrenKey])
                }
            }
            if (!isRenderPanel.value) return []
            let treeData = [props.options]
            if (!props?.value?.length) return treeData
            let idx = 0
            _getOptions(props.options!)
            return treeData
        }

        // 初始化是否展示级联面板
        const initIsRenderPanel = () => {
            isRenderPanel.value = !props.disabled && !isEmpty(props.options)
        }

        // 初始化级联面板的y轴定位
        const initCascaderPanelPosition = () => {
            if (!isRenderPanel.value) return
            const [y] = props.placement.split('-')
            // 增加一点距离是因为要留出三角箭头的位置
            const height = cascaderDom.offsetHeight + 10
            let yValue = y === 'top' ? -15 : 15
            cascaderPanelDom.classList.add('f-cascader-panel__' + y)
            cascaderDom.style.setProperty('--translateY', `${yValue}px`)
            cascaderDom.style.setProperty('--height', `${height}px`)
        }

        watch(() => isShowPanel.value, (newV: boolean) => {
            if (newV) {
                treeData.value = getOptions()
                level = treeData.value.length
                currentValue = props.value ? [...props.value!] : []
            }
        })

        watch(() => props.options, () => {
            initIsRenderPanel()
        }, { immediate: true, deep: true })

        watch(() => props.placement, () => {
            initCascaderPanelPosition()
        })

        onMounted(() => {
            cascaderDom = cascader.value!
            cascaderIptDom = cascaderIpt.value!
            cascaderPanelDom = cascaderPanel.value!
            initIsRenderPanel()
            initCascaderPanelPosition()
        })
        return{
            id,
            cascader,
            cascaderIpt,
            cascaderPanel,
            isFocus,
            isShowPanel,
            isRenderPanel,
            treeData,
            currentValue,
            currentLabel,
            isActive,
            togglePanel,
            handleHidePanel,
            handleClick,
            handleClear,
        }
    }
})
</script>

<style scoped lang="scss">
.f-cascader{
    --translateY: 15px;
    --height: 20px;
    position: relative;
    height: 40px;
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
        background-color: #aaa;
        border-radius: 50%;
        color: #fff;
        width: 14px;
        height: 14px;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
    }
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
.f-cascader__small{
    .f-cascader-input{
        font-size: 12px!important;
    }
    height: 36px;
}
.f-cascader__large{
    .f-cascader-input{
        font-size: 16px!important;
    }
    height: 44px;
}
.f-cascader-input{
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    border-radius: 5px;
    overflow: hidden;
    border: 0;
    padding: 6px 24px 6px 12px;
}
.f-cascader-panel{
    display: flex;
    box-sizing: border-box;
    box-shadow: 0 2px 7px #bbb;
    background-color: #fff;
    position: absolute;
    left: 0;
    border-radius: 5px;
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
            min-width: 100px;
            max-width: 150px;
            line-height: 20px;
            user-select: none;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
            font-size: 14px;
            padding: 6px 26px 6px 10px;
            position: relative;
            cursor: pointer;
            color: #333;
            transition: all .15s ease-in-out;
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