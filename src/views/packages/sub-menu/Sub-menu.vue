<template>
    <li class="f-menu-subMenu">
        <div v-if="$slots.title" class="f-menu-subMenu-title">
            <slot name="title"></slot>
        </div>
        <slot></slot>
    </li>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue'

export default defineComponent({
    props: {
        title: String,
        icon: String,
        key: [String, Number]
    },
    setup() {

    }
})
</script>

<style scoped lang="scss">
.f-menu-subMenu{

}
.f-menu-subMenu-title{

}
</style>