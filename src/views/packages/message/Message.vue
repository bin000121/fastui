<template>
    <transition
            name="f-message-slider-in"
            @before-leave="onClose"
            @after-leave="removeDom"
    >
        <div
            v-show="isShow"
            :class="{
                'f-message': true,
                ['f-message__' + type]: type,
            }"
            @mouseenter="stopClose"
            @mouseleave="startClose"
            :id="id"
            :style="`top: ${top}px`"
        >
            <i :class="[`f-icon-${type}`, 'f-message-icon']" v-if="type"></i>
            <div>{{message || ''}}</div>
            <i class="f-icon-close-bold close" v-if="isShowClose" @click.stop="closeMsg"></i>
        </div>
    </transition>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed,
    onMounted,
    onUnmounted,
} from 'vue'

import type { PropType } from 'vue'
export default defineComponent({
    inheritAttrs: false,
    props: {
        top: Number,
        isShow: Boolean,
        isShowClose: Boolean,
        type: {
            type: String,
            default: 'info'
        },
        duration: {
            type: Number,
            default: 3000
        },
        message: String,
        id: {
            type: String,
            required: true
        },
        removeDom: {
            type: Function as PropType<() => void>,
            required: true
        },
        onClose: {
            type: Function as PropType<() => void>,
            required: true
        }
    },
    setup (props) {
        let timer: any = null
        const getTop = computed(() => {
            if (typeof props.top === 'number') return props.top + 'px'
            return props.top
        })

        const isShow = ref(false)

        const closeMsg = () => {
            isShow.value = false
        }

        const stopClose = () => {
            clearTimeout(timer)
            timer = null
        }

        const startClose = () => {
            if (!props.duration) return
            timer = setTimeout(() => {
                if (isShow.value) isShow.value = false
            }, props.duration)
        }

        onMounted(() => {
            isShow.value = true
            startClose()
        })

        onUnmounted(() => {
            props.removeDom()
        })

        return{
            isShow,
            getTop,
            closeMsg,
            stopClose,
            startClose,
        }
    }
})
</script>

<style scoped lang="scss">
.f-message{
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 12px 10px 12px 15px;
    min-width: 250px;
    background-color: #fff;
    box-shadow: 0 0 3px #ccc;
    border: 1px solid #eee;
    border-radius: 5px;
    overflow: hidden;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    transition: all .25s ease-in-out, top .25s ease-in-out;
    color: #333;
    z-index: 999;
    div{
        font-size: 14px;
        height: 100%;
        flex-grow: 1;
        margin: 0 12px 0 8px;
    }
    .f-message-icon{
        font-size: 24px!important;
        color: #999;
    }
    i.close{
        cursor: pointer;
        color: #ccc;
    }
}
.f-message__info{
    background-color: #6c757d;
    border-color: transparent;
    box-shadow: 0 0 5px #aaa;
    &, .f-message-icon, i.close{
        color: #fff;
    }
}
</style>
