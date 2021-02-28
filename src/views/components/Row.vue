<template>
    <div :class="['f-row', ...getJustifyContent]" :style="getRowStyle">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from 'vue'

export default defineComponent({
    name: 'FRow',
    props: {
        justifyContent: {
            type: String,
            default: 'start'
        },
        gutter: {
            type: [Number, String],
            default: 0
        }
    },
    setup ({ justifyContent, gutter }) {
        const getJustifyContent = computed(() => {
            const type: any = {
                'start': 'f-row--justify-content--start',
                'center': 'f-row--justify-content--center',
                'space-between': 'f-row--justify-content--space-between',
                'space-around': 'f-row--justify-content--space-around',
                'end': 'f-row--justify-content--end'
            }
            return type[justifyContent] ? [type[justifyContent]] : ['f-row--justify-content--start']
        })
        const getRowStyle = computed(() => {
            const gutterNum = parseInt(gutter as string)
            return !!gutterNum ? {
                marginRight: `-${gutterNum / 2}px`,
                marginLeft: `-${gutterNum / 2}px`
            } : {}
        })
        return{
            getJustifyContent,
            getRowStyle
        }
    }
})
</script>

<style scoped>
.f-row{
    display: flex;
    align-items: flex-start;
}
.f-row--justify-content--start{
    justify-content: flex-start;
}
.f-row--justify-content--center{
    justify-content: center;
}
.f-row--justify-content--space-between{
    justify-content: space-between;
}
.f-row--justify-content--space-around{
    justify-content: space-around;
}
.f-row--justify-content--end{
    justify-content: flex-end;
}
</style>
