<template>
    <div class="pagination">
        <h2>Pagination 分页器</h2>
        <p>当您的数据在一页中放不下时，使用分页器是很好的选择。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>可以对其监听change事件可以获得变化后的数据。</p>

            <div class="desc">
                您可以使用属性 <b>show-total</b> 、 <b>show-elevator</b> 和 <b>show-size-array</b> 来展现出总条目数、电梯、条目选择器。
            </div>

            <div class="desc">
                事件 <b>change</b> 有两个参数，第一个是变化类型，第二个是变化后的值。
            </div>

            <div class="demo-pagination">
                <p>变化类型： {{type}}，变化值后的值：{{val || ''}}</p>
<!--                <f-pagination-->
<!--                    :total="total"-->
<!--                    :pageSize="pageSize"-->
<!--                    :page="page"-->
<!--                    @change="updatePage"-->
<!--                />-->
<!--            </div>-->

<!--            <div class="demo-pagination">-->
                <f-pagination
                    :total="total"
                    :pageSize="pageSize"
                    :page="page"
                    show-total
                    show-elevator
                    show-size-array
                    :sizeArray="[10, 15, 20, 50]"
                    @change="updatePage"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>变化类型： \{\{type\}\}，变化值后的值：\{\{val || ''\}\}</p>

    <f-pagination
        :total="total"
        :pageSize="pageSize"
        :page="page"
        show-total
        show-elevator
        show-size-array
        :sizeArray="[10, 15, 20, 50]"
        @change="updatePage"
    />


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                page: 1,
                pageSize: 10,
                total: 50,
                type: '',
                val: 0
            })
            const updatePage = (type: string, val: number) => {
                data.type = type
                data.val = val
                if (type === 'page') data.page = val
                else data.pageSize = val
            }
            return{
                updatePage,
                ...toRefs(data)
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="yuan_su_shun_xu">元素顺序
                <a href="#yuan_su_shun_xu" class="f-icon-anchor"></a>
            </h3>
            <p>您可以自定义分页器内部元素的摆放顺序。</p>

            <div class="desc">
                配置属性 <b>order</b> 即可完成自定义。
            </div>
            <div class="desc">
                默认顺序：[ 'pagination', 'total', 'pages', 'elevator' ]
            </div>
            <div class="demo-pagination">
                <f-pagination
                    :total="50"
                    :page-size="10"
                    :page="1"
                    show-elevator
                    show-size-array
                    show-total
                    :order="['pagination', 'total', 'pages', 'elevator']"
                />

                <f-pagination
                    :total="50"
                    :page-size="10"
                    :page="1"
                    show-elevator
                    show-size-array
                    show-total
                    :order="['total', 'pagination', 'pages', 'elevator']"
                />

                <f-pagination
                    :total="50"
                    :page-size="10"
                    :page="1"
                    show-elevator
                    show-size-array
                    show-total
                    :order="['total', 'pages', 'pagination', 'elevator']"
                />
                <f-pagination
                    :total="50"
                    :page-size="10"
                    :page="1"
                    show-elevator
                    show-size-array
                    show-total
                    :order="['total', 'pages', 'elevator', 'pagination']"
                />
            </div>
            <div v-highlight>
                <pre><code>
    {{`<f-pagination
        :total="50"
        :page-size="10"
        :page="1"
        show-elevator
        show-size-array
        show-total
        :order="['pagination', 'total', 'pages', 'elevator']"
    />

    <f-pagination
        :total="50"
        :page-size="10"
        :page="1"
        show-elevator
        show-size-array
        show-total
        :order="['total', 'pagination', 'pages', 'elevator']"
    />

    <f-pagination
        :total="50"
        :page-size="10"
        :page="1"
        show-elevator
        show-size-array
        show-total
        :order="['total', 'pages', 'pagination', 'elevator']"
    />
    <f-pagination
        :total="50"
        :page-size="10"
        :page="1"
        show-elevator
        show-size-array
        show-total
        :order="['total', 'pages', 'elevator', 'pagination']"
    />`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jin_yong">禁用
                <a href="#jin_yong" class="f-icon-anchor"></a>
            </h3>
            <p>为分页器添加禁用样式，并且您不可用与之交互。</p>

            <div class="desc">
                为其设置 <b>disabled</b> 属性即可。
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="50"
                    :pageSize="10"
                    :page="1"
                    disabled
                ></f-pagination>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-pagination
        :total="50"
        :pageSize="10"
        :page="1"
        disabled
    ></f-pagination>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="yuan_xing">圆形
                <a href="#yuan_xing" class="f-icon-anchor"></a>
            </h3>
            <p>添加分页器按钮变成的圆形样式。</p>

            <div class="demo-pagination">
                <f-pagination
                    :total="50"
                    :pageSize="10"
                    :page="1"
                    circle
                    show-elevator
                    show-total
                    show-size-array
                ></f-pagination>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-pagination
        :total="50"
        :pageSize="10"
        :page="1"
        circle
        show-elevator
        show-total
        show-size-array
    ></f-pagination>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="wei_zhi">位置
                <a href="#wei_zhi" class="f-icon-anchor"></a>
            </h3>
            <p>分页器的按钮群在横向的排版方式。</p>

            <div class="desc">
                属性 <b>placement</b> 可以设置三个值，他们类似flex 布局中justify-content的值，默认值center。
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="50"
                    :pageSize="10"
                    :page="1"
                    placement="flex-start"
                ></f-pagination>
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="50"
                    :pageSize="10"
                    :page="1"
                    placement="center"
                ></f-pagination>
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="50"
                    :pageSize="10"
                    :page="1"
                    placement="flex-end"
                ></f-pagination>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-pagination
        :total="50"
        :pageSize="10"
        :page="1"
        placement="flex-start"
    ></f-pagination>

    <f-pagination
        :total="50"
        :pageSize="10"
        :page="1"
        placement="center"
    ></f-pagination>

    <f-pagination
        :total="50"
        :pageSize="10"
        :page="1"
        placement="flex-end"
    ></f-pagination>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chi_cun">尺寸
                <a href="#chi_cun" class="f-icon-anchor"></a>
            </h3>
            <p>分页器拥有3种大小。</p>

            <div class="desc">
                对其设置属性 <b>size</b> 可以控制分页器的尺寸。
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="50"
                    :pageSize="10"
                    :page="1"
                    size="small"
                ></f-pagination>
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="50"
                    :pageSize="10"
                    :page="1"
                >
                    <template #total>
                        <span>111</span>
                    </template>
                </f-pagination>
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="50"
                    :pageSize="10"
                    :page="1"
                    size="large"
                ></f-pagination>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-pagination
        :total="total"
        :pageSize="pageSize"
        :page="page"
        size="small"
    ></f-pagination>

    <f-pagination
        :total="total"
        :pageSize="pageSize"
        :page="page"
        size="default"
    ></f-pagination>

    <f-pagination
        :total="total"
        :pageSize="pageSize"
        :page="page"
        size="large"
    ></f-pagination>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                page: 1,
                pageSize: 10,
                total: 50
            })
            return{
                ...toRefs(data)
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="xian_zhi_chang_du">按钮个数
                <a href="#xian_zhi_chang_du" class="f-icon-anchor"></a>
            </h3>
            <p>您可以控制分页器中的按钮出现个数，当超出这个数值时将会被隐藏。</p>

            <div class="desc">
                通过设置属性 <b>limit</b> 来控制分页器中按钮的数量，默认数量为6, 最小6，最大为15，均为正整数。
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="1000"
                    :pageSize="10"
                    :page="1"
                    :limit="6"
                ></f-pagination>
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="1000"
                    :pageSize="10"
                    :page="1"
                    :limit="8"
                ></f-pagination>
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="1000"
                    :pageSize="10"
                    :page="1"
                    :limit="10"
                ></f-pagination>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-pagination
        :total="1000"
        :pageSize="10"
        :page="1"
        :limit="6"
    ></f-pagination>

    <f-pagination
        :total="1000"
        :pageSize="10"
        :page="1"
        :limit="8"
    ></f-pagination>

    <f-pagination
        :total="1000"
        :pageSize="10"
        :page="1"
        :limit="10"
    ></f-pagination>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="bu_chang">翻页步长
                <a href="#bu_chang" class="f-icon-anchor"></a>
            </h3>
            <p>您可以自定义分页器的翻页步长。</p>

            <div class="desc">
                通过设置属性 <b>step</b> 来控制分页器中的翻页步长，默认为5个, 最小5，最大为100，均为正整数。
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="1000"
                    :pageSize="10"
                    :page="1"
                    :step="5"
                ></f-pagination>
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="1000"
                    :pageSize="10"
                    :page="1"
                    :step="10"
                ></f-pagination>
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="1000"
                    :pageSize="10"
                    :page="1"
                    :step="15"
                ></f-pagination>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-pagination
        :total="1000"
        :pageSize="10"
        :page="1"
        :step="5"
    ></f-pagination>

    <f-pagination
        :total="1000"
        :pageSize="10"
        :page="1"
        :step="10"
    ></f-pagination>

    <f-pagination
        :total="1000"
        :pageSize="10"
        :page="1"
        :step="15"
    ></f-pagination>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="wen_ben">文本样式
                <a href="#wen_ben" class="f-icon-anchor"></a>
            </h3>
            <p>移除按钮的边框以及阴影效果，他看起和文本格式一样。</p>

            <div class="demo-pagination">
                <f-pagination
                    :total="200"
                    :page-size="10"
                    :page="1"
                    text
                    size="small"
                >
                </f-pagination>
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="200"
                    :page-size="10"
                    :page="1"
                    text
                    size="default"
                >
                </f-pagination>
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="200"
                    :page-size="10"
                    :page="1"
                    text
                    size="large"
                >
                </f-pagination>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-pagination
        :total="200"
        :page-size="10"
        :page="1"
        text
        size="small"
    >
    </f-pagination>

    <f-pagination
        :total="200"
        :page-size="10"
        :page="1"
        text
        size="default"
    >
    </f-pagination>

    <f-pagination
        :total="200"
        :page-size="10"
        :page="1"
        text
        size="large"
    >
    </f-pagination>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jian_jie">简洁分页器
                <a href="#jian_jie" class="f-icon-anchor"></a>
            </h3>
            <p>如果您觉得上述分页器过于冗长，您也可以使用简洁分页器。</p>

            <div class="demo-pagination">
                <f-pagination
                    :total="200"
                    :page-size="10"
                    :page="1"
                    simple
                    placement="flex-start"
                    show-elevator
                    show-total
                >
                </f-pagination>
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="200"
                    :page-size="10"
                    :page="1"
                    simple
                    text
                    placement="center"
                >
                </f-pagination>
            </div>

            <div class="demo-pagination">
                <f-pagination
                    :total="200"
                    :page-size="10"
                    :page="1"
                    simple
                    circle
                    placement="flex-end"
                    show-elevator
                >
                </f-pagination>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-pagination
        :total="200"
        :page-size="10"
        :page="1"
        text
        simple
        placement="flex-start"
        show-elevator
        show-total
    >
    </f-pagination>

    <f-pagination
        :total="200"
        :page-size="10"
        :page="1"
        simple
        text
        placement="center"
    >
    </f-pagination>

    <f-pagination
        :total="200"
        :page-size="10"
        :page="1"
        simple
        circle
        placement="flex-end"
        show-elevator
    >
    </f-pagination>`}}
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
import FPagination from '/@/views/packages/pagination/Pagination.vue'

export default defineComponent({
    components: {
        FPagination,
    },
    setup () {
        const data = reactive({
            page: 1,
            pageSize: 10,
            total: 50,
            type: '',
            val: 0
        })

        const updatePage = (type: string, val: number) => {
            data.type = type
            data.val = val
            if (type === 'page') data.page = val
            else data.pageSize = val
        }
        return{
            updatePage,
            ...toRefs(data)
        }
    }
})
</script>

<style scoped lang="scss">
.demo-pagination{
    margin-bottom: 15px;
    &:last-child{
        margin-bottom: 0;
    }
    p{
        color: #666;
    }
}
</style>
