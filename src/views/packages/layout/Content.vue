<template>
    <main class="f-content">
        <slot></slot>
    </main>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'

export default defineComponent({
    name: 'fContent',
    setup() {

    }
})
</script>

<style scoped lang="scss">
.f-content{
    min-height: 200px;
    width: 100%;
}
</style>