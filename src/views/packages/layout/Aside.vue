<template>
    <aside class="f-aside">
        <slot></slot>
    </aside>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'

export default defineComponent({
    name: 'fAside',
    setup() {

    }
})
</script>

<style scoped lang="scss">
.f-aside{
    width: 200px;
    min-height: 200px;
}
</style>