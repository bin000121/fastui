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
            <i class="f-icon-arrow-left-bold arrow-left" @click="prev"></i>
            <i class="f-icon-arrow-right-bold arrow-right" @click="next"></i>
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
            validator: (val: number) => val >= 0
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
            default: 'rect',
            validator: (val: string) => ['circle', 'rect'].includes(val)
        },
        showArrow: {
            type: Boolean,
            default: true
        },
        showArrowType: {
            type: String,
            default: 'hover',
            validator: (val: string) => ['hover', 'always', 'none'].includes(val)
        },
        easing: {
            type: String,
            default: 'linear',
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
            if (instanceList?.length === 1 || !instanceList?.length ) return
            const containerWidth = itemListDom.offsetWidth
            timer = setInterval(() => {
                if (props.effect === 'slide') {
                    if (currentIndex.value === instanceList.length - 1) {
                        itemListDom.style.cssText = 'left: 0px;'
                        currentIndex.value = 0
                    }
                    itemListDom.style.transform = `translate(${-1 * (currentIndex.value + 1) * containerWidth}px)`
                    currentIndex.value ++
                }
            }, props.interval)
        }

        provide('parent', {
            root,
            collectInstance,
        })
        onMounted(() => {
            itemListDom = itemList.value!
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
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .12);
        box-sizing: border-box;
        transition: background-color .2s;
    }
    i.arrow-left{
        left: 18px;
        padding-right: 1px;
    }
    i.arrow-right{
        right: 18px;
        padding-left: 1px;
    }
    i.arrow-left:hover, i.arrow-right:hover {
        background-color: rgba(0, 0, 0, .3);
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
    li.is-active{
        opacity: 1;
        box-shadow: 0 0 3px #ccc;
    }
}
.f-carousel-dots__circle{
    background-color: #fff;
    height: 8px;
    width: 8px;
    opacity: .32;
    border-radius: 50%;
    list-style: none;
    cursor: pointer;
    margin: 0 3px;
}
.f-carousel-dots__rect{
    background-color: #fff;
    height: 3px;
    width: 22px;
    opacity: .32;
    list-style: none;
    cursor: pointer;
    margin: 0 3px;
    border-radius: 15px;
}
</style>