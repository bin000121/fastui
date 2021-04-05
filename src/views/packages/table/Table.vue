<template>
    <div class="f-table">
        <table>
            <slot></slot>
            <thead>
                <tr>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                </tr>
                <tr>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs
} from 'vue'

export default defineComponent({
    name: 'FTable',
    props: {

    },
    setup () {
        const data = reactive({

        })
        return{
            ...toRefs(data)
        }
    }
})
</script>

<style scoped>

</style>
