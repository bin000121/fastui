<template>
    <nav class="f-breadcrumb" :style="`font-size: ${getFontSize}px`">
        <slot></slot>
    </nav>
</template>

<script lang="ts">
import {
    defineComponent,
    provide,
    reactive,
    computed
} from 'vue'

export default defineComponent({
    props: {
        separator: {
            type: String,
            default: '/'
        },
        fontSize: {
            type: Number,
            default: 14
        }
    },
    setup (props) {
        provide('breadcrumb', reactive(props))
        const getFontSize = computed(() => {
            const fontSize = props.fontSize
            if (typeof fontSize === 'string') {
                console.warn("[fast-ui]: props 'font-size' must be a number!")
                return 14
            }
            if (fontSize < 14) return '14px'
            return fontSize
        })
        return {
            getFontSize
        }
    }
})
</script>

<style scoped lang="scss">
nav.f-breadcrumb{
    padding: 20px;
    font-family: Helvetica;
}
.font-size {

}
</style>
