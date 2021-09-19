<template>
    <div>
        <h2>Rate 打分</h2>
        <p>用于对某些事物进行打分、评价。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>常规用法</p>

            <div class="demo-rate">
                <f-rate></f-rate>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import FRate from '/@/views/packages/rate/Rate.vue'
export default defineComponent({
    components: {
        FRate
    },
    setup () {

    }
})
</script>

<style scoped lang="scss">
.demo-rate{
    margin-bottom: 15px;
}
</style>