<template>
    <div class="select">
        <h2>Select 下拉框</h2>
        <p>表单中常用的选择组件。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>基本用法</p>

            <div class="demo-select">
                <p>当前选中：{{select}}</p>
                <f-select v-model:value="select">
                    <f-option
                        v-for="item in 5"
                        :key="item"
                        :label="'label-'+item"
                        :value="'value-'+ item"
                    />
                </f-select>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>当前选中：\{\{select\}\}</p>

    <f-select v-model:value="select">
        <f-option
            v-for="item in 5"
            :key="item"
            :label="'label-'+item"
            :value="'value-'+ item"
        />
    </f-select>

    <script lang="ts">
    import {
        defineComponent,
        toRefs,
        reactive
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                select: ''
            })
            return {
                ...toRefs(data)
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ke_qing_kong">可清空
                <a href="#ke_qing_kong" class="f-icon-anchor"></a>
            </h3>
            <p>鼠标移动到后面下拉标志处会呈现出清空按钮。</p>

            <div class="demo-select">
                <p>当前选中：{{select2}}</p>
                <f-select v-model:value="select2" clearable>
                    <f-option
                        v-for="item in 5"
                        :key="item"
                        :label="'label-'+item"
                        :value="'value-'+ item"
                    />
                </f-select>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>当前选中：\{\{select\}\}</p>

    <f-select v-model:value="select" clearable>
        <f-option
            v-for="item in 5"
            :key="item"
            :label="'label-'+item"
            :value="'value-'+ item"
        />
    </f-select>

    <script lang="ts">
    import {
        defineComponent,
        toRefs,
        reactive
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                select: ''
            })
            return {
                ...toRefs(data)
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zhi_du">只读
                <a href="#zhi_du" class="f-icon-anchor"></a>
            </h3>
            <p>下拉框无法与您进行交互，他看起来和正常的模样一致。</p>

            <div class="demo-select">
                <f-select readonly>
                    <f-option label="111" value="222"></f-option>
                    <f-option label="222" value="222"></f-option>
                    <f-option label="333" value="333"></f-option>
                </f-select>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-select readonly>
        <f-option label="111" value="222"></f-option>
        <f-option label="222" value="222"></f-option>
        <f-option label="333" value="333"></f-option>
    </f-select>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chi_cun">尺寸
                <a href="#chi_cun" class="f-icon-anchor"></a>
            </h3>
            <p>下拉框拥有三种尺寸。</p>

            <div class="desc">
                属性 <b>size</b> 默认是 default
            </div>

            <div class="demo-select-size">
                <f-select size="small">
                    <f-option label="111" value="222"></f-option>
                    <f-option label="222" value="222"></f-option>
                    <f-option label="333" value="333"></f-option>
                </f-select>
                <f-select size="default">
                    <f-option label="111" value="222"></f-option>
                    <f-option label="222" value="222"></f-option>
                    <f-option label="333" value="333"></f-option>
                </f-select>

                <f-select size="large">
                    <f-option label="111" value="222"></f-option>
                    <f-option label="222" value="222"></f-option>
                    <f-option label="333" value="333"></f-option>
                </f-select>
            </div>


            <div v-highlight>
                <pre><code>
    {{`<div class="demo-select-size">
        <f-select size="small">
            <f-option label="111" value="222"></f-option>
            <f-option label="222" value="222"></f-option>
            <f-option label="333" value="333"></f-option>
        </f-select>

        <f-select size="default">
            <f-option label="111" value="222"></f-option>
            <f-option label="222" value="222"></f-option>
            <f-option label="333" value="333"></f-option>
        </f-select>

        <f-select size="large">
            <f-option label="111" value="222"></f-option>
            <f-option label="222" value="222"></f-option>
            <f-option label="333" value="333"></f-option>
        </f-select>
    </div>


    <style>
        .demo-select .f-select{
            width: 200px;
        }

        .demo-select-size .f-select + .demo-select-size .f-select{
            margin-left: 30px;
        }
    </style>
                    `}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jin_yong">禁用
                <a href="#jin_yong" class="f-icon-anchor"></a>
            </h3>
            <p>下拉框无法与您进行交互，并添加禁用样式。</p>

            <div class="desc">
                对select设置禁用。
            </div>

            <div class="demo-select">
                <f-select disabled>
                    <f-option label="111" value="111"></f-option>
                    <f-option label="222" value="222"></f-option>
                    <f-option label="333" value="333"></f-option>
                </f-select>
            </div>

            <div class="desc">
                对option设置禁用。
            </div>

            <div class="demo-select">
                <f-select>
                    <f-option label="111" value="111"></f-option>
                    <f-option label="222" value="222" disabled></f-option>
                    <f-option label="333" value="333"></f-option>
                </f-select>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-select disabled>
        <f-option label="111" value="111"></f-option>
        <f-option label="222" value="222"></f-option>
        <f-option label="333" value="333"></f-option>
    </f-select>

    <f-select>
        <f-option label="111" value="111"></f-option>
        <f-option label="222" value="222" disabled></f-option>
        <f-option label="333" value="333"></f-option>
    </f-select>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ke_duo_xuan">可多选
                <a href="#ke_duo_xuan" class="f-icon-anchor"></a>
            </h3>
            <p>可以从已有的项目中选择多项。</p>

            <div class="desc">
                设置属性 <b>multiple</b> 即可变成多选模式。
            </div>

            <div class="demo-select">
                <p>当前选中：{{select3}}</p>
                <f-select v-model:value="select3" clearable multiple>
                    <f-option
                        v-for="item in 15"
                        :key="item"
                        :label="'label-'+item"
                        :value="'value-'+ item"
                    />
                </f-select>
            </div>

            <div class="desc">
                在 <b>multiple</b> 模式下，可以设置属性 <b>fold-tag</b> 来使得选中项折叠。
            </div>

            <div class="demo-select">
                <f-select v-model:value="select3" clearable multiple fold-tag>
                    <f-option
                        v-for="item in 15"
                        :key="item"
                        :label="'label-'+item"
                        :value="'value-'+ item"
                    />
                </f-select>
            </div>

            <div class="desc">
                在 <b>multiple</b> 模式下，可以设置属性 <b>remove-check-icon</b> 来移除option后面的✔图标。
            </div>

            <div class="demo-select">
                <f-select v-model:value="select3" clearable multiple fold-tag remove-check-icon>
                    <f-option
                        v-for="item in 15"
                        :key="item"
                        :label="'label-'+item"
                        :value="'value-'+ item"
                    />
                </f-select>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>当前选中：\{\{select\}\}</p>

    <f-select
        v-model:value="select"
        clearable
        multiple
    >
        <f-option
            v-for="item in 15"
            :key="item"
            :label="'label-'+item"
            :value="'value-'+ item"
        ></f-option>
    </f-select>

     <f-select
         v-model:value="select"
         clearable
         multiple
         fold-tag
     >
         <f-option
             v-for="item in 15"
             :key="item"
             :label="'label-'+item"
             :value="'value-'+ item"
         ></f-option>
     </f-select>

    <f-select
        v-model:value="select"
        clearable
        multiple
        fold-tag
        remove-check-icon
    >
        <f-option
            v-for="item in 15"
            :key="item"
            :label="'label-'+item"
            :value="'value-'+ item"
        />
    </f-select>


    <script lang="ts">
    import {
        defineComponent,
        toRefs,
        reactive
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                select: ['value-1']
            })
            return {
                ...toRefs(data)
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="xian_zhi_shu_liang">限制数量
                <a href="#xian_zhi_shu_liang" class="f-icon-anchor"></a>
            </h3>
            <p>多选模式下限制选择的最大数目。</p>

            <div class="desc">
                设置属性 <b>multiple-limit</b> 即可开启限制，0或负数将不限制。
            </div>

            <div class="desc">
                以下是限制数为5的例子。
            </div>

            <div class="demo-select">
                <p>当前选中：{{select4}}</p>
                <f-select v-model:value="select4" clearable multiple :multiple-limit="5">
                    <f-option
                        v-for="item in 15"
                        :key="item"
                        :label="'label-'+item"
                        :value="'value-'+ item"
                    />
                </f-select>
            </div>


            <div v-highlight>
                <pre><code>
    {{`<p>当前选中：\{\{select\}\}</p>

    <f-select
        v-model:value="select"
        clearable
        multiple
        :multiple-limit="5"
    >
        <f-option
            v-for="item in 5"
            :key="item"
            :label="'label-'+item"
            :value="'value-'+ item"
        />
    </f-select>

    <script lang="ts">
    import {
        defineComponent,
        toRefs,
        reactive
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                select: []
            })
            return {
                ...toRefs(data)
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ke_sou_suo">可搜索
                <a href="#ke_sou_suo" class="f-icon-anchor"></a>
            </h3>
            <p>可以使用检索功能从已有选项中快速查找。</p>

            <div class="desc">
                设置属性 <b>filterable</b> 即可。
            </div>

            <div class="demo-select">
                <p>当前选中：{{select5}}</p>
                <f-select v-model:value="select5" clearable filterable>
                    <f-option
                        v-for="item in area"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </f-select>
            </div>

            <div class="demo-select">
                <p>当前选中：{{select6}}</p>
                <f-select v-model:value="select6" clearable filterable multiple>
                    <f-option
                        v-for="item in area"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </f-select>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>当前选中：\{\{select\}\}</p>

    <f-select v-model:value="select" clearable filterable>
        <f-option
            v-for="item in area"
            :key="item"
            :label="item"
            :value="item"
        />
    </f-select>

    <script lang="ts">
    import {
        defineComponent,
        toRefs,
        reactive
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                select: '',
                select2: [''],
                area: [
                    '北京',
                    '上海',
                    '广州',
                    '深圳',
                    '东莞',
                    '佛山',
                    '重庆',
                    '南京',
                    '杭州',
                    '武汉',
                    '天津',
                    '厦门',
                    '福州',
                    '泉州',
                    '漳州',
                    '石家庄',
                    '青岛',
                    '桂林',
                    '南宁',
                    '柳州',
                    '长沙',
                    '贵州',
                    '昆明',
                    '三亚',
                    '郑州'
                ],
            })
            return {
                ...toRefs(data)
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zi_ding_yi_mo_ban">自定义模板
                <a href="#zi_ding_yi_mo_ban" class="f-icon-anchor"></a>
            </h3>
            <p>使用插槽来自定义展示模板。</p>

            <div class="desc">选项为空时。</div>

            <div class="demo-select">
                <f-select v-model:value="select7">
                    <f-option
                            v-for="item in []"
                            :key="item"
                            :label="item"
                            :value="item"
                    ></f-option>
                    <template #empty>
                        <div style="text-align:center;">
                            <b>空的空的空的</b>
                            <span style="margin-left: 10px;color: red">没有东西！</span>
                        </div>
                    </template>
                </f-select>
            </div>

            <div class="desc">自定义头部。</div>

            <div class="demo-select">
                <f-select v-model:value="select7">
                    <f-option
                        v-for="item in area"
                        :key="item"
                        :label="item"
                        :value="item"
                    ></f-option>
                    <template #prefix>
                        <i class="f-icon-map"></i>
                    </template>
                </f-select>
            </div>

            <div class="desc">自定义option。</div>

            <div class="demo-select">
                <p>当前选中：{{select7}}</p>
                <f-select v-model:value="select7">
                    <f-option
                        v-for="item in area"
                        :key="item"
                        :label="item"
                        :value="item"
                    >
                        <template #default>
                            <span>{{configLabel(item)}}</span>
                        </template>
                    </f-option>
                </f-select>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div>选项为空时。</div>
    <f-select v-model:value="select">
        <f-option
            v-for="item in []"
            :key="item"
            :label="item"
            :value="item"
        />
        <template #empty>
            <div style="text-align:center;">
                <b>空的空的空的</b>
                <span style="margin-left: 10px;color: red">没有东西！</span>
            </div>
        </template>
    </f-select>

    <div>自定义头部，建议内容不要太多！</div>
    <f-select v-model:value="select">
        <f-option
            v-for="item in area"
            :key="item"
            :label="item"
            :value="item"
        ></f-option>
        <template #prefix>
            <i class="f-icon-map"></i>
        </template>
    </f-select>

    <div>自定义选项内容。</div>
    <p>当前选中：\{\{select\}\}</p>

    <f-select v-model:value="select">
        <f-option
            v-for="item in area"
            :key="item"
            :label="item"
            :value="item"
        >
            <template #default>
                <span>\{\{configLabel(item)\}\}</span>
            </template>
        </f-option>
    </f-select>


    <script lang="ts">
    import {
        defineComponent,
        toRefs,
        reactive,
        computed
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                select: '',
                area: [
                    '北京',
                    '上海',
                    '广州',
                    '深圳',
                    '东莞',
                    '佛山',
                    '重庆',
                    '南京',
                    '杭州',
                    '武汉',
                    '天津',
                    '厦门',
                    '福州',
                    '泉州',
                    '漳州',
                    '石家庄',
                    '青岛',
                    '桂林',
                    '南宁',
                    '柳州',
                    '长沙',
                    '贵州',
                    '昆明',
                    '三亚',
                    '郑州'
                ],
            })
            const configLabel = computed(() => {
                const gd = ['广州', '深圳','东莞','佛山']
                const gx = ['南宁', '桂林','柳州']
                const fj = ['福州', '厦门','泉州','漳州']
                return (label: string) => {
                    if (gd.includes(label)) return '广东省 - ' + label
                    if (gx.includes(label)) return '广西壮族自治区 - ' + label
                    if (fj.includes(label)) return '福建省 - ' + label
                    return '中国城市 - ' + label
                }
            })
            return {
                ...toRefs(data),
                configLabel
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="duo_xuan_fen_zu">多选分组
                <a href="#duo_xuan_fen_zu" class="f-icon-anchor"></a>
            </h3>
            <p>可以将选项进行分组，用于突出选项间的所属关系。</p>

            <div class="demo-select">
                <p>当前选中：{{select8}}</p>
                <f-select v-model:value="select8">
                    <f-select-group
                        v-for="item in group"
                        :key="item.groupName"
                        :group-name="item.groupName"
                    >
                        <f-option
                            v-for="item2 in item.options"
                            :key="item2.value"
                            :label="item2.label"
                            :value="item2.value"
                        />
                    </f-select-group>
                </f-select>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>当前选中：\{\{select\}\}</p>

    <f-select v-model:value="select">
        <f-select-group
            v-for="item in group"
            :key="item.groupName"
            :group-name="item.groupName"
        >
            <f-option
                v-for="item2 in item.options"
                :key="item2.value"
                :label="item2.label"
                :value="item2.value"
            />
        </f-select-group>
    </f-select>


    <script lang="ts">
        import {
            defineComponent,
            toRefs,
            reactive
        } from 'vue'

        export default defineComponent({
            setup () {
                const data = reactive({
                    select: '',
                    group: [
                        {
                            groupName: '江苏省',
                            options: [
                                {
                                    label: '苏州',
                                    value: '苏州',
                                },
                                {
                                    label: '徐州',
                                    value: '徐州',
                                },
                                {
                                    label: '无锡',
                                    value: '无锡',
                                },
                                {
                                    label: '南京',
                                    value: '南京',
                                },
                                {
                                    label: '杭州',
                                    value: '杭州',
                                },
                                {
                                    label: '扬州',
                                    value: '扬州',
                                }
                            ]
                        },
                        {
                            groupName: '广东省',
                            options: [
                                {
                                    label: '广州',
                                    value: '广州',
                                },
                                {
                                    label: '深圳',
                                    value: '深圳',
                                },
                                {
                                    label: '东莞',
                                    value: '东莞',
                                },
                                {
                                    label: '佛山',
                                    value: '佛山',
                                }
                            ]
                        },
                        {
                            groupName: '福建省',
                            options: [
                                {
                                    label: '厦门',
                                    value: '厦门',
                                },
                                {
                                    label: '福州',
                                    value: '福州',
                                },
                                {
                                    label: '泉州',
                                    value: '泉州',
                                },
                                {
                                    label: '漳州',
                                    value: '漳州',
                                }
                            ]
                        },
                        {
                            groupName: '广西壮族自治区',
                            options: [
                                {
                                    label: '南宁',
                                    value: '南宁',
                                },
                                {
                                    label: '桂林',
                                    value: '桂林',
                                },
                                {
                                    label: '柳州',
                                    value: '柳州',
                                },
                                {
                                    label: '玉林',
                                    value: '玉林',
                                }
                            ]
                        }
                    ],
                })
                return {
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
    toRefs,
    reactive,
    computed
} from 'vue'
import FSelect from '/@/views/packages/select/Select.vue'
import FSelectGroup from '/@/views/packages/select/Select-group.vue'
import FOption from '/@/views/packages/select/Select-option.vue'

export default defineComponent({
    components: {
        FSelect,
        FOption,
        FSelectGroup,
    },
    setup () {
        const data = reactive({
            select: '',
            select2: '',
            select3: ['value-1'],
            select4: [],
            select5: '',
            select6: ['福州'],
            select7: '北京',
            select8: '苏州',
            area: [
                '北京',
                '上海',
                '广州',
                '深圳',
                '东莞',
                '佛山',
                '重庆',
                '南京',
                '杭州',
                '武汉',
                '天津',
                '厦门',
                '福州',
                '泉州',
                '漳州',
                '石家庄',
                '青岛',
                '桂林',
                '南宁',
                '柳州',
                '长沙',
                '贵州',
                '昆明',
                '三亚',
                '郑州',
            ],
            group: [
                {
                    groupName: '江苏省',
                    options: [
                        {
                            label: '苏州',
                            value: '苏州',
                        },
                        {
                            label: '徐州',
                            value: '徐州',
                        },
                        {
                            label: '无锡',
                            value: '无锡',
                        },
                        {
                            label: '南京',
                            value: '南京',
                        },
                        {
                            label: '杭州',
                            value: '杭州',
                        },
                        {
                            label: '扬州',
                            value: '扬州',
                        }
                    ]
                },
                {
                    groupName: '广东省',
                    options: [
                        {
                            label: '广州',
                            value: '广州',
                        },
                        {
                            label: '深圳',
                            value: '深圳',
                        },
                        {
                            label: '东莞',
                            value: '东莞',
                        },
                        {
                            label: '佛山',
                            value: '佛山',
                        }
                    ]
                },
                {
                    groupName: '福建省',
                    options: [
                        {
                            label: '厦门',
                            value: '厦门',
                        },
                        {
                            label: '福州',
                            value: '福州',
                        },
                        {
                            label: '泉州',
                            value: '泉州',
                        },
                        {
                            label: '漳州',
                            value: '漳州',
                        }
                    ]
                },
                {
                    groupName: '广西壮族自治区',
                    options: [
                        {
                            label: '南宁',
                            value: '南宁',
                        },
                        {
                            label: '桂林',
                            value: '桂林',
                        },
                        {
                            label: '柳州',
                            value: '柳州',
                        },
                        {
                            label: '玉林',
                            value: '玉林',
                        }
                    ]
                }
            ],
        })

        const configLabel = computed(() => {
            const gd = ['广州', '深圳','东莞','佛山']
            const gx = ['南宁', '桂林','柳州']
            const fj = ['福州', '厦门','泉州','漳州']
            return (label: string) => {
                if (gd.includes(label)) return '广东省 - ' + label
                if (gx.includes(label)) return '广西壮族自治区 - ' + label
                if (fj.includes(label)) return '福建省 - ' + label
                return '中国城市 - ' + label
            }
        })
        return {
            ...toRefs(data),
            configLabel
        }
    }
})
</script>

<style scoped lang="scss">
.demo-select{
    margin-bottom: 30px;
    &:last-child{
        margin-bottom: 0;
    }
    .f-select{
        width: 250px;
    }
}
.demo-select-size{
    .f-select{
        width: 200px;
    }
    .f-select + .f-select{
        margin-left: 30px;
    }
}
</style>
