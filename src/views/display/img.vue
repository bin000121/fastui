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
                    src="https://unsplash.it/800/600?random"
                    width="150px"
                    height="150px"
                />
            </div>

            <div class="desc">
                属性 <b>object-fit（同原生）</b> 指定图片元素应该以何种方式去适应容器的宽度、高度。
            </div>

            <div class="desc">
                图片容器支持5种不同的方式，默认是 fill，更多详情请前往 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit" target="_blank">MDN</a>。
            </div>

            <div class="demo-img-object-fit">
                <div>
                    <f-img
                        src="https://unsplash.it/800/600?random"
                        width="200px"
                        height="200px"
                        object-fit="fill"
                    />
                    <h4>fill（默认）</h4>
                </div>
                <div>
                    <f-img
                        src="https://unsplash.it/800/600?random"
                        width="200px"
                        height="200px"
                        object-fit="contain"
                    />
                    <h4>contain</h4>
                </div>
                <div>
                    <f-img
                        src="https://unsplash.it/800/600?random"
                        width="200px"
                        height="200px"
                        object-fit="none"
                    />
                    <h4>none</h4>
                </div>
                <div>
                    <f-img
                        src="https://unsplash.it/800/600?random"
                        width="200px"
                        height="200px"
                        object-fit="cover"
                    />
                    <h4>cover</h4>
                </div>
                <div>
                    <f-img
                        src="https://unsplash.it/800/600?random"
                        width="200px"
                        height="200px"
                        object-fit="scale-down"
                    />
                    <h4>scale-down</h4>
                </div>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div>
        <f-img
            src="https://unsplash.it/800/600?random"
            width="200px"
            height="200px"
            object-fit="fill"
        />
        <h4>fill</h4>
    </div>
    <div>
        <f-img
            src="https://unsplash.it/800/600?random"
            width="200px"
            height="200px"
            object-fit="contain"
        />
        <h4>contain</h4>
    </div>
    <div>
        <f-img
            src="https://unsplash.it/800/600?random"
            width="200px"
            height="200px"
            object-fit="none"
        />
        <h4>none</h4>
    </div>
    <div>
        <f-img
            src="https://unsplash.it/800/600?random"
            width="200px"
            height="200px"
            object-fit="cover"
        />
        <h4>cover</h4>
    </div>
    <div>
        <f-img
            src="https://unsplash.it/800/600?random"
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
                    src="http://www.baidu666.com"
                    width="150px"
                    height="150px"
                />
            </div>
            <div class="desc">
                可以使用具名插槽 <b>slot = fail</b> 来自定义加载失败的占位样式。
            </div>
            <div class="demo-img">
                <f-img
                    src="http://www.baidu666.com"
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
                <a href="#jia_zai_zhong_zhan_wei" class="f-icon-anchor"></a>
            </h3>
            <p>在图片加载的时候显示的加载中样式。</p>
            <div class="demo-img demo-show-loading-box">
                <f-img
                    src="https://unsplash.it/800/600?random"
                    width="150px"
                    height="150px"
                />
                <template v-if="showLoadingMask">
                    <div class="demo-show-loading-mask"></div>
                    <div class="demo-show-loading">
                        <f-spin :size="32" tip="加载中..." inline></f-spin>
                    </div>
                </template>
                <f-button
                    type="primary"
                    size="small"
                    @click="showLoading"
                >
                    显示loading
                </f-button>
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-img
        src="https://unsplash.it/800/600?random"
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
                    src="https://unsplash.it/800/600?random"
                    width="150px"
                    height="150px"
                    preview
                />
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-img
        src="https://unsplash.it/800/600?random"
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
                    src="https://unsplash.it/800/600?random"
                    width="150px"
                    height="150px"
                    preview
                    :preview-list="previewList"
                />
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-img
        src="https://unsplash.it/800/600?random"
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
                    'https://unsplash.it/800/600?random',
                    'https://unsplash.it/800/601?random',
                    'https://unsplash.it/800/602?random'
                ]
            })
            return{ ...toRefs(data) }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="lan_jia_zai">懒加载
                <a href="#lan_jia_zai" class="f-icon-anchor"></a>
            </h3>
            <p>在图片容器进入视口的时候才会去请求图片路径，这可以提升加快页面渲染的速度。</p>

            <div class="desc">
                对其设置属性 <b>lazy-load</b> 即可开启图片懒加载。
            </div>

            <div class="desc">
                通常，我们希望图片能在快要达到视口时就去加载图片，从而能够在视口内呈现加载好的图片。
                设置属性 <b>lazy-load-distance</b> 可以使图片在达到距离视口某个值时开始加载图片路径。
                默认值为150px。详细请参考 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/rootMargin" target="_blank">MDN</a>
            </div>

            <div class="desc">
                使用属性 <b>lazy-load-distance</b> 时，请指定视口容器 <b>viewport-container</b>，如不指定则默认是浏览器视口。
            </div>

            <div class="demo-lazy-load">
                <f-img
                    v-for="src in lazyLoadList"
                    :key="src"
                    :src="src"
                    width="700px"
                    height="500px"
                    object-fit="cover"
                    lazy-load
                    lazy-load-distance="250px"
                    viewport-container="div.demo-lazy-load"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div class="demo-lazy-load">
        <f-img
            v-for="src in lazyLoadList"
            :key="src"
            :src="src"
            width="700px"
            height="500px"
            object-fit="cover"
            lazy-load
            lazy-load-distance="250px"
            viewport-container="div.demo-lazy-load"
        />
    </div>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'
    export default defineComponent({
        setup() {
            const data = reactive({
                lazyLoadList: [
                    'https://unsplash.it/800/600?random',
                    'https://unsplash.it/800/601?random',
                    'https://unsplash.it/800/602?random',
                    'https://unsplash.it/800/603?random',
                    'https://unsplash.it/800/604?random',
                    'https://unsplash.it/800/605?random',
                    'https://unsplash.it/800/606?random',
                    'https://unsplash.it/800/607?random',
                ]
            })
            return{ ...toRefs(data) }
        }
    })
    </script>

    <style lang="scss">
    .demo-lazy-load{
        display: flex;
        flex-wrap: wrap;
        height: 450px;
        overflow: auto;
        .f-img-container:not(:last-child) {
            margin-bottom: 15px;
        }
    }
    </style>`}}
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
import fButton from '/@/views/packages/button/Button.vue'
import fSpin from '/@/views/packages/spin/Spin.vue'
export default defineComponent({
    components: {
        fImg,
        fSpin,
        fButton,
    },
    setup() {
        const data = reactive({
            previewList: [
                'https://unsplash.it/800/600?random',
                'https://unsplash.it/800/601?random',
                'https://unsplash.it/800/602?random'
            ],
            lazyLoadList: [
                'https://unsplash.it/800/600?random',
                'https://unsplash.it/800/601?random',
                'https://unsplash.it/800/602?random',
                'https://unsplash.it/800/603?random',
                'https://unsplash.it/800/604?random',
                'https://unsplash.it/800/605?random',
                'https://unsplash.it/800/606?random',
                'https://unsplash.it/800/607?random',
            ],
            showLoadingMask: false
        })
        const showLoading = () => {
            data.showLoadingMask = true
            setTimeout(() => {
                data.showLoadingMask = false
            }, 2000)
        }
        return{
            showLoading,
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
.demo-show-loading-box{
    display: flex;
    width: 300px;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .demo-show-loading, .demo-show-loading-mask{
        position: absolute;
        width: 150px;
        height: 150px;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0, .1);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .demo-show-loading-mask{
        background-color: #fff;
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

.demo-lazy-load{
    display: flex;
    flex-wrap: wrap;
    height: 450px;
    overflow: auto;
    & :deep(.f-img-container:not(:last-child)) {
        margin-bottom: 15px;
    }
}
</style>
