<template>
    <div class="radio">
        <h2>Radio 单选按钮</h2>
        <p>一组表单中常用的单选框，用于明确标识用户可以在哪几个选项中选择一项。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>当选项很多的时候不建议使用单选按钮。</p>

            <div class="demo-radio">
                <p>选中值：{{radio}}</p>
                <f-radio v-model:value="radio" label="iphoneX">iphoneX</f-radio>
                <f-radio v-model:value="radio" label="iphone11">iphone11</f-radio>
                <f-radio v-model:value="radio" label="iphone12">iphone12</f-radio>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>选中值：\{\{radio\}\}</p>

    <f-radio v-model:value="radio" label="iphoneX">iphoneX</f-radio>
    <f-radio v-model:value="radio" label="iphone11">iphone11</f-radio>
    <f-radio v-model:value="radio" label="iphone12">iphone12</f-radio>


    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'

    export default defineComponent({
        setup () {
            const radio = ref('')
            return{
                radio
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
            <p>为单选按钮添加禁用样式，您不可以与之交互。</p>

            <div>
                <div class="demo-radio">
                    <p>选中值：{{radio2}}</p>
                    <f-radio v-model:value="radio2" label="iphoneX" disabled>iphoneX</f-radio>
                    <f-radio v-model:value="radio2" label="iphone11">iphone11</f-radio>
                    <f-radio v-model:value="radio2" label="iphone12">iphone12</f-radio>
                </div>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>选中值：\{\{radio\}\}</p>

    <f-radio v-model:value="radio" label="iphoneX" disabled>iphoneX</f-radio>
    <f-radio v-model:value="radio" label="iphone11">iphone11</f-radio>
    <f-radio v-model:value="radio" label="iphone12">iphone12</f-radio>


    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'

    export default defineComponent({
        setup () {
            const radio = ref('iphoneX')
            return{
                radio
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="bian_kuang">带边框
                <a href="#bian_kuang" class="f-icon-anchor"></a>
            </h3>
            <p>为单选按钮添加上border样式。</p>

            <div class="demo-radio">
                <p>选中值：{{radio3}}</p>
                <f-radio v-model:value="radio3" label="iphoneX" border disabled>iphoneX</f-radio>
                <f-radio v-model:value="radio3" label="iphone11" border>iphone11</f-radio>
                <f-radio v-model:value="radio3" label="iphone12" border>iphone12</f-radio>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>选中值：\{\{radio\}\}</p>

    <f-radio v-model:value="radio" label="iphoneX" disabled>iphoneX</f-radio>
    <f-radio v-model:value="radio" label="iphone11">iphone11</f-radio>
    <f-radio v-model:value="radio" label="iphone12">iphone12</f-radio>


    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'

    export default defineComponent({
        setup () {
            const radio = ref('iphoneX')
            return{
                radio
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chi_cun">尺寸
                <a href="#chi_cun" class="f-icon-anchor"></a>
            </h3>
            <p>默认尺寸为 default</p>

            <div class="demo-radio">
                <p>选中值：{{radio4}}</p>
                <f-radio v-model:value="radio4" label="iphoneX" border size="small">iphoneX</f-radio>
                <f-radio v-model:value="radio4" label="iphone11" border size="small">iphone11</f-radio>
                <f-radio v-model:value="radio4" label="iphone12" border size="small">iphone12</f-radio>
            </div>

            <div class="demo-radio">
                <f-radio v-model:value="radio4" label="iphoneX"  border size="default">iphoneX</f-radio>
                <f-radio v-model:value="radio4" label="iphone11" border size="default">iphone11</f-radio>
                <f-radio v-model:value="radio4" label="iphone12" border size="default">iphone12</f-radio>
            </div>

            <div class="demo-radio">
                <f-radio v-model:value="radio4" label="iphoneX" border size="large">iphoneX</f-radio>
                <f-radio v-model:value="radio4" label="iphone11" border size="large">iphone11</f-radio>
                <f-radio v-model:value="radio4" label="iphone12" border size="large">iphone12</f-radio>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>选中值：\{\{radio\}\}</p>

    <f-radio v-model:value="radio" label="iphoneX" border size="small">iphoneX</f-radio>
    <f-radio v-model:value="radio" label="iphone11" border size="small">iphone11</f-radio>
    <f-radio v-model:value="radio" label="iphone12" border size="small">iphone12</f-radio>

    <f-radio v-model:value="radio" label="iphoneX"  border size="default">iphoneX</f-radio>
    <f-radio v-model:value="radio" label="iphone11" border size="default">iphone11</f-radio>
    <f-radio v-model:value="radio" label="iphone12" border size="default">iphone12</f-radio>

    <f-radio v-model:value="radio" label="iphoneX" border size="large">iphoneX</f-radio>
    <f-radio v-model:value="radio" label="iphone11" border size="large">iphone11</f-radio>
    <f-radio v-model:value="radio" label="iphone12" border size="large">iphone12</f-radio>



    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'

    export default defineComponent({
        setup () {
            const radio = ref('iphoneX')
            return{
                radio
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="dan_xuan_kuang_zu">单选框组
                <a href="#dan_xuan_kuang_zu" class="f-icon-anchor"></a>
            </h3>
            <p>当单选按钮比较多时，建议使用单选框组进行包裹。</p>

            <div class="demo-radio">
                <p>选中值：{{radio5}}</p>
                <f-radio-group
                    v-model:value="radio5"
                    size="small"
                    border
                >
                    <f-radio label="iphoneX">iphoneX</f-radio>
                    <f-radio label="iphone11">iphone11</f-radio>
                    <f-radio label="iphone12">iphone12</f-radio>
                </f-radio-group>
            </div>

            <div class="demo-radio">
                <f-radio-group
                    v-model:value="radio5"
                    border
                >
                    <f-radio label="iphoneX">iphoneX</f-radio>
                    <f-radio label="iphone11" disabled>iphone11</f-radio>
                    <f-radio label="iphone12">iphone12</f-radio>
                </f-radio-group>
            </div>

            <div class="demo-radio">
                <f-radio-group
                    v-model:value="radio5"
                    size="large"
                    border
                >
                    <f-radio label="iphoneX">iphoneX</f-radio>
                    <f-radio label="iphone11">iphone11</f-radio>
                    <f-radio label="iphone12">iphone12</f-radio>
                </f-radio-group>
            </div>

            <div class="demo-radio">
                <f-radio-group
                    v-model:value="radio5"
                    vertical
                >
                    <f-radio label="iphoneX">iphoneX</f-radio>
                    <f-radio label="iphone11">iphone11</f-radio>
                    <f-radio label="iphone12">iphone12</f-radio>
                </f-radio-group>
            </div>

            <div class="demo-radio">
                <f-radio-group
                    v-model:value="radio5"
                    border
                    vertical
                >
                    <f-radio label="iphoneX">iphoneX</f-radio>
                    <f-radio label="iphone11" disabled>iphone11</f-radio>
                    <f-radio label="iphone12">iphone12</f-radio>
                </f-radio-group>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>选中值：\{\{radio\}\}</p>

    <f-radio-group
        v-model:value="radio"
        size="small"
        border
    >
        <f-radio label="iphoneX">iphoneX</f-radio>
        <f-radio label="iphone11">iphone11</f-radio>
        <f-radio label="iphone12">iphone12</f-radio>
    </f-radio-group>

    <f-radio-group
        v-model:value="radio"
        border
    >
        <f-radio label="iphoneX">iphoneX</f-radio>
        <f-radio label="iphone11" disabled>iphone11</f-radio>
        <f-radio label="iphone12">iphone12</f-radio>
    </f-radio-group>

    <f-radio-group
        v-model:value="radio"
        size="large"
        border
    >
        <f-radio label="iphoneX">iphoneX</f-radio>
        <f-radio label="iphone11">iphone11</f-radio>
        <f-radio label="iphone12">iphone12</f-radio>
    </f-radio-group>

    <f-radio-group
        v-model:value="radio"
        vertical
    >
        <f-radio label="iphoneX">iphoneX</f-radio>
        <f-radio label="iphone11">iphone11</f-radio>
        <f-radio label="iphone12">iphone12</f-radio>
    </f-radio-group>

    <f-radio-group
        v-model:value="radio"
        border
        vertical
    >
        <f-radio label="iphoneX">iphoneX</f-radio>
        <f-radio label="iphone11" disabled>iphone11</f-radio>
        <f-radio label="iphone12">iphone12</f-radio>
    </f-radio-group>


    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'

    export default defineComponent({
        setup () {
            const radio = ref('iphoneX')
            return{
                radio
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
    ref
} from 'vue'
import FRadio from '/@/views/packages/radio/Radio.vue'
import FRadioGroup from '/@/views/packages/radio/Radio-group.vue'

export default defineComponent({
    components: {
        FRadio,
        FRadioGroup,
    },
    setup () {
        const radio = ref('')
        const radio2 = ref('iphoneX')
        const radio3 = ref('iphoneX')
        const radio4 = ref('iphoneX')
        const radio5 = ref('iphoneX')

        return{
            radio,
            radio2,
            radio3,
            radio4,
            radio5
        }
    }
})
</script>

<style scoped lang="scss">
.demo-radio{
    margin-bottom: 30px;
    &:last-child{
        margin-bottom: 0;
    }
    .f-radio-label + .f-radio-label{
        margin-left: 30px;
    }
    p{
        color: #999;
    }
}
</style>
