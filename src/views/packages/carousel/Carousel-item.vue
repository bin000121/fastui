<template>
    <div
        class="f-carousel-item"
    >
        666
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
    width: 100%;
    height: 100%;
}
</style>