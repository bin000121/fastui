<template>
    <div
        class="f-carousel-item"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    inject,
    ref,
    onMounted,
    getCurrentInstance
} from 'vue'

export default defineComponent({
    setup() {
        const {
            root,
            collectInstance
        } = inject('parent') as any
        collectInstance(getCurrentInstance()!)
    }
})
</script>

<style scoped lang="scss">
.f-carousel-item{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-shrink: 0;
}
</style>