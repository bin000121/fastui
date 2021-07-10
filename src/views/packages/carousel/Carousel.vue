<template>
    <div
        :id="id"
        :style="`height: ${getHeight}`"
        class="f-carousel-container"
        ref="carouselContainer"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
    >
        <slot></slot>
        <ul
            v-if="showDots"
            class="f-carousel-dots-container"
            :class="[dotsClassName]"
        >
            <li
                v-for="(item, idx) in dotsNum"
                :key="idx"
                :class="{
                    ['f-carousel-dots__' + dotsType]: true,
                    'is-active': currentIndex === idx
                }"
                @click="dotTriggerWhenClick(idx)"
                @mouseenter="dotTriggerWhenHover(idx)"
            ></li>
        </ul>
        <template v-if="showArrow">
            <i
                class="f-icon-arrow-left-bold arrow-left"
                :class="{
                    ['arrow-left__' + showArrowType]: true
                }"
                @click="prev"
            ></i>
            <i
                class="f-icon-arrow-right-bold arrow-right"
                :class="{
                    ['arrow-right__' + showArrowType]: true
                }"
                @click="next"
            ></i>
        </template>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    provide,
    getCurrentInstance,
    computed,
    watch,
    nextTick,
    onMounted,
    onUnmounted
} from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'
import { isCorrectUnit, throttle } from '/@/utils/utils'

