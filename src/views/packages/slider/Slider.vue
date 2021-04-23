<template>
    <div class="f-slider" ref="sliderBox">
        <div
            :class="{
                'f-slider-track': true,
                'f-slider-track--disabled': disabled,
                'f-slider-track--readonly': readonly
            }"
            ref="sliderTrack"
            @mouseup="handleTrackUp"
        >
            <div
                class="f-slider-thumb"
                ref="sliderThumb"
                @mousedown="handleThumbDown"
            >
                <div
                    :class="{
                        'f-slider-thumb-tooltip': true,
                        'f-slider-thumb-tooltip--hover': tooltipType === 'hover'
                    }"
                    ref="sliderThumbTooltip"
                    v-show="showTooltip"
                >
                    <span class="slider-num">{{currentNum}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    ref,
    toRef
} from 'vue'
import { throttle } from '/@/utils/utils'

export default defineComponent({
    props: {
        value: {
            type: Number,
            default: 0
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showTooltip: {
            type: Boolean,
            default: true
        },
        tooltipType: {
            type: String,
            default: 'always',
            validator: (value: string) => ['always', 'hover'].includes(value)
        },
        readonly: {
            type: Boolean,
            default: false
        },
        step: {
            type: Number,
            default: 1
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        throttleDelay: {
            type: Number,
            default: 10
        },
        showTick: {
            type: Boolean,
            default: false
        }
    },
    setup (props) {
        const {
            disabled,
            readonly,
            value,
            max,
            min,
            throttleDelay,
            step,
            showTick
        } = props
        let currentX = 0 // 当前手柄滑动距离轨道左侧的距离
        let trackLeft = 0 // 轨道距页面左侧的距离
        let trackDomWidth = 0 // 轨道宽度
        let thumbRadius = 0 // 手柄半径
        let stepLength = 0 // 每一步走的距离
        let correctNum = min > 0 ? min - 0 : 0 - min // 补正值，先将最小值看作坐标原点，后续用该值补正等到正确坐标
        let isDragging = false // 当正在滑动时锁定滑动状态
        const sliderBox = ref(null) // 滑块盒子的引用
        let sliderBoxDom: HTMLElement // 滑块盒子的Dom对象
        const sliderTrack = ref(null) // 轨道的引用
        let sliderTrackDom: HTMLElement // 轨道的Dom对象
        const sliderThumbTooltip = ref(null) // 提示组件的引用
        let thumbTooltipDom: HTMLElement // 提示组件的Dom对象
        const sliderThumb = ref(null) // 手柄的引用
        let sliderThumbDom: HTMLElement // 手柄的Dom对象
        const currentNum = ref(0) // tooltip 中的值

        // 补正函数，用于校准坐标偏移后的正确数值
        const getCorrectNum = (num: number) => {
            let Num = correctNum > 0 ? num + correctNum : num - correctNum
            Num *= step
            return Num > max ? max : Num
        }

        const setPosition = (position: number) => {
            sliderThumbDom.style.left = parseFloat((position - thumbRadius).toString()) + 'px'
        }

        const handleThumbDown = (e: MouseEvent) => {
            if (disabled || readonly) return
            e.preventDefault()
            sliderThumbDom.classList.add('f-slider-thumb--dragging')
            startDrag()
            window.addEventListener('mousemove', throttle(onDragging, throttleDelay))
            window.addEventListener('mouseup', onDragEnd)
            window.addEventListener('contextmenu', onDragEnd)
        }
        const onDragging = (e: MouseEvent) => {
            if (!isDragging) return
            currentX = e.clientX - trackLeft
            if (currentX < 0) {
                currentX = 0
            } else if (currentX > trackDomWidth) { // 当超出手柄的半径时即已经为最大
                currentX = trackDomWidth
            }
            // 计算区间
            let currentPosition = Math.round((100 * currentX / trackDomWidth) / stepLength * 0.01)
            currentNum.value = currentX === trackDomWidth ? max : getCorrectNum(currentPosition)  // 补正数值
            setPosition(parseFloat((currentPosition * stepLength * 100).toFixed(0)) * trackDomWidth * 0.01)
        }
        const onDragEnd = () => {
            isDragging = false
            sliderThumbDom.classList.remove('f-slider-thumb--dragging')
            window.removeEventListener('mousemove', onDragging)
            window.removeEventListener('mouseup', onDragEnd)
            window.removeEventListener('contextmenu', onDragEnd)
        }
        const startDrag = () => {
            isDragging = true
            trackLeft = sliderTrackDom.offsetLeft
            trackDomWidth = sliderTrackDom.offsetWidth // 轨道长度
            stepLength = step / (max - min) // 每一步走的距离
        }
        const handleTrackUp = (e: MouseEvent) => {
            if (e.button || isDragging || disabled || readonly) return
            // 点击的时候，让手柄圆心位于点击处
            trackDomWidth = sliderTrackDom.offsetWidth // 轨道长度
            stepLength = step / (max - min) // 每一步走的距离
            let currentPosition = Math.round(e.offsetX / trackDomWidth / stepLength)
            currentNum.value = getCorrectNum(currentPosition)
            setPosition(parseFloat((currentPosition * stepLength * 100).toFixed(0)) * trackDomWidth * 0.01)
        }

        onMounted(() => {
            sliderThumbDom = sliderThumb.value as any
            sliderTrackDom = sliderTrack.value as any
            thumbTooltipDom = sliderThumbTooltip.value as any
            thumbRadius = sliderThumbDom.offsetWidth / 2 // 手柄半径
            sliderBoxDom = sliderBox.value as any
            // 初始时让外层盒子的左右外边距是手柄的直径
            sliderBoxDom.style.margin = `0 ${sliderThumbDom.offsetWidth}px`
            // 手柄thumb初始位置
            sliderThumbDom.style.transform = `translateY(calc(-50% + ${ sliderTrackDom.offsetHeight / 2 }px))`
            const initTooltipTop = thumbTooltipDom.offsetHeight
            thumbTooltipDom.style.top = `-${ Math.floor(initTooltipTop + initTooltipTop / 4 + 3) }px`
            // 当传 value 或者 v-model:value 时确定手柄初始位置
            if (!value) {
                setPosition(0)
            } else if (value <= min) {
                currentNum.value = min
                setPosition(0)
            } else if (value > max) {
                setPosition(max)
            } else {
                currentNum.value = value
            }
            let currentPosition = currentNum.value >= 0 ? currentNum.value - correctNum : currentNum.value + correctNum
            setPosition(parseFloat((currentPosition * (step / (max - min)) * 100).toFixed(0)) * sliderTrackDom.offsetWidth * 0.01)
            if (showTick) {

            }
        })
        return{
            sliderThumbTooltip,
            sliderThumb,
            sliderTrack,
            sliderBox,
            handleThumbDown,
            handleTrackUp,
            currentNum
        }
    }
})
</script>

<style scoped lang="scss">
.f-slider{
    min-height: 32px;
    display: flex;
    align-items: center;
}

.f-slider-track{
    width: 100%;
    height: 3px;
    background-color: var(--primary);
    position: relative;
    border-radius: 5px;
    cursor: pointer;
}

.f-slider-track--disabled{
    background-color: #ddd;
    cursor: default;
    .f-slider-thumb{
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before{
            content: '';
            width: 50%;
            height: 50%;
            background-color: #ddd;
            border-radius: 50%;
        }
        cursor: default;
        &:hover{
            box-shadow: none;
        }
    }
    .f-slider-thumb-tooltip{
        background-color: #ddd;
    }
}

.f-slider-track--readonly{
    cursor: default;
    .f-slider-thumb{
        cursor: default;
        &:hover{
            box-shadow: none;
        }
    }
}

.f-slider-thumb{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: var(--primary);
    position: absolute;
    cursor: grab;
    box-shadow: none;
    transition: box-shadow .25s;
    &:hover{
        box-shadow: 0 0 0 10px rgba(22, 97, 171, .2);
    }
}

.f-slider-thumb--dragging{
    cursor: grabbing;
    box-shadow: 0 0 0 15px rgba(22, 97, 171, .2);
    &.f-slider-thumb:hover{
        box-shadow: 0 0 0 15px rgba(22, 97, 171, .2);
    }
}

.f-slider-thumb-tooltip{
    width: 30px;
    height: 30px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    font-size: 12px;
    z-index: 99;
    color: #fff;
    transform: translateX(-50%) rotate(45deg);
    border-radius: 50% 50% 0;
    background-color: var(--primary);
    transition: opacity .15s ease-in-out;
    .slider-num{
        user-select: none;
        transform: rotate(-45deg);
    }
}
.f-slider-thumb-tooltip--hover{
    opacity: 0;
}
.f-slider-thumb:hover .f-slider-thumb-tooltip--hover{
    opacity: 1;
}
</style>
