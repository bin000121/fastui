<template>
    <div :class="{
        'f-switch-box': true,
        'f-switch-box--disabled': disabled
    }">
        <input
            type="checkbox"
            ref="switchRef"
            class="f-switch"
            @input="handleInput"
        />
        <label
            ref="switchLabelRef"
            :class="{
                'is-checked': isChecked
            }"
        >
            <span :class="{
                'control': true,
                'is-checked': isChecked,
                'control--shadow': activeColor || inactiveColor
            }"></span>
        </label>
        <span
            class="f-switch-label-text"
            style="color: #666"
            v-if="label"
        >
            {{label}}
        </span>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    watch
} from 'vue'
import { getRandomId } from '../../utils/getRandomId'

export default defineComponent({
    name: 'FSwitch',
    emits: ['change', 'update:value'],
    props: {
        value: Boolean,
        disabled: {
            type: Boolean,
            default: false
        },
        activeColor: String,
        activeText: String,
        inactiveText: String,
        inactiveColor: String,
        label: String
    },
    setup (props, { emit }) {
        const {
            value,
            disabled,
            activeColor,
            inactiveColor
        } = props
        const switchRef = ref(null)
        const switchLabelRef = ref(null)
        const isChecked = ref(!!value)
        let switchDom: HTMLElement
        let switchLabelDom: HTMLElement



        const handleInput = (e: any) => {
            isChecked.value = e.target.checked
            emit('update:value', e.target.checked)
            emit('change', e.target.checked)
        }

        onMounted(() => {
            switchDom = switchRef.value as any
            switchLabelDom = switchLabelRef.value as any
            switchDom.id = getRandomId('input')
            if (disabled) switchLabelDom.removeAttribute('for')
            else switchLabelDom.setAttribute('for', switchDom.id)
            if (value) switchDom.setAttribute('checked', 'checked')
            else switchDom.removeAttribute('checked')
            if (activeColor) {
                switchLabelDom.style.setProperty('--active-color', activeColor)
            }
            if (inactiveColor) {
                switchLabelDom.style.setProperty('--inactive-color', inactiveColor)
            }
            if (activeColor || inactiveColor) {
                switchLabelDom.style.setProperty('--thumb-color', '#fff')
            }
        })

        watch(() => props.disabled, (newV: Boolean) => {
            if (newV) switchLabelDom.removeAttribute('for')
            else switchLabelDom.setAttribute('for', switchDom.id)
        })

        return{
            switchRef,
            switchLabelRef,
            handleInput,
            isChecked
        }
    }
})
</script>

<style scoped lang="scss">
.f-switch-box{
    display: inline-flex;
    align-items: center;
}
.f-switch-box--disabled{
    opacity: .5;
    label, .control{
        cursor: default;
    }
    label:hover .control{
        box-shadow: none;
    }
}
.f-switch{
    display: none;
}
label{
    --active-color: #1661abbf;
    --hover-color: #1661ab26;
    --inactive-color: #bbb;
    --thumb-color: #1661ab;
    display: inline-block;
    box-sizing: border-box;
    height: 12px;
    width: 36px;
    border: 1px solid transparent;
    background-color: var(--inactive-color);
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    &:hover .control{
        box-shadow: 0 0 0 .5rem var(--hover-color);
    }
    &:hover .control--shadow{
        box-shadow: 0 0 5px #666,0 0 0 .5rem #66666626;
    }
}

label.is-checked{
    background-color: var(--active-color);
}

.control{
    display: block;
    z-index: 999;
    width: 20px;
    height: 20px;
    position: absolute;
    left: -1px;
    top: 50%;
    border-radius: 18px;
    background-color: var(--thumb-color);
    cursor: pointer;
    transition: left 0.2s ease-in-out;
    transform: translateY(-50%);
}
.control--shadow{
    box-shadow: 0 0 3px #888;
}
.control.is-checked {
    left: 16px;
}

/*.f-switch + label::after {*/
/*    content: "关";*/
/*    position: absolute;*/
/*    top: 1px;*/
/*    left: 24px;*/
/*    font-size: 12px;*/
/*    color: #fff*/
/*}*/

/*.f-switch:checked+label::after {*/
/*    content: "开";*/
/*    left: 5px;*/
/*}*/
.f-switch-label-text{
    margin-left: 8px;
    font-size: 16px;
}
</style>
