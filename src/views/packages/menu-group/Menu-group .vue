<template>
    <ul class="f-menu-group">
       <slot></slot>
    </ul>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue'

export default defineComponent({
    props: {
        title: String,
    },
    setup() {

    }
})
</script>

<style scoped lang="scss">
.f-menu-group{

}
</style>