export default defineComponent({
    props: {
        value: Number,
        height: String,
        loop: Boolean,
        interval: {
            type: Number,
            default: 3500,
            validator: (val: number) => val > 0 && val >= 500
        },
        showDots: {
            type: Boolean,
            default: true
        },
        dotsPlacement: {
            type: String,
            default: ''
        },
        dotsType: {
            type: String,
            default: 'circle',
            validator: (val: string) => ['circle', 'rect'].includes(val)
        },
        dotTrigger: {
            type: String,
            default: 'click',
            validator: (val: string) => ['click', 'hover'].includes(val)
        },
        showArrow: {
            type: Boolean,
            default: true
        },
        showArrowType: {
            type: String,
            default: 'hover',
            validator: (val: string) => ['hover', 'always'].includes(val)
        },
        easing: {
            type: String,
            default: 'ease',
        },
        dotsClassName: String
    },
    setup (props, { emit, slots }) {
        const id = getRandomId('f-carousel')
        const instanceList: any[] = []
        const orderList: number[] = []
        const dotsNum = ref(0)
        const currentIndex = ref(0)
        const carouselContainer = ref(null)
        let carouselContainerDom: HTMLElement

        const getHeight = computed(() => {
            return isCorrectUnit(props.height)
        })

        let containerWidth: number

        // 收集实例
        const collectInstance = (instance: ComponentInternalInstance) => {
            instanceList.push(instance)
            dotsNum.value = instanceList.length
            orderList[dotsNum.value - 1] = dotsNum.value - 1
        }

        const handleCurrentIdx = (num = 1) => {
            let sum = currentIndex.value + num
            if (sum > instanceList.length - 1) return 0
            else if (sum < 0) return instanceList.length - 1
            else return sum
        }

        let clickDotsIdx = -1

        // 上一张
        const prev = throttle(() => {
            const curIdx = currentIndex.value
            if (curIdx === 0 && instanceList.length === 2) {
                next()
                return
            }
            const prevIdx = clickDotsIdx !== -1 ? clickDotsIdx : handleCurrentIdx(-1)
            const curDom = instanceList[curIdx].proxy.$el as HTMLElement
            const prevDom = instanceList[prevIdx].proxy.$el as HTMLElement
            prevDom.style.transitionProperty = 'transform'
            prevDom.style.transform = 'translateX(0)'
            curDom.style.transform = `translateX(${containerWidth}px)`
            currentIndex.value = prevIdx
            setTimeout(() => initPosition(), 300)
        }, 300)

        // 下一张
        const next = throttle(() => {
            const curIdx = currentIndex.value
            if (curIdx === 1 && instanceList.length === 2) {
                prev()
                return
            }
            const nextIdx = clickDotsIdx !== -1 ? clickDotsIdx : handleCurrentIdx()
            const curDom = instanceList[curIdx].proxy.$el as HTMLElement
            const nextDom = instanceList[nextIdx].proxy.$el as HTMLElement
            nextDom.style.transitionProperty = 'transform'
            nextDom.style.transform = 'translateX(0)'
            curDom.style.transform = `translateX(-${containerWidth}px)`
            currentIndex.value = nextIdx
            setTimeout(() => initPosition(), 300)
        }, 300)

        let timer: NodeJS.Timer
        const initSetInterval = () => {
            if (instanceList?.length <= 1 || !props.loop) return
            const interval = props.interval >= 500 ? props.interval : 500
            timer = setInterval(() => next(), interval)
        }

        const handleMouseenter = () => {
            if (!props.loop) return
            clearInterval(timer)
        }

        const handleMouseleave = () => {
            if (!props.loop) return
            initSetInterval()
        }

        const dotTriggerWhenHover = throttle((idx: number) => {
            if (props.dotTrigger !== 'hover') return
            handleClickDots(idx)
        }, 50)

        const dotTriggerWhenClick = (idx: number) => {
            if (props.dotTrigger !== 'click') return
            handleClickDots(idx)
        }

        const handleClickDots = (idx: number) => {
            if (currentIndex.value === idx) return
            const dom = instanceList[idx].proxy.$el as HTMLElement
            let gap = idx - currentIndex.value
            if (currentIndex.value === 0 && idx === instanceList.length - 1) {
                prev()
                return
            }
            if (currentIndex.value === instanceList.length - 1 && idx === 0) {
                next()
                return
            }
            dom.style.zIndex = `${instanceList.length - 2}`
            clickDotsIdx = idx
            if (gap > 0) next()
            else {
                dom.style.transform = `translateX(-${containerWidth}px)`
                setTimeout(() => prev(), 100)
            }
        }

        const handleLength2 = () => {
            let curIdx = currentIndex.value
            let curDom = instanceList[curIdx].proxy.$el as HTMLElement
            curDom.style.cssText = `transform: translateX(0);${transition};${transition}`
            let anotherIdx = curIdx === 0 ? 1 : 0
            let anotherDom: HTMLElement
            anotherDom = instanceList[anotherIdx].proxy.$el as HTMLElement
            anotherDom.style.cssText = `transform: translateX(${curIdx === 0 ? '' : '-'}${containerWidth}px);${transitionNone};`
        }

        const goto = (dotNum: number) => {
            if (dotNum > instanceList.length - 1) dotNum = instanceList.length - 1
            if (dotNum < 0) dotNum = 0
            handleClickDots(dotNum)
        }

        // 初始化过渡函数
        const initTimingFunction = () => {
            carouselContainerDom.style.setProperty('--transition-timing-function', props.easing)
        }

        // 初始化索引
        const initCurrentIdx = () => {
            if (!props.value || typeof props.value !== 'number') currentIndex.value = 0
            else currentIndex.value = props.value > instanceList.length - 1 || props.value < 0 ? 0 : props.value
        }

        let transition = `transition: transform .3s ${props.easing}`
        let transitionNone = `transition: none .3s ${props.easing}`
        // 初始化容器顺序
        const initPosition = () => {
            if (instanceList.length === 1) return
            containerWidth = carouselContainerDom.offsetWidth
            if (instanceList.length === 2) {
                handleLength2()
                return
            }
            let findIdx = currentIndex.value
            let orderArr: number[] = [...orderList]
            if (findIdx === 0) orderArr.unshift(orderArr.splice(-1, 1)[0])
            else if (findIdx !== 1) orderArr = [...orderArr.slice(findIdx - 1), ...orderArr.slice(0, findIdx - 1)]
            let [prev, cur, ...rest] = orderArr
            let curDom = instanceList[cur].proxy.$el as HTMLElement
            let prevDom = instanceList[prev].proxy.$el as HTMLElement
            curDom.style.cssText = `transform: translateX(0);${transition};${transition}`
            prevDom.style.cssText = `transform: translateX(-${containerWidth}px);${transitionNone};`
            rest.forEach((val: number, idx: number) => {
                let $el = instanceList[val].proxy.$el as HTMLElement
                $el.style.cssText = `transform: translateX(${containerWidth}px);${transitionNone};z-index: ${rest.length - idx}`
            })
            clickDotsIdx = -1
        }

        watch(() => [props.loop, props.interval], ([loopNewV, intervalNewV]) => {
            if (timer) clearInterval(timer)
            if (loopNewV || intervalNewV) initSetInterval()
        })

        provide('parent', {
            root: getCurrentInstance(),
            collectInstance
        })
        onMounted(() => {
            carouselContainerDom = carouselContainer.value!
            initCurrentIdx()
            initTimingFunction()
            initSetInterval()
            initPosition()
        })
        onUnmounted(() => {
            if (timer) clearInterval(timer)
        })
        return {
            id,
            dotsNum,
            getHeight,
            carouselContainer,
            currentIndex,
            prev,
            next,
            handleClickDots,
            handleMouseenter,
            handleMouseleave,
            dotTriggerWhenClick,
            dotTriggerWhenHover,
            goto
        }
    }
})
</script>

