<template>
    <div class="tag">
        <h2>Tag 标签</h2>
        <p>常用于标记事物或特写标注。</p>

        <div>
            <h3>基本用法</h3>
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
            <h3>尺寸</h3>
            <p>标签的不同尺寸。</p>

            <MnTag size="mini">迷你（mini）</MnTag>
            <MnTag size="small">小号（small）</MnTag>
            <MnTag size="normal">正常（normal）</MnTag>
            <MnTag size="large">大号（lager）</MnTag>
            <div v-highlight>
                <pre><code>
    {{` <f-tag size="mini">迷你（mini）</f-tag>
     <f-tag size="small">小号（small）</f-tag>
     <f-tag size="normal">正常（normal）</f-tag>
     <f-tag size="lager">大号（lager）</f-tag>`}}
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

import MnTag from '../components/Tag.vue'

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
