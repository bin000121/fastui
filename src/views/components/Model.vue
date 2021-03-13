<template>
    <teleport :to="'#' + id">
        <div
            :class="['f-model-mask', showModel ? 'isShow' : '']"
            @click="clickMask"
        ></div>
        <transition name="f-model-show" @after-leave="remove">
            <div
                class="f-model"
                v-show="showModel"
                :style="`width: ${width}; top: ${top}`"
                ref="FModel"
            >
                <i
                    class="f-icon-close-bold closeIcon"
                    @click="closeIconClick"
                    v-if="showClose"
                ></i>
                <div class="f-model-header">
                    <span v-if="!$slots.title">{{title}}</span>
                    <slot name="title"></slot>
                </div>
                <div class="f-model-body">
                    <slot></slot>
                </div>
                <div class="f-model-footer" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs,
    onMounted,
    onBeforeUnmount,
    watch
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

export default defineComponent({
    name: 'FModel',
    emits: ['update:value'],
    props: {
        value: Boolean,
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
    },
    setup (props, { emit }) {
        const id = getRandomId('f-model')
        const modelContainer: HTMLDivElement | any = document.createElement('div')
        modelContainer.setAttribute('id', id)
        modelContainer.className = 'f-model-container'
        document.body.appendChild(modelContainer)
        let timer: any = null

        const data = reactive({
            showModel: props.value,
            FModel: null
        })

        watch(() => props.value, (newV: boolean) => {
            newV ? open() : hide()
        })

        const open = (...args: any) => {
            // 获取滚动条宽度
            const scrollBarWidth = window.innerWidth - document.body.offsetWidth
            modelContainer.classList.add('isShow')
            data.showModel = true
            document.body.style.cssText = `width: calc(100% - ${scrollBarWidth}px);overflow: hidden`
            console.log(...args)
        }

        const hide = () => {
            data.showModel = false
            emit('update:value', false)
        }

        const remove = () => {
            modelContainer.classList.remove('isShow')
            document.body.removeAttribute('style')
        }

        const closeIconClick = () => {
            hide()
        }

        const clickMask = () => {
            if (props.clickMaskNotClose) {
                const FModelDom = data.FModel as any
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
                    const FModelDom = data.FModel as any
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
        }

        onMounted(() => {
            document.addEventListener('keydown', handelKeyDown)
        })
        onBeforeUnmount(() => {
            document.removeEventListener('keydown', handelKeyDown)
            modelContainer?.parentNode?.removeChild(modelContainer)
        })
        return{
            ...toRefs(data),
            id,
            open,
            hide,
            remove,
            clickMask,
            closeIconClick,
        }
    }
})
</script>
<style lang="scss">
.f-model-container{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}
.f-model-container.isShow{
    z-index: 999;
    height: 100vh;
}
</style>
<style scoped lang="scss">
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
.f-model-mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    z-index: -1;
    transition: all .2s;
    display: none;
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
