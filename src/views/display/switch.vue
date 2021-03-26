<template>
    <div class="switch">
        <h2>Switch 开关</h2>
        <p>用于表明两种对立的状态，使之在他们之间进行切换。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
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
    {{`<f-switch :value="flag"/>

    <f-switch
        v-model:value="flag"
        active-color="#00e676"
        inactive-color="#e53935"
    />

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
            <h3 id="jin_yong">禁用
                <a href="#jin_yong" class="f-icon-anchor"></a>
            </h3>
            <p>为开关添加禁用样式，您不可用与之交互。</p>

            <f-switch disabled></f-switch>
            <div v-highlight>
    <pre><code>
        {{`<f-switch disabled></f-switch>`}}
    </code></pre>
            </div>
        </div>

        <div>
            <h3 id="wen_ben">文本
                <a href="#wen_ben" class="f-icon-anchor"></a>
            </h3>
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
    {{`<f-switch  v-model:value="flag">
        <template #label>
            <p>开关当前值：\{\{flag\}\}</p>
        </template>
    </f-switch>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="nei_qian">内嵌
                <a href="#nei_qian" class="f-icon-anchor"></a>
            </h3>
            <p>开关的控制手柄内嵌回滑动管道中。</p>

            <div class="desc">
                设置属性 <b>inset</b> 即可添加内嵌样式。
            </div>

            <div class="demo-switch">
                <f-switch v-model:value="flag3" inset></f-switch>
            </div>

            <div class="demo-switch">
                <f-switch
                    v-model:value="flag3"
                    inset
                    active-color="#00e676"
                    inactive-color="#e53935"
                ></f-switch>
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-switch v-model:value="flag" inset></f-switch>

    <f-switch
        inset
        active-color="#00e676"
        inactive-color="#e53935"
    ></f-switch>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jia_zai_zhong">加载中
                <a href="#jia_zai_zhong" class="f-icon-anchor"></a>
            </h3>
            <p>为开关添加一个加载中的样式，除解除非加载中状态，否则您将一直不能与之交互。</p>

            <div class="demo-switch">
                <f-switch :loading="loading"></f-switch>
            </div>

            <div class="desc">
                异步移除。
            </div>

            <div class="demo-switch">
                <f-switch :loading="loading" inset></f-switch>
                <f-button @click="closeLoading">3秒后关闭Loading</f-button>
            </div>

            <div v-highlight>
    <pre><code>
    {{`<f-switch :loading="loading"></f-switch>

    <f-switch :loading="loading" inset></f-switch>

    <f-button @click="closeLoading">3秒后关闭Loading</f-button>

    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'
    export default defineComponent({
        setup () {
            const loading = ref(true)
            const closeLoading = () => {
                setTimeout(() => {
                    loading.value = false
                }, 3000)
            }
            return {
                loading,
                closeLoading
            }
        }
    })
    </script>`}}
    </code></pre>
            </div>
        </div>

        <div>
            <h3 id="nei_qian_wen_ben">内嵌文本
                <a href="#nei_qian" class="f-icon-anchor"></a>
            </h3>
            <p>只在内嵌模式下显示的文本。</p>

            <div class="desc">
                通过属性 <b>inset-on-text</b>，<b>inset-off-text</b> 来设置开启、关闭的文本，建议不要超过2个字符长度。
            </div>

            <div class="demo-switch">
                <f-switch
                    v-model:value="flag5"
                    inset
                    inset-on-text="开"
                    inset-off-text="关"
                />

                <f-switch
                    v-model:value="flag5"
                    inset
                    inset-on-text="on"
                    inset-off-text="off"
                />
            </div>

            <div class="demo-switch">
                <f-switch
                    v-model:value="flag5"
                    inset
                    size="large"
                    inset-on-text="开启"
                    inset-off-text="关闭"
                />

                <f-switch
                    v-model:value="flag5"
                    inset
                    size="large"
                    inset-on-text="开启"
                    inset-off-text="关闭"
                    active-color="#00e676"
                    inactive-color="#e53935"
                    :inset-text-style="{
                        fontSize: '12px',
                        color: '#000'
                    }"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-switch
        v-model:value="flag"
        inset
        inset-on-text="开"
        inset-off-text="关"
    ></f-switch>

    <f-switch
        v-model:value="flag"
        inset
        inset-on-text="on"
        inset-off-text="off"
    ></f-switch>

    <f-switch
        v-model:value="flag"
        inset
        size="large"
        inset-on-text="开启"
        inset-off-text="关闭"
    ></f-switch>

    <f-switch
        v-model:value="flag"
        inset
        size="large"
        inset-on-text="开启"
        inset-off-text="关闭"
        active-color="#00e676"
        inactive-color="#e53935"
        :inset-text-style="{
            fontSize: '12px',
            color: '#000'
        }"
    ></f-switch>


    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'
    export default defineComponent({
        setup () {
            const flag = ref(true)
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
            <h3 id="chi_cun">尺寸
                <a href="#nei_qian" class="f-icon-anchor"></a>
            </h3>
            <p>开关拥有三种不同的大小。</p>

            <div class="desc">
                配置属性 <b>size</b> 来控制开关的大小。
            </div>

            <div class="demo-switch">
                <f-switch v-model:value="flag4" size="small"></f-switch>
                <f-switch v-model:value="flag4" size="default"></f-switch>
                <f-switch v-model:value="flag4" size="large"></f-switch>
            </div>

            <div class="demo-switch">
                <f-switch v-model:value="flag4" inset size="small"></f-switch>
                <f-switch v-model:value="flag4" inset size="default"></f-switch>
                <f-switch v-model:value="flag4" inset size="large"></f-switch>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div class="demo-switch">
        <f-switch v-model:value="flag" size="small"></f-switch>
        <f-switch v-model:value="flag" size="default"></f-switch>
        <f-switch v-model:value="flag" size="large"></f-switch>
    </div>

    <div class="demo-switch">
        <f-switch v-model:value="flag" inset size="small"></f-switch>
        <f-switch v-model:value="flag" inset size="default"></f-switch>
        <f-switch v-model:value="flag" inset size="large"></f-switch>
    </div>


    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'
    export default defineComponent({
        setup () {
            const flag = ref(true)
            return {
                flag
            }
        }
    })
    </script>


    <style lang="scss">
    .demo-switch{
        margin: 30px 0;
        .f-switch-box + .f-switch-box{
            margin-left: 30px;
        }
    }
    </style>`}}
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

import FSwitch from '/@/views/packages/switch/Switch.vue'
import FButton from '/@/views/packages/button/Button.vue'

export default defineComponent({
    components: {
        FSwitch,
        FButton
    },
    setup () {
        const flag = ref(true)
        const flag2 = ref(true)
        const flag3 = ref(true)
        const flag4 = ref(true)
        const flag5 = ref(true)
        const disabled = ref(true)
        const loading = ref(true)
        setTimeout(() => {
            disabled.value = false
        }, 2000)

        const closeLoading = () => {
            setTimeout(() => {
                loading.value = false
            }, 3000)
        }
        return {
            flag,
            flag2,
            flag3,
            flag4,
            flag5,
            disabled,
            loading,
            closeLoading,
        }
    }
})
</script>

<style scoped lang="scss">
.demo-switch{
    margin: 30px 0;
    .f-switch-box + .f-switch-box{
        margin-left: 30px;
    }
}
</style>
