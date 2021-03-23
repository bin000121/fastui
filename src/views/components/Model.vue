<template>
    <teleport to="#app">
        <div
            class="f-model-container"
            :id="id"
            ref="fModelContainer"
        >
            <transition name="f-model-mask-fade">
                <div
                    class="f-model-mask"
                    @click="clickMask"
                    v-show="showModel"
                ></div>
            </transition>
            <transition name="f-model-show-scale" @after-leave="remove">
                <div
                    class="f-model"
                    v-show="showModel"
                    :style="`width: ${width}; top: ${top}`"
                    ref="FModel"
                >
                    <i
                        class="f-icon-close-bold closeIcon"
                        @click="hide"
                        v-if="showClose"
                    ></i>
                    <div class="f-model-header">
                        <span v-if="!$slots.title">{{title}}</span>
                        <slot name="title"></slot>
                    </div>
                    <div class="f-model-body" v-if="!closeAndDestroyDom">
                        <slot></slot>
                    </div>
                    <div class="f-model-footer" v-if="$slots.footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs,
    onMounted,
    onBeforeUnmount,
    watch,
    ref
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

export default defineComponent({
    name: 'FModel',
    emits: ['update:value'],
    props: {
        value: Boolean,
        id: {
          type: String,
          default: () => getRandomId('f-model')
        },
        title: {
          type: String,
          default: ''
        },
        top: {
            type: String,
            default: '12vh'
        },
        width: {
            type: String,
            default: '450px'
        },
        showClose: {
            type: Boolean,
            default: true
        },
        clickMaskNotClose: Boolean,
        pressEscNotClose: Boolean,
        closeAndDestroyDom: Boolean,
    },
    setup (props, { emit }) {
        let fModelContainerDom: HTMLElement
        let fModelDom: HTMLElement
        let timer: any = null

        const data = reactive({
            showModel: props.value,
            fModel: null,
            fModelContainer: null,
            closeAndDestroyDom: false
        })

        watch(() => props.value, (newV: boolean) => {
            newV ? open() : hide()
        })

        const open = () => {
            data.showModel = true
            data.closeAndDestroyDom = false
            // 获取滚动条宽度
            const scrollBarWidth = window.innerWidth - document.body.offsetWidth
            fModelContainerDom.classList.add('f-model-show')
            document.body.style.cssText = `width: calc(100% - ${scrollBarWidth}px);overflow: hidden`
        }

        const hide = () => {
            data.showModel = false
            emit('update:value', false)
        }

        const remove = () => {
            fModelContainerDom.classList.remove('f-model-show')
            let showModelList = document.getElementsByClassName('f-model-show')
            !showModelList.length && document.body.removeAttribute('style')
            if (props.closeAndDestroyDom) data.closeAndDestroyDom = true
        }

        const clickMask = () => {
            if (props.clickMaskNotClose) {
                const FModelDom = data.fModel as any
                if (!timer) {
                    FModelDom.classList.add('f-model__not_close')
                    timer = setTimeout(() => {
                        FModelDom.classList.remove('f-model__not_close')
                        timer = null
                    }, 150)
                }
                return
            }
            hide()
        }

        const handelKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Escape' && e.key === 'Escape') {
                if (props.pressEscNotClose) {
                    if (!timer) {
                        fModelDom.classList.add('f-model__not_close')
                        timer = setTimeout(() => {
                            fModelDom.classList.remove('f-model__not_close')
                            timer = null
                        }, 150)
                    }
                    return
                }
                hide()
            }
        }

        onMounted(() => {
            fModelContainerDom = data.fModelContainer as any
            fModelDom = data.fModel as any
            document.addEventListener('keydown', handelKeyDown)
        })
        onBeforeUnmount(() => {
            document.removeEventListener('keydown', handelKeyDown)
        })
        return{
            ...toRefs(data),
            open,
            hide,
            remove,
            clickMask,
        }
    }
})
</script>
<style scoped lang="scss">
.f-model-container{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 0;
}
.f-model{
    position: relative;
    box-sizing: border-box;
    margin: 0 auto;
    background-color: #fff;
    z-index: 1000;
    border-radius: 5px;
    box-shadow: 0 5px 15px #555;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    &>div{
        box-sizing: border-box;
    }
    .closeIcon{
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        color: #666;
    }
    .f-model-header{
        display: inline-flex;
        align-items: center;
        width: 100%;
        font-size: 20px;
        padding: 12px 40px 12px 18px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .f-model-body{
        flex-grow: 1;
        min-height: 200px;
        width: 100%;
        padding: 15px;
    }
    .f-model-footer{
        width: 100%;
        padding: 12px 15px;
    }
}
.f-model-show{
    height: 100%;
}
.f-model-mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
}
.f-model-mask.isShow{
    display: block;
    z-index: 999;
}
.f-model__not_close{
    transform: scale(1.03);
    transition: all .15s;
}
</style>
