<template>
    <div
        :class="{
            'f-tabs': true,
            ['f-tabs__' + placement]: true,
            ['f-tabs__' + size]: size !== 'default',
        }"
        :id="id"
        :style="`height: ${height}`"
    >
        <div
            :class="{
                'f-tabs-nav': true,
                ['f-tabs-nav__is'+ isYOrX]: isShowArrow,
            }"
            ref="fTabsNav"
        >
            <span
                :class="{
                    [`f-icon-arrow-${isYOrX === 'Y' ? 'left' : 'up'}-bold`]:true,
                    'f-tabs-prev': true
                }"
                @click.stop="handleArrow('prev')"
                v-if="isShowArrow"
            />
            <span
                :class="{
                    [`f-icon-arrow-${isYOrX === 'Y' ? 'right' : 'down'}-bold`]:true,
                    'f-tabs-next': true
                }"
                @click.stop="handleArrow('next')"
                v-if="isShowArrow"
            />
            <div class="f-tabs-nav-scroll-wrap" ref="fTabsNavScrollWrap">
                <div
                    class="f-tabs__isActive-bottom-bar"
                    ref="isActiveBottomBar"
                />
                <div class="f-tabs-nav-scroll" ref="fTabsNavScroll">
                    <div
                        class="f-tabs__isActive-bar"
                        ref="fTabsActive"
                        v-show="!card"
                        :style="`background-color: ${ card ? '#fff': 'var(--primary)'};`"
                    />
                    <div
                        v-for="({ props: ctx }, i) in instance"
                        :key="ctx.id"
                        :id="ctx.id"
                        @click="toggleActive(i)"
                        :class="{
                            'f-tabs-item': true,
                            'f-tabs-item-card': card,
                            'f-tabs-item__isActive': current === ctx.name,
                            'f-tabs-item__disabled': ctx.disabled,
                        }"
                    >

                        <template v-if=" ctx.name in $slots">
                            <slot :name="ctx.name"></slot>
                        </template>
                        <template v-else>
                            <i :class="ctx.icon" v-if="ctx.icon" :style="ctx.iconStyle || {}"/>
                            <span style="position: relative;">
                            {{ctx.label}}
                            <i
                                class="f-icon-close-bold f-tabs-closeIcon"
                                v-if="closeable && instance.length !== 1"
                                @click.stop="closeTabs(i, current === ctx.name)"
                            />
                            </span>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="f-tabs-pane-container">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    getCurrentInstance,
    onMounted,
    onUnmounted,
    provide,
    reactive,
    ref,
    watch,
    nextTick
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'
import { isFirefox } from '/@/utils/utils'

