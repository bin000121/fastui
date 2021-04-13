<template>
    <transition
            name="f-message-slider-in"
            @before-leave="closeMsg"
            @after-leave="removeDom"
    >
        <div
            v-show="isShow"
            :class="{
                'f-message': true,
                ['f-message__' + type]: type,
            }"
            @mouseenter="stopTimer"
            @mouseleave="startTimer"
            :id="id"
            :style="`top: ${top}px`"
        >
            <i :class="[`f-icon-${['default', 'info'].includes(type) ? 'info' : type}`, 'f-message-icon']" v-if="type !== 'loading' && isShowIcon"></i>
            <span class="f-message-loading" v-if="type === 'loading'"></span>
            <div v-if="template" v-html="template"></div>
            <div v-else>{{message}}</div>
            <i class="f-icon-close-bold close" v-if="isShowClose" @click.stop="isShow = false"></i>
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
        isShowIcon: {
            type: Boolean,
            default: true
        },
        template: String,
        type: {
            type: String,
            default: 'default'
        },
        duration: {
            type: Number,
            default: 3000
        },
        message: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            required: true
        },
        removeDom: {
            type: Function as PropType<() => void>,
            required: true
        },
        closeMsg: {
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

        const handleCloseMsg = () => {
            isShow.value = false
        }

        const stopTimer = () => {
            clearTimeout(timer)
            timer = null
        }

        const startTimer = () => {
            if (!props.duration) return
            timer = setTimeout(() => {
                if (isShow.value) isShow.value = false
            }, props.duration)
        }

        onMounted(() => {
            isShow.value = true
            startTimer()
        })

        onUnmounted(() => {
            stopTimer()
            props.removeDom()
        })

        return{
            isShow,
            getTop,
            handleCloseMsg,
            stopTimer,
            startTimer,
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
    transition: all .2s ease-in-out, top .2s ease-in-out;
    color: #333;
    z-index: 999;
    & > div{
        font-size: 14px;
        height: 100%;
        flex-grow: 1;
        margin: 0 12px 0 8px;
    }
    .f-message-loading{
        position: relative;
        display: inline-block;
        width: 0;
        height: 0;
        border-radius: 50%;
        border: 12px solid transparent;
        border-bottom-color: var(--primary);
        animation: loading-ringRotate .8s linear infinite;
        &::before{
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            border-radius: 50%;
            border: 10px solid #fff;
        }
    }
    .f-message-icon{
        font-size: 24px!important;
        color: #999;
    }
    i.close{
        cursor: pointer;
        color: #bbb;
    }
}
[class^='f-message__'] {
    box-shadow: 0 0 3px #ccc;
}
.f-message__default{
    background-color: #fff;
    &, .f-message-icon{
        color: #333;
    }
}
.f-message__loading{
    background-color: #fff;
    &, .f-message-icon{
        color: #333;
    }
}
.f-message__info{
    background-color: #6c757d;
    &, .f-message-icon, i.close{
        color: #fff;
    }
}
.f-message__success{
    background-color: var(--success);
    &, .f-message-icon, i.close{
        color: #fff;
    }
}
.f-message__error{
    background-color: var(--error);
    &, .f-message-icon, i.close{
        color: #fff;
    }
}
.f-message__warning{
    background-color: var(--warning);
    &, .f-message-icon, i.close{
        color: #fff;
    }
}
</style>