<style scoped lang="scss">
.f-carousel-container{
    --transition-timing-function: ease;
    width: 100%;
    position: relative;
    overflow: hidden;
    .f-carousel-item-container{
        display: flex;
        height: 100%;
        width: 100%;
    }
    .f-carousel-item-container__slide{
        position: absolute;
        top: 0;
        left: 0;
        transition: transform .3s;
    }
    .f-carousel-item-container__fade{
        position: absolute;
        top: 0;
        left: 0;
    }
    i.arrow-left, i.arrow-right{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: #fff;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 24px;
        background-color: rgba(0, 0, 0, .12);
        box-sizing: border-box;
        transition: background-color .2s, opacity .3s ease, left .25s ease, right .25s ease;
        z-index: 5;
    }
    i.arrow-left{
        padding-right: 1px;
    }
    i.arrow-right{

        padding-left: 1px;
    }
    i.arrow-left:hover, i.arrow-right:hover {
        background-color: rgba(0, 0, 0, .3);
    }
    i.arrow-left__hover {
        left: 15px;
        opacity: 0;
    }
    i.arrow-right__hover {
        right: 15px;
        opacity: 0;
    }
    i.arrow-left__always {
        left: 0;
    }
    i.arrow-right__always {
        right: 0;
    }
    &:hover {
        i.arrow-left__hover, i.arrow-right__hover {
            opacity: 1;
        }
        i.arrow-left{
            left: 0;
        }
        i.arrow-right{
            right: 0;
        }
    }
}
.f-carousel-dots-container{
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 5;
    li.f-carousel-dots__circle.is-active{
        height: 7px;
        width: 22px;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, .3);
    }
    li.f-carousel-dots__rect.is-active{
        opacity: 1;
        width: 28px;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, .3);
    }
}
.f-carousel-dots__circle{
    height: 7px;
    width: 7px;
    border-radius: 50%;
    list-style: none;
    cursor: pointer;
    margin: 0 5px;
    transition: width .15s ease;
    background-color: rgba(255, 255, 255, .65);
}
.f-carousel-dots__rect{
    background-color: #fff;
    height: 4px;
    width: 20px;
    opacity: .32;
    list-style: none;
    cursor: pointer;
    margin: 0 4px;
    border-radius: 1px;
    transition: all .25s ease;
}
</style>