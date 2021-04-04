<template>
    <div class="Layout">
        <h2>Layout 布局</h2>
        <p>对页面进行快速布局。</p>


        <h3>设计详细</h3>
        <div>
            <h4>尺寸</h4>
            <ul class="demo-desc">
                <li>顶部导航：高度为 <b>64px</b>，最小高度为 <b>48px</b>。</li>
                <li>侧边栏：宽度为 <b>200px</b>。</li>
                <li>内容区：最小宽度为 <b>200px</b>。</li>
                <li>底部区域：设计同顶部导航。</li>
                <li>顶部导航栏的高度计算公式：<b>48+8n</b></li>
                <li>侧边导航栏宽度计算公式：<b>200+8n</b></li>
            </ul>
        </div>

        <div>
            <h4>细节</h4>
            <ul class="demo-desc">
                <li><b>f-layout</b>容器采用flex布局，默认伸展方向为垂直，请使用支持该特性的浏览器。</li>
                <li><b>f-layout</b>容器内当不存在 <b>f-header</b> 和 <b>f-footer</b>时伸展方向改为水平。</li>
            </ul>
        </div>
        <h3>注意事项</h3>
        <div>
            <ul class="demo-desc">
                <li><b>f-layout</b>容器可以包含 <b>f-header</b>、<b>f-aside</b>、<b>f-content</b>、<b>f-footer</b>及其自己，该容器可以放在任何块级元素内。</li>
                <li><b>f-header</b>必须在 <b>f-layout</b> 内；顶部容器，块级元素。</li>
                <li><b>f-aside</b>必须在 <b>f-layout</b> 内；侧边栏容器，块级元素。</li>
            </ul>
        </div>
        <div>
            <h3 id="ji_ben_bu_ju">基本布局
                <a href="#ji_ben_bu_ju" class="f-icon-anchor"></a>
            </h3>
            <p>常见的页面布局结构。</p>

            <div class="demo-layout">
                <f-layout>
                    <f-header>header</f-header>
                    <f-content>content</f-content>
                    <f-footer>footer</f-footer>
                </f-layout>
            </div>

            <div class="demo-layout">
                <f-layout>
                    <f-header>header</f-header>
                    <f-layout>
                        <f-aside>aside</f-aside>
                        <f-content>content</f-content>
                    </f-layout>
                    <f-footer>footer</f-footer>
                </f-layout>
            </div>

            <div class="demo-layout">
                <f-layout>
                    <f-header>header</f-header>
                    <f-layout>
                        <f-content>content</f-content>
                        <f-aside>aside</f-aside>
                    </f-layout>
                    <f-footer>footer</f-footer>
                </f-layout>
            </div>

            <div class="demo-layout">
                <f-layout>
                    <f-header>header</f-header>
                    <f-layout>
                        <f-aside>aside</f-aside>
                        <f-content>content</f-content>
                    </f-layout>
                </f-layout>
            </div>

            <div class="demo-layout">
                <f-layout>
                    <f-aside>aside</f-aside>
                    <f-layout>
                        <f-header>header</f-header>
                        <f-content>content</f-content>
                        <f-footer>footer</f-footer>
                    </f-layout>
                </f-layout>
            </div>

            <div class="demo-layout">
                <f-layout>
                    <f-aside>aside</f-aside>
                    <f-layout>
                        <f-header>header</f-header>
                        <f-content>content</f-content>
                    </f-layout>
                </f-layout>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div class="demo-layout">
        <f-layout>
            <f-header>header</f-header>
            <f-content>content</f-content>
            <f-footer>footer</f-footer>
        </f-layout>
    </div>

    <div class="demo-layout">
        <f-layout>
            <f-header>header</f-header>
            <f-layout>
                <f-aside>aside</f-aside>
                <f-content>content</f-content>
            </f-layout>
            <f-footer>footer</f-footer>
        </f-layout>
    </div>

    <div class="demo-layout">
        <f-layout>
            <f-header>header</f-header>
            <f-layout>
                <f-content>content</f-content>
                <f-aside>aside</f-aside>
            </f-layout>
            <f-footer>footer</f-footer>
        </f-layout>
    </div>

    <div class="demo-layout">
        <f-layout>
            <f-header>header</f-header>
            <f-layout>
                <f-aside>aside</f-aside>
                <f-content>content</f-content>
            </f-layout>
        </f-layout>
    </div>

    <div class="demo-layout">
        <f-layout>
            <f-aside>aside</f-aside>
            <f-layout>
                <f-header>header</f-header>
                <f-content>content</f-content>
                <f-footer>footer</f-footer>
            </f-layout>
        </f-layout>
    </div>

    <div class="demo-layout">
        <f-layout>
            <f-aside>aside</f-aside>
            <f-layout>
                <f-header>header</f-header>
                <f-content>content</f-content>
            </f-layout>
        </f-layout>
    </div>


    <style lang="scss">
    .demo-layout{
        &:not(:last-child){
            margin-bottom: 30px;
        }
        section{
            background-color: #fff;
            color: #fff;
        }
        header, footer{
            text-align: center;
            line-height: 64px;
            background-color: rgba(var(--primary-rgba), .9);
        }
        main, aside{
            text-align: center;
            line-height: 200px;
            background-color: rgba(var(--primary-rgba), .7);
        }
        aside{
            background-color: rgba(var(--primary-rgba), .5);
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
    onMounted
} from 'vue'
import fLayout from '/@/views/packages/layout/Layout.vue'
import fHeader from '/@/views/packages/layout/Header.vue'
import fFooter from '/@/views/packages/layout/Footer.vue'
import fAside from '/@/views/packages/layout/Aside.vue'
import fContent from '/@/views/packages/layout/Content.vue'
export default defineComponent({
    components: {
        fLayout,
        fHeader,
        fFooter,
        fContent,
        fAside
    },
    setup () {

    }
})

</script>

<style scoped lang="scss">
.demo-desc{
    li{
        line-height: 1.8em;
        margin-bottom: 5px;
        list-style: disc;
        color: #333;
        b{
            padding: 5px 8px;
            border-radius: 5px;
            background-color: #eee;
            color: #666;
        }
    }
}
.demo-layout{
    &:not(:last-child){
        margin-bottom: 30px;
    }
    section{
        background-color: #fff;
        color: #fff;
    }
    header, footer{
        text-align: center;
        line-height: 64px;
        background-color: rgba(var(--primary-rgba), .9);
    }
    main, aside{
        text-align: center;
        line-height: 200px;
        background-color: rgba(var(--primary-rgba), .7);
    }
    aside{
        background-color: rgba(var(--primary-rgba), .5);
    }
}
</style>