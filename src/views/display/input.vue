<template>
    <div class="input">
        <h2>Input 输入框</h2>
        <p>表单中常用的文本输入。</p>

        <div>
            <h3 id="ji_ben_yong_fa">
                基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>表单中的常见用法。</p>


            <div class="demo-input demo-input-width">
                <f-input v-model:value="ipt" placeholder="请输入内容..."></f-input>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-input v-model:value="ipt" placeholder="请输入内容..."></f-input>


    <script lang="ts">
        import {
            defineComponent,
            ref
        } from 'vue'

        export default defineComponent({
            setup () {
                const ipt = ref('')
                return{
                    ipt
                }
            }
        })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ke_qing_kong">可清空内容
                <a href="#ke_qing_kong" class="f-icon-anchor"></a>
            </h3>
            <p>为input添加一个清空按钮，清空内容同时向外部触发 clear 事件。</p>

            <div class="demo-input demo-input-width">
                <div class="desc">只有当输入框内有值才会触发clear事件: {{emitClearNum}}</div>
                <f-input clearable v-model:value="ipt2" @clear="clear"></f-input>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>触发clear事件: \{\{emitClearNum\}\}</p>
    <f-input clearable v-model:value="ipt2" @clear="clear"></f-input>


    <script lang="ts">
        import {
            defineComponent,
            ref
        } from 'vue'

        export default defineComponent({
            setup () {
                const ipt2 = ref('')
                const emitClearNum = ref(0)
                const clear = () => {
                    emitClearNum.value += 1
                }
                return{
                    ipt2,
                    clear,
                    emitClearNum
                }
            }
        })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="cha_cao">输入框插槽
                <a href="#cha_cao" class="f-icon-anchor"></a>
            </h3>
            <p>文本输入框可以有前、后两个插槽。</p>
            <div class="desc">slot：<b>prefix</b> 与 <b>push</b> 只有在 <b>type !== 'textarea'</b> 时生效！</div>

            <div class="demo-input demo-input-width">
                <f-input>
                    <template #prefix>
                        <i class="f-icon-user-filing"></i>
                    </template>
                </f-input>
            </div>

            <div class="demo-input demo-input-width">
                <f-input>
                    <template #push>
                        <f-button icon="f-icon-search"></f-button>
                    </template>
                </f-input>
            </div>

            <div class="demo-input demo-input-width">
                <f-input>
                    <template #prefix>
                        <span>www.</span>
                    </template>
                    <template #push>
                        <span>.com</span>
                    </template>
                </f-input>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-input placeholder="请输内容...">
        <template #prefix>
            <i class="f-icon-user-filing"></i>
        </template>
    </f-input>

    <f-input placeholder="请输内容...">
        <template #push>
            <f-button icon="f-icon-search"></f-button>
        </template>
    </f-input>

    <f-input placeholder="请输内容...">
        <template #prefix>
            <span>www.</span>
        </template>
        <template #push>
            <span>.com</span>
        </template>
    </f-input>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="xian_zhi_chang_du">限制长度
                <a href="#xian_zhi_chang_du" class="f-icon-anchor"></a>
            </h3>
            <p>用于限制输入框内容的长度。</p>
            <div class="desc">
                通过原生属性 <b>maxlength</b> 来限制输入长度，如果要显示限制标签，可以再设置一个属性 <b>show-limit</b>。
            </div>

            <div class="demo-input demo-input-width">
                <f-input :maxlength="15"></f-input>
            </div>

            <div class="demo-input demo-input-width">
                <f-input :maxlength="15" show-limit v-model:value="ipt3"></f-input>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-input :maxlength="15"></f-input>

    <f-input :maxlength="15" show-limit></f-input>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jin_yong">禁用输入框
                <a href="#jin_yong" class="f-icon-anchor"></a>
            </h3>
            <p>添加禁用的样式。</p>

            <div class="demo-input demo-input-width">
                <f-input disabled clearable></f-input>
            </div>

            <div class="demo-input demo-input-width">
                <f-input disabled>
                    <template #prefix>
                        <span>www.</span>
                    </template>
                </f-input>
            </div>

            <div class="demo-input demo-input-width">
                <f-input disabled>
                    <template #push>
                        <f-button icon="f-icon-search"></f-button>
                    </template>
                </f-input>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-input disabled clearable></f-input>

    <f-input disabled>
        <template #prefix>
            <span>www.</span>
        </template>
    </f-input>

    <f-input disabled>
        <template #push>
            <f-button icon="f-icon-search"></f-button>
        </template>
    </f-input>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zhi_du">只读
                <a href="#zhi_du" class="f-icon-anchor"></a>
            </h3>
            <p>不会添加禁用样式，他看起来和普通输入框一致。</p>

            <div class="demo-input demo-input-width">
                <f-input readonly clearable v-model:value="readonly"></f-input>
            </div>

            <div class="demo-input demo-input-width">
                <f-input readonly v-model:value="readonly">
                    <template #prefix>
                        <span>www.</span>
                    </template>
                </f-input>
            </div>


            <div v-highlight>
                <pre><code>
    {{`<f-input
        readonly
        clearable
        v-model:value="readonly"
    ></f-input>

    <f-input
        readonly
        v-model:value="readonly"
    >
        <template #prefix>
            <span>www.</span>
        </template>
    </f-input>


    <script lang="ts">
        import {
            defineComponent,
            ref
        } from 'vue'
        export default defineComponent({
            setup () {
                const readonly = ref('当前只读')
                return{
                    readonly
                }
            }
        })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="mi_ma">密码输入框
                <a href="#mi_ma" class="f-icon-anchor"></a>
            </h3>

            <div class="desc">
                可以通过设置属性 <b>show-pass</b> 来展示一个可以切换可见输入值的按钮。
            </div>

            <div class="demo-input demo-input-width">
                <f-input type="password" placeholder="请输入密码"></f-input>
            </div>

            <div class="demo-input demo-input-width">
                <f-input type="password" show-pass placeholder="请输入密码"></f-input>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-input type="password" placeholder="请输入密码"></f-input>

    <f-input type="password" show-pass placeholder="请输入密码"></f-input>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="wen_ben_yu">文本域
                <a href="#wen_ben_yu" class="f-icon-anchor"></a>
            </h3>
            <p>用于多行文本输入。</p>

            <div class="desc">
                原生属性 <b>rows</b> 可设置行数。
            </div>
            <div class="demo-input demo-input-width">
                <f-input type="textarea"></f-input>
            </div>

            <div class="demo-input demo-input-width">
                <f-input type="textarea" :rows="5"></f-input>
            </div>

            <div class="demo-input demo-input-width">
                <f-input
                    type="textarea"
                    :rows="10"
                    :maxlength="120"
                    show-limit
                ></f-input>
            </div>
            <p>禁用。</p>
            <div class="demo-input demo-input-width">
                <f-input
                    type="textarea"
                    :rows="10"
                    :maxlength="120"
                    show-limit
                    disabled
                ></f-input>
            </div>

            <p>只读。</p>
            <div class="demo-input demo-input-width">
                <f-input
                    type="textarea"
                    :rows="10"
                    :maxlength="120"
                    show-limit
                    readonly
                    v-model:value="readonly"
                ></f-input>
            </div>

            <p>不可拖拽修改大小。</p>

            <div class="demo-input demo-input-width">
                <f-input type="textarea" :rows="10" resize="none"></f-input>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-input type="textarea"></f-input>

    <f-input type="textarea" :rows="5"></f-input>

    <f-input
        type="textarea"
        :rows="10"
        :maxlength="120"
        show-limit
    ></f-input>

    <f-input
        type="textarea"
        :rows="10"
        :maxlength="120"
        show-limit
        disabled
    ></f-input>

    <f-input
        type="textarea"
        :rows="10"
        :maxlength="120"
        show-limit
        readonly
        v-model:value="readonly"
    ></f-input>

    <f-input type="textarea" :rows="10" resize="none"></f-input>


    <script lang="ts">
        import {
            defineComponent,
            ref
        } from 'vue'
        export default defineComponent({
            setup () {
                const readonly = ref('当前只读')
                return{
                    readonly
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
import FInput from '/@/views/packages/input/Input.vue'
import FButton from '/@/views/packages/button/Button.vue'
export default defineComponent({
    components: {
        FInput,
        FButton,
    },
    setup () {
        const ipt = ref('')
        const ipt2 = ref('')
        const ipt3 = ref('')
        const readonly = ref('当前只读')
        const emitClearNum = ref(0)
        const clear = () => {
            emitClearNum.value += 1
        }
        return{
            ipt,
            ipt2,
            ipt3,
            clear,
            readonly,
            emitClearNum
        }
    }
})
</script>

<style scoped lang="scss">
.demo-input{
    margin-bottom: 30px;
    &:last-child{
        margin-bottom: 0;
    }
}
.demo-input-width{
    width: 360px;
}
</style>
