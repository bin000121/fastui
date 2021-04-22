<template>
    <div
        class="f-spin"
        :class="{ 'f-spin__inline': inline }"
        ref="fSpin"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="f-svg"
            :viewBox="getViewBox"
            :width="size"
            :height="size"
            v-if="type !== 'snowflake'"
        >
            <circle
                v-if="type === 'ring'"
                :cx="size"
                :cy="size"
                :r="(size - width) / 2"
                stroke="#ccc"
                fill="transparent"
                :stroke-width="width"
            />
            <circle
                :class="[
                    type === 'ring' ? 'f-spin-ring' : 'f-spin-svg'
                ]"
                :cx="size"
                :cy="size"
                :r="(size - width) / 2"
                :stroke="color"
                fill="transparent"
                :stroke-width="width"
            />
        </svg>
        <div
            v-else
            class="f-spin-snowflake"
            :style="`width: ${size}px;height: ${size}px`"
        >
            <span v-for="item in 8" :key="item" class="f-spin-snowflake-bar"></span>
        </div>
        <div v-if="tip" class="f-spin-tip" :style="tipStyle || {}">{{tip}}</div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    watch,
    computed,
    onMounted,
    PropType,
    CSSProperties
} from 'vue'


export default defineComponent({
    props: {
        value: {
          type: Boolean,
          default: true
        },
        color: {
            type: String,
            default: '#1661ab'
        },
        tipStyle: {
            type: Object as PropType<CSSProperties>,
            default: () => ({ color: '#1661ab' })
        },
        width: {
            type: Number,
            default: 3
        },
        size: {
            type: Number,
            default: 40,
            validator: (val: string) => parseInt(val) >= 25
        },
        tip: String,
        type: {
            type: String,
            default: 'default',
            validator: (val: string) => ['ring', 'snowflake', 'default'].includes(val)
        },
        inline: Boolean
    },
    setup (props) {
        const pi = Math.PI
        const fSpin = ref(null)
        let fSpinDom: HTMLElement
        const getViewBox = computed(() => {
            let halfSize = props.size / 2
            return `${halfSize} ${halfSize} ${props.size} ${props.size}`
        })

        const initCssProperties = () => {
            let radius = (props.size - props.width) / 2
            let C = 2 * pi * radius
            if (props.type === 'ring') {
                fSpinDom.style.setProperty('--transform-origin', `${props.size}px ${props.size}px`)
                let dasharray = `${1 / 4 * C},${3 / 4 * C}`
                fSpinDom.style.setProperty('--ring-stroke-dasharray', dasharray)
                return
            }
            if (props.type === 'snowflake') {
                fSpinDom.style.setProperty('--snowflake-bar-height', `${radius / 2 + 2}px`)
                fSpinDom.style.setProperty('--snowflake-bar-transform-origin', `0 ${props.size / 2}px`)
                return
            }
            // 开始先画1个长度的轮廓
            let start = '1, ' + 2 * C
            // 动画到一半时画出90%的圆周长轮廓，并
            let halfDasharray = `${0.9 * C}, ${2 * C}`
            let halfDashoffset = `${.4 * C * -1}`
            let endDashoffset = `${(0.9 * C + radius) * -1}`
            fSpinDom.style.setProperty('--start-stroke-dasharray', start)
            fSpinDom.style.setProperty('--half-stroke-dasharray', halfDasharray)
            fSpinDom.style.setProperty('--half-stroke-dashoffset', halfDashoffset)
            fSpinDom.style.setProperty('--end-stroke-dashoffset', endDashoffset)
        }

        watch(() => [props.type, props.size], () => {
            initCssProperties()
        })

        onMounted(() => {
            fSpinDom = fSpin.value as any
            initCssProperties()
        })
        return{
            fSpin,
            getViewBox
        }
    }
})
</script>

<style scoped lang="scss">
.f-spin{
    --transform-origin: '';
    --ring-stroke-dasharray: '';
    --start-stroke-dasharray: '';
    --half-stroke-dasharray: '';
    --half-stroke-dashoffset: '';
    --end-stroke-dashoffset: '';
    --snowflake-bar-height: '';
    --snowflake-bar-transform-origin: '';
    display: inline-block;
    padding: 10px;
    text-align: center;
}
.f-spin__inline{
    display: inline-flex;
    align-items: center;
    .f-spin-tip{
        margin: 0 0 0 .75em;
    }
}
.f-spin-tip{
    font-size: 14px;
    margin-top: 5px;
}
.f-svg{
    animation: loading-rotate 2s linear infinite;
}
.f-spin-svg{
    transform-origin: var(--transform-origin);
    animation: loading-dash 1.5s linear infinite;
}
.f-spin-ring{
    stroke-dasharray: var(--ring-stroke-dasharray);
    transform-origin: var(--transform-origin);
    animation: loading-rotate 1s linear infinite;
}
.f-spin-snowflake{
    display: inline-flex;
    position: relative;
    overflow: hidden;
    animation: loading-rotate 2s linear infinite;
}
.f-spin-snowflake-bar{
    position: absolute;
    left: 50%;
    top: 0;
    height: var(--snowflake-bar-height) !important;
    width: 1.5px!important;
    background-color: var(--primary);
    box-sizing: border-box;
    transform-origin: var(--snowflake-bar-transform-origin);
}
@for $i from 1 through 8{
    .f-spin-snowflake .f-spin-snowflake-bar:nth-child(#{$i}){
        transform: rotate(#{($i - 1) * 45}deg) translateX(-50%);
    }
}
</style>

