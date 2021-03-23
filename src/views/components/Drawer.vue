<template>
    <teleport to="#app">
        <div
            class="f-drawer"
            :id="id"
            ref="fDrawer"
        >
            <transition name="f-drawer-mask-fade">
                <div
                        class="f-drawer-mask"
                        v-show="showDrawer"
                        @click.stop="hide(true)"
                ></div>
            </transition>
            <transition name="f-drawer-content-slide" @after-leave="remove">
                <div
                    :class="{
                        'f-drawer-content': true,
                        ['f-drawer-content__' + direction ]: true,
                    }"
                    :style="getContentStyle"
                    v-show="showDrawer"
                    ref="fDrawerContent"
                >
                    <i
                        class="f-icon-close-bold f-drawer-closeIcon"
                        @click="hide"
                        v-if="showCloseIcon"
                    ></i>

                    <template v-if="$slots.title">
                        <slot name="title"></slot>
                    </template>
                    <div
                        v-else-if="!$slots.title && title"
                        class="f-drawer-title"
                        :style="headerStyle"
                    >{{title}}</div>

                    <div
                        class="f-drawer-body"
                        v-if="!destroyDom"
                        :style="bodyStyle"
                    >
                        <slot></slot>
                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script lang="ts">

import {
    defineComponent,
    onMounted,
    onUnmounted,
    computed,
    ref,
    watch,
    PropType,
    CSSProperties,
    watchEffect,
    nextTick
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'
let maskZIndex = 999
let drawerZIndex = maskZIndex + 1

const direction = [
    'rtl',
    'ltr',
    'ttb',
    'btt',
]

export default defineComponent({
    emits: ['close', 'visible-change', 'update:value'],
    props: {
        id: {
            type: String,
            default: () => getRandomId('f-drawer')
        },
        direction: {
            type: String,
            default: 'rtl',
            validator: (val: string) => direction.includes(val)
        },
        width: {
            type: [String, Number],
            default: '300px'
        },
        height: {
            type: [String, Number],
            default: '200px'
        },
        mask: {
            type: Boolean,
            default: true
        },
        clickMaskNotClose: Boolean,
        pressEscNotClose: Boolean,
        closeAndDestroyDom: Boolean,
        value: {
            type: Boolean,
            required: true
        },
        showCloseIcon: {
            type: Boolean,
            default: true
        },
        closeable: Boolean,
        title: String,
        headerStyle: Object as PropType<CSSProperties>,
        contentStyle: Object as PropType<CSSProperties>,
        bodyStyle: Object as PropType<CSSProperties>,
    },
    setup (props, { emit }) {
        const fDrawer = ref(null)
        const fDrawerContent = ref(null)
        const destroyDom = ref(false)
        let fDrawerDom: HTMLElement
        let fDrawerContentDom: HTMLElement
        const showDrawer = ref(props.value)

        const getContentStyle = computed(() => {
            let width = typeof props.width === 'number' ? props.width + 'px' : props.width
            let height = typeof props.width === 'number' ? props.height + 'px' : props.height
            let style: CSSProperties
            if (['rtl', 'ltr'].includes(props.direction)) style = { width }
            else style = { height }
            if (props.contentStyle) return { ...style, ...props.contentStyle }
            return style
        })

        const open = () => {
            destroyDom.value = false
            showDrawer.value = true
            fDrawerDom.classList.add('f-drawer-show')
            const scrollBarWidth = window.innerWidth - document.body.offsetWidth
            document.body.style.cssText = `width: calc(100% - ${scrollBarWidth}px);overflow: hidden`
        }

        const hide = (isClickMask = false) => {
            if (isClickMask && props.clickMaskNotClose) return
            showDrawer.value = false
            emit('update:value', false)
        }

        const remove = () => {
            fDrawerDom.classList.remove('f-drawer-show')
            let showDrawerList = document.getElementsByClassName('f-drawer-show')
            !showDrawerList.length && document.body.removeAttribute('style')
            if (props.closeAndDestroyDom) destroyDom.value = true
        }

        const initDirection = () => {
            let translate = ''
            switch (props.direction) {
                case 'rtl':
                    translate = 'translate(100%, 0)'
                    break;
                case 'ltr':
                    translate = 'translate(-100%, 0)'
                    break
                case 'ttb':
                    translate = 'translate(0, -100%)'
                    break
                case 'btt':
                    translate = 'translate(0, 100%)'
                    break
            }
            fDrawerDom.style.setProperty('--direction', translate);
        }

        const handelKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Escape' && e.key === 'Escape' && !props.pressEscNotClose) hide()
        }

        onMounted(() => {
            fDrawerDom = fDrawer.value as any
            fDrawerContentDom = fDrawerContent.value as any
            initDirection()
            document.addEventListener('keydown', handelKeyDown)
        })

        onUnmounted(() => {
            document.removeEventListener('keydown', handelKeyDown)
        })

        watch(() => props.direction,  () => {
            initDirection()
        })

        watch(() => props.value, (newV: boolean) => {
            newV ? open() : hide()
        })

        return{
            fDrawer,
            fDrawerContent,
            showDrawer,
            getContentStyle,
            destroyDom,
            hide,
            remove,
        }
    }
})
</script>

<style scoped lang="scss">
.f-drawer{
    --direction: translate(100%, 0);
    box-sizing: border-box;
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
}
.f-drawer-show{
    height: 100%;
}
.f-drawer-mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .55);
}
.f-drawer-content{
    position: absolute;
    box-sizing: border-box;
    background-color: #fff;
    outline: 0;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 30px #333;
    .f-drawer-closeIcon{
        position: absolute;
        right: 8px;
        top: 8px;
        color: #999;
        cursor: pointer;
    }
    .f-drawer-title{
        padding: 20px;
        font-size: 16px;
        font-weight: 700;
        border-bottom: 1px solid #ddd;
    }
    .f-drawer-body{
        padding: 20px;
        font-size: 14px;
        flex-grow: 1;
    }
}
.f-drawer-content__rtl{
    height: 100%;
    right: 0;
}
.f-drawer-content__ltr{
    top: 0;
    bottom: 0;
    left: 0;
}
.f-drawer-content__btt{
    bottom: 0;
    left: 0;
    right: 0;
}
.f-drawer-content__ttb{
    left: 0;
    right: 0;
    top: 0;
}
</style>
