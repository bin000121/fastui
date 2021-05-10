<template>
    <transition
        name="f-notification-slider-in"
        @before-leave="close"
        @after-leave="removeDom"
    >
        <div
            v-show="isShow"
            class="f-notification"
            :style="`width: ${width};top: ${top}px;bottom: ${bottom}px`"
            :id="id"
            @mouseenter="stopTimer"
            @mouseleave="startTimer"
        >
            <div class="f-notification-container">
                <template v-if="isShowIcon">
                    <slot name="icon" v-if="$slots.icon"></slot>
                    <i
                        :class="iconClass || [
                            `f-icon-${type}`,
                            'type-icon'
                        ]"
                        :style="iconClass ? {} : `color: ${typeColor}`"
                        ref="typeIcon"
                        v-else
                    ></i>
                </template>
                <div>
                    <h4 class="f-notification-title" v-if="title">{{title}}</h4>
                    <div
                        class="f-notification-content"
                        ref="contentRef"
                    >
                        {{content}}
                    </div>
                </div>
            </div>
            <div
                class="bar"
                v-if="showBar"
                :style="`background-color: ${typeColor}`"
            ></div>
            <i
                class="f-icon-close-bold closeIcon"
                v-if="isShowClose"
                @click.stop="handleClose"
            ></i>
        </div>
    </transition>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    onUnmounted,
    watch
} from 'vue'

export default defineComponent({
    inheritAttrs: false,
    props: {
        id: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: '350px'
        },
        top: {
            type: [Number, String],
            default: 'unset'
        },
        bottom: {
            type: [Number, String],
            default: 'unset'
        },
        content: {
            type: String,
            required: true
        },
        title: String,
        showBar: {
            type: Boolean,
            default: true
        },
        iconClass: String,
        isShowIcon: {
            type: Boolean,
            default: true
        },
        isShowClose: {
            type: Boolean,
            default: true
        },
        placement: {
            type: String,
            default: 'top-right'
        },
        duration: {
            type: Number,
            default: 5000
        },
        type: {
            type: String,
            default: 'info',
            validator: (val: string) => ['info', 'success', 'warning', 'error'].includes(val)
        },
        close: {
            type: Function,
            required: true
        },
        removeDom: {
            type: Function,
            required: true
        },
    },
    setup (props) {
        let timer: any = null
        const isShow = ref(false)
        const contentRef = ref(null)
        const typeIcon = ref(null)
        const typeColor = ref('var(--primary)')
        let contentDom: HTMLElement
        let typeIconDom: HTMLElement

        const handleClose = () => {
            isShow.value = false
        }

        const stopTimer = () => {
            if (props.duration <= 0) return
            clearTimeout(timer)
            timer = null
        }

        const startTimer = () => {
            if (props.duration <= 0) return
            timer = setTimeout(() => {
                if (isShow.value) isShow.value = false
            }, props.duration)
        }

        const initTypeColor = () => {
            if (!['info', 'success', 'warning', 'error'].includes(props.type)) return
            typeIconDom = typeIcon.value!
            let type = props.type === 'info' ? 'primary' : props.type
            typeColor.value = `var(--${type})`
        }

        watch(() => props.type, (newV: string) => {
            initTypeColor()
        })
        onMounted(() => {
            isShow.value = true
            startTimer()
            contentDom = contentRef.value!
            initTypeColor()
        })
        onUnmounted(() => {
            stopTimer()
            props.removeDom()
        })
        return{
            contentRef,
            typeIcon,
            typeColor,
            isShow,
            handleClose,
            stopTimer,
            startTimer
        }
    }
})
</script>

<style scoped lang="scss">
.f-notification{
    position: fixed;
    right: 30px;
    border-radius: 5px;
    box-shadow: 0 2px 15px #bbb;
    overflow: hidden;
    background-color: #fff;
    transition: all .2s ease-in-out;
    .bar{
        height: 8px;
    }
    .closeIcon{
        position: absolute;
        right: 8px;
        top: 8px;
        color: #ccc;
        cursor: pointer;
        &:hover{
            color: #aaa;
        }
    }
}
.f-notification-container{
    word-break: break-word;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    padding: 15px 20px;
    font-size: 14px;
    letter-spacing: 1px;
    .type-icon{
        margin-top: -5px;
        font-size: 32px;
        padding-right: 15px;
    }
}
.f-notification-title{
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
    margin: 0 0 10px;
    font-weight: 700;
    font-size: 16px;
    color: #333;
    i{
        font-size: 2em;
        color: var(--primary);
        padding-right: 15px;
    }
}
.f-notification-content{
}
</style>