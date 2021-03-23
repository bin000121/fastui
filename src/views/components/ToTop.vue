<template>
    <teleport :to="id">
        <transition :name="animate ? 'f-toTop-zoom-in' : '' " mode="out-in">
            <div
                :class="{
                    'f-toTop': true,
                    'f-toTop--circle': circle
                }"
                    :title="title"
                    :style="`right: ${getRight};bottom: ${getBottom};border-radius: ${rounded}px`"
                    ref="fTop"
                    v-if="isShow"
                    @click="gotoTop"
            >
                <slot></slot>
            </div>
        </transition>
    </teleport>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed,
    PropType,
    onMounted,
    onUnmounted,
    onActivated,
    onDeactivated
} from 'vue'
import { throttle } from '/@/utils/throttle'

export default defineComponent({
    inheritAttrs: false,
    emits: ['click'],
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
        },
        animate: {
            type: Boolean,
            default: true
        }
    },
    name: 'FTop',
    setup ({ bottom, right, behavior, rounded, scrollTop }, { emit }) {
        const fTop = ref(null)
        const isShow = ref(false)
        let fTopDom: HTMLElement | any
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
            emit('click')
        }

        const onScroll = throttle(() => {
            const body = document.documentElement || document.body as HTMLElement
            isShow.value = body.scrollTop >= scrollTop
        }, 50)

        onMounted(() => {
            fTopDom = fTop.value as any
            onScroll()
            window.addEventListener('scroll', onScroll)
            // onScrolling()
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', onScroll)
        })

        onActivated(()=> {
            fTopDom = fTop.value as any
            window.addEventListener('scroll', onScroll)
        })

        onDeactivated(() => {
            window.removeEventListener('scroll', onScroll)
        })

        return{
            getBottom,
            getRight,
            gotoTop,
            fTop,
            isShow
        }
    }
})
</script>

<style scoped lang="scss">
.f-toTop{
    position: fixed;
    z-index: 1000;
    min-width: 36px;
    min-height: 36px;
    box-shadow: 0 0 3px #888;
    cursor: pointer;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary);
    padding: 4px;
    color: #fff;
}
.f-toTop--circle{
    border-radius: 50%!important;
}
</style>
