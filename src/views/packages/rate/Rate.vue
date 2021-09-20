<template>
    <div
        class="f-rate"
        ref="fRate"
    >
        <span
            v-for="num in countNum"
            :key="num"
            :class="{
                [icon]: true,
                'f-rate-item': true,
                'f-rate-item_selected': currentIdx >= (num -1)
            }"
            :style="getFs"
            @mouseenter="handleMouseenter(num - 1)"
            @mouseleave="handleMouseleave(num - 1)"
            @click="handleClick(num - 1)"
        >
        </span>
        <span
            v-if="!showLabel"
            class="f-rate-label"
            :style="getFs"
        >
            {{ '5.0' }}
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
    import { debounce } from '/@/utils/utils'
    export default defineComponent({
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
                default: '#fd7716'
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
            }
        },
        setup (props) {
            const fRate = ref(null)
            let fRateDom: HTMLElement
            const currentIdx = ref(-1)
            const getFs = computed(() => {
                return {
                    fontSize: typeof props.fontSize === 'string' ? props.fontSize : props.fontSize + 'px',
                }
            })

            const handleMouseenter = (idx: number) => {
                currentIdx.value = idx
            }

            const handleMouseleave = () => {
                currentIdx.value = -1
            }

            const handleClick = (idx: number) => {
                console.log(idx)
            }

            onMounted(() => {
                fRateDom = fRate.value!
                fRateDom.style.setProperty('--rate-height', getFs.value.fontSize)
                fRateDom.style.setProperty('--selected-color', props.selectedColor)
                fRateDom.style.setProperty('--no-selected-color', props.noSelectedColor)
            })
            return{
                getFs,
                fRate,
                currentIdx,
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
    height: calc(1.5 * var(--rate-height));
    line-height: calc(1.5 * var(--rate-height));
}
.f-rate-item{
    display: inline-block;
    cursor: pointer;
    transition: transform .2s ease;
    color: var(--no-selected-color);
    &:hover{
        transform: scale(1.25);
    }
}

.f-rate-item_selected{
    color: var(--selected-color)!important;
}

.f-rate-item + .f-rate-item{
    padding-left: calc(.5 * var(--rate-height));
}

.f-rate-label{
    color: #666;
    margin-left: 15px;
}
</style>