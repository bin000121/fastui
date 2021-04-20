<template>
    <div
        class="f-input-number"
        :class="{
            'f-input-number__disabled': disabled,
            'f-input-number__readonly': readonly,
            ['f-input-number__' + size]: size !== 'default'
        }"
        :id="id"
        v-clickOutside="handleFocus"
    >
        <div
            class="f-input-number-icon"
            ref="iconBox"
        >
            <i
                class="f-icon-arrow-up-bold f-input-number-add"
                @click="handleValueChange('increase')"
            ></i>
            <i
                class="f-icon-arrow-down-bold f-input-number-minus"
                @click="handleValueChange('decrease')"
            ></i>
        </div>
        <input
            :class="{
                'f-input-number-input': true,
                'f-input-number-input__focus': isFocus
            }"
            :style="`width: ${width}`"
            ref="input"
            type="text"
            autocomplete="off"
            :autofocus="autoFocus"
            :readonly="readonly || disabled"
            :disabled="disabled"
            :max="max"
            :min="min"
            :value="currentValue"
            @focus="isFocus = true"
        >
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    watch,
    nextTick
} from 'vue'
import type { PropType } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'
type Formatter = (value: number | string) => string
export default defineComponent({
    emits: ['update:value', 'change'],
    props: {
        id: {
            type: String,
            default: () => getRandomId('f-input-number')
        },
        value: Number,
        width: {
            type: String,
            default: '120px'
        },
        disabled: Boolean,
        readonly: Boolean,
        autoFocus: Boolean,
        max: Number,
        min: Number,
        step: {
            type: [Number, String],
            default: 1
        },
        placeholder: {
            type: String,
            default: '请输入...'
        },
        size: {
            type: String,
            default: 'default',
            validator: (val: string) => ['default', 'small', 'large'].includes(val)
        },
        formatter: Function as PropType<Formatter>
    },
    setup (props, { emit }) {
        const input = ref(null)
        let inputDom: HTMLElement | any
        const iconBox = ref(null)
        let iconBoxDom: HTMLElement | any

        let isHasMin = props.min ?? false
        let isHasMax = props.max ?? false
        let isHasValue = props.value ?? false
        const currentValue = ref(isHasValue || 1)
        const isFocus = ref(false)
        const disabledChange = ref(false)

        const handleFocus = () => {
            if (props.disabled) return
            isFocus.value = false
        }

        const handleValueChange = (type: 'increase' | 'decrease') => {
            if (props.disabled || props.readonly) return
            isFocus.value = true
            const step = parseInt(props.step as string)
            const oldVal = currentValue.value
            if (type === 'increase') {
                if (isHasMax && currentValue.value >= isHasMax) return
                currentValue.value += step
            }
            else {
                if (isHasMin && currentValue.value <= isHasMin) return
                currentValue.value -= step
            }
            emit('update:value', currentValue.value)
            emit('change', oldVal, currentValue.value)
        }

        const initValue = () => {
            if (isHasValue && isHasMin && isHasMax) {
                if (currentValue.value >= isHasMax) currentValue.value = isHasMax as number
                if (currentValue.value <= isHasMin) currentValue.value = isHasMin as number
            } else if (isHasValue && isHasMin && !isHasMax) {
                currentValue.value = currentValue.value <= isHasMin ? isHasMin as number : currentValue.value
            } else if (isHasValue && !isHasMin && isHasMax) {
                currentValue.value = currentValue.value >= isHasMax ? isHasMin as number : currentValue.value
            }
        }

        onMounted(() => {
            inputDom = input.value as any
            iconBoxDom = iconBox.value as any
            inputDom.style.padding = `0 ${iconBoxDom.offsetWidth}px 0 1em`
            initValue()
        })

        return{
            isFocus,
            input,
            iconBox,
            currentValue,
            handleValueChange,
            handleFocus,
        }
    }
})
</script>

<style scoped lang="scss">
.f-input-number{
    display: inline-block;
    position: relative;
    font-size: 14px;
}
.f-input-number__small{
    .f-input-number-input{
        height: 30px;
    }
}
.f-input-number__large{
    .f-input-number-input{
        height: 38px;
    }
}
.f-input-number-input{
    display: inline-block;
    box-sizing: border-box;
    outline: 0;
    height: 34px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: box-shadow .15s ease-in-out, border-color .15s ease-in-out;
}
.f-input-number__disabled{
    pointer-events: none;
    background-color: #eee;
    opacity: .8;
}
.f-input-number-input__focus{
    border-color: var(--primary);
    box-shadow: 0 0 0 .18em rgba(var(--primary-rgba),.25)
}
.f-input-number-icon{
    color: #999;
    position: absolute;
    right: 1px;
    top: 50%;
    transform: translateY(-50%);
    height: calc(100% - 2px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-left: 1px solid #ccc;
}
.f-input-number-minus, .f-input-number-add{
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0 8px;
    transition: all .15s ease-in-out;
    &:hover{
        color: var(--primary);
        background-color: rgba(var(--primary-rgba), .15);
        cursor: pointer;
    }
}
.f-input-number-add{
    border-bottom: 1px solid #ccc;
}
</style>