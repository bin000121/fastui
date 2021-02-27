<template>
    <div class="switch">
        <h2>Switch 开关</h2>
        <p>用于表明两种对立的状态，使之在他们之间进行切换。</p>

        <div>
            <h3>基本用法</h3>
            <p>基础样式。</p>

            <MnSwitch v-model="flag"></MnSwitch>
            <div v-highlight>
                <pre><code>
                    {{`<f-switch
                        v-modle="flag"
                    >
                    </f-switch>

                    <script lang="ts">
                        import {
                            defineComponent,
                            ref
                        } from 'vue'
                        export default defineComponent({
                            setup () {
                                const flag = ref(false)
                                return {
                                    flag
                                }
                            }
                        })
                    </script>`}}
                </code></pre>
            </div>
    </div>
        <div>
            <h3>尺寸</h3>
            <p>标签的不同尺寸。</p>

            <MnSwitch></MnSwitch>
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

import MnSwitch from '../components/Switch.vue'

export default defineComponent({
    components: {
        MnSwitch
    },
    setup () {
        const flag = ref(true)
        return {
            flag
        }
    }
})
</script>

<style scoped>

</style>
