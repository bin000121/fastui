<template>
    <div
        :id="id"
        :style="`height: ${getHeight}`"
        class="f-carousel-container"
    >
        <div
            ref="itemList"
            class="f-carousel-item-container"
            :class="{
                ['f-carousel-item-container__' + effect]: effect
            }"
            :style="`transition-timing-function: ${easing}`"
        >
            <slot></slot>
        </div>
        <ul
            v-if="showDots"
            class="f-carousel-dots-container"
            :class="[dotsClassName]"
        >
            <li
                v-for="(item, idx) in dotsNum"
                :key="item"
                :class="{
                    ['f-carousel-dots__' + dotsStyle]: true,
                    'is-active': currentIndex === idx
                }"
            ></li>
        </ul>
        <template v-if="showArrow">
            <i
                class="f-icon-arrow-left-bold arrow-left"
                :class="{
                    ['arrow-left__' + showArrowType]: showArrowType !== 'always'
                }"
                @click="prev"
            ></i>
            <i
                class="f-icon-arrow-right-bold arrow-right"
                :class="{
                    ['arrow-right__' + showArrowType]: showArrowType !== 'always'
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
    onMounted
} from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'
import { isCorrectUnit, debounce } from '/@/utils/utils'

export default defineComponent({
    props: {
        height: String,
        trigger: {
            type: String,
            default: 'click'
        },
        loop: Boolean,
        autoplay: Boolean,
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
        dotsStyle: {
            type: String,
            default: 'circle',
            validator: (val: string) => ['circle', 'rect'].includes(val)
        },
        showArrow: {
            type: Boolean,
            default: true
        },
        showArrowType: {
            type: String,
            default: 'always',
            validator: (val: string) => ['hover', 'always', 'none'].includes(val)
        },
        easing: {
            type: String,
            default: 'ease',
        },
        effect: {
            type: String,
            default: 'slide',
            validator: (val: string) => ['slide', 'fade'].includes(val)
        },
        dotsClassName: String
    },
    setup (props, { emit, slots }) {
        const id = getRandomId('f-carousel')
        const instanceList: any[] = []
        const orderList: number[] = []
        const dotsNum = ref(0)
        const currentIndex = ref(0)
        const itemList = ref(null)
        let itemListDom: HTMLElement
        const root = getCurrentInstance()
        const getHeight = computed(() => {
            return isCorrectUnit(props.height)
        })

        const collectInstance = (instance: ComponentInternalInstance) => {
            instanceList.push(instance)
            dotsNum.value = instanceList.length
            orderList[dotsNum.value - 1] = dotsNum.value - 1
            if (slots.default!().length === dotsNum.value && props.loop) nextTick(initSetInterval)
        }
        console.log(instanceList)

        const prev = () => {
            console.log('prev')
        }

        const next = () => {
            console.log('next')
        }

        let timer: NodeJS.Timer
        const initSetInterval = () => {
            if (instanceList?.length === 1
                || !instanceList?.length ||
                props.interval <= 0 ||
                props.interval < 500
            ) return
            timer = setInterval(() => {
                if (props.effect === 'slide') {
                    handleSlide()
                }
            }, props.interval)
        }

        const getOrderObj = (curIdx: number) => {
            let obj: any = {}
            let orderArr: number[] = [...orderList]
            for (let i = 0; i < orderArr.length; i ++) {
                let findIdx = orderArr.indexOf(curIdx)
                if (findIdx === 1) break
                if (findIdx === 0) {
                    orderArr = [...orderArr.slice(-1), ...orderArr.slice(0, -1)] as number[]
                    break
                }
                orderArr = [...orderArr.slice(findIdx - 1), ...orderArr.slice(0, findIdx - 1)] as number[]
            }
            console.log(orderArr)
            orderArr.forEach((val, i) => {
                obj[val] = i
            })
            return obj
        }

        const handleSlide = () => {
            const containerWidth = itemListDom.offsetWidth
            if (currentIndex.value === instanceList.length - 1) {
                itemListDom.style.cssText = 'left: 0px;'
                currentIndex.value = 0
            }
            let idx = currentIndex.value % 4
            itemListDom.style.transform = `translate(${-1 * (idx + 1) * containerWidth}px)`
            currentIndex.value ++
        }
        
        const handleFade = () => {
            console.log(111)
        }
        
        const initItemOrder = () => {
            let obj = getOrderObj(currentIndex.value)
            console.log(obj)
        }
        
        provide('parent', {
            root,
            collectInstance,
        })
        onMounted(() => {
            itemListDom = itemList.value!
            initItemOrder()
        })
        return {
            id,
            dotsNum,
            getHeight,
            itemList,
            currentIndex,
            prev,
            next
        }
    }
})
</script>

<style scoped lang="scss">
.f-carousel-container{
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
        transition: background-color .2s, opacity .3s ease;
    }
    i.arrow-left{
        left: 0;
        padding-right: 1px;
    }
    i.arrow-right{
        right: 0;
        padding-left: 1px;
    }
    i.arrow-left:hover, i.arrow-right:hover {
        background-color: rgba(0, 0, 0, .3);
    }

    i.arrow-left__hover, i.arrow-right__hover {
        opacity: 0;
    }
    i.arrow-left__none, i.arrow-right__none {
        display: none;
    }
    &:hover {
        i.arrow-left__hover, i.arrow-right__hover {
            opacity: 1;
        }
    }

}
.f-carousel-dots-container{
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    li.f-carousel-dots__circle.is-active{
        height: 7px;
        width: 20px;
        border-radius: 4px;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, .3);
    }
    li.f-carousel-dots__rect.is-active{
        opacity: 1;
        box-shadow: 0 0 3px #ccc;
    }
}
.f-carousel-dots__circle{
    background-color: #fff;
    height: 7px;
    width: 7px;
    border-radius: 50%;
    list-style: none;
    cursor: pointer;
    margin: 0 4px;
    transition: width .15s ease;
}
.f-carousel-dots__rect{
    background-color: #fff;
    height: 7px;
    width: 20px;
    opacity: .32;
    list-style: none;
    cursor: pointer;
    margin: 0 4px;
    border-radius: 4px;
}
</style>