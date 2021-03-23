<template>
    <div class="f-tabs" :id="id">
        <div class="f-tabs-nav">
            <div class="f-tabs-nav-scroll">
                <div class="f-tabs__isActive-bottom-bar"/>
                <div class="f-tabs__isActive-bar" ref="fTabsActive"/>
                <div
                    v-for="({ ctx }, i) in instance"
                    :key="ctx.id"
                    :id="ctx.id"
                    @click="toggleActive(i)"
                    :class="{
                        'f-tabs-item': true,
                        'f-tabs-item__isActive': current === ctx.name,
                        'f-tabs-item__disabled': ctx.disabled,
                    }"
                >
                    <i :class="ctx.icon" v-if="ctx.icon" :style="ctx.iconStyle || {}"/>
                    <span style="position: relative;">
                        {{ctx.label}}
                        <i
                            class="f-icon-close-bold f-tabs-closeIcon"
                            v-if="closeable && instance.length !== 1"
                            @click.stop="closeTabs(i, current === ctx.name)"
                        />
                    </span>
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
    ref,
    toRef,
    reactive,
    toRefs,
    watch,
    onMounted,
    provide,
    getCurrentInstance,
    nextTick
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

export default defineComponent({
    emits: ['update:value', 'change'],
    props: {
        id: {
            type: String,
            default: () => getRandomId('f-tabs')
        },
        value: String,
        closeable: Boolean,
        size: {
            type: String,
            default: 'default',
            validator: (val: string) => ['default', 'small', 'large'].includes(val)
        },
        type: {
            type: String,
            default: 'default',
            validator: (val: string) => ['default', 'card'].includes(val)
        }
    },
    setup (props, { emit }) {
        const root = getCurrentInstance()
        const current = ref(props.value || '')
        const fTabsActive = ref(null)
        let fTabsActiveDom: HTMLElement
        const instance = ref([] as any[])

        const getInstance = (vnode: any) => {
            instance.value.push(vnode)
        }

        const toggleActive = (index: number) => {
            const { id, name, disabled } = instance.value[index].ctx
            if (disabled) return
            const dom = document.getElementById(id) as HTMLElement
            let width = dom.offsetWidth
            let translate = index ? dom.offsetLeft : 0
            fTabsActiveDom.style.width = width + 'px'
            fTabsActiveDom.style.transform = `translateX(${translate}px)`
            if (current.value === name) return
            current.value = name
            emit('change', name)
            emit('update:value', name)
        }

        const closeTabs = (index: number, isActive: boolean) => {
            const el = instance.value[index].ctx.$el as HTMLElement | any
            el?.parentNode.removeChild(el)
            let i: number
            let name = ''
            if (index === 0) name = instance.value[index + 1].ctx.name
            else if (isActive) name = instance.value[index - 1].ctx.name
            else name = current.value
            instance.value.splice(index, 1)
            i = instance.value.findIndex((value: any) => value.ctx.name === name)
            toggleActive(i)
        }

        // const initIsActiveBar = (index?: number) => {
        //     if (!instance.value.length) return
        //     let { id: ctxId, name } = instance.value[index || 0].ctx
        //     let dom = document.getElementById(ctxId) as HTMLElement
        //     let translate = index ? `translateX(${dom.offsetLeft}px)` : 'translateX(0)'
        //     current.value = name
        //     fTabsActiveDom.style.width = `${dom.offsetWidth}px`
        //     fTabsActiveDom.style.transform = translate
        // }

        provide('$parent', reactive({
            root,
            getInstance
        }))

        onMounted(() => {
            fTabsActiveDom = fTabsActive.value as any
            const index = instance.value.findIndex((value: any) => value.ctx.name === props.value)
            nextTick(() => {
                if (props.value && index !== -1) {
                    if (!instance.value.length) return
                    toggleActive(index)
                } else toggleActive(0)
            })

        })
        return{
            instance,
            fTabsActive,
            current,
            toggleActive,
            closeTabs,
        }
    }
})
</script>

<style scoped lang="scss">
.f-tabs{
    box-sizing: border-box;
    position: relative;
    font-size: 14px;
    color: #333;
}
.f-tabs-nav{
    margin-bottom: 15px;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
}
.f-tabs-closeIcon{
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    transition: all .15s;
    opacity: 0;
    border-radius: 50%;
    border: 1px solid transparent;
    &:hover{
        color: #000;
    }
}
.f-tabs-nav-scroll{
    position: relative;
    display: flex;
    align-items: center;
}
.f-tabs-item{
    cursor: pointer;
    user-select: none;
    padding: calc(.8em) 0;
    margin-right: calc(1.8em);
    flex-shrink: 0;
    transition: transform .2s ease-in-out;
    transform-origin: left bottom;
    i{
        font-size: 13px;
    }
    &:not(.f-tabs-item__disabled) > span:hover .f-tabs-closeIcon{
        opacity: 1;
    }
}
.f-tabs-item__disabled{
    color: #ccc;
    cursor: not-allowed;
}
.f-tabs-item__isActive{
    color: var(--primary);
}

.f-tabs__isActive-bar{
    position: absolute;
    bottom: 0;
    height: 2px;
    background-color: var(--primary);
    transition: all .2s ease-in-out;
}
.f-tabs__isActive-bottom-bar{
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #eee;
    bottom: 0;
    left: 0;
}
.f-tabs-pane-container{
    box-sizing: border-box;
}
</style>
