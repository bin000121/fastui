<template>
    <div class="toTop">
        <h2>ToTop 返回顶部</h2>
        <p>当页面过长时，通过鼠标滚动回到顶部比较困难，提供一个返回顶部的按钮。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>该元素会使用固定定位，请注意页面的右下角处。</p>

<!--            <div class="desc">-->
<!--                该元素会默认插入到 id= 'app' 的元素内作为其子元素，您可以通过设置 <b>id</b> 属性指定父亲元素。-->
<!--            </div>-->

            <div class="desc">
                属性 <b>bottom</b> <b>right</b> 控制其到底部、右边的距离。
            </div>
            <div class="desc">
                属性 <b>scroll-top</b> 控制页面滚动多少时显示该元素。
            </div>

            <div class="desc">
                属性 <b>behavior</b> 设置滚动条滚动的方式。
            </div>
            <div>
                <f-top>
                    <b>top1</b>
                </f-top>

                <f-top right="100px">
                    <b>top2</b>
                </f-top>

                <f-top bottom="100px">
                    <b>top3</b>
                </f-top>

                <f-top right="150px" behavior="smooth">
                    <b>top4</b>
                </f-top>

                <f-top right="200px" :scroll-top="600">
                    <b>top5</b>
                </f-top>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-top>
        <b>top1</b>
    </f-top>

    <f-top right="100px">
        <b>top2</b>
    </f-top>

    <f-top bottom="100px">
        <b>top3</b>
    </f-top>

    <f-top right="150px" behavior="smooth">
        <b>top4</b>
    </f-top>

    <f-top right="200px" :scroll-top="600">
        <b>top5</b>
    </f-top>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <FButton type="primary" @click="insertDom" style="margin-right: 15px;">添加10行</FButton>
            <FButton type="danger" @click="clearDom">清空</FButton>
        </div>
        <div ref="toTop"></div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted
} from 'vue'
import FButton from '/@/views/packages/button/Button.vue'
import FTop from '/@/views/packages/toTop/ToTop.vue'

export default defineComponent({
    components: {
        FButton,
        FTop
    },
    setup () {
        const toTop = ref(null)
        const insertDom = () => {
            const toTopDom: HTMLElement = toTop.value as any
            for (let i = 0; i < 10; i++) {
                const h1 = document.createElement('h1') as HTMLElement
                h1.innerHTML = '测试行'
                toTopDom.appendChild(h1)
            }
        }

        const clearDom = () => {
            const toTopDom: HTMLElement = toTop.value as any
            toTopDom.innerHTML && (toTopDom.innerHTML = '')
        }
        onMounted(() => {
            insertDom()
        })
        return{
            toTop,
            insertDom,
            clearDom
        }
    }
})
</script>

<style scoped>

</style>
