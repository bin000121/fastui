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
                其中格式化函数接收一个参数，参数即为选中的label组成的数组。
            </div>

            <div class="demo-cascader">
                <p>1.separator：</p>
                <f-cascader
                    v-model:value="cascaderValue2"
                    :options="options"
                    separator="-"
                />
            </div>
            <div class="demo-cascader">
                <p>2.format：</p>
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
                <p>清空次数： {{ num }}</p>
                <f-cascader
                    v-model:value="cascaderValue8"
                    :options="options"
                    @clear="handleClear"
                    clearable
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>清空次数： \{\{ num \}\}</p>
    <f-cascader
        v-model:value="cascaderValue"
        :options="options"
        clearable
        @clear="handleClear"
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
                num: 0,
                cascaderValue: []
            })
            const handleClear = () => {
                data.num++
            }
            return{
                handleClear,
                ...toRefs(data)
            }
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

        <div>
            <h3 id="jin_yong">禁用
                <a href="#jin_yong" class="f-icon-anchor"></a>
            </h3>
            <p>为级联选择器或其选项添加禁用样式，您不可以与之交互。</p>

            <div class="demo-cascader">
                <p>1.禁用整体</p>
                <f-cascader
                    v-model:value="cascaderValue11"
                    :options="options"
                    disabled
                />
            </div>

            <div class="demo-cascader">
                <p>2.禁用选项</p>
                <f-cascader
                    v-model:value="cascaderValue11"
                    :options="options2"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>1.禁用整体</p>
    <f-cascader
        v-model:value="cascaderValue"
        :options="options"
        disabled
    />
    <p>2.禁用选项</p>
    <f-cascader
        v-model:value="cascaderValue"
        :options="options2"
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
                                disabled: true,
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
                                        value: 'minhou',
                                        disabled: true,
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
                                disabled: true,
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
                                        value: 'qingxiu',
                                        disabled: true,
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
            <h3 id="zui_hou_yi_ji">只显示最后一级
                <a href="#zui_hou_yi_ji" class="f-icon-anchor"></a>
            </h3>
            <p>级联选择器只显示您选择的最后一级。</p>

            <div class="desc">
                设置属性 <b>only-show-last</b> 即可生效。
            </div>

            <div>
                <f-cascader
                    v-model:value="cascaderValue12"
                    :options="options"
                    only-show-last
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-cascader
        v-model:value="cascaderValue"
        :options="options"
        only-show-last
    />`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="xuan_ze_ji_jie_guo">选择即停下
                <a href="#xuan_ze_ji_jie_guo" class="f-icon-anchor"></a>
            </h3>
            <p>不必选择到最后一级，您可以在任意一级的选择停下，这可能需要你通过点击外部来关闭选择面板。</p>

            <div class="desc">
                设置属性 <b>stop-on-select</b> 即可生效，在此模式下，触发方式将锁定为<b>click</b>。
            </div>

            <div>
                <p>当前选中：{{cascaderValue13}}</p>
                <f-cascader
                    v-model:value="cascaderValue13"
                    :options="options"
                    stop-on-select
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>当前选中：\{\{cascaderValue\}\}</p>
    <f-cascader
        v-model:value="cascaderValue"
        :options="options"
        stop-on-select
    />`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ke_sou_suo">可搜索
                <a href="#ke_sou_suo" class="f-icon-anchor"></a>
            </h3>
            <p>输入关键字进行搜索并返回符合条件的选项。</p>

            <div class="desc">
                为其设置属性 <b>filterable</b> 即可开启搜索模式，同时再设置属性 <b>keyword-highlight</b> 可以使得关键字高亮。
            </div>
            <div class="demo-cascader">
                <p>当前选中：{{ cascaderValue14 }}</p>
                <f-cascader
                    v-model:value="cascaderValue14"
                    :options="options"
                    filterable
                    clearable
                    keyword-highlight
                />
            </div>

            <div class="desc">
                在搜索模式下，可以配合自定义过滤函数 <b>filter-function</b> 进行搜索，
                该函数有两个参数，第一个参数为某条从根节点到末尾节点路径上的全部label组成的数组经自定义显示格式化后的字符串
                （以该数据源、默认分隔符为例，那么其中一条路径为：“福建省 / 厦门市 / 集美区”），第二个参数为输入的关键字
                ，该函数必须返回一个布尔值以表示是否匹配。
            </div>

            <div>
                <p>当前选中：{{ cascaderValue15 }}</p>
                <f-cascader
                    v-model:value="cascaderValue15"
                    :options="options"
                    filterable
                    :filter-function="filterFunction"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>当前选中：\{\{ cascaderValue \}\}</p>
    <f-cascader
        v-model:value="cascaderValue"
        :options="options"
        filterable
    />

    <p>当前选中：\{\{ cascaderValue2 \}\}
    <f-cascader
        v-model:value="cascaderValue2"
        :options="options"
        filterable
        :filter-function="filterFunction"
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

            // 是以该关键词开头的选项
            const filterFunction = (labelFormat: string, keyword: string) => {
                return labelFormat.startsWith(keyword)
            }
            return{
                filterFunction,
                ...toRefs(data)
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="dong_tai_jia_zai">动态加载
                <a href="#dong_tai_jia_zai" class="f-icon-anchor"></a>
            </h3>
            <p>级联选择器可以动态加载数据源，这可以满足您对异步请求的需求。</p>
            <div class="desc">
                注意：动态加载下 <b>filterable</b> 模式将不起作用，此外请给 <b>options</b> 传递一个初始数据源。
            </div>
            <div class="demo-cascader">
                <p>当前选中： {{cascaderValue16}}</p>
                <f-cascader
                    v-model:value="cascaderValue16"
                    :options="options4"
                    :async-load="asyncLoad"
                />
            </div>
            <div v-highlight>
                <pre><code>
    {{`<p>当前选中： \{\{cascaderValue\}\}</p>
    <f-cascader
        v-model:value="cascaderValue"
        :options="options"
        :async-load="asyncLoad"
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
                    },
                    {
                        label: '广西',
                        value: 'guangxi',
                    }
                ],
            })

            const guangxi = [
                {
                    label: '玉林市',
                    value: 'yulin'
                },
                {
                    label: '南宁市',
                    value: 'nanning',
                }
            ]

            const yulin = [
                {
                    label: '玉州区',
                    value: 'yuzhouqu'
                },
                {
                    label: '福绵区',
                    value: 'fumian'
                }
            ]

            const nanning = [
                {
                    label: '青秀区',
                    value: 'qingxiu'
                },
                {
                    label: '良庆区',
                    value: 'liangqing'
                }

            ]

            const fujian = [
                {
                    label: '厦门市',
                    value: 'xiamen'
                },
                {
                    label: '福州市',
                    value: 'fuzhou'
                }
            ]

            const xiamen = [
                {
                    label: '集美区',
                    value: 'jimei'
                },
                {
                    label: '思明区',
                    value: 'siming'
                }
            ]

            const fuzhou = [
                {
                    label: '闽侯县',
                    value: 'minhou'
                },
                {
                    label: '鼓楼区',
                    value: 'gulou'
                }
            ]

            interface OptionsData {
                value: string | number;
                label?: string;
                children?: OptionsData[];
                disabled?: boolean;
                level: number;

                [key: string]: any;
            }

            interface Callback {
                (nextOption: OptionsData[], isHasChildren: boolean): void
            }

            interface AsyncLoad {
                (currentItem: OptionsData, callback: Callback): void
            }

            const asyncLoad: AsyncLoad = (currentItem, callback) => {
                // 这里可以发起异步请求向后端拿数据，现在假设这个res就是向后端拿到的。
                const { value, level } = currentItem
                let res = resObj[value] ?? []
                setTimeout(() => {
                    callback(res, level < 2)
                }, 1500)
            }

            return{
                asyncLoad,
                ...toRefs(data)
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zi_ding_yi_zi_duan_ming">自定义字段名
                <a href="#zi_ding_yi_zi_duan_ming" class="f-icon-anchor"></a>
            </h3>
            <p>级联选择器可以自定义字段名，这可以应对后端返回的各种数据结构。</p>

            <div>
                <f-cascader
                    v-model:value="cascaderValue17"
                    :options="options3"
                    :props="props"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-cascader
        v-model:value="cascaderValue"
        :options="options"
        :props="props"
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
                        name: '福建省',
                        key: 'fujian',
                        items: [
                            {
                                name: '厦门市',
                                key: 'xiamen',
                                items: [
                                    {
                                        name: '集美区',
                                        key: 'jimei',
                                        unusable: true
                                    },
                                    {
                                        name: '思明区',
                                        key: 'siming'
                                    }
                                ]
                            },
                            {
                                name: '福州市',
                                key: 'fuzhou',
                                items: [
                                    {
                                        name: '闽侯县',
                                        key: 'minhou',
                                        unusable: true
                                    },
                                    {
                                        name: '鼓楼区',
                                        key: 'gulou'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        name: '广西',
                        key: 'guangxi',
                        items: [
                            {
                                name: '玉林市',
                                key: 'yulin',
                                items: [
                                    {
                                        name: '玉州区',
                                        key: 'yuzhouqu'
                                    },
                                    {
                                        name: '福绵区',
                                        key: 'fumian'
                                    }
                                ]
                            },
                            {
                                name: '南宁市',
                                key: 'nanning',
                                unusable: true,
                                items: [
                                    {
                                        name: '青秀区',
                                        key: 'qingxiu'
                                    },
                                    {
                                        name: '良庆区',
                                        key: 'liangqing'
                                    }

                                ]
                            },
                        ]
                    },
                ]
            })
            const props = {
                label: 'name',
                value: 'key',
                children: 'items',
                disabled: 'unusable'
            }
            return{
                props,
                ...toRefs(data)
            }
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
            num: 0,
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
            cascaderValue11: [],
            cascaderValue12: [],
            cascaderValue13: [],
            cascaderValue14: [],
            cascaderValue15: [],
            cascaderValue16: [],
            cascaderValue17: [],
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
            ],
            options2: [
                {
                    label: '福建省',
                    value: 'fujian',
                    children: [
                        {
                            label: '厦门市',
                            value: 'xiamen',
                            disabled: true,
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
                                    value: 'minhou',
                                    disabled: true,
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
                            disabled: true,
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
                                    value: 'qingxiu',
                                    disabled: true,
                                },
                                {
                                    label: '良庆区',
                                    value: 'liangqing'
                                }

                            ]
                        },
                    ]
                },
            ],
            options3: [
                {
                    name: '福建省',
                    key: 'fujian',
                    items: [
                        {
                            name: '厦门市',
                            key: 'xiamen',
                            items: [
                                {
                                    name: '集美区',
                                    key: 'jimei',
                                    unusable: true
                                },
                                {
                                    name: '思明区',
                                    key: 'siming'
                                }
                            ]
                        },
                        {
                            name: '福州市',
                            key: 'fuzhou',
                            items: [
                                {
                                    name: '闽侯县',
                                    key: 'minhou',
                                    unusable: true
                                },
                                {
                                    name: '鼓楼区',
                                    key: 'gulou'
                                }
                            ]
                        },
                    ]
                },
                {
                    name: '广西',
                    key: 'guangxi',
                    items: [
                        {
                            name: '玉林市',
                            key: 'yulin',
                            items: [
                                {
                                    name: '玉州区',
                                    key: 'yuzhouqu'
                                },
                                {
                                    name: '福绵区',
                                    key: 'fumian'
                                }
                            ]
                        },
                        {
                            name: '南宁市',
                            key: 'nanning',
                            unusable: true,
                            items: [
                                {
                                    name: '青秀区',
                                    key: 'qingxiu'
                                },
                                {
                                    name: '良庆区',
                                    key: 'liangqing'
                                }

                            ]
                        },
                    ]
                },
            ],
            options4: [
                {
                    label: '福建省',
                    value: 'fujian',
                },
                {
                    label: '广西',
                    value: 'guangxi',
                }
            ],
        })

        const handleClear = () => {
            data.num++
        }

        // 必须以该关键词开头的选项
        const filterFunction = (labelFormat: string, keyword: string) => {
            return labelFormat.startsWith(keyword)
        }

        const guangxi = [
            {
                label: '玉林市',
                value: 'yulin'
            },
            {
                label: '南宁市',
                value: 'nanning',
            },
        ]
        const yulin = [
            {
                label: '玉州区',
                value: 'yuzhouqu'
            },
            {
                label: '福绵区',
                value: 'fumian'
            }
        ]
        const nanning = [
            {
                label: '青秀区',
                value: 'qingxiu'
            },
            {
                label: '良庆区',
                value: 'liangqing'
            }

        ]
        const fujian = [
            {
                label: '厦门市',
                value: 'xiamen'
            },
            {
                label: '福州市',
                value: 'fuzhou'
            },
        ]
        const xiamen = [
            {
                label: '集美区',
                value: 'jimei'
            },
            {
                label: '思明区',
                value: 'siming'
            }
        ]
        const fuzhou = [
            {
                label: '闽侯县',
                value: 'minhou'
            },
            {
                label: '鼓楼区',
                value: 'gulou'
            }
        ]

        const resObj: any = {
            fujian,
            xiamen,
            fuzhou,
            guangxi,
            yulin,
            nanning
        }

        const props = {
            label: 'name',
            value: 'key',
            children: 'items',
            disabled: 'unusable'
        }

        interface OptionsData {
            value: string | number;
            label?: string;
            children?: OptionsData[];
            disabled?: boolean;
            level: number;

            [key: string]: any;
        }

        interface Callback {
            (nextOption: OptionsData[], isHasChildren: boolean): void
        }

        interface AsyncLoad {
            (currentItem: OptionsData, callback: Callback): void
        }

        const asyncLoad: AsyncLoad = (currentItem, callback) => {
            // 这里可以发起异步请求向后端拿数据，现在假设这个res就是向后端拿到的。
            const { value, level } = currentItem
            let res = resObj[value] ?? []
            setTimeout(() => {
                callback(res, level < 2)
            }, 1500)
        }

        return{
            props,
            handleClear,
            asyncLoad,
            filterFunction,
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