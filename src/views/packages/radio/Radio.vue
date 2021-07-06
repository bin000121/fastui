<template>
    <label
        ref="radioLabel"
        :class="{
            'f-radio-label': true,
            'f-radio-vertical': Vertical,
            'f-radio-label__disabled': disabled,
            ['f-radio-label__' + getSize]: getSize !== 'default',
            'f-radio-label__border': Border,
            'f-radio-label__border__isChecked': Border && currentValue,
        }"
    >
        <span
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
            @focus="focus"
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
    computed,
    getCurrentInstance
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'


export default defineComponent({
    emits: ['update:value', 'change'],
    props: {
        label: [String, Number, Boolean],
        value: {
            type: [String, Number, Boolean, Object],
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
            value,
            label,
            disabled,
            border,
            vertical,
            size
        } = props
        let parent: any = null
        const _this: any = getCurrentInstance()
        const radioLabel = ref(null)
        const fRadio = ref(null)
        const currentValue = ref(false)
        const Size = ref(size)
        const Border = ref(border)
        const Vertical = ref(vertical)
        const getSize = computed(() => {
            if (!['default', 'small', 'large'].includes(Size.value)) return 'default'
            return Size.value
        })
        let fRadioDom: HTMLElement | any
        const id = getRandomId('radio')

        const handleChange = () => {
            if (disabled) return
            if (parent) {
                parent.emit('update:value', label)
                parent.emit('change', label)
            } else emit('update:value', label)
        }

        const focus = () => {
            console.log(label)
        }

        onMounted(() => {
            const radioLabelDom: HTMLElement | any = radioLabel.value as any
            fRadioDom = fRadio.value as any
            // 获取 radio-group组件实例，如果被 radio-group 包裹的话，name就一定包括 radioGroup
            if (_this.parent.props?.name && _this.parent.props?.name.includes('radioGroup')) parent = _this.parent

            radioLabelDom.setAttribute('for', id)
            fRadioDom.setAttribute('id', id)
            fRadioDom.setAttribute('name', parent?.name || '')

            if (parent) {
                currentValue.value = parent.props.value === label
                Size.value = parent.props.size || size
                Border.value = parent.props.border || border
                Vertical.value = parent.props.vertical || vertical
            }

            watch(() => parent ? _this.parent.props.value : props.value, (newV: any) => {
                if (disabled) return
                fRadioDom.checked = newV === label
                currentValue.value = fRadioDom.checked
                !parent && emit('change', label)
            }, { immediate: true })
        })
        return{
            radioLabel,
            fRadio,
            handleChange,
            currentValue,
            getSize,
            Border,
            Vertical,
            focus
        }
    }
})
</script>

<style scoped lang="scss">
.f-radio-label{
    cursor: pointer;
    user-select: none;
    vertical-align: bottom;
    font-size: 16px;
    position: relative;
    align-items: center;
    color: #333;
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
        padding: 5px 10px!important;
    }
}
.f-radio-label__large{
    font-size: 18px!important;
    &.f-radio-label__border{
        padding: 10px 18px!important;
    }
}
.f-radio-label__border{
    padding: 8px 14px;
    border: 1px solid #999 !important;
    border-radius: 5px;
}
.f-radio-label__disabled{
    color: #ddd!important;
    &::before{
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: #fff;
        z-index: 99;
        opacity: .5;
        cursor: not-allowed;
        overflow: hidden;
    }
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
    width: calc(1.2em);
    height: calc(1.2em);
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
</style>
