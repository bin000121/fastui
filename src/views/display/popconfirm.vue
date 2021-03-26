<template>
    <div class="popconfirm">
        <h2>Popconfirm 气泡确认框</h2>
        <p>点击目标元素，弹出一个供用户进一步确认的窗体。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>简单用法展示。</p>

            <div class="demo-popconfirm">
                <f-popconfirm title="确定要删除吗？">
                    <a href="#">Delete</a>
                </f-popconfirm>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-popconfirm title="确定要删除吗？">
        <a href="#">Delete</a>
    </f-popconfirm>`}}</code></pre>
            </div>

        </div>

        <div>
            <h3 id="zi_ding_yi">自定义
                <a href="#zi_ding_yi" class="f-icon-anchor"></a>
            </h3>
            <p>可以自定义气泡框的一些元素。</p>


            <div class="demo-popconfirm">
                <f-popconfirm
                    title="确定要删除吗？"
                    ok-text="当然!"
                    cancel-text="噢不!"
                >
                    <f-button>Delete</f-button>
                </f-popconfirm>

                <f-popconfirm
                    title="确定要删除吗？"
                    ok-text="好"
                    cancel-text="no"
                    ok-type="button"
                >
                    <f-button>Delete</f-button>
                </f-popconfirm>

                <f-popconfirm
                    title="确定要删除吗？"
                    ok-text="必须滴"
                    cancel-text="开玩笑"
                    ok-type="button"
                    cancel-type="button"
                    hide-icon
                >
                    <f-button>Delete</f-button>
                </f-popconfirm>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-popconfirm
        title="确定要删除吗？"
        ok-text="当然!"
        cancel-text="噢不!"
    >
        <f-button>Delete</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        ok-text="好"
        cancel-text="no"
        ok-type="button"
    >
        <f-button>Delete</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        ok-text="必须滴"
        cancel-text="开玩笑"
        ok-type="button"
        cancel-type="button"
        hide-icon
    >
        <f-button>Delete</f-button>
    </f-popconfirm>`}}</code></pre>
            </div>

        </div>

        <div>
            <h3 id="chu_xian_wei_zhi">出现位置
                <a href="#chu_xian_wei_zhi" class="f-icon-anchor"></a>
            </h3>
            <p>气泡框拥有12种不同的出现位置。</p>


            <div class="demo-popconfirm">
                <div>
                    <div class="demo-popconfirm-top">
                        <f-popconfirm
                                title="确定要删除吗？"
                                placement="top-left"
                        >
                            <f-button>top-left</f-button>
                        </f-popconfirm>
                        <f-popconfirm
                                title="确定要删除吗？"
                                placement="top-center"
                        >
                            <f-button>top-center</f-button>
                        </f-popconfirm>
                        <f-popconfirm
                                title="确定要删除吗？"
                                placement="top-right"
                        >
                            <f-button>top-right</f-button>
                        </f-popconfirm>
                    </div>
                    <div class="demo-popconfirm-center">
                        <div class="demo-popconfirm-center-left">
                            <f-popconfirm
                                    title="确定要删除吗？"
                                    placement="left-top"
                            >
                                <f-button>left-top</f-button>
                            </f-popconfirm>
                            <f-popconfirm
                                    title="确定要删除吗？"
                                    placement="left-center"
                            >
                                <f-button>left-center</f-button>
                            </f-popconfirm>
                            <f-popconfirm
                                    title="确定要删除吗？"
                                    placement="left-bottom"
                            >
                                <f-button>left-bottom</f-button>
                            </f-popconfirm>
                        </div>
                        <div class="demo-popconfirm-center-right">
                            <f-popconfirm
                                    title="确定要删除吗？"
                                    placement="right-top"
                            >
                                <f-button>right-top</f-button>
                            </f-popconfirm>
                            <f-popconfirm
                                    title="确定要删除吗？"
                                    placement="right-center"
                            >
                                <f-button>right-center</f-button>
                            </f-popconfirm>
                            <f-popconfirm
                                    title="确定要删除吗？"
                                    placement="right-bottom"
                            >
                                <f-button>right-bottom</f-button>
                            </f-popconfirm>
                        </div>
                    </div>
                    <div class="demo-popconfirm-footer">
                        <f-popconfirm
                                title="确定要删除吗？"
                                placement="bottom-left"
                        >
                            <f-button>bottom-left</f-button>
                        </f-popconfirm>
                        <f-popconfirm
                                title="确定要删除吗？"
                                placement="bottom-center"
                        >
                            <f-button>bottom-center</f-button>
                        </f-popconfirm>
                        <f-popconfirm
                                title="确定要删除吗？"
                                placement="bottom-right"
                        >
                            <f-button>bottom-right</f-button>
                        </f-popconfirm>
                    </div>

                </div>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-popconfirm
        title="确定要删除吗？"
        placement="top-left"
    >
        <f-button>top-left</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        placement="top-center"
    >
        <f-button>top-center</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        placement="top-right"
    >
        <f-button>top-right</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        placement="left-top"
    >
        <f-button>left-top</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        placement="left-center"
    >
        <f-button>left-center</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        placement="left-bottom"
    >
        <f-button>left-bottom</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        placement="right-top"
    >
        <f-button>right-top</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        placement="right-center"
    >
        <f-button>right-center</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        placement="right-bottom"
    >
        <f-button>right-bottom</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        placement="bottom-left"
    >
        <f-button>bottom-left</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        placement="bottom-center"
    >
        <f-button>bottom-center</f-button>
    </f-popconfirm>

    <f-popconfirm
        title="确定要删除吗？"
        placement="bottom-right"
    >
        <f-button>bottom-right</f-button>
    </f-popconfirm>`}}</code></pre>
            </div>

        </div>

        <div>
            <h3 id="jin_yong">禁用
                <a href="#jin_yong" class="f-icon-anchor"></a>
            </h3>
            <p>不会弹出气泡确认框。</p>

            <div class="demo-popconfirm">
                <f-popconfirm title="确定要删除吗？" disabled>
                    <f-button>Delete</f-button>
                </f-popconfirm>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-popconfirm title="确定要删除吗？" disabled>
        <f-button>Delete</f-button>
    </f-popconfirm>`}}</code></pre>
            </div>

        </div>

        <div>
            <h3 id="wu_dong_hua">无动画
                <a href="#wu_dong_hua" class="f-icon-anchor"></a>
            </h3>
            <p>显示和关闭时不会出现动画效果。</p>

            <div class="demo-popconfirm">
                <f-popconfirm title="确定要删除吗？" :animate="false">
                    <f-button>Delete</f-button>
                </f-popconfirm>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-popconfirm title="确定要删除吗？" :animate="false">
        <f-button>Delete</f-button>
    </f-popconfirm>`}}</code></pre>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FPopconfirm from '/@/views/packages/popconfirm/Popconfirm.vue'
import FButton from '/@/views/packages/button/Button.vue'

export default defineComponent({
    components: {
        FPopconfirm,
        FButton,
    }
})
</script>

<style scoped lang="scss">
.demo-popconfirm{
    display: flex;
    align-items: center;
    justify-content: center;
    .demo-popconfirm-top, .demo-popconfirm-center, .demo-popconfirm-footer{
        box-sizing: border-box;
        padding: 0 70px;
        width: 500px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    .demo-popconfirm-top{
        padding: 0 100px;
    }
    .demo-popconfirm-center {
        padding: 0;
        .demo-popconfirm-center-left, .demo-popconfirm-center-right{
            width: 150px;
            height: 150px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-content: space-between;
        }
        .demo-popconfirm-center-right{
            justify-content: flex-end;
        }
    }
}
</style>
