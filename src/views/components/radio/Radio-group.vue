<template>
    <div
        :class="{
            'f-radio-group': true,
            'f-radio-group__vertical': vertical,
        }"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
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
    },
    setup (props, { emit }) {

        const emitEvent = (eventName: 'update:value' | 'change', value: boolean | number) => {
            emit(eventName, value)
        }
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
    &:deep(.f-radio-label + .f-radio-label){
        margin: 0 0 0 15px!important;
    }
}

.f-radio-group__vertical{
    display: block!important;
    &:deep(.f-radio-label + .f-radio-label){
        margin: 15px 0 0!important;
    }
}
</style>
