<template>
    <div class="table">
        <h2>Table 表格</h2>
        <p>用于承载批量的结构化的数据，并以行列方式呈现。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>表格的最基础呈现方式。</p>

            <div class="demo-table">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs
} from 'vue'
import FTable from '/@/views/components/Table.vue'

export default defineComponent({
    components: {
        FTable,
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

<style scoped lang="scss">
.demo-table{

}
</style>
