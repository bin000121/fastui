<template>
    <div
        :id="id"
        class="f-carousel-container"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    provide,
    getCurrentInstance
} from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

export default defineComponent({
    props: {
        height: String,
        trigger: {
            type: String,
            default: 'click'
        },
        loop: Boolean,
        autoplay: Boolean,
        interval: {
            type: Number,
            default: 2500,
            validator: (val: number) => val >= 0
        },
        showDots: {
            type: Boolean,
            default: true
        },
        dotsPlacement: {
            type: String,
            default: ''
        },
        showArrow: {
            type: Boolean,
            default: true
        },
        showArrowType: {
            type: String,
            default: 'hover',
            validator: (val: string) => ['hover', 'always', 'none'].includes(val)
        },
        easing: {
            type: String,
            default: 'linear',
        },
        effect: {
            type: String,
            default: 'slide',
            validator: (val: string) => ['slide', 'fade'].includes(val)
        }
    },
    setup() {
        const id = getRandomId('f-carousel')
        const instanceList: any[] = []

        const collectInstance = (instance: ComponentInternalInstance) => {
            instanceList.push(instance)
        }
        console.log(instanceList)
        provide('parent', {
            root: getCurrentInstance(),
            collectInstance,
        })
        return {
            id,
        }
    }
})
</script>

<style scoped lang="scss">
.f-carousel-container{
    display: flex;
    width: 100%;
}
</style>