<template>
    <div>
        <h2>InputNumber 步进器</h2>
        <p>一个表单中常见的数字输入框。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>基础的呈现样式。</p>

            <div class="demo-input-number">
                <f-input-number></f-input-number>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue'

import fInputNumber from '/@/views/packages/input-number/Input-number.vue'
export default defineComponent({
    components: {
        fInputNumber
    },
    setup() {

    }
})
</script>

<style scoped lang="scss">
.demo-input-number{

}
</style>