<template>
    <label
        :class="{
            'f-checkbox-label': true,
            'f-checkbox-vertical': Vertical,
            'f-checkbox-label__disabled': disabled,
            ['f-checkbox-label__' + getSize]: getSize !== 'default',
            'f-checkbox-label__border': Border,
            'f-checkbox-label__border__isChecked': Border && currentValue,
        }"
        ref="fCheckoutLabel"
    >
        <span
            :class="{
                'f-checkbox-button': true,
                'f-checkbox-button__isChecked': currentValue,
            }"
        >
            <transition name="f-checkbox-zoom-in" mode="out-in">
                <i class="f-icon-yes" v-show="currentValue"></i>
            </transition>
        </span>
        <input
            type="checkbox"
            :class="{
                'f-checkbox': true
            }"
            ref="fCheckbox"
            :value="value"
            :disabled="disabled"
            :name="name"
            @change="handleChange"
        >
        <span :style="`color: ${ currentValue && !disabled ? 'var(--primary)' : '#333'}`">{{label}}</span>
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
    emits: ['update:value'],
    props: {
        label: [String, Number],
        value: [String, Number, Boolean, Object],
        disabled: Boolean,
        name: String,
        border: Boolean,
        vertical: Boolean,
        size: {
            type: String,
            default: 'default',
            validator: (value: string) => ['default', 'small', 'large'].includes(value)
        }
    },
    setup (props, { emit }) {
        const id = getRandomId('checkbox')
        const currentValue = ref(props.value)
        const Size = ref(props.size)
        const Border = ref(props.border)
        const Vertical = ref(props.vertical)
        const fCheckoutLabel = ref(null)
        const fCheckbox = ref(null)
        let fCheckboxDom: HTMLElement | any
        const _this: any = getCurrentInstance()
        let parent: any = null

        const getSize = computed(() => {
            if (!['default', 'small', 'large'].includes(Size.value)) return 'default'
            return Size.value
        })

        const handleChange = (e: any) => {
            if (props.disabled) return
            let isChecked = e.target.checked
            let checkValue = e.target.value
            if (parent) {
                let arr = [..._this.parent.props.value]
                isChecked ? arr.push(checkValue) : arr.splice(arr.indexOf(checkValue), 1)
                parent.emit('update:value', arr)
            } else emit('update:value', isChecked)
        }

        onMounted(() => {
            const fCheckoutLabelDom: HTMLElement = fCheckoutLabel.value as any
            fCheckboxDom = fCheckbox.value as any
            fCheckoutLabelDom.setAttribute('for', id)
            fCheckboxDom.setAttribute('id', id)
            fCheckboxDom.setAttribute('name', parent?.name || '')

            // 获取 checkbox-group组件实例，如果被 checkbox-group 包裹的话，name就一定包括 checkboxGroup
            if (_this.parent.props?.name && _this.parent.props?.name.includes('checkboxGroup')) parent = _this.parent

            if (parent) {
                currentValue.value = parent.props.value.includes(props.value)
                Size.value = parent.props.size || props.size
                Border.value = parent.props.border || props.border
                Vertical.value = parent.props.vertical || props.vertical

                watch(() => _this.parent.props.value, (newV: any) => {
                    if (props.disabled) return
                    fCheckboxDom.checked = newV.includes(props.value)
                    currentValue.value = fCheckboxDom.checked
                }, { deep: true })
            } else {
                watch(() => props.value, (newV: any) => {
                    currentValue.value = newV
                })
            }
        })

        return{
            fCheckbox,
            fCheckoutLabel,
            currentValue,
            handleChange,
            getSize,
            Border,
            Vertical,
        }
    }
})
</script>

<style scoped lang="scss">
.f-checkbox-label{
    display: inline-flex;
    align-items: center;
    position: relative;
    user-select: none;
    vertical-align: bottom;
    cursor: pointer;
    font-size: 16px;
    color: #333;
    box-sizing: border-box;
}
.f-checkbox-vertical{
    display: flex!important;
    flex-wrap: wrap;
    &.f-checkbox-label + &.f-checkbox-label{
        margin: 15px 0 0!important;
    }
}
.f-checkbox-label__small{
    font-size: 14px!important;
    &.f-checkbox-label__border{
        padding: 5px 10px!important;
    }
}
.f-checkbox-label__large{
    font-size: 18px!important;
    &.f-checkbox-label__border{
        padding: 10px 18px!important;
    }
}
.f-checkbox-label__disabled{
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
    .f-checkbox-button{
        background-color: #ddd;
        box-shadow: none;
        border-color: #999;
    }
    .f-checkbox-button i {
        color: #666;
    }
}
.f-checkbox-label__border{
    padding: 8px 14px;
    border: 1px solid #999 !important;
    border-radius: 5px;
}
.f-checkbox-label__border__isChecked{
    border-color: var(--primary)!important;
    box-shadow: 0 0 0 .15em #1661ab33;
}
.f-checkbox{
    display: none;
}
.f-checkbox-button{
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: calc(1.2em);
    height: calc(1.2em);
    background-color: #fff;
    border: 1px solid #999;
    border-radius: 5px;
    margin-right: 8px;
    padding-top: calc(.12em);
    i{
        font-size: 14px;
        color: #fff;
    }
}
.f-checkbox-button__isChecked{
    border-color: var(--primary);
    box-shadow: 0 0 0 .12em #1661ab33;
    background-color: var(--primary);
    animation: f-radio-scale-in .15s ease-in-out;
}
</style>
