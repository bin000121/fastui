<template>
    <div class="tabs">
        <h2>Tabs 标签页</h2>
        <p>在选项卡中切换你要展示的组件。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>默认用法。</p>

            <div class="desc">
                默认选中第一个，您也可以绑定 <b>v-model:value</b> 来设置默认选中项。
            </div>

            <div class="demo-tabs">
                <f-tabs>
                    <f-tabs-pane
                        v-for="item in 3"
                        :key="item"
                        :label="'tabs '+item"
                        :name="'tabs'+item"
                    >
                        {{'tabs '+item}}
                    </f-tabs-pane>
                </f-tabs>
            </div>

            <div class="demo-tabs">
                <p>当前选项：{{activeTabs}}</p>
                <f-tabs v-model:value="activeTabs">
                    <f-tabs-pane
                        v-for="item in 3"
                        :key="item"
                        :label="'tabs '+item"
                        :name="'tabs'+item"
                    >
                        {{'tabs '+item}}
                    </f-tabs-pane>
                </f-tabs>
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-tabs>
        <f-tabs-pane
            v-for="item in 3"
            :key="item"
            :label="'tabs '+item"
            :name="'tabs'+item"
        >
            \{\{'tabs '+item\}\}
        </f-tabs-pane>
    </f-tabs>

    <p>当前选项：\{\{activeTabs\}\}</p>
    <f-tabs v-model:value="activeTabs">
        <f-tabs-pane
            v-for="item in 3"
            :key="item"
            :label="'tabs '+item"
            :name="'tabs'+item"
        >
            \{\{'tabs '+item\}\}
        </f-tabs-pane>
    </f-tabs>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                activeTabs: 'tabs2'
            })
            return{
                ...toRefs(data),
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ka_pian_yang_shi">卡片样式
                <a href="#ka_pian_yang_shi" class="f-icon-anchor"></a>
            </h3>
            <p>卡片样式。</p>

            <div class="demo-tabs">
                <f-tabs card>
                    <f-tabs-pane
                        v-for="item in 3"
                        :key="item"
                        :label="'tabs '+item"
                        :name="'tabs'+item"
                    >
                        {{'tabs '+item}}
                    </f-tabs-pane>
                </f-tabs>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-tabs card>
        <f-tabs-pane
                v-for="item in 3"
                :key="item"
                :label="'tabs '+item"
                :name="'tabs'+item"
        >
            \{\{'tabs '+item\}\}
        </f-tabs-pane>
    </f-tabs>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chi_cun">尺寸
                <a href="#chi_cun" class="f-icon-anchor"></a>
            </h3>
            <p>标签页拥有三种不同大小的尺寸。</p>

<!--            <div class="desc">-->
<!--                默认选中第一个，您也可以绑定 <b>v-model:value</b> 来设置默认选中项。-->
<!--            </div>-->

            <div class="demo-tabs">
                <f-tabs size="small">
                    <f-tabs-pane
                        v-for="item in 3"
                        :key="item"
                        :label="'tabs '+item"
                        :name="'tabs'+item"
                    >
                        {{'tabs '+item}}
                    </f-tabs-pane>
                </f-tabs>
            </div>

            <div class="demo-tabs">
                <f-tabs size="default">
                    <f-tabs-pane
                        v-for="item in 3"
                        :key="item"
                        :label="'tabs '+item"
                        :name="'tabs'+item"
                    >
                        {{'tabs '+item}}
                    </f-tabs-pane>
                </f-tabs>
            </div>

            <div class="demo-tabs">
                <f-tabs size="large">
                    <f-tabs-pane
                        v-for="item in 3"
                        :key="item"
                        :label="'tabs '+item"
                        :name="'tabs'+item"
                    >
                        {{'tabs '+item}}
                    </f-tabs-pane>
                </f-tabs>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-tabs size="small">
        <f-tabs-pane
            v-for="item in 3"
            :key="item"
            :label="'tabs '+item"
            :name="'tabs'+item"
        >
            \{\{'tabs '+item\}\}
        </f-tabs-pane>
    </f-tabs>

    <f-tabs size="default">
        <f-tabs-pane
            v-for="item in 3"
            :key="item"
            :label="'tabs '+item"
            :name="'tabs'+item"
        >
            \{\{'tabs '+item\}\}
        </f-tabs-pane>
    </f-tabs>

    <f-tabs size="large">
        <f-tabs-pane
            v-for="item in 3"
            :key="item"
            :label="'tabs '+item"
            :name="'tabs'+item"
        >
            \{\{'tabs '+item\}\}
        </f-tabs-pane>
    </f-tabs>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ke_guan_bi">可关闭标签
                <a href="#ke_guan_bi" class="f-icon-anchor"></a>
            </h3>
            <p>可以关闭某一项标签，关闭按钮将在鼠标移入时呈现。</p>

            <div class="demo-tabs">
                <f-tabs closeable>
                    <f-tabs-pane
                        v-for="item in 3"
                        :key="item"
                        :label="'tabs '+item"
                        :name="'tabs'+item"
                    >
                        {{'tabs '+item}}
                    </f-tabs-pane>
                </f-tabs>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-tabs closeable>
        <f-tabs-pane
            v-for="item in 3"
            :key="item"
            :label="'tabs '+item"
            :name="'tabs'+item"
        >
            \{\{'tabs '+item\}\}
        </f-tabs-pane>
    </f-tabs>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jin_yong">禁用标签
                <a href="#jin_yong" class="f-icon-anchor"></a>
            </h3>
            <p>使得某一标签不可被选中。</p>

            <div class="demo-tabs">
                <f-tabs>
                    <f-tabs-pane
                        label="tabs 1"
                        name="tabs 1"
                    >
                        tabs 1
                    </f-tabs-pane>
                    <f-tabs-pane
                        label="tabs 2"
                        name="tabs 2"
                        disabled
                    >
                        tabs 2
                    </f-tabs-pane>
                    <f-tabs-pane
                        label="tabs 3"
                        name="tabs 3"
                    >
                        tabs 3
                    </f-tabs-pane>
                </f-tabs>
            </div>
            <div class="demo-tabs">
                <f-tabs card>
                    <f-tabs-pane
                        label="tabs 1"
                        name="tabs 1"
                    >
                        tabs 1
                    </f-tabs-pane>
                    <f-tabs-pane
                        label="tabs 2"
                        name="tabs 2"
                        disabled
                    >
                        tabs 2
                    </f-tabs-pane>
                    <f-tabs-pane
                        label="tabs 3"
                        name="tabs 3"
                    >
                        tabs 3
                    </f-tabs-pane>
                </f-tabs>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-tabs>
        <f-tabs-pane
            label="tabs 1"
            name="tabs 1"
        >
            tabs 1
        </f-tabs-pane>
        <f-tabs-pane
            label="tabs 2"
            name="tabs 2"
            disabled
        >
            tabs 2
        </f-tabs-pane>
        <f-tabs-pane
            label="tabs 3"
            name="tabs 3"
        >
            tabs 3
        </f-tabs-pane>
    </f-tabs>

    <f-tabs card>
        <f-tabs-pane
            label="tabs 1"
            name="tabs 1"
        >
            tabs 1
        </f-tabs-pane>
        <f-tabs-pane
            label="tabs 2"
            name="tabs 2"
            disabled
        >
            tabs 2
        </f-tabs-pane>
        <f-tabs-pane
            label="tabs 3"
            name="tabs 3"
        >
            tabs 3
        </f-tabs-pane>
    </f-tabs>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="qian_zhui_tu_biao">标签前缀图标
                <a href="#qian_zhui_tu_biao" class="f-icon-anchor"></a>
            </h3>
            <p>在标签的文本前面插入一个图标。</p>

            <div class="demo-tabs">
                <f-tabs>
                    <f-tabs-pane
                        label="tabs 1"
                        name="tabs_1"
                        icon="f-icon-user"
                    >
                        tabs 1
                    </f-tabs-pane>
                    <f-tabs-pane
                        label="tabs 2"
                        name="tabs_2"
                    >
                        tabs 2
                    </f-tabs-pane>
                    <f-tabs-pane
                        label="tabs 3"
                        name="tabs_3"
                        icon="f-icon-star"
                        :icon-style="{ fontSize: '12px', marginRight: '5px'}"
                    >
                        tabs 3
                    </f-tabs-pane>
                </f-tabs>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-tabs>
        <f-tabs-pane
            label="tabs 1"
            name="tabs_1"
            icon="f-icon-user"
        >
            tabs 1
        </f-tabs-pane>
        <f-tabs-pane
            label="tabs 2"
            name="tabs_2"
        >
            tabs 2
        </f-tabs-pane>
        <f-tabs-pane
            label="tabs 3"
            name="tabs_3"
            icon="f-icon-star"
            :icon-style="{ fontSize: '12px', marginRight: '5px'}"
        >
            tabs 3
        </f-tabs-pane>
    </f-tabs>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zi_ding_yi_biao_qian">自定义标签
                <a href="#zi_ding_yi_biao_qian" class="f-icon-anchor"></a>
            </h3>
            <p>使用具名插槽来自定义标签的内容。</p>

            <div class="desc">
                其中<b>slot</b> 的 <b>name</b> 属性必须与组件 f-tabs-pane 的 name 属性一致！
            </div>

            <div class="demo-tabs">
                <f-tabs>
                    <f-tabs-pane
                        label="tabs 1"
                        name="tabs_1"
                    >
                        tabs 1
                    </f-tabs-pane>
                    <template #tabs_1>
                        <span>标</span>
                        <b>签</b>
                        <del>页</del>
                        <i>1</i>
                    </template>

                    <f-tabs-pane
                        label="tabs 2"
                        name="tabs_2"
                    >
                        tabs 2
                    </f-tabs-pane>
                    <f-tabs-pane
                        label="tabs 3"
                        name="tabs_3"
                    >
                        tabs 3
                    </f-tabs-pane>
                </f-tabs>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-tabs>
        <f-tabs-pane
            label="tabs 1"
            name="tabs_1"
        >
            tabs 1
        </f-tabs-pane>
        <template #tabs_1>
            <span>标</span>
            <b>签</b>
            <del>页</del>
            <i>1</i>
        </template>

        <f-tabs-pane
            label="tabs 2"
            name="tabs_2"
        >
            tabs 2
        </f-tabs-pane>
        <f-tabs-pane
            label="tabs 3"
            name="tabs_3"
        >
            tabs 3
        </f-tabs-pane>
    </f-tabs>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="wei_zhi">标签位置
                <a href="#wei_zhi" class="f-icon-anchor"></a>
            </h3>
            <p>标签页拥有4中不同位置，默认是方向top。</p>

            <div class="demo-tabs" style="margin: 30px 0;">
                <f-radio-group border v-model:value="placement">
                    <f-radio label="top">top</f-radio>
                    <f-radio label="right">right</f-radio>
                    <f-radio label="bottom">bottom</f-radio>
                    <f-radio label="left">left</f-radio>
                </f-radio-group>
            </div>

            <div class="demo-tabs">
                <f-tabs :placement="placement">
                    <f-tabs-pane
                        v-for="item in 3"
                        :key="item"
                        :label="'tabs '+item"
                        :name="'tabs'+item"
                        icon="f-icon-user"
                    >
                        {{'tabs '+item}}
                    </f-tabs-pane>
                </f-tabs>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div>
        <f-radio-group border v-model:value="placement">
            <f-radio label="top">top</f-radio>
            <f-radio label="right">right</f-radio>
            <f-radio label="bottom">bottom</f-radio>
            <f-radio label="left">left</f-radio>
        </f-radio-group>
    </div>

    <f-tabs :placement="placement">
        <f-tabs-pane
            v-for="item in 3"
            :key="item"
            :label="'tabs '+item"
            :name="'tabs'+item"
        >
            \{\{'tabs '+item\}\}
        </f-tabs-pane>
    </f-tabs>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'
    export default defineComponent({

        setup () {
            const data = reactive({
                placement: 'top'
            })
            return{
                ...toRefs(data),
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

<!--        <div>-->
<!--            <h3 id="zeng_jia_yu_guan_bi">增加与关闭标签-->
<!--                <a href="#zeng_jia_yu_guan_bi" class="f-icon-anchor"></a>-->
<!--            </h3>-->
<!--            <p>顾名思义，但只在卡片样式下生效。</p>-->

<!--            <div class="demo-tabs">-->
<!--                <f-tabs card>-->
<!--                    <f-tabs-pane-->
<!--                        v-for="item in 3"-->
<!--                        :key="item"-->
<!--                        :label="'tabs '+item"-->
<!--                        :name="'tabs'+item"-->
<!--                    >-->
<!--                        {{'tabs '+item}}-->
<!--                    </f-tabs-pane>-->
<!--                </f-tabs>-->
<!--            </div>-->
<!--        </div>-->

        <div>
            <h3 id="lun_hua">轮滑
                <a href="#lun_hua" class="f-icon-anchor"></a>
            </h3>
            <p>当标签过多时会进行裁剪，您可以使用滚轮来滑动标签列表以进行选择。</p>

            <div class="desc">
                水平方向。
            </div>
            <div class="demo-tabs-list">
                <f-tabs placement="top" closeable>
                    <f-tabs-pane
                        v-for="item in 30"
                        :key="item"
                        :label="'tabs '+item"
                        :name="'tabs_'+item"
                    >
                        {{'tabs '+item}}
                    </f-tabs-pane>
                </f-tabs>
            </div>
            <div class="desc">
                垂直方向。
            </div>
            <div class="demo-tabs-list">
                <f-tabs placement="left" height="400px" card closeable>
                    <f-tabs-pane
                        v-for="item in 30"
                        :key="item"
                        :label="'tabs '+item"
                        :name="'tabs'+item"
                    >
                        {{'tabs '+item}}
                    </f-tabs-pane>
                </f-tabs>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div>
        水平方向。
    </div>

    <f-tabs placement="top" closeable>
        <f-tabs-pane
            v-for="item in 30"
            :key="item"
            :label="'tabs '+item"
            :name="'tabs_'+item"
        >
            \{\{'tabs '+item\}\}
        </f-tabs-pane>
    </f-tabs>

    <div>
        垂直方向。
    </div>

    <f-tabs placement="left" height="400px" card closeable>
        <f-tabs-pane
            v-for="item in 30"
            :key="item"
            :label="'tabs '+item"
            :name="'tabs'+item"
        >
            \{\{'tabs '+item\}\}
        </f-tabs-pane>
    </f-tabs>`}}
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
import FTabs from '/@/views/packages/tabs/Tabs.vue'
import FRadioGroup from '/@/views/packages/radio/Radio-group.vue'
import FRadio from '/@/views/packages/radio/Radio.vue'
import FTabsPane from '/@/views/packages/tabs/Tabs-pane.vue'

export default defineComponent({
    components: {
        FTabs,
        FTabsPane,
        FRadioGroup,
        FRadio,
    },
    setup () {
        const data = reactive({
            activeTabs: 'tabs2',
            placement: 'top'
        })
        return{
            ...toRefs(data),
        }
    }
})
</script>

<style scoped lang="scss">
.demo-tabs{
    margin-bottom: 45px;
    max-height: 450px;
}
.demo-tabs-list{
    margin-bottom: 60px;
    max-height: 450px;
    max-width: 768px;
}
</style>
