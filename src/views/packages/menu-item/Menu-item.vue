<template>
    <li class="f-menu-item">
        <slot></slot>
    </li>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    inject
} from 'vue'

export default defineComponent({
    props: {
        key: [String, Number]
    },
    setup() {

    }
})
</script>

<style scoped lang="scss">
.f-menu-item{
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 4px 0;
}
</style>