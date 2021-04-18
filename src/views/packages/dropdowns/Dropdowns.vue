<template>
    <div
        :class="{
            'f-dropdowns': true,
            ['f-dropdowns__' + size]: button && size !== 'default',
            'f-dropdowns__disabled': disabled,
            'f-dropdowns__button': button,
            'f-dropdowns__isFocus': button && showMenu,
        }"
        :id="id"
        ref="dropdowns"
        @click="toggleHideAndShowWhenButton"
        v-clickOutside="handleClose"
    >
        <div
            ref="dropdownsControl"
            class="f-dropdowns-control"
            @click="toggleHideAndShow"
        >
            <slot></slot>
        </div>
        <transition
            :name="gerAnimateName"
            @after-enter="animateShow('opened')"
            @after-leave="animateShow('closed')"
        >
            <div
                v-show="showMenu"
                :class="{
                    'f-dropdowns-menu-box': true,
                    ['f-dropdowns-menu-box__' + getPlacement.x]: true,
                    ['f-dropdowns-menu-box__' + getPlacement.y]: true,
                }"
                ref="dropdownsMenuBox"
            >
                <ul
                    class="f-dropdowns-menu"
                    ref="dropdownsMenu"
                    v-if="$slots.dropdownMenu"
                >
                    <slot name="dropdownMenu"></slot>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    onUnmounted,
    computed,
    provide,
    reactive
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

export default defineComponent({
    emits: ['action', 'show-menu'],
    props: {
        id: {
          type: String,
          default: () =>  getRandomId('f-dropdowns')
        },
        trigger: {
            type: String,
            default: 'click',
            validator: (value: string) => ['hover', 'click'].includes(value)
        },
        textAlign: {
            type: String,
            validator: (value: string) => ['center', 'right'].includes(value)
        },
        disabled: Boolean,
        button: Boolean,
        clickNotClose: Boolean,
        placement: {
            type: String,
            default: 'bottom-center'
        },
        animate: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: 'default',
            validator: (val: string) => ['small', 'default', 'large'].includes(val)
        }
    },
    setup (props, ctx) {
        const dropdowns = ref(null)
        let dropdownsDom: HTMLElement
        const dropdownsControl = ref(null)
        let dropdownsControlDom:HTMLElement
        const dropdownsMenu = ref(null)
        let dropdownsMenuBoxDom: HTMLElement
        const dropdownsMenuBox = ref(null)
        const showMenu = ref(false)
        let timer: NodeJS.Timer

        const getPlacement = computed(() => {
            const [y, x] = props.placement.split('-')
            return {
                y,
                x
            }
        })

        const gerAnimateName = computed(() => {
            if (!props.animate) return ''
            if (getPlacement.value.x === 'center') return 'f-zoom-in__center'
            return 'f-zoom-in'
        })

        const toggleHideAndShowWhenButton = () => {
            if (!props.button || props.disabled) return
            showMenu.value = !showMenu.value
        }

        const toggleHideAndShow = () => {
            if (props.disabled ||
                props.trigger === 'hover' ||
                props.button
            ) return
            showMenu.value = !showMenu.value
        }

        const handleClose = () => {
            if (props.disabled) return
            showMenu.value = false
            if (timer) clearTimeout(timer)
        }

        const animateShow = (status: string) => {
            if (!props.animate) return
            ctx.emit('show-menu', status)
        }

        const hoverShow = () => {
            if (props.disabled) return
            clearTimeout(timer)
            timer = setTimeout(() => {
                showMenu.value = true
            }, 250)
        }

        const hoverClose = () => {
            if (props.disabled) return
            clearTimeout(timer)
            timer = setTimeout(() => {
                showMenu.value = false
            }, 150)
        }

        type place = 'top' | 'bottom'
        const initPlacement = () => {
            const y = (getPlacement.value.y as place) === 'top' ? 'bottom' : 'top'
            let value = 5
            if (props.button) value += 3
            dropdownsMenuBoxDom.style[y] = dropdownsDom.offsetHeight + value + 'px'
        }

        let controlDom: HTMLElement

        onMounted(() => {
            dropdownsDom = dropdowns.value as any
            dropdownsControlDom = dropdownsControl.value as any
            dropdownsMenuBoxDom = dropdownsMenuBox.value as any
            initPlacement()
            controlDom = props.button ? dropdownsDom : dropdownsControlDom
            if (props.trigger === 'hover') {
                controlDom.addEventListener('mouseenter', hoverShow)
                controlDom.addEventListener('mouseleave', hoverClose)
                dropdownsMenuBoxDom.addEventListener('mouseenter', hoverShow)
                dropdownsMenuBoxDom.addEventListener('mouseleave', hoverClose)
            }
        })

        onUnmounted(() => {
            controlDom.removeEventListener('mouseenter', hoverShow)
            controlDom.removeEventListener('mouseleave', hoverClose)
            dropdownsMenuBoxDom.removeEventListener('mouseenter', hoverShow)
            dropdownsMenuBoxDom.removeEventListener('mouseleave', hoverClose)
        })

        let toggleFn = props.button ? toggleHideAndShowWhenButton : toggleHideAndShow

        provide('parent', reactive({
            toggleHideAndShow: toggleFn,
            handleClose,
            ctx,
            props,
            hoverClose
        }))

        return{
            handleClose,
            toggleHideAndShow,
            toggleHideAndShowWhenButton,
            animateShow,
            getPlacement,
            gerAnimateName,
            dropdownsControl,
            dropdownsMenuBox,
            dropdowns,
            showMenu,
            dropdownsMenu,
        }
    }
})
</script>

