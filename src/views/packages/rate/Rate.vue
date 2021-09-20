<template>
    <div
        :class="{
            'f-rate': true,
            'f-rate__disabled': disabled
        }"
        ref="fRate"
        :id="id"
    >
        <template
            v-for="(num, idx) in countNum"
        >
            <f-tooltip
                :key="num"
                :disabled="isTooltipDisabled"
                :tooltip="getTooltip(idx)"
                :allow-entry="false"
            >
                <span
                    :class="{
                        [icon]: true,
                        'f-rate-item': true,
                        'f-rate-item__': true,
                        'f-rate-item__selected': currentShowIdx >= idx
                    }"
                    :style="getFs"
                    @mouseenter="handleMouseenter(idx)"
                    @mouseleave="handleMouseleave(idx)"
                    @click="handleClick(num)"
                >
            </span>
            </f-tooltip>
        </template>
        <span
            v-if="showLabel"
            class="f-rate-label"
            :style="getFs"
            ref="fRateLabel"
        >
            <template  v-if="$slots.label">
               <slot :label="currentIdx" name="label"/>
            </template>
            <template v-else>
                {{ currentIdx.toFixed(1) }}
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
    import { isEmpty } from '/@/utils/utils'
    import { getRandomId } from '/@/utils/getRandomId'
    export default defineComponent({
        components: {
            FTooltip
        },
        props: {
            halfSelect: {
                type: Boolean,
                default: false
            },
            countNum: {
                type: Number,
                default: 5
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
            icon: {
                type: String,
                default: 'f-icon-star-filing',
            },
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
        setup (props, { emit }) {
            const fRate = ref(null)
            const fRateLabel = ref(null)
            let fRateDom: HTMLElement
            let fRateLabelDom: HTMLElement
            const currentIdx = ref(props.value || 0)
            const currentShowIdx = ref(currentIdx.value - 1)
            const isTooltipDisabled = isEmpty(props.toolTip)

            const getFs = computed(() => {
                return {
                    fontSize: typeof props.fontSize === 'string' ? props.fontSize : props.fontSize + 'px',
                }
            })

            const getTooltip = computed(() => (idx: number) => props.toolTip?.[idx] ?? props.toolTip.slice(-1)[0])

            const handleMouseenter = (idx: number) => {
                currentShowIdx.value = idx
            }

            const handleMouseleave = () => {
                currentShowIdx.value = currentIdx.value - 1
            }

            let timer: NodeJS.Timeout
            const handleClick = (currentNum: number) => {
                if (timer) clearTimeout(timer)
                if (currentIdx.value === currentNum) return false
                currentIdx.value = currentNum
                timer = setTimeout(() => emit('update:value', currentNum), 50)
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

            onMounted(() => {
                fRateDom = fRate.value!
                fRateLabelDom = fRateLabel.value!
                initRootPropCss()
                initLabelPlacement()
            })

            watch(() => props.labelPlacement, () => {
                initLabelPlacement()
            })

            watch(() => [props.selectedColor, props.noSelectedColor], () => {
                initRootPropCss()
            })

            return{
                id: getRandomId('f-rate'),
                getFs,
                fRate,
                fRateLabel,
                currentIdx,
                currentShowIdx,
                isTooltipDisabled,
                getTooltip,
                handleMouseenter,
                handleMouseleave,
                handleClick,
            }
        }
    })
</script>

<style scoped lang="scss">
.f-rate{
    --rate-height: 16px;
    --selected-color: #fd7716;
    --no-selected-color: #ddd;
    display: inline-block;
    margin-left: calc(-.25 * var(--rate-height));
}
.f-rate__disabled{
    pointer-events: none;
}
.f-rate-item{
    display: inline-block;
    cursor: pointer;
    transition: transform .2s ease-in-out, color .2s ease-in-out;
    color: var(--no-selected-color);
    padding: calc(.25 * var(--rate-height));
    &:hover{
        transform: scale(1.2);
    }
}

.f-rate-item__selected{
    color: var(--selected-color)!important;
}

.f-rate-label{
    color: #666;
    font-size: calc(var(--rate-height) - 2px) !important;
}
.f-rate-label__left{
    margin-right: calc(.25 * var(--rate-height));
}
.f-rate-label__right{
    margin-left: calc(.25 * var(--rate-height));
}
</style>