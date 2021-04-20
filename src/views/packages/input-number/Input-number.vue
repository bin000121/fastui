<template>
    <div
        class="f-input-number"
    >
        <div
            class="f-input-number-icon"
            ref="iconBox"
        >
            <i class="f-icon-arrow-up-bold f-input-number-add" @click="increase"></i>
            <i class="f-icon-arrow-down-bold f-input-number-minus" @click="decrease"></i>
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
            :readonly="readonly"
            :disabled="disabled"
            :max="max"
            :min="min"
            @focus="isFocus = true"
            @blur="isFocus = false"
            :value="currentValue"
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
type Formatter = (value: number | string) => string
export default defineComponent({
    emits: ['update:value', 'change'],
    props: {
        value: Number,
        width: {
            type: String,
            default: '200px'
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

        const currentValue = ref(0)
        const isFocus = ref(false)
        const increase = () => {
            if (!isFocus.value) inputDom.focus()
            isFocus.value = true
            let oldVal = currentValue.value
            currentValue.value++
            emit('update:value', currentValue.value)
            emit('change', oldVal, currentValue.value)
        }

        const decrease = () => {
            if (!isFocus.value) inputDom.focus()
            isFocus.value = true
            let oldVal = currentValue.value
            currentValue.value--
            emit('update:value', currentValue.value)
            emit('change', oldVal, currentValue.value)
        }

        onMounted(() => {
            inputDom = input.value as any
        })
        return{
            isFocus,
            input,
            currentValue,
            increase,
            decrease,
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
.f-input-number-input{
    display: inline-block;
    box-sizing: border-box;
    outline: 0;
    height: 36px;
    padding: 0 2em 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: all .15s ease-in-out;
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
    &:hover{
        color: var(--primary);
        cursor: pointer;
    }
}
.f-input-number-add{
    border-bottom: 1px solid #ccc;
}
</style>