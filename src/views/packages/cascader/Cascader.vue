<template>
    <div
        :id="id"
        :class="{
            'f-cascader': true,
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
            @focus="focus"
        >
        <i class="f-icon-arrow-down-bold icon"></i>

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
                    <ul>
                        <li
                            v-for="item in options"
                            :key="item[props.value]"
                        >
                            {{item[props.label]}}
                            <i class="f-icon-arrow-right-bold right-icon"></i>
                        </li>
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
    emits: ['update:value', 'change', 'show', 'showed', 'hide', 'hided'],
    props: {
        value: Array as PropType<string[] | number[]>,
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
            type: Object,
            default: () => ({
                label: 'label',
                value: 'value',
                children: 'children',
                disabled: 'disabled'
            })
        },
        stopLevel: Number,
    },
    setup (props) {
        const id = getRandomId('f-cascader')
        const cascader = ref(null)
        const cascaderIpt = ref(null)
        const cascaderPanel = ref(null)
        let cascaderDom: HTMLElement
        let cascaderIptDom: HTMLElement
        let cascaderPanelDom: HTMLElement
        const isFocus = ref(false)
        const isShowPanel = ref(false)
        const isRenderPanel = ref(true)

        const togglePanel = () => {
            if (props.disabled) return
            isShowPanel.value = !isShowPanel.value
        }

        const handleHidePanel = () => {
            if (props.disabled) return
            isShowPanel.value = false
        }

        // 初始化是否展示级联面板
        const initIsRenderPanel = () => {
            isRenderPanel.value = !props.disabled && !isEmpty(props.options)
        }

        // 初始化级联面板的y轴定位
        const initCascaderPanelPosition = () => {
            if (!isRenderPanel.value) return
            const [y] = props.placement.split('-')
            const height = cascaderDom.offsetHeight
            let yValue: number
            if (y === 'top') {
                cascaderPanelDom.style.cssText = `top: unset;bottom: ${height}px`
                yValue = -15
            } else {
                cascaderPanelDom.style.cssText = `bottom: unset;top: ${height}px`
                yValue = 15
            }
            cascaderDom.style.setProperty('--translateY', `${yValue}px`)
        }

        watch(() => props.options, () => {
            initIsRenderPanel()
        }, { immediate: true, deep: true })

        watch(() => props.placement, () => {
            initCascaderPanelPosition()
        })
        console.log(props.options)

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
            togglePanel,
            handleHidePanel,
        }
    }
})
</script>

<style scoped lang="scss">
.f-cascader{
    --translateY: 15px;
    position: relative;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    display: inline-flex;
    transition: border-color .2s ease-in-out;
    font-size: 14px!important;
    &:not(.f-cascader__disabled):hover{
        border-color: var(--primary);
    }
    i.icon{
        color: #bbb;
        font-size: 14px;
        position: absolute;
        top: 50%;
        right: calc(.45em);
        transform: translateY(-50%);
    }
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
    box-sizing: border-box;
    height: 150px;
    border: 1px solid #ccc;
    background-color: #fff;
    position: absolute;
    left: 0;
    border-radius: 5px;
    padding: 4px 0;
    ul{
        margin: 0;
        padding: 0;
        li{
            box-sizing: border-box;
            font-size: 14px;
            padding: 6px 25px 6px 12px;
            position: relative;
            cursor: pointer;
            color: #333;
            transition: all .2s ease-in-out;
            &:not(.options__disabled):hover{
                background-color: #f2f2f2;
            }
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
</style>