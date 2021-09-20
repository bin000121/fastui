<template>
    <div
        :class="{
            'f-rate': true,
            'f-rate__disabled': disabled
        }"
        ref="fRate"
    >
        <template
            v-for="num in countNum"
        >
            <f-tooltip
                :key="num"
                :disabled="isTooltipDisabled"
                :tooltip="getTooltip(num - 1)"
                :allow-entry="false"
            >
                <span
                    :class="{
                        [icon]: true,
                        'f-rate-item': true,
                        'f-rate-item__': true,
                        'f-rate-item__selected': currentShowIdx >= (num -1)
                    }"
                    :style="getFs"
                    @mouseenter="handleMouseenter(num - 1)"
                    @mouseleave="handleMouseleave(num - 1)"
                    @click="handleClick(num)"
                >
            </span>
            </f-tooltip>
        </template>
        <span
            v-if="showLabel"
            class="f-rate-label"
            :style="getFs"
            ref="label"
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
        onMounted
    } from 'vue'
    import type { PropType } from 'vue'
    import FTooltip from '/@/views/packages/tooltip/Tooltip.vue'
    import { isEmpty } from '/@/utils/utils'
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
            value: Number,
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
            const currentIdx = ref(parseInt(props.value as string | undefined || '0'))
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

            onMounted(() => {
                fRateDom = fRate.value!
                fRateLabelDom = fRateLabel.value!
                fRateDom.style.setProperty('--rate-height', getFs.value.fontSize)
                fRateDom.style.setProperty('--selected-color', props.selectedColor)
                fRateDom.style.setProperty('--no-selected-color', props.noSelectedColor)
            })
            return{
                getFs,
                fRate,
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
    margin-left: calc(.25 * var(--rate-height));
    font-size: calc(var(--rate-height) - 2px) !important;
}
</style>