export default defineComponent({
    emits: ['update:value', 'change', 'tab-close'],
    props: {
        id: {
            type: String,
            default: () => getRandomId('f-tabs')
        },
        value: String,
        closeable: Boolean,
        card: Boolean,
        size: {
            type: String,
            default: 'default',
            validator: (val: string) => ['default', 'small', 'large'].includes(val)
        },
        type: {
            type: String,
            default: 'default',
            validator: (val: string) => ['default', 'card'].includes(val)
        },
        placement: {
            type: String,
            default: 'top',
            validator: (val: string) => ['top', 'right', 'bottom', 'left'].includes(val)
        },
        height: {
            type: String,
            default: 'auto'
        }
    },
    setup (props, { emit }) {
        const root = getCurrentInstance()
        const current = ref(props.value || '')
        const isShowArrow = ref(false)
        let isY = ['top', 'bottom'].includes(props.placement)
        const isYOrX = ref( isY ? 'Y' : 'X')
        const fTabsActive = ref(null)
        const isActiveBottomBar = ref(null)
        const fTabsNav = ref(null)
        const fTabsNavScrollWrap = ref(null)
        const fTabsNavScroll = ref(null)
        let fTabsActiveDom: HTMLElement
        let isActiveBottomBarDom: HTMLElement
        let fTabsNavScrollWrapDom: HTMLElement
        let fTabsNavDom: HTMLElement
        let position = 0
        let fTabsNavScrollDom: HTMLElement
        const instance = ref([] as any[])
        const isFireFox = isFirefox()

        const getInstance = (vnode: any) => {
            instance.value.push(vnode)
            checkIsShowArrow()
        }

        const toggleActive = (index: number) => {
            const { id, name, disabled } = instance.value[index].props
            if (disabled) return
            const dom = document.getElementById(id) as HTMLElement
            let width = dom?.offsetWidth || 0
            let height = dom?.offsetHeight || 0
            let direction: string
            let translate: string
            let bgc = `background-color: ${ props.card ? '#fff' : 'var(--primary)' };`
            if (isY) {
                direction = `width: ${width}px;`
                translate = `transform: translateX(${ index ? dom.offsetLeft : 0}px);`
            }
            else {
                direction = `height: ${height}px;`
                translate = `transform: translateY(${index ? dom.offsetTop : 0}px);`
            }
            fTabsActiveDom.style.cssText = direction + translate + bgc
            if (current.value === name) return
            current.value = name
            emit('change', name)
            emit('update:value', name)
        }

        const handleArrow = (type: 'prev' | 'next') => {
            handleScroll(type === 'prev' ? -375 : 375)
        }

        const checkIsShowArrow = () => {
            nextTick(() => {
                if (isY) {
                    isShowArrow.value = fTabsNavScrollDom.scrollWidth > fTabsNavDom.offsetWidth
                    isYOrX.value = 'Y'
                } else {
                    isShowArrow.value = fTabsNavScrollDom.scrollHeight > fTabsNavDom.offsetHeight
                    isYOrX.value = 'X'
                }
            })
        }

        watch(() => isShowArrow.value, (newV: boolean) => {
            !newV && handleScroll(-99999, true)
        })

        const closeTabs = (index: number, isActive: boolean) => {
            const el = instance.value[index].vnode.$el as HTMLElement | any
            const id = instance.value[index].props.id
            let dom: HTMLElement | any = document.getElementById(id)
            let length = isY ? dom!.offsetWidth : dom!.offsetHeight
            el?.parentNode.removeChild(el)
            let i: number
            let name = ''
            if (index === 0) name = instance.value[index + 1].props.name
            else if (isActive) name = instance.value[index - 1].props.name
            else name = current.value
            emit('tab-close', instance.value[index].props.name)
            instance.value.splice(index, 1)
            i = instance.value.findIndex((value: any) => value.props.name === name)
            nextTick(() => toggleActive(i))
            checkIsShowArrow()
            handleScroll(-1 * (length + 5) || 0)
        }

        const initPlacement = () => {
            const index = instance.value.findIndex((value: any) => value.props.name === props.value)
            if (props.value && index !== -1) {
                if (!instance.value.length) return
                toggleActive(index)
            } else toggleActive(0)
        }

        const onScroll = (e: WheelEvent | any) => {
            if (!isShowArrow.value) return
            e = e || window.event
            e.stopPropagation()
            e.preventDefault()
            handleScroll(e.deltaY)
        }

        const handleScroll = (num: number, initial = false) => {
            let transform: string
            position += num
            if (initial) {
                fTabsNavScrollDom.style.transform = 'translate(0, 0)'
                // fTabsNavScrollDom.removeAttribute('style')
                return
            }
            if (isY) {
                if(fTabsNavScrollDom.scrollWidth <= fTabsNavDom.offsetWidth) return
                let length = fTabsNavScrollDom.scrollWidth - fTabsNavScrollWrapDom.offsetWidth
                if (position > length) position = length
                if (position < 0) position = 0
                transform = `translateX(${-1 * position}px)`
            }
            else {
                if(fTabsNavScrollDom.scrollHeight <= fTabsNavDom.offsetHeight) return
                let length = fTabsNavScrollDom.scrollHeight - fTabsNavScrollWrapDom.offsetHeight
                if (position > length) position = length
                if (position < 0 ) position = 0
                transform = `translateY(${-1 * position}px)`
            }
            fTabsNavScrollDom.style.transform = transform
        }

        provide('parent', reactive({
            root,
            getInstance
        }))

        watch(() => props.placement, () => {
            // 延迟时间要大于等于动画持续时间
            isY = ['top', 'bottom'].includes(props.placement)
            setTimeout(() => initPlacement(), 201)
        })

        watch(() => props.value, (newV: string | any) => {
            current.value = newV
        })

        let eventName =  isFireFox ? 'DOMMouseScroll' : 'mousewheel'

        onMounted(() => {
            fTabsActiveDom = fTabsActive.value as any
            isActiveBottomBarDom = isActiveBottomBar.value as any
            fTabsNavDom = fTabsNav.value as any
            fTabsNavScrollWrapDom = fTabsNavScrollWrap.value as any
            fTabsNavScrollDom = fTabsNavScroll.value as any
            initPlacement()
            fTabsNavDom.addEventListener(eventName, onScroll)
        })
        onUnmounted(() =>{
            fTabsNavDom.removeEventListener(eventName, onScroll)
        })
        return{
            instance,
            fTabsActive,
            current,
            fTabsNav,
            fTabsNavScroll,
            fTabsNavScrollWrap,
            isShowArrow,
            isYOrX,
            toggleActive,
            closeTabs,
            handleArrow,
        }
    }
})
</script>

