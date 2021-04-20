<template>
    <div>
        <h2>InputNumber 步进器</h2>
        <p>一个表单中常见的数字输入框。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>基础的呈现样式。</p>

            <p style="user-select: none">当前值：{{num}}</p>
            <div class="demo-input-number">
                <f-input-number v-model:value="num" :min="2"></f-input-number>
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-input-number v-model:value="num"></f-input-number>

    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'
    export default defineComponent({
        setup() {
            const num = ref(1)
            return{ num }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jin_yong">禁用
                <a href="#jin_yong" class="f-icon-anchor"></a>
            </h3>
            <p>为步进器添加禁用样式，您不能与之进行交互。</p>

            <div class="demo-input-number">
                <f-input-number :value="1" disabled></f-input-number>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-input-number :value="1" disabled></f-input-number>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zhi_du">只读
                <a href="#zhi_du" class="f-icon-anchor"></a>
            </h3>
            <p>当前步进器输入框状态为只读，同时您不能与之进行交互，但他看起来和正常没什么两样。</p>

            <div class="demo-input-number">
                <f-input-number v-model:value="num3" readonly></f-input-number>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-input-number v-model:value="num" readonly></f-input-number>

    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'
    export default defineComponent({
        setup() {
            const num = ref(1)
            return{ num }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    toRefs
} from 'vue'

import fInputNumber from '/@/views/packages/input-number/Input-number.vue'
export default defineComponent({
    components: {
        fInputNumber
    },
    setup() {
        const data = reactive({
            num: 1,
            num2: 1,
            num3: 1
        })
        return{
            ...toRefs(data)
        }
    }
})
</script>

<style scoped lang="scss">
.demo-input-number{

}
</style>