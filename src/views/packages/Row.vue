<template>
    <div :class="['f-row', ...getJustifyContent, ...getWrap, ...getAlignItems]" :style="getRowStyle">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    provide,
    ref
} from 'vue'
export default defineComponent({
    name: 'FRow',
    props: {
        justifyContent: {
            type: String,
            default: 'start',
            validator: (value: string) => ['start', 'center', 'end', 'space-between', 'space-around'].includes(value)

        },
        gutter: {
            type: [Number, String],
            default: 0
        },
        wrap: {
            type: Boolean,
            default: true
        },
        alignItems:  {
            type: String,
            default: 'start',
            validator: (value: string) => ['start', 'center', 'end', 'baseline', 'stretch'].includes(value)
        }
    },
    setup ({ justifyContent, gutter, wrap, alignItems }) {
        const getWrap = computed(() => {
            return wrap ? ['f-row--warp'] : ['f-row--noWarp']
        })
        const getJustifyContent = computed(() => {
            const type: any = {
                'start': 'f-row--justify-content--start',
                'center': 'f-row--justify-content--center',
                'space-between': 'f-row--justify-content--space-between',
                'space-around': 'f-row--justify-content--space-around',
                'end': 'f-row--justify-content--end'
            }
            return [type[justifyContent] || type['start']]
        })

        const getAlignItems = computed(() => {
            const type: any = {
                'start': 'f-row--align-items--start',
                'center': 'f-row--align-items--center',
                'end': 'f-row--align-items--end',
                'baseline': 'f-row--align-items--baseline',
                'stretch': 'f-row--align-items--stretch'
            }
            return [type[alignItems] || type['start']]
        })
        const gutterNum = parseInt(gutter as string)
        provide('gutter', ref(gutterNum))
        const getRowStyle = computed(() => {
            return !!gutterNum ? {
                marginRight: `-${gutterNum / 2}px`,
                marginLeft: `-${gutterNum / 2}px`
            } : {}
        })
        return{
            getJustifyContent,
            getRowStyle,
            getWrap,
            getAlignItems
        }
    }
})
</script>

<style scoped lang="scss">
.f-row{
    display: flex;
}
.f-row--warp{
    flex-wrap: wrap;
}
.f-row--noWarp{
    flex-wrap: nowrap;
}
$justifyContent: ('start': 'flex-start', 'center': 'center', 'end': 'flex-end', 'space-between': 'space-between', 'space-around': 'space-around');
@each $key, $value in $justifyContent{
    .f-row--justify-content--#{$key}{
        justify-content: #{$value};
    }
}

$alignItems: ('start': 'flex-start', 'center': 'center', 'end': 'flex-end', 'stretch': 'stretch', 'baseline': 'baseline');
@each $key, $value in $alignItems{
    .f-row--align-items--#{$key}{
        align-items: #{$value};
    }
}
</style>