<style scoped lang="scss">
.f-dropdowns{
    box-sizing: border-box;
    white-space: nowrap;
    padding: calc(.35em) calc(1em);
    display: inline-block;
    position: relative;
    font-size: 16px;
}
.f-dropdowns__small{
    font-size: 12px!important;
}
.f-dropdowns__large{
    font-size: 20px!important;
}
.f-dropdowns-control{
    cursor: pointer;
    color: var(--primary);
    font-size: 14px;
}
.f-dropdowns__disabled{
    opacity: .45;
    user-select: none;
    cursor: not-allowed;
    .f-dropdowns-control{
        cursor: not-allowed;
    }
}
.f-dropdowns__button{
    padding: calc(.5em) calc(1em);
    border: 1px solid #ccc;
    cursor: pointer;
    transition: all .15s;
    .f-dropdowns-control{
        color: #666;
    }
}
.f-dropdowns__isFocus{
    border-color: var(--primary);
    box-shadow: 0 0 0 2px #1661ab19;
    .f-dropdowns-control{
        color: var(--primary);
    }
}
.f-dropdowns-menu-box{
    min-width: 100px;
    background-color: #fff;
    box-sizing: border-box;
    position: absolute;
    z-index: 9999;
    &::before, &::after{
        content: '';
        display: block;
        position: absolute;
        height: 0;
        width: 0;
        border: 8px solid transparent;
        z-index: 2;
    }
    &::after{
        z-index: 1;
    }
}
.f-dropdowns-menu-box__bottom{
    .f-dropdowns-menu{
        box-shadow: 0 1px 4px #ccc;
    }
    transform-origin: center top;
    &::before, &::after{
        top: -14px;
        border-bottom-color: #fff;
    }
    &::after{
        top: -15px;
        border-bottom-color: #ddd;
    }
}
.f-dropdowns-menu-box__top{
    .f-dropdowns-menu{
        box-shadow: 0 0 4px #ccc;
    }
    transform-origin: center bottom;
    &::before, &::after{
        bottom: -14px;
        border-top-color: #fff;
    }
    &::after{
        bottom: -15px;
        border-top-color: #ddd;
    }
}
.f-dropdowns-menu-box__left{
    left: -2px;
    &::before, &::after{
        left: 12px;
    }
}
.f-dropdowns-menu-box__center{
    left: 50%;
    transform: translateX(-50%);
    &::before, &::after{
        left: 50%;
        transform: translateX(-50%);
    }
}
.f-dropdowns-menu-box__right{
    right: -2px;
    &::before, &::after{
        right: 12px;
    }
}
.f-dropdowns-menu{
    box-sizing: border-box;
    padding: 5px 0;
    margin: 0;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 5px;
}
</style>
