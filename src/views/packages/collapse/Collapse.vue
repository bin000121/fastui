<template>
    <div class="f-collapse">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    provide,
    getCurrentInstance
} from 'vue'
import type { PropType, ComponentInternalInstance } from 'vue'

export default defineComponent({
    emits: ['change', 'update:value'],
    props: {
        value: Array as PropType<string[]>,
        accordion: Boolean,
        simple: Boolean,
        border: {
            type: Boolean,
            default: true
        }
    },
    setup (props, { emit }) {
        const instanceList: any[] = []

        const collectInstance = (instance: ComponentInternalInstance) => {
            instanceList.push(instance)
        }

        const accordionHandler = () => {
            for (let item of instanceList) {
                item.proxy.isShow = false
            }
        }

        const emitEvent = (eventName: 'change' | 'update:value', value: string | number | boolean) => {
            emit(eventName, value)
        }
        provide('parent', {
            root: getCurrentInstance(),
            accordionHandler,
            collectInstance,
            emitEvent
        })
        return{
            collectInstance,
            accordionHandler
        }
    }
})
</script>

<style scoped lang="scss">
.f-collapse{

}
</style>