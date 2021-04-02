<template>
    <header class="f-header">
        <slot></slot>
    </header>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'

export default defineComponent({
    name: 'fHeader',
    setup() {

    }
})
</script>

<style scoped lang="scss">
.f-header{
    box-sizing: border-box;
    min-height: 48px;
    height: 64px;
    padding: 0 24px;
    width: 100%;
}
</style>