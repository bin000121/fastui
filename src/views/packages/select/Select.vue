<template>
    <div
        :id="id"
        :class="{
            'f-select': true,
            ['f-select__' + size]: true,
            'f-select--disabled': disabled,
            'f-select__isFocus': isFocus,
        }"
        ref="selectRoot"
        @click="toggleView"
        v-clickOutside="handleClose"
    >
        <template v-if="multiple">
            <template v-if="foldTag && getLabelList.length">
                <span class="f-option-tag">
                    <span>{{getLabelList[0]}}</span>
                    <i class="f-icon-close-bold" @click.stop="closeTag(getLabelList[0])"></i>
                </span>
                <span v-show="getLabelList.length - 1 > 0" class="f-option-tag">+ {{getLabelList.length - 1}}</span>
            </template>
            <template v-else>
                <span
                    v-for="k in getLabelList"
                    :key="k"
                    class="f-option-tag"
                >
                <span>{{k}}</span>
                <i class="f-icon-close-bold" @click.stop="closeTag(k)"></i>
            </span>
            </template>
        </template>

        <div
            v-if="$slots.prefix"
            class="f-select-prefix"
        >
            <slot name="prefix"></slot>
        </div>

        <input
            class="f-select-input"
            type="text"
            readonly
            ref="selectIpt"
            :placeholder="getValueList.length ? '' : placeholder"
            autocomplete="off"
            @input="handleInput"
            @compositionstart="compositionStart"
            @compositionend="compositionEnd"
            @focus="focus"
            @blur="blur"
        >
        <span :class="{ 'f-select-push-icon': clearable }" ref="selectPushIcon">
            <span
                :class="{
                    'f-icon-arrow-down-bold': true,
                    'f-select-arrow': true,
                    'f-icon-rotate': showOptionList,
                }"
            ></span>
            <i class="f-icon-delete-filling f-select-arrow" v-if="clearable" @click.stop="clearChose"></i>
        </span>
        <transition name="f-select-fade">
            <div
                 v-show="showOptionList"
                 class="f-option-list"
                 :class="{
                     ['f-option-list__' + placement]: true
                 }"
                 ref="selectOptions"
                 @click.stop
            >
                <ul
                    class="f-option-list-ul"
                    v-show="!isEmpty"
                >
                    <slot></slot>
                </ul>
                <div v-if="isEmpty && $slots.empty" style="min-width: 250px;">
                    <slot name="empty"></slot>
                </div>
                <div v-show="isEmpty && !$slots.empty" class="f-select__isEmpty">{{emptyText}}</div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    onMounted,
    computed,
    nextTick,
    watch,
    provide,
    getCurrentInstance,
    PropType
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'
import { debounce, isEmpty as isEmptyFn } from '/@/utils/utils'

type accept = number | string | number[] | string[]
type FilterFunction = (val: string | number, label: any) => boolean

