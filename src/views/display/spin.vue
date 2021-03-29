<template>
    <div class="loading">
        <h2>Spin 加载中</h2>
        <p></p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>常见的用法，一个简单的loading效果。</p>

            <div>
                <f-spin></f-spin>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-spin></f-spin>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="yang_shi">样式
                <a href="#yang_shi" class="f-icon-anchor"></a>
            </h3>
            <p>spin拥有3种不同的样式，分别是默认、圆环、雪花。</p>

            <div class="demo-spin">
                <f-spin type="default"></f-spin>
                <f-spin type="ring"></f-spin>
                <f-spin type="snowflake"></f-spin>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-spin type="default"></f-spin>

    <f-spin type="ring"></f-spin>

    <f-spin type="snowflake"></f-spin>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="da_xiao_kuan_du_se_cai">大小、宽度、色彩
                <a href="#da_xiao_kuan_du_se_cai" class="f-icon-anchor"></a>
            </h3>
            <p>可以自定义spin的宽度和线条的粗细、颜色。</p>

            <div class="demo-spin">
                <f-spin :size="50" :width="2" color="#3cd0be"></f-spin>

                <f-spin :size="70" :width="4" color="skyblue" type="ring"></f-spin>

                <f-spin :size="90" :width="6" color="yellow"></f-spin>

                <f-spin :size="70" :width="8" color="#f00" type="snowflake"></f-spin>

                <f-spin :size="50" :width="10" color="purple"></f-spin>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-spin :size="50" :width="2" color="#3cd0be"></f-spin>

    <f-spin :size="70" :width="4" color="skyblue" type="ring"></f-spin>

    <f-spin :size="90" :width="6" color="yellow"></f-spin>

    <f-spin :size="70" :width="8" color="#f00" type="snowflake"></f-spin>

    <f-spin :size="50" :width="10" color="purple"></f-spin>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ti_shi_wen_zi">提示文字
                <a href="#ti_shi_wen_zi" class="f-icon-anchor"></a>
            </h3>
            <p>加载动画下的一排自定义文字。</p>

            <div class="demo-spin">
                <f-spin tip="正在拼命加载..."></f-spin>
                <f-spin type="ring" tip="加载中..." :tip-style="{ color: '#333' }"></f-spin>
                <f-spin tip="资源正在路上..." :tip-style="{ fontSize: '12px' }"></f-spin>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-spin tip="正在拼命加载..."></f-spin>

    <f-spin type="ring" tip="加载中..." :tip-style="{ color: '#333' }"></f-spin>

    <f-spin tip="资源正在路上..." :tip-style="{ fontSize: '12px' }"></f-spin>`}}
                </code></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs
} from 'vue'
import FSpin from '/@/views/packages/spin/Spin.vue'

export default defineComponent({
    components: {
        FSpin
    },
    setup () {

    }
})
</script>

<style scoped lang="scss">
.demo-spin{
    .f-spin + .f-spin {
        margin-left: 60px;
    }
}
</style>
