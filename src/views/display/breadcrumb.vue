<template>
    <div class="breadcrumb">
        <h2>Breadcrumb 面包屑</h2>
        <p>用于凸显当前页面所在的导航路径。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>基础用法示例。</p>

            <div class="demo-breadcrumb">
                <f-breadcrumb>
                    <f-breadcrumb-item>Fast-Ui</f-breadcrumb-item>
                    <f-breadcrumb-item>Doc</f-breadcrumb-item>
                    <f-breadcrumb-item>breadcrumb</f-breadcrumb-item>
                </f-breadcrumb>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-breadcrumb>
        <f-breadcrumb-item>Fast-Ui</f-breadcrumb-item>
        <f-breadcrumb-item>Doc</f-breadcrumb-item>
        <f-breadcrumb-item>breadcrumb</f-breadcrumb-item>
    </f-breadcrumb>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="fen_ge_fu_hao">分隔符号
                <a href="#fen_ge_fu_hao" class="f-icon-anchor"></a>
            </h3>
            <p>可以自定义分隔符图标。</p>

            <div class="desc">
                通过配置属性 <b>separator</b> 来设置分隔符。
            </div>

            <div class="demo-breadcrumb">
                <f-breadcrumb separator=">">
                    <f-breadcrumb-item>Fast-Ui</f-breadcrumb-item>
                    <f-breadcrumb-item>Doc</f-breadcrumb-item>
                    <f-breadcrumb-item>breadcrumb</f-breadcrumb-item>
                </f-breadcrumb>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-breadcrumb separator=">">
        <f-breadcrumb-item>Fast-Ui</f-breadcrumb-item>
        <f-breadcrumb-item>Doc</f-breadcrumb-item>
        <f-breadcrumb-item>breadcrumb</f-breadcrumb-item>
    </f-breadcrumb>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="dao_hang_tiao_zhuan">导航跳转
                <a href="#dao_hang_tiao_zhuan" class="f-icon-anchor"></a>
            </h3>
            <p>给予面包屑导航跳转功能。</p>

            <div class="desc">
                通过给 <b>f-breadcrumb-item</b> 配置属性 <b>to</b> 来设置分隔符。
            </div>
            <div class="desc">
                <b>to</b> 的值类型必须与 vue-router 的 to（<a href="https://router.vuejs.org/zh/api/#to" target="_blank" style="font-size: 14px">详见 vue-router</a>）。
            </div>

            <div class="demo-breadcrumb">
                <f-breadcrumb separator=">">
                    <f-breadcrumb-item :to="{path: '/'}">Fast-Ui</f-breadcrumb-item>
                    <f-breadcrumb-item>Doc</f-breadcrumb-item>
                    <f-breadcrumb-item>breadcrumb</f-breadcrumb-item>
                </f-breadcrumb>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-breadcrumb separator=">">
        <f-breadcrumb-item>Fast-Ui</f-breadcrumb-item>
        <f-breadcrumb-item>Doc</f-breadcrumb-item>
        <f-breadcrumb-item>breadcrumb</f-breadcrumb-item>
    </f-breadcrumb>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="tiao_zhuan_fang_shi">跳转方式
                <a href="#tiao_zhuan_fang_shi" class="f-icon-anchor"></a>
            </h3>

            <div class="desc">
                通过给 <b>f-breadcrumb-item</b> 配置属性 <b>replace</b> 来设置跳转方式（同 vue-router 中的router.replace）。
            </div>

            <div class="demo-breadcrumb">
                <f-breadcrumb>
                    <f-breadcrumb-item :to="{path: '/'}" replace>Fast-Ui</f-breadcrumb-item>
                    <f-breadcrumb-item>Doc</f-breadcrumb-item>
                    <f-breadcrumb-item>breadcrumb</f-breadcrumb-item>
                </f-breadcrumb>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-breadcrumb separator=">">
        <f-breadcrumb-item :to="{path: '/'}" replace>Fast-Ui</f-breadcrumb-item>
        <f-breadcrumb-item>Doc</f-breadcrumb-item>
        <f-breadcrumb-item>breadcrumb</f-breadcrumb-item>
    </f-breadcrumb>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chi_cun">尺寸
                <a href="#chi_cun" class="f-icon-anchor"></a>
            </h3>
            <p>面包屑导航中的字体大小。</p>
            <div class="desc">
                通过给 <b>f-breadcrumb</b> 配置属性 <b>font-size</b> 来设置字体大小，默认值为14。
            </div>

            <div class="demo-breadcrumb">
                <f-breadcrumb :font-size="20">
                    <f-breadcrumb-item>Fast-Ui</f-breadcrumb-item>
                    <f-breadcrumb-item>Doc</f-breadcrumb-item>
                    <f-breadcrumb-item>breadcrumb</f-breadcrumb-item>
                </f-breadcrumb>
            </div>
            <br>
            <div class="demo-breadcrumb">
                <f-breadcrumb :font-size="24">
                    <f-breadcrumb-item>Fast-Ui</f-breadcrumb-item>
                    <f-breadcrumb-item>Doc</f-breadcrumb-item>
                    <f-breadcrumb-item>breadcrumb</f-breadcrumb-item>
                </f-breadcrumb>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-breadcrumb :font-size="20">
        <f-breadcrumb-item>Fast-Ui</f-breadcrumb-item>
        <f-breadcrumb-item>Doc</f-breadcrumb-item>
        <f-breadcrumb-item>breadcrumb</f-breadcrumb-item>
    </f-breadcrumb>

    <f-breadcrumb :font-size="24">
        <f-breadcrumb-item>Fast-Ui</f-breadcrumb-item>
        <f-breadcrumb-item>Doc</f-breadcrumb-item>
        <f-breadcrumb-item>breadcrumb</f-breadcrumb-item>
    </f-breadcrumb>`}}
                </code></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'

import FBreadcrumb from '/@/views/packages/breadcrumb/Breadcrumb.vue'
import FBreadcrumbItem from '/@/views/packages/breadcrumb/Breadcrumb-item.vue'
export default defineComponent({
    components: {
        FBreadcrumb,
        FBreadcrumbItem
    },
    setup () {

    }
})
</script>

<style scoped lang="scss">
.demo-breadcrumb{
    border: 1px solid #eee;
}
</style>
