<template>
    <section
        :class="{
            'f-layout': true,
            'is-vertical': direction
        }">
        <slot></slot>
    </section>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
} from 'vue'
export default defineComponent({
    setup(props, { slots }) {
        const direction = ref(false)
        let defaultSlots = slots.default?.() || null
        if (defaultSlots) {
            // 只要存在f-header 或f-footer那么flex的方向就总是垂直
            direction.value = defaultSlots.some((vnode: any) => 'fHeader fFooter'.includes(vnode.type.name))
        }
        return{
            direction
        }
    }
})
</script>

<style scoped lang="scss">
.f-layout{
    box-sizing: border-box;
    display: flex;
    flex: 1;
    width: 100%;
}
.f-layout.is-vertical{
    flex-direction: column;
}
</style>