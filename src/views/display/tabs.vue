<template>
    <div class="tabs">
        <h2>Tabs 标签页</h2>
        <p>在选项卡中切换你的组件。</p>

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
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs
} from 'vue'
import FTabs from '/@/views/components/tabs/Tabs.vue'
import FTabsPane from '/@/views/components/tabs/Tabs-pane.vue'

export default defineComponent({
    components: {
        FTabs,
        FTabsPane
    },
    setup () {
        const data = reactive({
            activeTabs: 'tabs2'
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
}
</style>
