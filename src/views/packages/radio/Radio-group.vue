<template>
    <div
        :class="{
            'f-radio-group': true,
            'f-radio-group__vertical': vertical
        }"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    provide,
    getCurrentInstance
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

export default defineComponent({
    emits: ['update:value', 'change'],
    props: {
        value: [String, Number, Boolean],
        size: {
            type: String,
            validator: (value: string) => ['default', 'small', 'large'].includes(value)
        },
        name: {
            type: String,
            default: () => getRandomId('radioGroup')
        },
        vertical: Boolean,
        border: Boolean,
        button: Boolean,
        buttonStyle: {
            type: String,
            default: 'default',
            validator: (value: string) => ['default', 'outline'].includes(value)
        }
    },
    setup (props, { emit }) {
        const emitEvent = (eventName: 'update:value' | 'change', value: boolean | number) => {
            emit(eventName, value)
        }
        provide('root', getCurrentInstance())
        return{
            emitEvent
        }
    }
})
</script>

<style scoped lang="scss">
.f-radio-group{
    display: inline-block;
    vertical-align: bottom;
}

.f-radio-group__vertical{
    display: block!important;
}
</style>
