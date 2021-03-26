<template>
    <div :class="[getCol, getOffset]" ref="colDom">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    nextTick,
    ref,
    inject,
    onMounted
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
        const getOffset = computed(() => {
            const offsetNum = parseInt(offset as string)
            if (offsetNum >= 24 || offsetNum < 1) return ''
            return `f-col--offset-${offsetNum}`
        })
        const gutter: any = inject('gutter')
        const gutterNum = gutter.value
        onMounted(() => {
            colDom.value.style.padding = `0 ${gutterNum / 2 || 0}px`
        })
        return{
            getCol,
            colDom,
            getOffset
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
@for $i from 1 through 24 {
    .f-col--offset-#{$i} {
        margin-left: 100% / 24 * $i;
    }
}
</style>
