<template>
    <nav class="f-breadcrumb">
        <slot></slot>
    </nav>
</template>

<script lang="ts">
import {
    defineComponent,
    provide,
    reactive
} from 'vue'

export default defineComponent({
    props: {
        separator: {
            type: String,
            default: '/'
        }
    },
    setup (props) {
        provide('breadcrumb', reactive(props))
    }
})
</script>

<style scoped lang="scss">
nav.f-breadcrumb{
    padding: 20px;
    font-size: 14px;
    font-family: Helvetica;
}
</style>
