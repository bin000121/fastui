<template>
    <div class="Pagination">

    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted
} from 'vue'

export default defineComponent({
    name: 'FPagination',
    props: {
        page: {
            type: Number,
            default: 1
        },
        size: {
            type: Number,
            default: 10
        },
    },
    setup () {

    }
})
</script>

<style scoped>

</style>
