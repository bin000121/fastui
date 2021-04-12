<template>
    <ul
        ref="menu"
        class="f-menu"
        :style="menuStyle || {}"
    >
        <slot></slot>
    </ul>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    provide,
    onMounted,
    getCurrentInstance
} from 'vue'
import type { PropType, CSSProperties} from 'vue'

export default defineComponent({
    props: {
        mode: {
            type: String,
            default: 'horizontal',
            validator: (val: string) => ['horizontal', 'vertical'].includes(val)
        },
        theme: {
            type: String,
            default: 'light',
            validator: (val: string) => ['light', 'dark'].includes(val)
        },
        menuStyle: {
            type: Object as PropType<CSSProperties>,
            default: () => ({
                width: '256px'
            })
        },
        activeBgColor: {
            type: String,
            validator: (val: string) => {
                if (val.length === 4) return /^#[0-9A-Za-z]{3}$/.test(val)
                if (val.length === 7) return /^#[0-9A-Za-z]{6}$/.test(val)
                return false
            }
        },
        router: Boolean,
        collapse: Boolean,
        collapseAnimation: Boolean,
        uniqueOpenedOne: Boolean,
        defaultOpenSub: Array as PropType<string[]>,
        defaultOpenItem: String,
        triggerType: String as PropType<'click' | 'hover'>,
    },
    setup () {
        const menu = ref(null)
        let menuDom: HTMLElement


        provide('$parent', getCurrentInstance())
        onMounted(() => {
            menuDom = menu.value as any
        })
        return{
            menu,
        }
    }
})
</script>

<style scoped lang="scss">
.f-menu{

}
</style>