<template>
    <div class="select">
        <h2>Select 下拉框</h2>
        <p>表单中常用的选择组件。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>基本用法</p>

            <div class="demo-select">
                <f-select>
                    <f-option label="111" value="222"></f-option>
                    <f-option label="222" value="222"></f-option>
                    <f-option label="333" value="333"></f-option>
                    <f-option label="444" value="444"></f-option>
                </f-select>
            </div>

            <div class="demo-select">
                <f-select>
                    <f-option label="111" value="222"></f-option>
                    <f-option label="222" value="222"></f-option>
                    <f-option label="333" value="333"></f-option>
                    <f-option label="444" value="444"></f-option>
                </f-select>
            </div>
            <div class="demo-select">
                <f-select>
                    <f-option label="111" value="222"></f-option>
                    <f-option label="222" value="222"></f-option>
                    <f-option label="333" value="333"></f-option>
                    <f-option label="444" value="444"></f-option>
                </f-select>
            </div>
        </div>

        <div>
            <h3 id="zhi_du">只读
                <a href="#zhi_du" class="f-icon-anchor"></a>
            </h3>
            <p>下拉框无法与您进行交互，他看起来和正常的模样一致。</p>

            <div class="demo-select">
                <f-select readonly>
                    <f-option label="111" value="222"></f-option>
                    <f-option label="222" value="222"></f-option>
                    <f-option label="333" value="333"></f-option>
                </f-select>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-select readonly>
        <f-option label="111" value="222"></f-option>
        <f-option label="222" value="222"></f-option>
        <f-option label="333" value="333"></f-option>
    </f-select>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jin_yong">禁用
                <a href="#jin_yong" class="f-icon-anchor"></a>
            </h3>
            <p>下拉框无法与您进行交互，并添加禁用样式。</p>

            <div class="demo-select">
                <f-select disabled>
                    <f-option label="111" value="222"></f-option>
                    <f-option label="222" value="222"></f-option>
                    <f-option label="333" value="333"></f-option>
                </f-select>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-select disabled>
        <f-option label="111" value="222"></f-option>
        <f-option label="222" value="222"></f-option>
        <f-option label="333" value="333"></f-option>
    </f-select>`}}
                </code></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted
} from 'vue'
import FSelect from '/@/views/components/select/Select.vue'
import FOption from '/@/views/components/select/Select-option.vue'

export default defineComponent({
    components: {
        FSelect,
        FOption
    },
    setup () {
        const select = ref('')
        return {
            select
        }
    }
})
</script>

<style scoped lang="scss">
.demo-select{
    margin-bottom: 30px;
    &:last-child{
        margin-bottom: 0;
    }
    .f-select{
        width: 200px;
    }
}
</style>
