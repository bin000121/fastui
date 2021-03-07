<template>
    <div class="switch">
        <h2>Switch 开关</h2>
        <p>用于表明两种对立的状态，使之在他们之间进行切换。</p>

        <div>
            <h3>基本用法</h3>
            <p>基础样式。</p>

            <div class="desc">
                通过绑定 <b>value</b> 或者 <b>v-model:value</b> 绑定其状态。
            </div>

            <div>
                <div class="demo-switch">
                    <f-switch :value="flag"></f-switch>
                </div>

                <div class="desc">
                    可以使用 <b>active-color</b> 和 <b>inactive-color</b> 来指定on/off的颜色。
                </div>

                <div class="demo-switch">
                    <f-switch
                        v-model:value="flag"
                        active-color="#00e676"
                        inactive-color="#e53935"
                    ></f-switch>
                </div>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-switch :value="flag"></f-switch>

    <f-switch
        v-model:value="flag"
        active-color="#00e676"
        inactive-color="#e53935"
    ></f-switch>

    <script lang="ts">
        import {
            defineComponent,
            ref
        } from 'vue'
        export default defineComponent({
            setup () {
                const flag = ref(true)
                const flag2 = ref(true)
                return {
                    flag,
                    flag2
                }
            }
        })
    </script>`}}
                </code></pre>
            </div>
    </div>

        <div>
            <h3>禁用</h3>
            <p></p>

            <f-switch disabled></f-switch>
            <div v-highlight>
                <pre><code>
                    {{`<f-switch></f-switch>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3>文本</h3>
            <p>可以嵌入一段html结构</p>

            <div class="desc">
                通过具名插槽 <b>#label</b> 来接收。
            </div>

            <div>
                <f-switch v-model:value="flag2">
                    <template #label>
                        <p>开关当前值：{{flag2}}</p>
                    </template>
                </f-switch>
            </div>
            <div v-highlight>
                <pre><code>
                    {{`<f-switch></f-switch>`}}
                </code></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue'

import FSwitch from '../components/Switch.vue'

export default defineComponent({
    components: {
        FSwitch
    },
    setup () {
        const flag = ref(true)
        const flag2 = ref(true)
        const disabled = ref(true)
        setTimeout(() => {
            disabled.value = false
        }, 2000)
        return {
            flag,
            flag2,
            disabled
        }
    }
})
</script>

<style scoped>
.demo-switch{
    margin: 30px 0;
}
</style>