export default defineComponent({
    name: 'FSelect',
    emits: ['change', 'update:value', 'close', 'clear'],
    props: {
        value: [String, Number, Array, Boolean],
        id: {
            type: String,
            default: () => getRandomId('f-select')
        },
        placeholder: {
            type: String,
            default: '请选择内容'
        },
        placement: {
            type: String,
            default: 'x-bottom'
        },
        emptyText: {
            type: String,
            default: '暂无数据'
        },
        size: {
            type: String,
            default: 'default',
            validator: (val: string) => ['small', 'default', 'large'].includes(val)
        },
        multiple: {
            type: Boolean,
            default: false
        },
        multipleLimit: {
            type: Number,
            default: 0
        },
        debounce: {
            type: Number,
            default: 200,
            validator: (val: number) => val >= 0
        },
        disabled: Boolean,
        clearable: Boolean,
        readonly: Boolean,
        filterable: Boolean,
        filterFunction: Function as PropType<FilterFunction>,
        foldTag: Boolean,
        removeCheckIcon: Boolean,
    },
    setup (props, { emit }) {
        const selectRoot = ref(null)
        const selectOptions = ref(null)
        const selectIpt = ref(null)
        const selectPushIcon = ref(null)
        let selectIptDom: HTMLInputElement | any
        let selectRootDom: HTMLDivElement | any
        let selectOptionsDom: HTMLDivElement | any
        let selectPushIconDom: HTMLDivElement | any
        const showOptionList = ref(false)
        const isFocus = ref(false)
        const inputValue = ref('')
        const isEmpty = ref(false)
        const collectionData: any = {}
        const instanceList: any = {} // 实例收集器
        let onComposition = ''
        let hasChildren: boolean

        const parent = getCurrentInstance()
        const currentData: any = ref({})

        const getLabelList = computed(() => {
            return Object.keys(currentData.value)
        })

        const getValueList = computed(() => {
            return Object.values(currentData.value)
        })

        const focus = () => {
            if (!props.filterable) return
            if (props.multiple) {
                selectIptDom.value = ''
            }
            else {
                selectIptDom.placeholder = selectIptDom.value.toString() || props.placeholder
                selectIptDom.value = ''
            }
        }

        const blur = () => {
            if (!props.filterable) return
            if (props.multiple) {
                selectIptDom.placeholder = isEmptyFn(currentData.value) ? '': props.placeholder
                selectIptDom.value = ''
            }
            else {
                selectIptDom.value = selectIptDom.placeholder === props.placeholder ? '' : selectIptDom.placeholder
                selectIptDom.placeholder = props.placeholder
            }
        }

        // 中文输入法时锁定input
        const compositionStart = () => {
            onComposition = 'compositionStart'
        }

        // 解决中文输入法 @input 失灵
        const compositionEnd = (e: InputEvent | any) => {
            toggleOptionLiShow(e.target.value)
            setTimeout(() => {
                onComposition = 'compositionEnd'
            }, props.debounce)
        }

        const handleInput = debounce((e: InputEvent | any) => {
            if (!props.filterable ||
                onComposition === 'compositionStart' ||
                !showOptionList.value
            ) return
            toggleOptionLiShow(e.target.value)
        }, props.debounce)


        // 默认的过滤方法
        const defaultFilterFunction: FilterFunction = (val: string | number, label: any) => {
            val = val.toString()
            return label.toString().includes(val)
        }

        const toggleOptionLiShow = (val: string | number, initial = false) => {
            if (!hasChildren) return
            const blockArr: string[] = initial ? ['block'] : []
            for (let key in instanceList) {
                const { props: { label }, vnode: { el } } = instanceList[key]
                if (initial) {
                    el.style.display = 'block'
                    continue
                }
                // 自定义过滤函数
                const FilterFunction = props.filterFunction && typeof props.filterFunction === 'function' ?
                    props.filterFunction :
                    defaultFilterFunction
                if (FilterFunction(val, label)) {
                    el.style.display = 'block'
                    blockArr.push('block')
                } else el.style.display = 'none'
            }
            isEmpty.value = !blockArr.length
        }

        // 点击外部关闭选项面板
        const handleClose = () => {
            if (props.disabled || props.readonly) return
            showOptionList.value = false
        }

        // 选择option
        const getChose = (label: number | string, data: number | string, isActive = false) => {
            let emitData: accept
            if (props.multiple) {
                // 当isActive为true时，表示当前正在从已选中切换成未选中，那么就删除传来的数据
                if (isActive) delete currentData.value[label]
                else {
                    let length = (props.value as Array<number | string>).length || 0
                    // 负数或者0 不会做限制
                    if (props.multipleLimit <= 0 || length < props.multipleLimit) {
                        currentData.value[label] = data
                        // 还要做一件事情，清空input的value，并还原选项面板
                        if (props.filterable) {
                            selectIptDom.value = ''
                            toggleOptionLiShow('', true)
                            selectIptDom.focus()
                        }
                    }
                }
                emitData = Object.values(currentData.value) as accept
            }
            else {
                // 如果点击的值与上次相同则不处理
                if (currentData.value === label) return
                currentData.value = label
                selectIptDom.value = label
                emitData = data
            }
            emit('change', emitData)
            emit('update:value', emitData)
        }

        // 切换显示选项面板
        const toggleView = () => {
            if (props.disabled || props.readonly) return
            showOptionList.value = !showOptionList.value
        }

        // 点击tag后面的关闭图标
        const closeTag = (key: string) => {
            if (!props.multiple) return
            emit('close', {
                label: key,
                value: currentData.value[key],
            })
            delete currentData.value[key]
            emit('update:value', Object.values(currentData.value))
            // 面板展开时移除标签不应失去焦点
            if (showOptionList.value) {
                selectIptDom.focus()
                // 如果输入框有值才会重置选项面板
                if (selectIptDom.value) toggleOptionLiShow('', true)
            }
        }

        // 收集option的value-label
        const collection = (label: string | number, value: string | number | boolean) => {
            collectionData[value.toString()] = label
        }

        // 收集option实例
        const collectionInstance = (label: string | number, vnode: any) => {
            instanceList[label] = vnode
        }

        // 清空所有选中
        const clearChose = () => {
            if (props.multiple) {
                if (!getValueList.value.length) return
                currentData.value = {}
            } else {
                if (!currentData.value) return
                currentData.value = ''
            }
            emit('clear')
            emit('change', props.multiple ? [] : '')
            emit('update:value', props.multiple ? [] : '')
            showOptionList.value = false
        }


        const initInputValue = () => {
            if (isEmpty.value) return
            if (props.multiple) {
                selectRootDom.style.paddingRight = 'calc(1.5em)'
                let valueArr = props.value as Array<boolean | number | string> || []
                if (valueArr.length) {
                    for (let value of valueArr) {
                        let label = collectionData[value.toString()]
                        if (!label) continue
                        currentData.value[label] = value
                        instanceList[label].ctx.isActive = true
                    }
                }
            } else selectIptDom.value = collectionData[props.value as string] || ''
        }

        const initTranslateY = () => {
            let p = 15
            let placement = 'top'
            selectOptionsDom.style.top = 'unset'
            selectOptionsDom.style.bottom = 'unset'
            if (props.placement ==='x-top') {
                p = -1 * p
                placement = 'bottom'
            }
            selectOptionsDom.style[placement] = selectRootDom.offsetHeight + 10 + 'px'
            selectRootDom.style.setProperty('--translateY', p + 'px')
        }

        watch(() => showOptionList.value, (newV: boolean) => {
            isFocus.value = newV
            if (newV) {
                if (props.filterable) toggleOptionLiShow('', true)
            } else selectIptDom.blur()
        })

        watch(() => currentData.value, () => {
            nextTick(() => initTranslateY())
        }, { deep: true })

        watch(() => props.value, (newV: any) => {
            if (isEmpty.value) return
            if (props.multiple) {
                currentData.value = {}
                for (let index in newV) {
                    if (!collectionData[newV[index]]) continue
                    let label = collectionData[newV[index]]
                    currentData.value[label] = newV[index]
                }
            } else selectIptDom.value = collectionData[props.value as string] || ''
        }, { deep: true })

        watch(() => props.placement, () => {
            nextTick(() => initTranslateY())
        })

        provide('parent', reactive({
            collection,
            collectionInstance,
            parent,
            toggleView,
            getChose,
        }))

        onMounted(() => {
            selectIptDom = selectIpt.value as any
            selectOptionsDom = selectOptions.value as any
            selectRootDom = selectRoot.value as any
            selectPushIconDom = selectPushIcon.value as any
            selectIptDom.style.flexBasis = 'calc(2em)'
            // 如果没有f-option，那就是空数组
            hasChildren = !!selectOptionsDom.children[0].children.length
            isEmpty.value = !hasChildren
            initInputValue()
            initTranslateY()
            if (props.filterable) {
                selectIptDom.removeAttribute('readonly')
                selectIptDom.style.cursor = 'text'
            }
        })

        return{
            isFocus,
            selectRoot,
            selectIpt,
            selectOptions,
            showOptionList,
            currentData,
            getLabelList,
            getValueList,
            handleInput,
            inputValue,
            isEmpty,
            handleClose,
            getChose,
            toggleView,
            closeTag,
            clearChose,
            collection,
            focus,
            blur,
            compositionStart,
            compositionEnd
        }
    }
})
</script>