<style scoped lang="scss">
.f-tabs{
    display: flex;
    box-sizing: border-box;
    position: relative;
    font-size: 16px;
    color: #333;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.f-tabs__top{
    flex-direction: column;
    .f-tabs-nav{
        margin-bottom: 15px;
        order: 0;
        width: 100%;
        .f-tabs-prev,.f-tabs-next{
            top: 50%;
            transform: translateY(-50%);
        }
        .f-tabs-prev{
            left: calc(.2em);
        }
        .f-tabs-next{
            right: calc(.2em);
        }
    }
    .f-tabs-pane-container{
        order: 1;
    }
    .f-tabs-item{
        padding: calc(.8em) 0;
        margin-right: calc(1.5em);
    }
    .f-tabs-item-card{
        padding: calc(.6em) calc(.8em);
        margin-right: calc(.4em);
        border-top-left-radius: calc(.25em);
        border-top-right-radius: calc(.25em);
        &.f-tabs-item__isActive{
            border-color: var(--primary);
            border-bottom-color: #fff;
            background-color: #fff;
        }
    }
    .f-tabs__isActive-bar{
        bottom: 0;
        height: 2px;
    }
    .f-tabs__isActive-bottom-bar{
        width: 100%;
        bottom: 0;
        height: 2px;
    }
}
.f-tabs__bottom{
    flex-direction: column;
    .f-tabs-nav{
        margin-top: 15px;
        order: 1;
        width: 100%;
        .f-tabs-prev,.f-tabs-next{
            top: 50%;
            transform: translateY(-50%);
        }
        .f-tabs-prev{
            left: calc(.2em);
        }
        .f-tabs-next{
            right: calc(.2em);
        }
    }
    .f-tabs-pane-container{
        order: 0;
    }
    .f-tabs-item{
        padding: calc(.8em) 0;
        margin-right: calc(1.5em);
    }
    .f-tabs-item-card{
        padding: calc(.6em) calc(.8em);
        margin-right: calc(.4em);
        border-bottom-left-radius: calc(.25em);
        border-bottom-right-radius: calc(.25em);
        &.f-tabs-item__isActive{
            border-color: var(--primary);
            border-top-color: #fff;
            background-color: #fff;
        }
    }
    .f-tabs__isActive-bar{
        top: 0;
        height: 2px;
    }
    .f-tabs__isActive-bottom-bar{
        width: 100%;
        top: 0;
        height: 2px;
    }
}
.f-tabs__left{
    .f-tabs-nav{
        margin-right: 15px;
        order: 0;
        width: auto;
        .f-tabs-prev,.f-tabs-next{
            transform: translateX(-50%);
        }
        .f-tabs-prev{
            left: 50%;
            top: calc(.2em);
        }
        .f-tabs-next{
            left: 50%;
            bottom: calc(.2em);
        }
    }
    .f-tabs-pane-container{
        order: 1;
        flex: 1;
    }
    .f-tabs-nav-scroll-wrap{
        height: 100%;
    }
    .f-tabs-nav-scroll{
        flex-direction: column;
    }
    .f-tabs-item{
        padding: calc(.4em) calc(1.4em);
        margin-bottom: calc(.8em);
        align-self: flex-end;
    }
    .f-tabs-item-card{
        align-self: flex-end;
        padding: calc(.6em) calc(.8em);
        margin-bottom: calc(.4em);
        border-top-left-radius: calc(.25em);
        border-bottom-left-radius: calc(.25em);
        &.f-tabs-item__isActive{
            border-color: var(--primary);
            border-right-color: #fff;
            background-color: #fff;
        }
    }
    .f-tabs__isActive-bar{
        right: 0;
        width: 2px;
    }
    .f-tabs__isActive-bottom-bar{
        width: 2px;
        height: 100%;
        right: 0;
    }
}
.f-tabs__right{
    .f-tabs-nav{
        margin-left: 15px;
        order: 1;
        width: auto;
        .f-tabs-prev,.f-tabs-next{
            transform: translateX(-50%);
        }
        .f-tabs-prev{
            left: 50%;
            top: calc(.2em);
        }
        .f-tabs-next{
            left: 50%;
            bottom: calc(.2em);
        }
    }
    .f-tabs-pane-container{
        order: 0;
        flex: 1;
    }
    .f-tabs-nav-scroll-wrap{
        height: 100%;
    }
    .f-tabs-nav-scroll{
        flex-direction: column;
    }
    .f-tabs-item{
        padding: calc(.4em) calc(1.4em);
        margin-bottom: calc(.8em);
        align-self: flex-start;
    }
    .f-tabs-item-card{
        align-self: flex-start;
        padding: calc(.6em) calc(.8em);
        margin-bottom: calc(.4em);
        border-top-right-radius: calc(.25em);
        border-bottom-right-radius: calc(.25em);
        &.f-tabs-item__isActive{
            border-color: var(--primary);
            border-left-color: #fff;
            background-color: #fff;
        }
    }
    .f-tabs__isActive-bar{
        left: 0;
        width: 2px;
    }
    .f-tabs__isActive-bottom-bar{
        width: 2px;
        height: 100%;
        left: 0;
    }
}

