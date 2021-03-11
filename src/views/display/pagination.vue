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
                事件 <b>change</b> 有两个参数，第一个是变化类型，第二个是变化后的值。
            </div>

            <div class="demo-pagination">
                <p>变化类型： {{type}}，变化值后的值：{{val}}</p>
                <f-pagination
                    :total="total"
                    :pageSize="pageSize"
                    :page="page"
                    @change="updatePage"
                ></f-pagination>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-pagination
        :total="total"
        :pageSize="pageSize"
        :page="page"
        @change="updatePage"
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
                total: 50,
                type: '',
                val: 1
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
                对其设置属性 <b>btn-size</b> 可以控制分页器的尺寸。
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
                ></f-pagination>
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
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs
} from 'vue'
import FPagination from '/@/views/components/Pagination.vue'

export default defineComponent({
    components: {
        FPagination
    },
    setup () {
        const data = reactive({
            page: 1,
            pageSize: 10,
            total: 50,
            type: '',
            val: 1
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
