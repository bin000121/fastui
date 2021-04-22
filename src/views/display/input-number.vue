<template>
    <div>
        <h2>InputNumber 步进器</h2>
        <p>一个表单中常见的数字输入框，用于处理数字的输入。</p>

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
            <p>当前步进器输入框状态为只读，同时您不能与之进行交互，他看起来和正常没什么两样。</p>

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

        <div>
            <h3 id="ge_shi_hua">格式化呈现
                <a href="#ge_shi_hua" class="f-icon-anchor"></a>
            </h3>
            <p>自定义文本框中数据的呈现样式。</p>

            <div class="demo-input-number">
                <f-input-number
                    v-model:value="num4"
                    :min="2"
                    :formatter="val => val + '%'"
                />

                <f-input-number
                    v-model:value="num5"
                    :min="2"
                    :formatter="val => '$' + val"
                />
            </div>

            <div class="desc">
                您还可以设置属性 <b>return-formatter</b> 来获得格式化后的返回值，它只能在你监听的 <b>change</b> 事件参数中去获取。
            </div>

            <div class="demo-input-number">
                <p>旧值: {{oldV}}，新值： {{newV}}</p>
                <f-input-number
                    v-model:value="num6"
                    :formatter="val => val + '%'"
                    return-formatter
                    @change="handleChange"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-input-number v-model:value="num"></f-input-number>

    <p>旧值: \{\{oldVal\}\}，新值： \{\{newVal\}\}</p>
    <f-input-number
        v-model:value="num2"
        :formatter="val => val + '%'"
        return-formatter
        @change="handleChange"
    />
    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'
    export default defineComponent({
        setup() {
            const oldVal = ref('')
            const newVal = ref('')
            const handleChange = (oldV: any, newV: any) => {
                oldVal.value = oldV
                newVal.value = newV
            }
            const num = ref(1)
            const num2 = ref(1)
            return{
                num,
                num2,
                newVal,
                oldVal,
                handleChange
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="bu_chang">步长
                <a href="#bu_chang" class="f-icon-anchor"></a>
            </h3>
            <p>步进器的步长可以自定义，默认是1。</p>

            <div class="demo-input-number">
                <f-input-number v-model:value="num10" :step="2"></f-input-number>
                <f-input-number v-model:value="num11" :step="-3"></f-input-number>
                <f-input-number v-model:value="num12" :step="0.01"></f-input-number>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-input-number v-model:value="num" :step="2"></f-input-number>
    <f-input-number v-model:value="num2" :step="-3"></f-input-number>
    <f-input-number v-model:value="num3" :step="0.01"></f-input-number>

    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'
    export default defineComponent({
        setup() {
            const num = ref(1)
            const num2 = ref(1)
            const num3 = ref(1)
            return{
                num,
                num2,
                num3
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chi_cun">尺寸
                <a href="#ge_shi_hua" class="f-icon-anchor"></a>
            </h3>
            <p>步进器拥有三种不同大小，默认大小为default。</p>

            <div class="demo-input-number">
                <f-input-number
                    v-model:value="num7"
                    size="small"
                />

                <f-input-number
                    v-model:value="num8"
                    size="default"
                />

                <f-input-number
                    v-model:value="num9"
                    size="large"
                />
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-input-number
        v-model:value="num"
        size="small"
    />

    <f-input-number
        v-model:value="num2"
        size="default"
    />

    <f-input-number
        v-model:value="num3"
        size="large"
    />

    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'
    export default defineComponent({
        setup() {
            const num = ref(1)
            const num2 = ref(1)
            const num3 = ref(1)
            return{
                num,
                num2,
                num3
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jian_jie_bu_jin_qi">简洁步进器
                <a href="#jian_jie_bu_jin_qi" class="f-icon-anchor"></a>
            </h3>
            <p>为步进器应用简洁样式。</p>

            <div class="demo-input-number">
                <f-input-number v-model:value="num13" simple size="small"></f-input-number>
                <f-input-number v-model:value="num14" simple></f-input-number>
                <f-input-number v-model:value="num15" simple size="large"></f-input-number>
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-input-number v-model:value="num" simple size="small"></f-input-number>
    <f-input-number v-model:value="num2" simple></f-input-number>
    <f-input-number v-model:value="num3" simple size="large"></f-input-number>

    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'
    export default defineComponent({
        setup() {
            const num = ref(1)
            const num2 = ref(1)
            const num3 = ref(1)
            return{
                num,
                num2,
                num3
            }
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
            num3: 1,
            num4: 1,
            num5: 1,
            num6: 1,
            num7: 1,
            num8: 1,
            num9: 1,
            num10: 1,
            num11: 1,
            num12: 1,
            num13: 1,
            num14: 1,
            num15: 1,
            oldV: '',
            newV: ''
        })

        const handleChange = (oldV: any, newV: any) => {
            data.oldV = oldV
            data.newV = newV
        }
        return{
            handleChange,
            ...toRefs(data)
        }
    }
})
</script>

<style scoped lang="scss">
.demo-input-number{
    .f-input-number + .f-input-number{
        margin-left: 15px;
    }
}
</style>