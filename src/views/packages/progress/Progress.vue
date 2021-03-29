<template>
    <div
        v-if="circle"
        class="f-progress__circle"
    >
        <svg
            class="f-progress__circle-svg"
            xmlns="http://www.w3.org/2000/svg"
            :width="size"
            :height="size"
            :viewBox="`0 0 ${size} ${size}`"
        >
            <circle
                :r="(size - strokeWidth) / 2"
                :cx="size / 2"
                :cy="size / 2"
                fill="transparent"
                :stroke-width="strokeWidth"
                :stroke="trackColor"
            />
            <circle
                :r="(size - strokeWidth) / 2"
                :cx="size / 2"
                :cy="size / 2"
                fill="transparent"
                :stroke-width="strokeWidth"
                :stroke-linecap="rounded ? 'round' : 'butt'"
                :stroke="getWidth ? barColor : trackColor"
                :stroke-dasharray="getDasharray((size - strokeWidth) / 2)"
                :style="`transform: rotate(${rotate - 90}deg);
                transform-origin: ${size / 2}px ${size / 2}px;
                transition: stroke-dasharray .4s linear;`"
            />
        </svg>
        <span
            class="f-progress__circle-text"
            :style="textStyle || {}"
            :title="valueFormat"
        >
            <template v-if="$slots.text">
                <slot name="text"></slot>
            </template>
            <template v-else>
                {{valueFormat}}
            </template>
        </span>
    </div>
    <div
        class="f-progress"
        :style="`height: ${height}`"
        ref="fProgress"
        v-else
    >
        <div class="f-progress-bar-container">
            <div
                :class="{
                    'f-progress-track': true,
                    'f-progress-track__rounded': rounded,
                }"
                :style="`background-color: ${trackColor};`"
            />
            <div
                :class="{
                    'f-progress-bar': true,
                    'f-progress-bar__rounded': rounded,
                    'f-progress-bar__stripe': !wave && stripe,
                    'f-progress-bar__wave': !stripe && wave,
                }"
                :style="`width: ${getWidth}%;background-color: ${barColor};`"
            >
            <span
                class="f-progress__text-inside"
                :style="textStyle || {
                    right: '6px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }"
                v-if="textInside && !text && !$slots.text"
            >{{valueFormat}}</span>
            </div>
        </div>
        <div
            class="f-progress__text"
            :style="textStyle || {}"
            ref="fProgressText"
            v-if="text && !textInside && !$slots.text"
        >{{valueFormat}}</div>
        <template v-if="$slots.text && !text && !textInside">
            <slot name="text"></slot>
        </template>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    watch,
    computed,
    PropType,
    CSSProperties,
    nextTick
} from 'vue'

const reg = /^[0-9]+em|px|vh|vw|rem|%$/

const defaultHeight = '10px'

export default defineComponent({
    inheritAttrs: false,
    props: {
        value: {
            type: Number,
            default: 0,
            validator: (val: number) => val >= 0 || val <= 100
        },
        height: {
            type: String,
            default: defaultHeight,
            validator: (val: string) => reg.test(val)
        },
        strokeWidth: {
            type: Number,
            default: 10
        },
        size: {
            type: Number,
            default: 100
        },
        rotate: {
            type: [Number, String],
            default: 0
        },
        rounded: Boolean,
        stripe: Boolean,
        wave: Boolean,
        trackColor: {
            type: String,
            default: '#eee'
        },
        barColor: {
            type: String,
            default: '#1661ab'
        },
        text: Boolean,
        textInside: Boolean,
        textStyle: Object as PropType<CSSProperties>,
        format: Function as PropType<(value: number) => string>,
        circle: Boolean
    },
    setup (props) {
        const fProgress = ref(null)
        const fProgressText = ref(null)
        let fProgressDom: HTMLElement
        let fProgressTextDom: HTMLElement

        const getWidth = computed(() => {
            if (props.value < 0) return 0
            if (props.value > 100) return 100
            return props.value
        })

        // const getRadius = computed(() => {
        //     return (props.size - props.strokeWidth) / 2
        // })

        const getDasharray = computed(() => (r: number) => {
            const C = 2 * Math.PI * r
            let percent = getWidth.value ? getWidth.value / 100 * C : 0
            return `${percent} ${C - percent}`
        })

        const valueFormat = computed(() => {
            if (props.format) return props.format(getWidth.value)
            return `${getWidth.value}%`
        })

        const initBgs = () => {
            if (props.circle) return
            let height: string
            if (!reg.test(props.height)) {
                fProgressDom.style.height = defaultHeight
                console.warn('[fast-ui]: Props height must have a unit!')
            }
            height = props.height
            let heightNum: number | string = fProgressDom.style.height.match(/[0-9]+/)![0]
            let extend = height.slice(-1 * heightNum.length)
            let res: number | string = parseInt(heightNum)
            res = (res >= 150 ? 150 : res) + extend
            fProgressDom.style.setProperty('--bgs', `${res} ${res}`)
            fProgressDom.style.setProperty('--bgp-x', '-' + res)
        }

        const initText = () => {
            if (!props.text || props.circle) return
            let width = fProgressTextDom.offsetWidth
            fProgressDom.style.setProperty('--bar-container-padding-right', width + 'px')
        }

        watch(() => props.height, () => {
            initBgs()
            initText()
        })

        onMounted(() => {
            fProgressDom = fProgress.value as any
            fProgressTextDom = fProgressText.value as any
            initBgs()
            initText()
        })
        return{
            fProgress,
            fProgressText,
            getWidth,
            valueFormat,
            getDasharray
        }
    }
})
</script>

<style scoped lang="scss">
.f-progress{
    --bgs: 20px 20px;
    --bgp-x: -20px;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.f-progress-bar-container{
    position: relative;
    width: 100%;
    height: 100%;
    .f-progress-bar, .f-progress-track{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}

.f-progress-bar__rounded, .f-progress-track__rounded{
    border-radius: 24px;
}
.f-progress-bar{
    transition: width .18s ease-in-out;
}
.f-progress__text{
    width: 3em;
    text-align: right;
    color: #000;
}
.f-progress__text-inside{
    position: absolute;
    color: #fff;
}
.f-progress-bar__stripe{
    background-image: linear-gradient(45deg,
            rgba(255,255,255,0) 0,
            rgba(255,255,255,0) 25%,
            rgba(255,255,255,.3) 0,
            rgba(255,255,255,.3) 50%,
            rgba(255,255,255,0) 0,
            rgba(255,255,255,0) 75%,
            rgba(255,255,255,.3) 0,
            rgba(255,255,255,.3) 100%
    );
    background-size: var(--bgs);
    animation: f-progress__stripe 1s linear infinite;
}
.f-progress-bar__wave{
    position: relative;
    &::before, &::after{
        position: absolute;
        left: 0;
        content: '';
        display: block;
        height: 100%;
        width: 0;
        border-radius: 15px;
        background-image: linear-gradient(90deg, transparent, rgba(255,255,255,.5));
    }
    &::before{
        animation: f-progress__wave 3.5s ease-in-out infinite;
    }
    &::after{
        animation: f-progress__wave 3.5s ease-in-out infinite;
        animation-delay: 1s;
    }
}
.f-progress__circle{
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    position: relative;
    .f-progress__circle-text{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
    }
}
</style>
