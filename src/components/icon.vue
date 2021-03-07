<template>
    <i :class="className" :style="`font-size: ${getSize}`"></i>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from 'vue'

export default defineComponent({
    props: {
        size: {
            type: [String, Number],
            default: 16
        },
        className: String
    },
    setup ({ size }) {
        const getSize = computed(() => {
            return parseInt(size.toString()) + 'px'
        })
        return {
            getSize
        }
    }
})
</script>

<style scoped>

</style>
