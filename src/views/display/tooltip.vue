<template>
    <div class="tooltip">
        <h2>Tooltip 文字提示</h2>
        <p>鼠标悬停时显示一段说明、提示、解读文本，类似标签的 title，但又胜之。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>鼠标移入即可呈现出文案提示。</p>

            <div class="demo-tooltip">
                <f-tooltip
                    tooltip="这里是提示内容"
                >
                    <h2>当你的鼠标经过这个文案时将呈现出tooltip。</h2>
                </f-tooltip>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div class="demo-tooltip">
        <f-tooltip
                tooltip="这里是提示内容"
        >
            <h2>当你的鼠标经过这个文案时将呈现出tooltip。</h2>
        </f-tooltip>
    </div>


    <style lang="scss">
    .demo-tooltip{
        display: flex;
        align-items: center;
        justify-content: center;
        h2{
            margin: 0;
        }
    }
    </style>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chu_xian_wei_zhi">出现位置
                <a href="#chu_xian_wei_zhi" class="f-icon-anchor"></a>
            </h3>
            <p>提示组件拥有12种不同的出现位置。</p>

            <div class="desc">
                通过配置属性 <b>placement</b> 即可。
            </div>

            <div class="demo-tooltip">
                <div>
                    <div class="demo-tooltip-top">
                        <f-tooltip
                            tooltip="top-left"
                            placement="top-left"
                        >
                            <f-button>top-left</f-button>
                        </f-tooltip>
                        <f-tooltip
                            tooltip="top-center"
                            placement="top-center"
                        >
                            <f-button>top-center</f-button>
                        </f-tooltip>
                        <f-tooltip
                            tooltip="top-right"
                            placement="top-right"
                        >
                            <f-button>top-right</f-button>
                        </f-tooltip>
                    </div>
                    <div class="demo-tooltip-center">
                        <div class="demo-tooltip-center-left">
                            <f-tooltip
                                tooltip="left-top"
                                placement="left-top"
                            >
                                <f-button>left-top</f-button>
                            </f-tooltip>
                            <f-tooltip
                                tooltip="left-center"
                                placement="left-center"
                            >
                                <f-button>left-center</f-button>
                            </f-tooltip>
                            <f-tooltip
                                tooltip="left-bottom"
                                placement="left-bottom"
                            >
                                <f-button>left-bottom</f-button>
                            </f-tooltip>
                        </div>
                        <div class="demo-tooltip-center-right">
                            <f-tooltip
                                tooltip="right-top"
                                placement="right-top"
                            >
                                <f-button>right-top</f-button>
                            </f-tooltip>
                            <f-tooltip
                                tooltip="right-center"
                                placement="right-center"
                            >
                                <f-button>right-center</f-button>
                            </f-tooltip>
                            <f-tooltip
                                tooltip="right-bottom"
                                placement="right-bottom"
                            >
                                <f-button>right-bottom</f-button>
                            </f-tooltip>
                        </div>
                    </div>
                    <div class="demo-tooltip-footer">
                        <f-tooltip
                            tooltip="bottom-left"
                            placement="bottom-left"
                        >
                            <f-button>bottom-left</f-button>
                        </f-tooltip>
                        <f-tooltip
                            tooltip="bottom-center"
                            placement="bottom-center"
                        >
                            <f-button>bottom-center</f-button>
                        </f-tooltip>
                        <f-tooltip
                            tooltip="bottom-right"
                            placement="bottom-right"
                        >
                            <f-button>bottom-right</f-button>
                        </f-tooltip>
                    </div>

                </div>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-tooltip tooltip="top-left" placement="top-left">
        <f-button>top-left</f-button>
    </f-tooltip>

    <f-tooltip tooltip="top-center" placement="top-center">
        <f-button>top-center</f-button>
    </f-tooltip>

    <f-tooltip tooltip="top-right" placement="top-right">
        <f-button>top-right</f-button>
    </f-tooltip>

    <f-tooltip tooltip="left-top" placement="left-top">
        <f-button>left-top</f-button>
    </f-tooltip>

    <f-tooltip tooltip="left-center" placement="left-center">
        <f-button>left-center</f-button>
    </f-tooltip>

    <f-tooltip tooltip="left-bottom" placement="left-bottom">
        <f-button>left-bottom</f-button>
    </f-tooltip>

    <f-tooltip tooltip="right-top" placement="right-top">
        <f-button>right-top</f-button>
    </f-tooltip>

    <f-tooltip tooltip="right-center" placement="right-center">
        <f-button>right-center</f-button>
    </f-tooltip>

    <f-tooltip tooltip="right-bottom" placement="right-bottom">
        <f-button>right-bottom</f-button>
    </f-tooltip>

    <f-tooltip tooltip="bottom-left" placement="bottom-left">
            <f-button>bottom-left</f-button>
    </f-tooltip>

    <f-tooltip tooltip="bottom-center" placement="bottom-center">
        <f-button>bottom-center</f-button>
    </f-tooltip>

    <f-tooltip tooltip="bottom-right" placement="bottom-right">
        <f-button>bottom-right</f-button>
    </f-tooltip>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zi_ding_yi_nei_rong">自定义内容
                <a href="#zi_ding_yi_nei_rong" class="f-icon-anchor"></a>
            </h3>
            <p>您可以使用slot来自定义提示内容。</p>

            <div class="demo-tooltip">
                <f-tooltip>
                    <template #tooltip>
                        <div style="color: orange">日照香炉生紫烟</div>
                        <div style="color: skyblue">遥看瀑布挂前川</div>
                        <div style="color: red">飞流直下三千尺</div>
                        <div style="color: yellow">疑是银河落九天</div>
                        <div style="color: white;text-align:right;"><b>--- 唐·李白</b></div>
                    </template>
                    <f-button>自定义内容</f-button>
                </f-tooltip>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-tooltip>
        <template #tooltip>
            <div style="color: orange">日照香炉生紫烟</div>
            <div style="color: gold">遥看瀑布挂前川</div>
            <div style="color: red">飞流直下三千尺</div>
            <div style="color: yellow">疑是银河落九天</div>
            <div style="color: white;text-align:right;"><b>--- 唐·李白</b></div>
        </template>
        <f-button>自定义内容</f-button>
    </f-tooltip>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zhu_ti">主题
                <a href="#zhu_ti" class="f-icon-anchor"></a>
            </h3>
            <p>提示组件拥有2种不同的主题样式。</p>

            <div class="demo-tooltip">
                <f-tooltip theme="dark" tooltip="深色主题">
                    <f-button>深色主题</f-button>
                </f-tooltip>

                <f-tooltip theme="light" tooltip="明亮主题">
                    <f-button>明亮主题</f-button>
                </f-tooltip>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-tooltip theme="dark" tooltip="深色主题">
        <f-button>深色主题</f-button>
    </f-tooltip>

    <f-tooltip theme="light" tooltip="明亮主题">
        <f-button>明亮主题</f-button>
    </f-tooltip>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="yan_chi">显示、消失延迟
                <a href="#yan_chi" class="f-icon-anchor"></a>
            </h3>
            <p>可以设置提示组件的显示和消失的延迟时间。</p>

            <div class="desc">
                通过设置属性 <b>delay-show</b> 、<b>delay-hide</b> 可以延时显示、消失提示内容，单位为毫秒。
            </div>

            <div class="demo-tooltip">
                <f-tooltip tooltip="我延迟1s显示" :delay-show="1000">
                    <f-button>我延迟1s显示</f-button>
                </f-tooltip>

                <f-tooltip tooltip="我延迟1s消失" :delay-hide="1000">
                    <f-button>我延迟1s消失</f-button>
                </f-tooltip>

                <f-tooltip tooltip="我延迟1s显示和消失" :delay-show="1000" :delay-hide="1000">
                    <f-button>我延迟1s显示和消失</f-button>
                </f-tooltip>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-tooltip tooltip="我延迟1s显示" :delay-show="1000">
        <f-button>我延迟1s显示</f-button>
    </f-tooltip>

    <f-tooltip tooltip="我延迟1s消失" :delay-hide="1000">
        <f-button>我延迟1s消失</f-button>
    </f-tooltip>

    <f-tooltip tooltip="我延迟1s显示和消失" :delay-show="1000" :delay-hide="1000">
        <f-button>我延迟1s显示和消失</f-button>
    </f-tooltip>`}}
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
import FTooltip from '/@/views/packages/tooltip/Tooltip.vue'
import FButton from '/@/views/packages/button/Button.vue'

export default defineComponent({
    components: {
        FTooltip,
        FButton,
    },
    setup () {

    }
})
</script>

<style scoped lang="scss">
.demo-tooltip{
    display: flex;
    align-items: center;
    justify-content: center;
    h2{
        margin: 0;
    }
    .demo-tooltip-top, .demo-tooltip-center, .demo-tooltip-footer{
        box-sizing: border-box;
        padding: 0 50px;
        width: 450px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    .demo-tooltip-top{
        padding: 0 80px;
    }
    .demo-tooltip-center {
        padding: 0;
        .demo-tooltip-center-left, .demo-tooltip-center-right{
            width: 150px;
            height: 150px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-content: space-between;
        }
        .demo-tooltip-center-right{
            justify-content: flex-end;
        }
    }
}
</style>
