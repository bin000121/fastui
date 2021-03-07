<template>
    <teleport :to="id">
        <div
            :class="{
                'f-toTop': true,
                'f-toTop--circle': circle,
                'f-toTop--rounded': rounded,
            }"
            :title="title"
            :style="`right: ${getRight};bottom: ${getBottom}`"
            ref="fTop"
            @click="gotoTop"
        >
            <slot></slot>
        </div>
    </teleport>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed,
    PropType,
    onMounted
} from 'vue'
import { throttle } from '/@/utils/throttle'

export default defineComponent({
    inheritAttrs: false,
    props: {
        id:{
          type: String,
          default: '#app'
        },
        title: {
          type: String,
          default: '回到顶部'
        },
        bottom: {
          type: [Number, String],
          default: 50
        },
        right: {
          type: [Number, String],
          default: 50
        },
        behavior: {
            type: String as PropType<ScrollBehavior>,
            default: 'auto',
            validator: (value: string) => ['smooth', 'auto'].includes(value)
        },
        circle: Boolean,
        rounded: {
            type: Number,
            default: 5
        },
        scrollTop: {
            type: Number,
            default: 300
        }
    },
    name: 'FTop',
    setup ({ bottom, right, behavior, rounded, scrollTop }) {
        const fTop = ref(null)
        let fTopDom: HTMLElement
        const getBottom = computed(() => {
            if (typeof bottom === 'number') return bottom + 'px'
            return bottom
        })
        const getRight = computed(() => {
            if (typeof right === 'number') return right + 'px'
            return right
        })

        const gotoTop = () => {
            window.scrollTo({
                top: 0,
                behavior
            })
        }

        // 监听滚动事件
        const onScrolling = () => {
            if (scrollTop <= 0) {
                fTopDom.style.display = 'inline-flex'
                return
            }
            window.addEventListener('scroll', throttle(() => {
                const body = document.documentElement || document.body as HTMLElement
                fTopDom.style.display = body.scrollTop >= scrollTop ? 'inline-flex' : 'none'
            }, 50))
        }

        onMounted(() => {
            fTopDom = fTop.value as any
            if (rounded && typeof rounded === 'number' && rounded >= 5) {
                fTopDom.style.setProperty('--rounded', rounded + 'px')
            }
            onScrolling()
        })
        return{
            getBottom,
            getRight,
            gotoTop,
            fTop
        }
    }
})
</script>

<style scoped lang="scss">
.f-toTop{
    --rounded: 5px;
    position: fixed;
    z-index: 100;
    min-width: 24px;
    min-height: 24px;
    font-size: 14px;
    box-shadow: 0 0 3px #999;
    cursor: pointer;
    overflow: hidden;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 4px;
    color: #333;
}
.f-toTop--circle{
    border-radius: 50%!important;
}

.f-toTop--rounded{
    border-radius: var(--rounded);
}
</style>
