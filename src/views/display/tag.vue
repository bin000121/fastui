<template>
    <div class="tag">
        <h2>Tag 标签</h2>
        <p>常用于标记事物或特写标注。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>基础样式。</p>

            <MnTag>default</MnTag>
            <MnTag type="primary">primary</MnTag>
            <MnTag type="success">success</MnTag>
            <MnTag type="warning">warning</MnTag>
            <MnTag type="danger">danger</MnTag>
            <MnTag type="info">info</MnTag>
            <MnTag type="black">black</MnTag>
            <div v-highlight>
                <pre><code>
    {{` <f-tag>default</f-tag>
     <f-tag type="primary">primary</f-tag>
     <f-tag type="success">success</f-tag>
     <f-tag type="warning">warning</f-tag>
     <f-tag type="danger">danger</f-tag>
     <f-tag type="info">info</f-tag>
     <f-tag type="black">black</f-tag>`}}
                </code></pre>
            </div>
     </div>

        <div>
            <h3 id="you_ling_yang_shi">幽灵样式
                <a href="#you_ling_yang_shi" class="f-icon-anchor"></a>
            </h3>
            <p>为标签添加背景镂空的样式。</p>

            <div>
                <MnTag outline>default</MnTag>
                <MnTag type="primary" outline>primary</MnTag>
                <MnTag type="success" outline>success</MnTag>
                <MnTag type="warning" outline>warning</MnTag>
                <MnTag type="danger" outline>danger</MnTag>
                <MnTag type="info" outline>info</MnTag>
                <MnTag type="black" outline>black</MnTag>
            </div>

            <div v-highlight>
                <pre><code>
    {{` <f-tag outline>default</f-tag>
     <f-tag type="primary" outline>primary</f-tag>
     <f-tag type="success" outline>success</f-tag>
     <f-tag type="warning" outline>warning</f-tag>
     <f-tag type="danger" outline>danger</f-tag>
     <f-tag type="info" outline>info</f-tag>
     <f-tag type="black" outline>black</f-tag>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ke_guan_bi">可关闭
                <a href="#ke_guan_bi" class="f-icon-anchor"></a>
            </h3>
            <p>点击关闭按钮后，标签会消失，同时删除其dom。</p>

            <div>
                <MnTag closeable>default</MnTag>
                <MnTag type="primary" closeable>primary</MnTag>
                <MnTag type="success" closeable>success</MnTag>
                <MnTag type="warning" closeable>warning</MnTag>
                <MnTag type="danger" closeable>danger</MnTag>
                <MnTag type="info" closeable>info</MnTag>
                <MnTag type="black" closeable>black</MnTag>
            </div>

            <div v-highlight>
                <pre><code>
    {{` <f-tag type="default" outline>default</f-tag>
     <f-tag type="primary" outline>primary</f-tag>
     <f-tag type="success" outline>success</f-tag>
     <f-tag type="warning" outline>warning</f-tag>
     <f-tag type="danger" outline>danger</f-tag>
     <f-tag type="info" outline>info</f-tag>
     <f-tag type="black" outline>black</f-tag>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chi_cun">尺寸
                <a href="#chi_cun" class="f-icon-anchor"></a>
            </h3>
            <p>标签的不同尺寸。</p>

            <MnTag size="small">小号（small）</MnTag>
            <MnTag size="default">正常（default）</MnTag>
            <MnTag size="large">大号（lager）</MnTag>
            <div v-highlight>
                <pre><code>
    {{`<f-tag size="small">小号（small）</f-tag>
    <f-tag size="normal">正常（default）</f-tag>
    <f-tag size="large">大号（lager）</f-tag>`}}
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

import MnTag from '/@/views/packages/tag/Tag.vue'

export default defineComponent({
    components: {
        MnTag
    },
    setup () {

    }
})
</script>

<style scoped>

</style>
