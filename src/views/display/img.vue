<template>
    <div>
        <h2>Img 图片容器</h2>
        <p>经过包装后返回的一的img图片容器，它拓展了一些功能。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>他看起来与直接使用img标签生成的图片没有任何区别。</p>
            <div class="demo-img">
                <f-img
                    src="/@/assets/img/demo2.jpg"
                    width="150px"
                    height="150px"
                />
            </div>

            <div class="desc">
                属性 <b>object-fit（同原生）</b> 指定图片元素应该以何种方式去适应容器的宽度、高度。
            </div>

            <div class="desc">
                图片容器支持5种不同的方式，默认是，更多详情请前往 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit">MDN</a>。
            </div>

            <div class="demo-img-object-fit">
                <div>
                    <f-img
                        src="/@/assets/img/demo.jpg"
                        width="200px"
                        height="200px"
                        object-fit="fill"
                    />
                    <h4>fill</h4>
                </div>
                <div>
                    <f-img
                        src="/@/assets/img/demo.jpg"
                        width="200px"
                        height="200px"
                        object-fit="contain"
                    />
                    <h4>contain</h4>
                </div>
                <div>
                    <f-img
                        src="/@/assets/img/demo.jpg"
                        width="200px"
                        height="200px"
                        object-fit="none"
                    />
                    <h4>none</h4>
                </div>
                <div>
                    <f-img
                        src="/@/assets/img/demo.jpg"
                        width="200px"
                        height="200px"
                        object-fit="cover"
                    />
                    <h4>cover</h4>
                </div>
                <div>
                    <f-img
                        src="/@/assets/img/demo.jpg"
                        width="200px"
                        height="200px"
                        object-fit="scale-down"
                    />
                    <h4>scale-down</h4>
                </div>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-img
        src="/@/assets/img/demo2.jpg"
        width="150px"
        height="150px"
    />

    <div>
        <f-img
            src="/@/assets/img/demo.jpg"
            width="200px"
            height="200px"
            object-fit="fill"
        />
        <h4>fill</h4>
    </div>
    <div>
        <f-img
            src="/@/assets/img/demo.jpg"
            width="200px"
            height="200px"
            object-fit="contain"
        />
        <h4>contain</h4>
    </div>
    <div>
        <f-img
            src="/@/assets/img/demo.jpg"
            width="200px"
            height="200px"
            object-fit="none"
        />
        <h4>none</h4>
    </div>
    <div>
        <f-img
            src="/@/assets/img/demo.jpg"
            width="200px"
            height="200px"
            object-fit="cover"
        />
        <h4>cover</h4>
    </div>
    <div>
        <f-img
            src="/@/assets/img/demo.jpg"
            width="200px"
            height="200px"
            object-fit="scale-down"
        />
        <h4>scale-down</h4>
    </div>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="rong_cuo_chu_li">容错处理
                <a href="#rong_cuo_chu_li" class="f-icon-anchor"></a>
            </h3>
            <p>加载失败时展示的自定义占位图片，或符号、文本、自定义内容。</p>
            <div class="demo-img">
                <f-img
                    src="www.baidu666.com"
                    width="150px"
                    height="150px"
                />
            </div>
            <div class="desc">
                可以使用具名插槽 <b>slot = fail</b> 来自定义加载失败的占位样式。
            </div>
            <div class="demo-img">
                <f-img
                    src="www.baidu666.com"
                    width="150px"
                    height="150px"
                >
                    <template #fail>
                        <i class="f-icon-picture" style="font-size: 50px"></i>
                    </template>
                </f-img>
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-img
        src="www.baidu666.com"
        width="150px"
        height="150px"
    />

    <f-img
        src="www.baidu666.com"
        width="150px"
        height="150px"
    >
        <template #fail>
            <i class="f-icon-picture" style="font-size: 50px"></i>
        </template>
    </f-img>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jia_zai_zhong_zhan_wei">加载中占位
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>在图片加载的时候显示的加载中样式。</p>
            <div class="demo-img">
                <f-img
                    src="/@/assets/img/demo2.jpg"
                    width="150px"
                    height="150px"
                />
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-img
        src="/@/assets/img/demo2.jpg"
        width="150px"
        height="150px"
    />`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="cha_kan_da_tu">查看大图
                <a href="#cha_kan_da_tu" class="f-icon-anchor"></a>
            </h3>
            <p>点击图片打开大图预览模式。</p>
            <div class="demo-img">
                <f-img
                    src="/@/assets/img/demo2.jpg"
                    width="150px"
                    height="150px"
                    preview
                />
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-img
        src="/@/assets/img/demo2.jpg"
        width="150px"
        height="150px"
        preview
    />`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="duo_tu_yu_lan">多图预览
                <a href="#duo_tu_yu_lan" class="f-icon-anchor"></a>
            </h3>
            <p>多图预览。</p>
            <div class="demo-img">
                <f-img
                    src="/@/assets/img/demo2.jpg"
                    width="150px"
                    height="150px"
                    preview
                    :preview-list="['/@/assets/img/demo.jpg', '/@/assets/img/demo2.jpg', '/@/assets/img/demo3.jpg']"
                />
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-img
        src="/@/assets/img/demo2.jpg"
        width="150px"
        height="150px"
        preview
        :preview-list="previewList"
    />


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'
    export default defineComponent({
        setup() {
            const data = reactive({
                previewList: [
                    '/@/assets/img/demo.jpg',
                    '/@/assets/img/demo2.jpg',
                    '/@/assets/img/demo3.jpg'
                ]
            })
            return{ ...toRefs(data) }
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
    ref,
    reactive,
    toRefs
} from 'vue'
import fImg from '/@/views/packages/img/Img.vue'

export default defineComponent({
    components: {
        fImg,
    },
    setup() {
        const data = reactive({
            previewList: ['/@/assets/img/demo.jpg', '/@/assets/img/demo2.jpg', '/@/assets/img/demo3.jpg']
        })
        return{
            ...toRefs(data)
        }
    }
})
</script>

<style scoped lang="scss">
.demo-img{
    overflow: hidden;
    .f-img-container + .f-img-container{
        margin-left: 30px;
    }
}
.demo-img-object-fit{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    &::after{
        content: '';
        width: 200px;
        height: 200px;
    }
    h4{
        font-size: 18px;
        text-align: center;
        margin: 5px 0;
    }
}
</style>