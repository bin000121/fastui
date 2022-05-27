<template>
    <div
        :class="{
            'f-rate': true,
            'f-rate__disabled': disabled
        }"
        ref="fRate"
        :id="id"
    >
        <span style="display: none" v-if="$slots.icon" ref="iconSlot">
            <slot name="icon"></slot>
        </span>
        <template
            v-for="(num, idx) in countNum"
            :key="num"
        >
            <f-tooltip
                :disabled="isTooltipDisabled"
                :tooltip="getTooltip(idx)"
                :allow-entry="false"
                class="f-rate-item-container"
            >
<!--                <span-->
<!--                    :class="{-->
<!--                        'f-icon-star-filing': true,-->
<!--                        'f-rate-item': true,-->
<!--                        'f-rate-item__selected': currentShowIdx >= idx-->
<!--                    }"-->
<!--                    :style="getFs"-->
<!--                    @mouseenter="handleMouseenter(idx)"-->
<!--                    @mouseleave="handleMouseleave"-->
<!--                    @click="handleClick(num)"-->
<!--                >-->
<!--                </span>-->
<!--                <span-->
<!--                    v-if="allowHalf"-->
<!--                    :class="{-->
<!--                        'f-icon-star-filing': true,-->
<!--                        'f-rate-half': true,-->
<!--                        'f-rate-item__selected': currentShowHalfIdx === idx || currentShowIdx >= idx-->
<!--                    }"-->
<!--                    :style="getFs"-->
<!--                    @mouseenter="handleHalfMouseenter(idx)"-->
<!--                    @mouseleave="handleMouseleave"-->
<!--                    @click="handleHalfClick(idx)"-->
<!--                ></span>-->
            </f-tooltip>
        </template>
        <span
            v-if="showLabel"
            class="f-rate-label"
            :style="getFs"
            ref="fRateLabel"
        >
            <template v-if="$slots.label">
               <slot :label="currentIdx" name="label"/>
            </template>
            <template v-else>
                {{ getLabel }}
            </template>
        </span>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    ref,
    watch,
    onMounted
} from 'vue'
import type { PropType } from 'vue'
import FTooltip from '/@/views/packages/tooltip/Tooltip.vue'
import { isEmpty, debounce } from '/@/utils/utils'
import { getRandomId } from '/@/utils/getRandomId'
export default defineComponent({
    components: {
        FTooltip
    },
    props: {
        allowHalf: {
            type: Boolean,
            default: false
        },
        countNum: {
            type: Number,
            default: 5,
            validator: (val: number) => val > 0
        },
        value: {
            type: Number,
            required: true,
            default: 0,
            validator: (val: number) => val >= 0
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        icon: String,
        fontSize: {
            type: [String, Number],
            default: 20,
        },
        selectedColor: {
            type: String,
            default: '#fc8e00'
        },
        noSelectedColor: {
            type: String,
            default: '#ddd'
        },
        showLabel: {
            type: Boolean,
            default: false
        },
        labelPlacement: {
            type: String,
            default: 'right',
            validator: (val: string) => ['right', 'left'].includes(val)
        },
        toolTip: {
            type: Array as PropType<(string | number)[]>,
            default: []
        },
        toolTipIsLabel: {
            type: Boolean,
            default: true
        }
    },
    emits: ['update:value'],
    setup (props, { emit, slots }) {
        const fRate = ref(null)
        const fRateLabel = ref(null)
        const iconSlot = ref(null)
        let fRateDom: HTMLElement
        let fRateLabelDom: HTMLElement
        let iconSlotDom: HTMLElement

        let _currentIdx = props.value || 0
        if (_currentIdx > props.countNum) _currentIdx = props.countNum
        if (_currentIdx < 0) _currentIdx = 0
        const currentIdx = ref(parseFloat(_currentIdx + ''))
        const currentHalfIdx = ref(-1)
        if (props.allowHalf) {
            let num = currentIdx.value * 10
            let halfNum = parseFloat((num / 5 % 2).toFixed(1))
            if  (halfNum === 0 || halfNum < 1) currentHalfIdx.value = -1
            else currentHalfIdx.value = parseInt(currentIdx.value + '')
        }

        // 用于展示的索引，并非真正的索引
        const currentShowIdx = ref(currentIdx.value - 1)
        const currentShowHalfIdx = ref(currentHalfIdx.value)
        const isTooltipDisabled = ref(true)

        const getFs = computed(() => {
            return {
                fontSize: typeof props.fontSize === 'string' ? props.fontSize : props.fontSize + 'px',
            }
        })

        const getLabel = computed(() => {
            if (props.allowHalf && currentHalfIdx.value !== -1) {
                return (currentHalfIdx.value + .5).toFixed(1)
            } else return currentIdx.value.toFixed(1)
        })

        const getTooltip = computed(() => (idx: number) => props.toolTip?.[idx] ?? props.toolTip.slice(-1)[0])

        const handleMouseenter = debounce((idx: number) => {
            currentShowIdx.value = idx
            // 进入全星时要重置半选的索引为-1
            if (props.allowHalf) currentShowHalfIdx.value = -1
            changeClassName()
        }, 50)

        const handleMouseleave = debounce(() => {
            currentShowIdx.value = currentIdx.value - 1
            if (props.allowHalf) currentShowHalfIdx.value = currentHalfIdx.value
            changeClassName()
        }, 50)

        // 半选离开
        const handleHalfMouseenter = debounce((idx: number) => {
            if (!props.allowHalf) return false
            currentShowIdx.value = idx - 1
            currentShowHalfIdx.value = idx
            changeClassName()
        }, 50)

        // let timer: NodeJS.Timeout
        const handleClick = (currentNum: number) => {
            // if (timer) clearTimeout(timer)
            if (currentIdx.value === currentNum) return false
            currentIdx.value = currentNum
            // 此时要将半选idx重置为-1
            currentHalfIdx.value = -1
            // timer = setTimeout(() => emit('update:value', currentNum), 50)
            emit('update:value', currentNum)
        }

        // 半选确认
        const handleHalfClick = (idx: number) => {
            if (!props.allowHalf) return false
            if (currentHalfIdx.value === idx) return false
            currentIdx.value = idx
            currentHalfIdx.value = idx
            emit('update:value', idx + .5)
        }

        // 初始化样式
        const initRootPropCss = () => {
            fRateDom.style.setProperty('--rate-height', getFs.value.fontSize)
            fRateDom.style.setProperty('--selected-color', props.selectedColor)
            fRateDom.style.setProperty('--no-selected-color', props.noSelectedColor)
        }

        // 初始化文本位置
        const initLabelPlacement = () => {
            if (!props.showLabel) return false
            if (props.labelPlacement === 'right') {
                fRateLabelDom.classList.add('f-rate-label__right')
                fRateLabelDom.classList.remove('f-rate-label__left')
                fRateDom.appendChild(fRateLabelDom)
            } else{
                fRateLabelDom.classList.add('f-rate-label__left')
                fRateLabelDom.classList.remove('f-rate-label__right')
                fRateDom.insertBefore(fRateLabelDom, fRateDom.firstElementChild)
            }
        }

        // 初始化dom
        const initRateDom = () => {
            const slotIconDom = slots.icon?.()[0].el as HTMLElement
            for (let i = 0; i < containerList.length; i++) {
                // :scope 类似于this，在这里指代 containerList[i]
                const spanList = containerList[i].querySelectorAll(':scope > span')
                // 清空之前的span
                if (spanList.length) containerList[i].innerHTML = ''
                const spanDom: HTMLElement = document.createElement('span')
                // 处理icon插槽
                if (iconSlotDom) spanDom.appendChild(slotIconDom.cloneNode(true))
                else if (props.icon) spanDom.innerHTML = props.icon
                else spanDom.classList.add('f-icon-star-filing')
                spanDom.classList.add('f-rate-item')
                if (currentShowIdx.value >= i) spanDom.classList.add('f-rate-item__selected')
                spanDom.addEventListener('mouseenter', () => handleMouseenter(i))
                spanDom.addEventListener('mouseleave', () => handleMouseleave())
                spanDom.addEventListener('click', () => handleClick(i + 1))
                spanDom.style.fontSize = getFs.value.fontSize
                containerList[i].appendChild(spanDom)
                if (!props.allowHalf) continue
                // 处理半选节点
                const halfSpanDom = spanDom.cloneNode(true) as HTMLElement
                halfSpanDom.innerHTML = ''
                if (iconSlotDom) halfSpanDom.appendChild(slotIconDom.cloneNode(true))
                else if (props.icon) halfSpanDom.innerHTML = props.icon
                else halfSpanDom.classList.add('f-icon-star-filing')
                halfSpanDom.classList.add('f-rate-half')
                if (
                    currentShowHalfIdx.value === i ||
                    currentShowIdx.value >= i
                ) halfSpanDom.classList.add('f-rate-item__selected')
                halfSpanDom.addEventListener('mouseenter', () => handleHalfMouseenter(i))
                halfSpanDom.addEventListener('mouseleave', () => handleMouseleave())
                halfSpanDom.addEventListener('click', () => handleHalfClick(i))
                halfSpanDom.style.fontSize = getFs.value.fontSize
                containerList[i].appendChild(halfSpanDom)
            }
            isTooltipDisabled.value = isEmpty(props.toolTip)
            // 移除dom
            if (fRateDom.contains(iconSlotDom)) fRateDom.removeChild(iconSlotDom)
        }

        // 处理选中、未选中样式，用于鼠标移入、移出、点击等样式切换
        const changeClassName = debounce(() => {
            for (let i = 0; i < containerList.length; i++) {
                const spanList = containerList[i].querySelectorAll(':scope > span')
                const spanDom = spanList[0] as HTMLElement
                if (currentShowIdx.value >= i) spanDom.classList.add('f-rate-item__selected')
                else spanDom.classList.remove('f-rate-item__selected')
                if (!props.allowHalf) continue
                const halfSpanDom = spanList[1] as HTMLElement
                if (
                    currentShowHalfIdx.value === i ||
                    currentShowIdx.value >= i
                ) halfSpanDom.classList.add('f-rate-item__selected')
                else halfSpanDom.classList.remove('f-rate-item__selected')
            }
        }, 50)

        let containerList: NodeListOf<HTMLElement>
        onMounted(() => {
            fRateDom = fRate.value!
            fRateLabelDom = fRateLabel.value!
            iconSlotDom = iconSlot.value as any
            containerList = fRateDom.querySelectorAll('.f-rate-item-container')
            initRootPropCss()
            initLabelPlacement()
            initRateDom()
        })

        watch(() => props.labelPlacement, () => {
            initLabelPlacement()
        })

        watch(() => [props.selectedColor, props.noSelectedColor], () => {
            initRootPropCss()
        })

        watch(() => [currentIdx.value, currentHalfIdx.value], () => {
            changeClassName()
        })

        watch(() => [props.allowHalf, props.icon], () => {
            containerList = fRateDom.querySelectorAll('.f-rate-item-container')
            initRateDom()
        })

        return{
            id: getRandomId('f-rate'),
            getFs,
            fRate,
            fRateLabel,
            iconSlot,
            getLabel,
            currentHalfIdx,
            currentShowHalfIdx,
            currentIdx,
            currentShowIdx,
            isTooltipDisabled,
            getTooltip,
            handleMouseenter,
            handleMouseleave,
            handleClick,
            handleHalfMouseenter,
            handleHalfClick,
        }
    }
})
</script>

<style lang="scss">
.f-rate{
    --rate-height: 16px;
    --selected-color: #fd7716;
    --no-selected-color: #ddd;
    display: inline-flex;
    align-items: center;
    margin-left: calc(-.25 * var(--rate-height));
    font-size: 16px;
}
.f-rate__disabled{
    pointer-events: none;
}
.f-rate-item-container{
    position: relative;
    transition: transform .25s ease;
    &:hover{
        transform: translateY(-3px);
    }
}
.f-rate-item{
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    cursor: pointer;
    color: var(--no-selected-color);
    transition: color .15s ease;
    padding: calc(.25 * var(--rate-height));
}

.f-rate-item__selected{
    color: var(--selected-color)!important;
}

.f-rate-label{
    color: #666;
    font-size: calc(var(--rate-height) - 2px) !important;
}
.f-rate-label__left{
    margin-right: calc(.3 * var(--rate-height));
}
.f-rate-label__right{
    margin-left: calc(.3 * var(--rate-height));
}

.f-rate-half{
    white-space: nowrap;
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    overflow: hidden;
    color: transparent;
}
</style>
