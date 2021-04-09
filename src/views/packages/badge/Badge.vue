<template>
    <div class="f-badge" v-if="$slots.default">
        <div class="f-badge__box" ref="box">
            <div
                v-if="isShow"
                class="f-badge__dot"
                :style="{
                    ...dotStyle,
                    backgroundColor: `${ color || `var(--${type})`}`
                }"
            ></div>
            <div
                v-else
                class="f-badge__count"
                :style="{
                    ...countStyle,
                    backgroundColor: `${ color || `var(--${type})`}`
                }"
            >
                {{formatCount(count)}}
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    watch,
    computed,
    nextTick
} from 'vue'
import type { PropType, CSSProperties } from 'vue'
import { isEmpty } from '/@/utils/isEmpty'
export default defineComponent({
    props: {
        count: Number,
        max: {
            type: Number,
            default: 99
        },
        dot: Boolean,
        color: String,
        type: {
            type: String,
            default: 'error',
            validator: (val: string) => ['error', 'success', 'warning', 'info'].includes(val)
        },
        dotStyle: Object as PropType<CSSProperties>,
        countStyle: Object as PropType<CSSProperties>,
        placement: Array as PropType<number[]>
    },
    setup (props) {
        const box = ref(null)
        let boxDom: HTMLElement

        const isShow = computed(() => {
            let isCount = Boolean(props.count ?? false)
            let isDot = !!props.dot
            return isDot && !isCount
        })

        // const getStyle = computed(() => {
        //     if (props.)
        // })

        const formatCount = computed(() => {
            return (num: number) => num >= props.max ? props.max + '+' : num
        })

        const initPlacement = () => {
            let isCount = Boolean(props.count ?? false)
            if (!props.dot && !isCount) {
                boxDom.style.display = 'none'
                return
            }
            let width = boxDom.offsetWidth
            let height = boxDom.offsetHeight
            if (props.placement &&
                props.placement.length === 2 &&
                typeof props.placement[0] === 'number' &&
                typeof props.placement[1] === 'number'
            ) {
                boxDom.style.cssText = `right: ${props.placement[0]}px;top: ${props.placement[1]}px;`
            } else {
                boxDom.style.cssText = `right: -${width / 2}px;top: -${height / 2}px;`
            }
        }

        watch(() => [props.count, props.dot], () => {
            nextTick(() => initPlacement())
        })

        onMounted(() => {
            boxDom = box.value as any
            initPlacement()
        })
        return{
            box,
            isShow,
            formatCount,
        }
    }
})
</script>

<style scoped lang="scss">
.f-badge{
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    font-size: 12px;
}
.f-badge__box{
    box-sizing: border-box;
    display: inline-block;
    position: absolute;
}
.f-badge__dot{
    width: 10px;
    height: 10px;
    background-color: var(--error);
    border-radius: 50%;
}
.f-badge__count{
    padding: 3px 6px;
    font-size: 12px;
    color: #fff;
    border-radius: 15px;
}
</style>