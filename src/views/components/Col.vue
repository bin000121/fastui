<template>
    <div :class="[getCol]" ref="colDom">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    getCurrentInstance,
    nextTick,
    ref
} from 'vue'


export default defineComponent({
    name: 'FC0l',
    props: {
        span: {
            type: [Number, String],
            default: 24
        },
        offset: {
            type: [Number, String],
            default: 0
        }
    },
    setup ({ span, offset }) {
        const colDom: any = ref(null)
        const getCol = computed(() => {
            const spanNum = parseInt(span as string)
            if (spanNum >= 24 || spanNum < 1) return 'f-col--24'
            return `f-col--${spanNum}`
        })
        const gutter = (getCurrentInstance() as any).parent.props.gutter
        const gutterNum = parseInt(gutter)
        nextTick(() => {
            colDom.value.style.padding = `0 ${gutterNum / 2 || 0}px`
        })
        return{
            getCol,
            colDom
        }
    }
})
</script>

<style scoped lang="scss">
@for $i from 1 through 24 {
    .f-col--#{$i} {
        width: 100% / 24 * $i;
    }
}
</style>
