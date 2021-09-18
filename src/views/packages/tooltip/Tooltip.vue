<template>
    <div
        class="f-tooltip"
        :id="id"
        ref="fTooltip"
        @mouseenter.stop="handleMouseenter"
        @mouseleave.stop="handleMouseleave"
    >
        <slot></slot>
        <transition
            name="f-tooltip-fade"
            @after-enter="showStatusChange('opened')"
            @after-leave="showStatusChange('closed')"
        >
            <div
                :class="{
                    'f-tooltip-content': true,
                    ['f-tooltip-content__' + theme]: true,
                }"
                ref="fTooltipContent"
                v-show="isShow"
            >
                <template v-if="$slots.tooltip">
                    <slot name="tooltip"></slot>
                </template>
                <template v-else>
                    {{tooltip}}
                </template>

                <template v-if="showArrow">
                    <div
                        class="f-tooltip-content-arrow"
                        ref="fTooltipContentArrow"
                    ></div>
                    <div
                        class="f-tooltip-content-arrow__light"
                        ref="fTooltipContentArrowLight"
                        v-if="theme === 'light'"
                    ></div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs,
    computed,
    ref,
    CSSProperties,
    PropType,
    onMounted
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

const placementList: string[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'left-top',
    'left-center',
    'left-bottom',
    'right-top',
    'right-center',
    'right-bottom',
]

export default defineComponent({
    emits: ['show-status'],
    props: {
        id: {
            type: String,
            default: () => getRandomId('f-tooltip')
        },
        placement: {
            type: String,
            default: 'top-center',
            validator: (val: string) => placementList.includes(val)
        },
        tooltip: {
            type: String,
            default: '提示内容'
        },
        theme: {
            type: String,
            default: 'dark',
            validator: (val: string) => ['dark', 'light'].includes(val)
        },
        tooltipStyle: Object as PropType<CSSProperties>,
        delayShow: {
            type: Number,
            default: 50,
            validator: (val: number) => val >= 0
        },
        delayHide: {
            type: Number,
            default: 50,
            validator: (val: number) => val >= 0
        },
        showArrow: {
            type: Boolean,
            default: true
        }
    },
    setup (props, { emit }) {
        const fTooltip = ref(null)
        const fTooltipContent = ref(null)
        const fTooltipContentArrow = ref(null)
        const fTooltipContentArrowLight = ref(null)
        const isShow = ref(false)

        let fTooltipDom: HTMLElement
        let fTooltipContentDom: HTMLElement
        let fTooltipContentArrowDom: HTMLElement
        let fTooltipContentArrowLightDom: HTMLElement
        let timer: NodeJS.Timer

        const getPlacement = computed(() => {
            let placement = props.placement
            const mapPlacement: { [key: string]: string } = {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left'
            }
            if (!placementList.includes(props.placement)) {
                placement = 'top-center'
                console.warn('[fast-ui]: error placement property value received!')
            }
            const [p1, p2] = placement.split('-')
            return {
                originP1: p1,
                originP2: p2,
                p1: mapPlacement[p1],
                p2: mapPlacement[p2] || 'center',
                p1IsAtXAxis: ['left', 'right'].includes(p1)
            }
        })

        // 初始化tooltip的位置
        const initPlacement = () => {
            const { originP1, originP2, p1, p2, p1IsAtXAxis } = getPlacement.value
            const distance = p1IsAtXAxis ? fTooltipDom.offsetWidth : fTooltipDom.offsetHeight
            const translate = `transform: translate(${p1IsAtXAxis ? '0, -50%' : '-50%, 0'})`
            const yAxis = p1IsAtXAxis? 'top' : 'left'
            const dark = props.theme === 'dark'
            let cssText = `${p1}: ${ distance + (props.showArrow ? 6 : 3) }px;display: none;`
            let color = dark ? '#272624' : '#fff'
            let arrowCssText = `${p1}: -10px;border-${originP1}-color: ${color};`
            let lightArrowCssText = `${p1}: -10px;border-${originP1}-color: #333;`
            let str1 = `${originP2}: 0px;`
            let str2 = `${originP2}: 10px;`

            str1 = p2 === 'center' ? `${yAxis}: 50%;${translate}` : str1
            str2 = p2 === 'center' ? `${yAxis}: 50%;${translate}` : str2
            cssText += str1
            arrowCssText += str2
            lightArrowCssText += str2
            fTooltipContentDom.style.cssText = cssText
            if (props.showArrow) {
                fTooltipContentArrowDom.style.cssText = arrowCssText
                if (!dark) fTooltipContentArrowLightDom.style.cssText = lightArrowCssText
            }
        }

        const handleMouseenter = () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                isShow.value = true
            }, props.delayShow)
        }

        const handleMouseleave = () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                isShow.value = false
            }, props.delayHide)
        }

        const showStatusChange = (status: 'closed' | 'opened') => {
            emit('show-status', status)
        }

        onMounted(() => {
            fTooltipDom = fTooltip.value as any
            fTooltipContentDom = fTooltipContent.value as any
            fTooltipContentArrowDom = fTooltipContentArrow.value as any
            fTooltipContentArrowLightDom = fTooltipContentArrowLight.value as any
            initPlacement()
        })

        return{
            fTooltip,
            fTooltipContent,
            fTooltipContentArrow,
            fTooltipContentArrowLight,
            isShow,
            handleMouseenter,
            handleMouseleave,
            showStatusChange,
        }
    }
})
</script>

<style scoped lang="scss">
.f-tooltip{
    position: relative;
    box-sizing: border-box;
    display: inline-block;
}
.f-tooltip-content{
    position: absolute;
    font-size: 14px;
    padding: 8px 12px;
    display: inline-block;
    white-space: nowrap;
    z-index: 9999;
    border-radius: 5px;
    transform-origin: bottom;
}
.f-tooltip-content-arrow, .f-tooltip-content-arrow__light{
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    z-index: 2;
}
.f-tooltip-content-arrow__light{
    z-index: 1;
}
.f-tooltip-content__dark{
    color: #fff;
    background-color: rgba(0, 0, 0, .85);
}
.f-tooltip-content__light{
    color: #272624;
    box-shadow: 0 0 3px #888;
    background-color: #fff;
}
</style>