.f-tabs__small{
    font-size: 13px!important;
}
.f-tabs__large{
    font-size: 19px!important;
}
.f-tabs-nav{
    position: relative;
    box-sizing: border-box;
    .f-tabs-prev,.f-tabs-next{
        background-color: #fff;
        position: absolute;
        cursor: pointer;
        font-size: 1em;
        color: #333;
        &:hover{
            color: var(--primary);
        }
    }
}
.f-tabs-nav__isY{
    padding: 0 calc(2em);
}
.f-tabs-nav__isX{
    padding: calc(2em) 0;
}
.f-tabs-nav-scroll-wrap{
    position: relative;
    overflow: hidden;
    .f-tabs-nav-scroll{
        display: flex;
        align-items: center;
        transition: all .25s ease-in-out;
    }
}

.f-tabs-item{
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    flex-shrink: 0;
    transition: all .2s ease-in-out;
    transform-origin: left bottom;
    .f-tabs-closeIcon{
        position: absolute;
        right: -20px;
        top: 50%;
        transform: translateY(-50%);
        color: #ccc;
        transition: all .15s;
        opacity: 0;
        border-radius: 50%;
        border: 1px solid transparent;
        &:hover{
            color: #000;
        }
    }
    i{
        font-size: calc(1em - 1px);
    }
    &:not(.f-tabs-item__disabled) > span:hover .f-tabs-closeIcon{
        opacity: 1;
    }
    &:last-child{
        margin: 0;
    }
}
.f-tabs-item-card{
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    .f-tabs-closeIcon{
        position: relative;
        opacity: 1;
        right: -5px;
    }
    &.f-tabs-item__isActive{
        position: relative;
        z-index: 2;
    }
}
.f-tabs-item__disabled{
    color: #ccc;
    cursor: not-allowed;
    &.f-tabs-item-card{
        background-color: #f2f2f2;
    }
}
.f-tabs-item__isActive{
    color: var(--primary);
}

.f-tabs__isActive-bar{
    position: absolute;
    transition: transform .2s ease-in-out;
}
.f-tabs__isActive-bottom-bar{
    position: absolute;
    background-color: #eee;
}
.f-tabs-pane-container{
    box-sizing: border-box;
}
</style>
