<template>
    <div
        class="f-input-number"
        :class="{
            'f-input-number__disabled': disabled,
            'f-input-number__readonly': readonly,
            'f-input-number__simple': simple,
            ['f-input-number__' + size]: size !== 'default'
        }"
        :id="id"
        v-clickOutside="handleBlur"
    >
        <div
            class="f-input-number-icon"
            ref="iconBox"
        >
            <i
                class="f-icon-arrow-up-bold f-input-number-add"
                :class="{ 'f-input-number-add__disabled': disabledAdd }"
                v-longPress="() => handleValueChange('increase')"
            ></i>
            <i
                class="f-icon-arrow-down-bold f-input-number-minus"
                :class="{ 'f-input-number-minus__disabled': disabledMinus }"
                v-longPress="() => handleValueChange('decrease')"
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
            :value="getValue"
            @focus="handleFocus"
            @input="handleInput"
            @keydown.up.prevent="handleValueChange('increase')"
            @keydown.down.prevent="handleValueChange('decrease')"
        >
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    watch,
    nextTick,
    watchEffect,
    computed
} from 'vue'
import type { PropType } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'
import { debounce } from '/@/utils/utils'
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
        size: {
            type: String,
            default: 'default',
            validator: (val: string) => ['default', 'small', 'large'].includes(val)
        },
        formatter: Function as PropType<Formatter>,
        returnFormatter: Boolean,
        simple: Boolean
    },
    setup (props, { emit }) {
        let input = ref(null)
        let inputDom: HTMLElement | any
        let iconBox = ref(null)
        let iconBoxDom: HTMLElement | any

        let isHasMin = props.min ?? false
        let isHasMax = props.max ?? false
        let isHasValue = props.value ?? false
        let currentValue = ref(isHasValue || 1)
        let isFocus = ref(false)
        const isFloat = props.step.toString().includes('.')
        let disabledAdd = ref(false)
        let disabledMinus = ref(false)

        const checkIsHasValue = (data: number | string | unknown) => {
            if (typeof data === 'number' && data === 0) return true
            if (typeof data === 'string') return !!data
            return !!data
        }

        const getValue = computed(() => {
            if (props.formatter) return props.formatter(currentValue.value)
            return currentValue.value
        })

        const handleFocus = () => {
            if (props.disabled) return
            isFocus.value = true
        }

        const handleBlur = () => {
            if (props.disabled) return
            isFocus.value = false
        }

        const handleInput = debounce((e: any) => {
            let value = e.target.value
            const reg = /^[0-9]+\.?[0-9]+$/
            if (!reg.test(value)) return
            let num = parseFloat(value as string)
            if (checkIsHasValue(props.max) && num >= props.max!) value = props.max
            else if (checkIsHasValue(props.min) && num <= props.min!) value = props.min
            currentValue.value = parseFloat(value as string)
            emit('update:value', currentValue.value)
        }, 150)

        const _valueChangeHandler = (type: 'increase' | 'decrease') => {
            let step: number
            const baseNum = type === 'increase' ? 1 : -1
            if (isFloat) {
                step = props.step as number * baseNum
                const pointNum = props.step.toString().split('.')[1].length
                currentValue.value = Number((currentValue.value + step).toFixed(pointNum))
            } else {
                step = props.step as number * baseNum
                currentValue.value += step
            }
        }

        const handleValueChange = (type: 'increase' | 'decrease') => {
            if (props.disabled || props.readonly) return
            isFocus.value = true
            disabledAdd.value = disabledMinus.value = false
            const oldVal = props.returnFormatter ? getValue.value : currentValue.value
            if (type === 'increase' && checkIsHasValue(props.max) && currentValue.value >= props.max!) {
                currentValue.value = props.max!
                disabledAdd.value = true
                return
            }
            if (type === 'decrease' && checkIsHasValue(props.min) && currentValue.value <= props.min!) {
                currentValue.value = props.min!
                disabledMinus.value = true
                return
            }
            _valueChangeHandler(type)
            emit('update:value', currentValue.value)
            const newVal = props.returnFormatter ? getValue.value : currentValue.value
            emit('change', oldVal, newVal)
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

        watch(() => props.value, (newV: number | unknown) => {
            if (newV ?? false) {
                currentValue.value = newV as number
            }
        })

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
            getValue,
            handleInput,
            disabledAdd,
            disabledMinus,
            handleValueChange,
            handleFocus,
            handleBlur
        }
    }
})
</script>

<style scoped lang="scss">
.f-input-number{
    display: inline-block;
    position: relative;
    font-size: 14px;
    user-select: none;
    &:hover{
        .f-input-number-input{
            border-color: var(--primary);
        }
    }
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
    transition: box-shadow .2s ease-in-out, border-color .2s ease-in-out;
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
    color: inherit;
    transition: all .15s ease-in-out;
    &:hover{
        cursor: pointer;
    }
    &:active{
        color: var(--primary);
        background-color: rgba(var(--primary-rgba), .18);
    }
}
.f-input-number-add{
    border-top-right-radius: 5px;
    border-bottom: 1px solid #ccc;
}
.f-input-number-minus{
    border-bottom-right-radius: 5px;
}
.f-input-number-minus__disabled, .f-input-number-add__disabled {
    cursor: not-allowed!important;
    &:active{
        color: #fff;
        background-color: var(--error);
        border-color: var(--error);
    }
}
.f-input-number__simple{
    &:hover .f-input-number-icon{
        opacity: 1;
        transform: translate(0, -50%);
    }
    .f-input-number-input{
        border: 0;
        border-radius: 5px!important;
        background-color: rgba(var(--primary-rgba), .01);
        transition: background-color .12s ease-in-out!important;
    }
    .f-input-number-icon{
        right: 0;
        opacity: 0;
        transform: translate(.3em, -50%);
        transition: opacity .15s ease-in-out, transform .2s;
    }
    .f-input-number-icon, .f-input-number-minus, .f-input-number-add{
        border: 0;
    }
    .f-input-number-input__focus{
        box-shadow: none;
        background-color: rgba(var(--primary-rgba), .06);
    }
}
</style>