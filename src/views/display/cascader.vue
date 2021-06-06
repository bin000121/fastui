<template>
    <div>
        <h2>Cascader 级联选择器</h2>
        <p>表单中常见的组件，能够从一组上下级相互关联的树形结构中进行选择。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>基础的使用方式。</p>
            <div class="desc">
                如无特别说明，下面出现的级联选择器中的 <b>数据源</b> 都将是相同的。
            </div>

            <div class="demo-cascader">
                <p>当前选中：{{cascaderValue}}</p>
                <f-cascader
                    v-model:value="cascaderValue"
                    :options="options"
                >
                </f-cascader>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>当前选中：\{\{cascaderValue\}\}</p>
    <f-cascader
        v-model:value="cascaderValue"
        :options="options"
    />


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                cascaderValue: [],
                options: [
                    {
                        label: '福建省',
                        value: 'fujian',
                        children: [
                            {
                                label: '厦门市',
                                value: 'xiamen',
                                children: [
                                    {
                                        label: '集美区',
                                        value: 'jimei'
                                    },
                                    {
                                        label: '思明区',
                                        value: 'siming'
                                    }
                                ]
                            },
                            {
                                label: '福州市',
                                value: 'fuzhou',
                                children: [
                                    {
                                        label: '闽侯县',
                                        value: 'minhou'
                                    },
                                    {
                                        label: '鼓楼区',
                                        value: 'gulou'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        label: '广西壮族自治区',
                        value: 'guangxi',
                        children: [
                            {
                                label: '玉林市',
                                value: 'yulin',
                                children: [
                                    {
                                        label: '玉州区',
                                        value: 'yuzhouqu'
                                    },
                                    {
                                        label: '福绵区',
                                        value: 'fumian'
                                    }
                                ]
                            },
                            {
                                label: '南宁市',
                                value: 'nanning',
                                children: [
                                    {
                                        label: '青秀区',
                                        value: 'qingxiu'
                                    },
                                    {
                                        label: '良庆区',
                                        value: 'liangqing'
                                    }

                                ]
                            },
                        ]
                    },
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
            <h3 id="zi_ding_yi_xian_shi">自定义显示
                <a href="#zi_ding_yi_xian_shi" class="f-icon-anchor"></a>
            </h3>
            <p>您可以自定义显示选择后input中的显示格式。</p>
            <div class="desc">
                级联选择器提供了两种自定义显示方法，分隔符：<b>separator</b> 和 格式化函数：<b>format</b>，
                其中格式化函数有一个参数，即选中的label组成的数组。
            </div>

            <div class="demo-cascader">
                <p>1.separator例子：</p>
                <f-cascader
                    v-model:value="cascaderValue2"
                    :options="options"
                    separator="-"
                />
            </div>
            <div class="demo-cascader">
                <p>2.format例子：</p>
                <f-cascader
                    v-model:value="cascaderValue3"
                    :options="options"
                    :format="labelList => labelList.join('>')"
                />
            </div>

            <div class="desc">
                如果二者同时存在，format的优先级为最高。
            </div>

            <div class="demo-cascader">
                <p>3.下面是二者同时存在的例子：</p>
                <f-cascader
                    v-model:value="cascaderValue4"
                    :options="options"
                    separator="+"
                    :format="labelList => labelList.join('>')"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>1.separator例子：</p>
    <f-cascader
        v-model:value="cascaderValue"
        :options="options"
        separator="-"
    />

   <p>2.format例子：</p>
    <f-cascader
        v-model:value="cascaderValue2"
        :options="options"
        :format="labelList => labelList.join('>')"
    />

    <p>3.下面是二者同时存在的例子：</p>
    <f-cascader
        v-model:value="cascaderValue3"
        :options="options"
        separator="+"
        :format="labelList => labelList.join('>')"
    />


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                cascaderValue: [],
                cascaderValue2: [],
                cascaderValue3: []
            })
            return{ ...toRefs(data) }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chi_cun">尺寸
                <a href="#chi_cun" class="f-icon-anchor"></a>
            </h3>
            <p>级联选择器拥有三种不同的尺寸，默认是default。</p>

            <div class="demo-cascader">
                <f-cascader
                    v-model:value="cascaderValue5"
                    :options="options"
                    size="large"
                />
            </div>

            <div class="demo-cascader">
                <f-cascader
                    v-model:value="cascaderValue6"
                    :options="options"
                    size="default"
                />
            </div>

            <div class="demo-cascader">
                <f-cascader
                    v-model:value="cascaderValue7"
                    :options="options"
                    size="small"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-cascader
        v-model:value="cascaderValue"
        :options="options"
        size="large"
    />

    <f-cascader
        v-model:value="cascaderValue"
        :options="options"
        size="default"
    />

    <f-cascader
        v-model:value="cascaderValue"
        :options="options"
        size="small"
    />`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ke_qing_kong">可清空
                <a href="#ke_qing_kong" class="f-icon-anchor"></a>
            </h3>
            <p>清空你的级联选择器选择结果，同时向外触发监听的clear事件。</p>

            <div class="demo-cascader">
                <f-cascader
                    v-model:value="cascaderValue8"
                    :options="options"
                    clearable
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-cascader
        v-model:value="cascaderValue"
        :options="options"
        clearable
    />


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                cascaderValue: []
            })
            return{ ...toRefs(data) }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chu_fa_fang_shi">触发方式
                <a href="#chu_fa_fang_shi" class="f-icon-anchor"></a>
            </h3>
            <p>级联选择器拥有两种不同的触发方式，分别是click（默认）与 hover。</p>

            <div class="demo-cascader">
                <p>1.click</p>
                <f-cascader
                    v-model:value="cascaderValue9"
                    :options="options"
                    trigger="click"
                    clearable
                />
            </div>
            <div class="demo-cascader">
                <p>2.hover</p>
                <f-cascader
                    v-model:value="cascaderValue10"
                    :options="options"
                    trigger="hover"
                    clearable
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-cascader
        v-model:value="cascaderValue"
        :options="options"
        trigger="click"
        clearable
    />

    <f-cascader
        v-model:value="cascaderValue2"
        :options="options"
        trigger="hover"
        clearable
    />


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                cascaderValue: [],
                cascaderValue2: [],
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
    reactive,
    toRefs,
} from 'vue'
import fCascader from '/@/views/packages/cascader/Cascader.vue'

export default defineComponent({
    components: {
        fCascader
    },
    setup () {
        const data = reactive({
            cascaderValue: [],
            cascaderValue2: [],
            cascaderValue3: [],
            cascaderValue4: [],
            cascaderValue5: [],
            cascaderValue6: [],
            cascaderValue7: [],
            cascaderValue8: [],
            cascaderValue9: [],
            cascaderValue10: [],
            options: [
                {
                    label: '福建省',
                    value: 'fujian',
                    children: [
                        {
                            label: '厦门市',
                            value: 'xiamen',
                            children: [
                                {
                                    label: '集美区',
                                    value: 'jimei'
                                },
                                {
                                    label: '思明区',
                                    value: 'siming'
                                }
                            ]
                        },
                        {
                            label: '福州市',
                            value: 'fuzhou',
                            children: [
                                {
                                    label: '闽侯县',
                                    value: 'minhou'
                                },
                                {
                                    label: '鼓楼区',
                                    value: 'gulou'
                                }
                            ]
                        },
                    ]
                },
                {
                    label: '广西',
                    value: 'guangxi',
                    children: [
                        {
                            label: '玉林市',
                            value: 'yulin',
                            children: [
                                {
                                    label: '玉州区',
                                    value: 'yuzhouqu'
                                },
                                {
                                    label: '福绵区',
                                    value: 'fumian'
                                }
                            ]
                        },
                        {
                            label: '南宁市',
                            value: 'nanning',
                            children: [
                                {
                                    label: '青秀区',
                                    value: 'qingxiu'
                                },
                                {
                                    label: '良庆区',
                                    value: 'liangqing'
                                }

                            ]
                        },
                    ]
                },
            ]
        })
        return{
            ...toRefs(data),
        }
    }
})
</script>

<style scoped lang="scss">
.demo-cascader:not(:last-child){
    margin-bottom: 20px;
}
</style>