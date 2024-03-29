<template>
    <div class="button">
        <h2>Button 按钮</h2>
        <p>网页中经常使用到的按钮。</p>

        <div class="demo-button">
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>常见的一些按钮样式。</p>
            <div class="row">
                <MnButton>默认样式（default）</MnButton>
                <MnButton type="primary">主题（primary）</MnButton>
                <MnButton type="success">成功（success）</MnButton>
                <MnButton type="warning">警告（warning）</MnButton>
            </div>
            <div class="row">
                <MnButton type="danger">危险（danger）</MnButton>
                <MnButton type="info">一般消息（info）</MnButton>
            </div>

            <div class="desc">
                设置属性 <b>icon</b> 即可让按钮带有图标
            </div>

            <div>
                <MnButton icon="f-icon-clock" type="primary" size="large"></MnButton>
                <MnButton icon="f-icon-setup_fill" type="danger" rounded></MnButton>
                <MnButton icon="f-icon-search" type="warning" disabled></MnButton>
                <MnButton icon="f-icon-arrow-right-bold" type="success" size="small"></MnButton>
                <MnButton icon="f-icon-copy" size="mini"></MnButton>
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-button>默认样式（default）</f-button>
    <f-button type="primary">主题（primary）</f-button>
    <f-button type="success">成功（success）</f-button>
    <f-button type="warning">警告（warning）</f-button>
    <f-button type="danger">危险（danger）</f-button>
    <f-button type="info">一般消息（info）</f-button>

    <f-button icon="f-icon-clock" type="primary" size="large"></f-button>
    <f-button icon="f-icon-setup_fill" type="danger" rounded></f-button>
    <f-button icon="f-icon-search" type="warning" disabled></f-button>
    <f-button icon="f-icon-arrow-right-bold" type="success" size="small"></f-button>
    <f-button icon="f-icon-copy" size="mini"></f-button>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="you_ling_an_niu">幽灵按钮
                <a href="#you_ling_an_niu" class="f-icon-anchor"></a>
            </h3>
            <p>背景镂空的样式。</p>
            <div class="row">
                <MnButton type="primary" outline>主题（primary）</MnButton>
                <MnButton type="success" outline>成功（success）</MnButton>
                <MnButton type="warning" outline>警告（warning）</MnButton>
                <MnButton type="danger" outline>危险（danger）</MnButton>
            </div>
            <div class="row">
                <MnButton type="info" outline>一般消息（info）</MnButton>
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-button type="primary" outline>主题（primary）</f-button>
    <f-button type="success" outline>成功（success）</f-button>
    <f-button type="warning" outline>警告（warning）</f-button>
    <f-button type="danger" outline>危险（danger）</f-button>
    <f-button type="info" outline>一般消息（info）</f-button>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="yuan_jiao">按钮圆角
                <a href="#yuan_jiao" class="f-icon-anchor"></a>
            </h3>
            <p>为按钮添加一个圆角。</p>
            <div class="row">
                <MnButton rounded>默认样式（default）</MnButton>
                <MnButton type="primary" rounded>主题（primary）</MnButton>
                <MnButton type="success" rounded>成功（success）</MnButton>
                <MnButton type="warning" rounded>警告（warning）</MnButton>
            </div>
            <div class="row">
                <MnButton type="danger" rounded>危险（danger）</MnButton>
                <MnButton type="info" rounded>一般消息（info）</MnButton>
            </div>
            <div v-highlight>
                <pre><code>
    {{` <f-button rounded>默认样式（default）</f-button>
     <f-button type="primary" rounded>主题（primary）</f-button>
     <f-button type="success" rounded>成功（success）</f-button>
     <f-button type="warning" rounded>警告（warning）</f-button>
     <f-button type="danger" rounded>危险（danger）</f-button>
     <f-button type="info" rounded>一般消息（info）</f-button>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jin_yong">禁用按钮
                <a href="#jin_yong" class="f-icon-anchor"></a>
            </h3>
            <p>为按钮添加disable属性变为不可用状态。</p>
            <div class="row">
                <MnButton disabled>默认样式（default）</MnButton>
                <MnButton type="primary" disabled>主题（primary）</MnButton>
                <MnButton type="success" disabled>成功（success）</MnButton>
                <MnButton type="warning" disabled>警告（warning）</MnButton>
            </div>
            <div class="row">
                <MnButton type="danger" disabled>危险（danger）</MnButton>
                <MnButton type="info" disabled>一般消息（info）</MnButton>
            </div>
            <div v-highlight>
                <pre><code>
    {{` <f-button disabled>默认样式（default）</f-button>
     <f-button type="primary" disabled>主题（primary）</f-button>
     <f-button type="success" disabled>成功（success）</f-button>
     <f-button type="warning" disabled>警告（warning）</f-button>
     <f-button type="danger" disabled>危险（danger）</f-button>
     <f-button type="info" disabled>一般消息（info）</f-button>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="wen_ben">文本按钮
                <a href="#wen_ben" class="f-icon-anchor"></a>
            </h3>
            <p>没有边框的按钮。</p>
            <MnButton type="text">文本样式（text）</MnButton>
            <MnButton type="text" disabled>文本禁用（text）</MnButton>

            <div v-highlight>
               <pre><code>
    {{` <f-button type="text">文本样式（text）</f-button>
     <f-button type="text" disabled>文本禁用（text）</f-button>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chi_cun">尺寸
                <a href="#chi_cun" class="f-icon-anchor"></a>
            </h3>
            <p>不同的按钮尺寸。</p>
            <div class="row">
                <MnButton size="mini">迷你（mini）</MnButton>
                <MnButton size="small">小号（small）</MnButton>
                <MnButton size="normal">正常（normal）</MnButton>
                <MnButton size="large">大号（large）</MnButton>
            </div>
            <div v-highlight>
                <pre><code>
    {{` <f-button size="mini">迷你（mini）</f-button>
     <f-button size="small">小号（small）</f-button>
     <f-button size="normal">正常（normal）</f-button>
     <f-button size="large">大号（large）</f-button>`}}
                </code></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive
} from 'vue'
import MnButton from '/@/views/packages/button/Button.vue'

export default defineComponent( {
    components: {
        MnButton
    },
    setup () {
        return {
        }
    }
})
</script>

<style scoped lang="scss">
.row{
    margin-bottom: 15px;
}
.button{
    .f-btn + .f-btn{
        margin-left: 15px;
    }
}


</style>
