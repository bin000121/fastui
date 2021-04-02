<template>
    <footer class="f-footer">
        <slot></slot>
    </footer>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'

export default defineComponent({
    name: 'fFooter',
    setup() {

    }
})
</script>

<style scoped lang="scss">
.f-footer{
    box-sizing: border-box;
    min-height: 64px;
    height: 64px;
    padding: 0 24px;
    width: 100%;
}
</style>