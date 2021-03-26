<template>
    <div class="f-checkbox-group">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'


export default defineComponent({
    emits: ['update:value', 'change'],
    props: {
        value: Array,
        size: {
            type: String,
            validator: (value: string) => ['default', 'small', 'large'].includes(value)
        },
        name: {
            type: String,
            default: () => getRandomId('checkboxGroup')
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

<style scoped>

</style>
