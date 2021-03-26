<template>
    <div
        :id="id"
        class="f-popconfirm"
        ref="fPopconfirm"
        @click="toggleShow"
        v-clickOutside="handleClose"
    >
        <slot></slot>
        <transition :name="animate ? 'f-popconfirm-fade' : ''">
            <div
                class="f-popconfirm-container"
                ref="fPopconfirmContainer"
                v-show="isShow"
                @click.stop
            >
                <div class="f-popconfirm-title">
<!--                    <template v-if="$slots.icon && !hideIcon">-->
<!--                        <slot name="icon"></slot>-->
<!--                    </template>-->
<!--                    <i :class="icon" v-else-if="!$slots.icon && !hideIcon"></i>-->
                    <i :class="icon" v-if="!hideIcon"></i>
                    <span>{{title}}</span>
                </div>
                <div class="f-popconfirm-footer">
                    <span
                        v-if="cancelType === 'text'"
                        @click="handleOption('cancel')"
                    >{{cancelText}}</span>
                    <f-button
                        v-if="cancelType === 'button'"
                        size="mini"
                        @click="handleOption('cancel')"
                    >{{cancelText}}</f-button>
                    <span
                        v-if="okType === 'text'"
                        @click="handleOption('ok')"
                    >{{okText}}</span>
                    <f-button
                        v-if="okType === 'button'"
                        type="primary"
                        size="mini"
                        @click="handleOption('ok')"
                    >{{okText}}</f-button>
                </div>

                <div
                    class="f-popconfirm-container-arrow"
                    ref="fPopconfirmContainerArrow"
                ></div>
                <div
                    class="f-popconfirm-container-arrow2"
                    ref="fPopconfirmContainerArrow2"
                ></div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    toRefs,
    reactive,
    computed,
    onMounted,
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'
import FButton from '/@/views/components/Button.vue'

const placementList: string[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'left-top',
    'left-center',
    'left-bottom',
    'right-top',
    'right-center',
    'right-bottom',
]
export default defineComponent({
    emits: ['ok', 'cancel'],
    components: {
        FButton
    },
    props: {
        id: {
            type: String,
            default: () => getRandomId('f-popconfirm')
        },
        placement: {
            type: String,
            default: 'top-center',
            validator: (val: string) => placementList.includes(val)
        },
        disabled: Boolean,
        animate: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: 'f-icon-warning'
        },
        hideIcon: Boolean,
        cancelType: {
            type: String,
            default: 'text',
            validator: (val: string) => ['text', 'button'].includes(val)
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        okText: {
            type: String,
            default: '确定'
        },
        okType: {
            type: String,
            default: 'text',
            validator: (val: string) => ['text', 'button'].includes(val)
        }
    },
    setup (props, { emit }) {
        const fPopconfirm = ref(null)
        const fPopconfirmContainer = ref(null)
        const fPopconfirmContainerArrow = ref(null)
        const fPopconfirmContainerArrow2 = ref(null)
        const isShow = ref(false)
        let fPopconfirmDom: HTMLElement
        let fPopconfirmContainerDom: HTMLElement
        let fPopconfirmContainerArrowDom: HTMLElement
        let fPopconfirmContainerArrow2Dom: HTMLElement

        const toggleShow = () => {
            if (props.disabled) return
            isShow.value = !isShow.value
        }

        const handleClose = () => {
            if (props.disabled) return
            isShow.value = false
        }

        const handleOption = (type: 'ok' | 'cancel') => {
            emit(type)
            handleClose()
        }

        const getPlacement = computed(() => {
            let placement = props.placement
            const mapPlacement: { [key: string]: string } = {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left'
            }
            if (!placementList.includes(props.placement)) {
                placement = 'top-center'
                console.warn('[fast-ui]: error placement property value received!')
            }
            const [p1, p2] = placement.split('-')
            return {
                originP1: p1,
                originP2: p2,
                p1: mapPlacement[p1],
                p2: mapPlacement[p2] || 'center',
                p1IsAtXAxis: ['left', 'right'].includes(p1)
            }
        })

        const initPlacement = () => {
            const { originP1, originP2, p1, p2, p1IsAtXAxis } = getPlacement.value
            const distance = p1IsAtXAxis ? fPopconfirmDom.offsetWidth : fPopconfirmDom.offsetHeight
            const translate = `transform: translate(${p1IsAtXAxis ? '0, -50%' : '-50%, 0'});`
            const yAxis = p1IsAtXAxis ? 'top' : 'left'
            let arrowCssText = `${p1}: -10px;border-${originP1}-color: #fff;`
            let arrow2CssText = `${p1}: -11px;border-${originP1}-color: #ddd;`
            let transformOrigin = `transform-origin: ${originP2} ${p1};`
            let scale = 'scale(.7)'
            let cssText = `${p1}: ${ distance + 10 }px;${transformOrigin}display: none;`
            let str1 = `${originP2}: 0px;`
            let str2 = `${originP2}: 10px;`
            str1 = p2 === 'center' ? `${yAxis}: 50%;${translate}` : str1
            str2 = p2 === 'center' ? `${yAxis}: 50%;${translate}` : str2
            scale = p2 === 'center' ? `translate(${p1IsAtXAxis ? '0, -50%' : '-50%, 0'}) ` + scale: scale
            cssText += str1
            arrowCssText += str2
            arrow2CssText += str2
            fPopconfirmContainerArrowDom.style.cssText += arrowCssText
            fPopconfirmContainerArrow2Dom.style.cssText += arrow2CssText
            fPopconfirmContainerDom.style.cssText = cssText
            fPopconfirmDom.style.setProperty('--transform', scale)

        }

        onMounted(() => {
            fPopconfirmDom = fPopconfirm.value as any
            fPopconfirmContainerDom = fPopconfirmContainer.value as any
            fPopconfirmContainerArrowDom = fPopconfirmContainerArrow.value as any
            fPopconfirmContainerArrow2Dom = fPopconfirmContainerArrow2.value as any
            initPlacement()
        })
        return {
            fPopconfirm,
            fPopconfirmContainer,
            fPopconfirmContainerArrow,
            fPopconfirmContainerArrow2,
            isShow,
            toggleShow,
            handleClose,
            handleOption,
        }
    }
})
</script>

<style scoped lang="scss">
.f-popconfirm{
    --transform: scale(.4);
    --transform2: #333;
    position: relative;
    box-sizing: border-box;
    display: inline-block;
}
.f-popconfirm-container{
    color: #333;
    white-space: nowrap;
    box-sizing: border-box;
    position: absolute;
    min-width: 250px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #eee;
    box-shadow: 0 0 3px #aaa;
    border-radius: 5px;
    z-index: 999;
    .f-popconfirm-title{
        width: 100%;
        display: inline-flex;
        align-items: center;
        font-size: 14px;
        i{
            color: #faad14;
            margin-right: 5px;
        }
    }
    .f-popconfirm-container-arrow, .f-popconfirm-container-arrow2{
        position: absolute;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        z-index: 2;
    }
    .f-popconfirm-container-arrow2{
        z-index: 1;
    }
}
.f-popconfirm-footer{
    text-align: right;
    padding-top: 15px;
    span{
        font-size: 14px;
        cursor: pointer;
        color: var(--primary);
        &:first-child{
            margin-right: 12px;
        }
    }
}
</style>