<style scoped lang="scss">
.f-select{
    --translateY: 15px;
    position: relative;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    cursor: pointer;
    transition: border-color .2s, box-shadow .2s;
    &:not(.f-select--disabled):hover{
        border-color: var(--primary);
    }
    .f-select-input{
        flex-grow: 1;
        outline: none;
        border: 0;
        outline: 0;
        width: 100%;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        user-select: none;
        border-radius: 5px;
        padding: 0 24px 0 12px;
        box-sizing: border-box;
        display: inline-block;
    }
}
.f-select__small{
    .f-select-input{
        height: 24px;
        line-height: 24px;
    }
    font-size: 12px!important;
}
.f-select__default{
    .f-select-input{
        height: 30px;
        line-height: 30px;
    }
    font-size: 16px!important;
}
.f-select__large{
    .f-select-input{
        height: 38px;
        line-height: 38px;
    }
    font-size: 20px!important;
}
.f-select-prefix{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    color: #888;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
}
.f-select--disabled{
    cursor: not-allowed;
    &::before{
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #f2f2f2;
        opacity: .65;
        width: 100%;
        height: 100%;
        z-index: 100;
    }
}
.f-select__isFocus{
    border-color: var(--primary);
    box-shadow: 0 0 0 .15em #1661ab33;
}
.f-option-tag{
    background-color: #eee;
    border-radius: 5px;
    padding: 2px 6px;
    font-size: 14px;
    height: calc(1.2em);
    line-height: calc(1.2em);
    cursor: text;
    color: #666;
    margin: calc(.2em) 0 calc(.2em) calc(.6em);
    i{
        margin-left: 8px;
        font-size: 12px;
        color: #aaa;
        border: 1px solid transparent;
        border-radius: 50%;
        &:hover{
            color: #333;
            border-color: #999;
            cursor: pointer;
        }
    }
}
.f-select-push-icon{
    i{
        display: none;
    }
    &:hover{
        i{
            display: block;
        }
        span{
            display: none;
        }
    }
}
.f-select-arrow{
    position: absolute;
    right: calc(.5em);
    top: 50%;
    font-size: 14px;
    color: #666;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform .25s;
}
.f-icon-rotate{
    transform: translateY(-50%) rotate(180deg);
}
.f-option-list__x-top,.f-option-list__x-bottom{
    &::before, &::after{
        content: '';
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-bottom-color: #fff;
        left: 12px;
        top: -12px;
        z-index: 2;
    }
    &::after{
        border-bottom-color: #ddd;
        left: 12px;
        top: -13px;
        z-index: 1;
    }
}
.f-option-list__x-top{
    &::before, &::after{
        border-color: transparent;
        border-top-color: #fff;
        top: initial;
        bottom: -12px;
    }
    &::after{
        border-top-color: #ddd;
        top: initial;
        bottom: -13px;
    }
}
.f-option-list{
    box-sizing: border-box;
    position: absolute;
    left: 0;
    z-index: 100;
    background-color: #fff;
    box-shadow: 0 1px 5px #bbb;
    border-radius: 5px;
    padding: 5px 0;
}
.f-option-list-ul{
    box-sizing: border-box;
    list-style: none;
    margin: 0;
    /*padding: 0 5px 0 0;*/
    /*overflow: hidden;*/
    max-height: 240px;
    width: 100%;
    min-width: 200px;
    /*&:hover{*/
        overflow: auto;
        padding: 0;
    /*}*/
    &::-webkit-scrollbar{
        width: 5px;
    }
    &::-webkit-scrollbar-track{
        background-color: #f2f2f2;
    }

    &::-webkit-scrollbar-thumb{
        background-color: #ccc;
        &:hover{
            background-color: #aaa;
        }
    }
}
.f-select__isEmpty{
    text-align: center;
    color: #999;
    min-width: 205px;
}
</style>
