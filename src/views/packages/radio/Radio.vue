<template>
    <label
        ref="radioLabel"
        class="f-radio-label"
        :class="{
            'f-radio-vertical': Vertical,
            'f-radio-label__disabled': disabled,
            ['f-radio-label__' + Size]: Size !== 'default',
            'f-radio-label__border': Border,
            'f-radio-label__border__isChecked': Border && currentValue,
            'f-radio__button': Button
        }"
    >
        <span
            v-if="!Button"
            :class="{
                'choose-box': true,
                'choose-box__isChecked': currentValue
            }"
        >
            <span
                class="choose-box-inner__isChecked"
                :style="`transform: scale(${currentValue ? 1 : 0})`"
            ></span>
        </span>
        <input
            ref="fRadio"
            type="radio"
            class="f-radio"
            :name="name"
            :label="label"
            :disabled="disabled"
            @change="handleChange"
            tabindex="-1"
        >
        <span
            :style="`color: ${ currentValue && !disabled ? 'var(--primary)' : '#333'}`"
            v-if="$slots.default">
            <slot></slot>
        </span>
    </label>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    watch,
    inject
} from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

export default defineComponent({
    emits: ['update:value', 'change'],
    props: {
        label: [String, Number, Boolean],
        value: {
            type: [String, Number, Boolean],
            default: false
        },
        border: Boolean,
        disabled: Boolean,
        vertical: Boolean,
        name: String,
        size: {
            type: String,
            default: 'default',
            validator: (value: string) => ['default', 'small', 'large'].includes(value)
        }
    },
    setup (props, { emit }) {
        const {
            label,
            disabled,
            border,
            vertical,
            size
        } = props
        const radioLabel = ref(null)
        const fRadio = ref(null)
        const currentValue = ref(false)
        const Size = ref(size)
        const Border = ref(border)
        const Vertical = ref(vertical)
        const Button = ref(false)
        // const getSize = computed(() => {
        //     if (!['default', 'small', 'large'].includes(Size.value)) return 'default'
        //     return Size.value
        // })
        let fRadioDom: HTMLElement | any
        let radioLabelDom: HTMLElement
        const id = getRandomId('radio')

        const handleChange = () => {
            if (disabled) return
            if (parent) {
                parent.emit('update:value', label)
                parent.emit('change', label)
            } else emit('update:value', label)
        }

        let parent: ComponentInternalInstance | null = inject('root', null)

        onMounted(() => {
            radioLabelDom= radioLabel.value!
            fRadioDom = fRadio.value!
            radioLabelDom.setAttribute('for', id)
            fRadioDom.setAttribute('id', id)
            if (parent) {
                fRadioDom.setAttribute('name', parent.props.name as string)
                currentValue.value = parent.props.value === label
                Size.value = parent.props.size as string || size
                Border.value = parent.props.border as boolean || border
                Vertical.value = parent.props.vertical as boolean || vertical
                Button.value = !!parent.props.button as boolean
            }

            watch(() => parent ? (parent.props.value as string | number | boolean) : props.value, (newV: string | number | boolean) => {
                if (disabled) return
                fRadioDom.checked = newV === label
                currentValue.value = newV === label
                !parent && emit('change', label)
            }, { immediate: true })
        })
        return{
            radioLabel,
            fRadio,
            currentValue,
            // getSize,
            Border,
            Vertical,
            Size,
            Button,
            handleChange
        }
    }
})
</script>

<style scoped lang="scss">
.f-radio-label{
    cursor: pointer;
    user-select: none;
    font-size: 16px;
    position: relative;
    align-items: center;
    color: #333;
    display: inline-block;
    box-sizing: border-box;
}
.f-radio-label + .f-radio-label{
    margin-left: 15px;
}
.f-radio-vertical{
    display: flex!important;
    flex-wrap: wrap;
    &.f-radio-label + &.f-radio-label {
        margin: 15px 0 0!important;
    }
}
.f-radio-label__small{
    font-size: 14px!important;
    &.f-radio-label__border{
        height: 26px;
        line-height: 22px;
        padding: 0 10px!important;
    }
}
.f-radio-label__large{
    font-size: 18px!important;
    &.f-radio-label__border{
        height: 40px;
        line-height: 38px;
        padding: 0 18px!important;
    }
}
.f-radio-label__border{
    height: 32px;
    line-height: 30px;
    padding: 0 14px;
    border: 1px solid #ccc !important;
    border-radius: 5px;
    transition: border-color .2s ease-in-out, box-shadow .2s ease-in-out;
}
.f-radio-label__disabled{
    color: #ddd!important;
    cursor: not-allowed;
    opacity: .5;
    .choose-box{
        border-color: #999;
        box-shadow: none;
    }
    .choose-box-inner__isChecked{
        background-color: #999;
    }
    &.f-radio-label__border{
        border-color: #ddd!important;
        box-shadow: none;
    }
}
.f-radio-label__border__isChecked{
    border-color: var(--primary)!important;
    box-shadow: 0 0 0 .15em #1661ab33;
}
.choose-box{
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: calc(1.1em);
    height: calc(1.1em);
    background-color: #fff;
    border: 1px solid #999;
    border-radius: 50%;
    margin-right: 8px;
}
.choose-box__isChecked{
    border-color: var(--primary);
    box-shadow: 0 0 0 .15em #1661ab33;
    animation: f-radio-scale-in .15s ease-in-out;
}
.choose-box-inner__isChecked{
    box-sizing: border-box;
    display: block;
    width: calc(1.2em / 2);
    height: calc(1.2em / 2);
    border-radius: 50%;
    background-color: var(--primary);
    transform-origin: center;
    transform: scale(0);
    transition: all .25s ease-in-out;
}

.f-radio-label__border{
    border: 1px solde var(--primary);
}
.f-radio{
    display: none;
}
.f-radio__button{
    margin: 0!important;
    height: 32px;
    line-height: 32px;
    padding: 0 14px;
    border: 1px solid #ddd;
    border-right: none;
    &:first-child{
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    &:last-child{
        border-right: 1px solid #ddd;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
}
</style>
