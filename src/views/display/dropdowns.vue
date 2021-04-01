<template>
    <div class="dropdowns">
        <h2>Dropdowns 下拉菜单</h2>
        <p>可以在可切换显示的容器内放置一组操作或菜单。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>基础使用示例。</p>

            <div>
                <f-dropdowns>
                    <span>下拉菜单
                        <i class="f-icon-arrow-down-bold"></i>
                    </span>
                    <template #dropdownMenu>
                        <f-dropdowns-item
                            v-for="item in area"
                            :key="item"
                        >{{item}}</f-dropdowns-item>
                    </template>
                </f-dropdowns>
            </div>

            <div class="desc">
                默认点击选项会隐藏选项面板，可以设置属性 <b>click-not-close</b> 来禁止该这一行为。
            </div>

            <div>
                <f-dropdowns click-not-close>
                    <span>下拉菜单
                        <i class="f-icon-arrow-down-bold"></i>
                    </span>
                    <template #dropdownMenu>
                        <f-dropdowns-item
                            v-for="item in area"
                            :key="item"
                        >{{item}}</f-dropdowns-item>
                    </template>
                </f-dropdowns>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-dropdowns>
        <span>下拉菜单
            <i class="f-icon-arrow-down-bold"></i>
        </span>
        <template #dropdownMenu>
            <f-dropdowns-item
                v-for="item in area"
                :key="item"
            >\{\{item\}\}</f-dropdowns-item>
        </template>
    </f-dropdowns>

    <f-dropdowns click-not-close>
        <span>下拉菜单
            <i class="f-icon-arrow-down-bold"></i>
        </span>
        <template #dropdownMenu>
            <f-dropdowns-item
                v-for="item in area"
                :key="item"
            >\{\{item\}\}</f-dropdowns-item>
        </template>
    </f-dropdowns>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                area: [
                    '北京',
                    '上海',
                    '广州',
                    '深圳',
                    '厦门',
                    '杭州'
                ]
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
            <h3 id="yi_chu_dong_hua">移除动画
                <a href="#yi_chu_dong_hua" class="f-icon-anchor"></a>
            </h3>
            <p>没有动画过渡效果，将直接展示。</p>

            <div>
                <f-dropdowns :animate="false">
                    <span>下拉菜单
                        <i class="f-icon-arrow-down-bold"></i>
                    </span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                        <f-dropdowns-item>厦门</f-dropdowns-item>
                        <f-dropdowns-item divided>杭州</f-dropdowns-item>
                    </template>
                </f-dropdowns>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-dropdowns :animate="false">
        <span>下拉菜单
            <i class="f-icon-arrow-down-bold"></i>
        </span>
        <template #dropdownMenu>
            <f-dropdowns-item>北京</f-dropdowns-item>
            <f-dropdowns-item>上海</f-dropdowns-item>
            <f-dropdowns-item>广州</f-dropdowns-item>
            <f-dropdowns-item>深圳</f-dropdowns-item>
            <f-dropdowns-item>厦门</f-dropdowns-item>
            <f-dropdowns-item divided>杭州</f-dropdowns-item>
        </template>
    </f-dropdowns>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chu_fa_fang_shi">触发方式
                <a href="#chu_fa_fang_shi" class="f-icon-anchor"></a>
            </h3>
            <p>组件拥有两种触发下拉菜单的方式。</p>

            <div class="desc">
                默认 <b>trigger</b> 方式为 click
            </div>

            <div>
                <f-dropdowns trigger="click">
                    <span>click触发
                        <i class="f-icon-arrow-down-bold"></i>
                    </span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                        <f-dropdowns-item>厦门</f-dropdowns-item>
                        <f-dropdowns-item>杭州</f-dropdowns-item>
                    </template>
                </f-dropdowns>

                <f-dropdowns trigger="hover">
                    <span>hover触发
                        <i class="f-icon-arrow-down-bold"></i>
                    </span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                        <f-dropdowns-item>厦门</f-dropdowns-item>
                        <f-dropdowns-item>杭州</f-dropdowns-item>
                    </template>
                </f-dropdowns>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-dropdowns trigger="click">
        <span>下拉菜单
            <i class="f-icon-arrow-down-bold"></i>
        </span>
        <template #dropdownMenu>
            <f-dropdowns-item>北京</f-dropdowns-item>
            <f-dropdowns-item>上海</f-dropdowns-item>
            <f-dropdowns-item>广州</f-dropdowns-item>
            <f-dropdowns-item>深圳</f-dropdowns-item>
            <f-dropdowns-item>厦门</f-dropdowns-item>
            <f-dropdowns-item>杭州</f-dropdowns-item>
        </template>
    </f-dropdowns>

    <f-dropdowns trigger="hover">
        <span>hover触发
            <i class="f-icon-arrow-down-bold"></i>
        </span>
        <template #dropdownMenu>
            <f-dropdowns-item>北京</f-dropdowns-item>
            <f-dropdowns-item>上海</f-dropdowns-item>
            <f-dropdowns-item>广州</f-dropdowns-item>
            <f-dropdowns-item>深圳</f-dropdowns-item>
            <f-dropdowns-item>厦门</f-dropdowns-item>
            <f-dropdowns-item>杭州</f-dropdowns-item>
        </template>
    </f-dropdowns>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="an_niu_yang_shi">按钮样式
                <a href="#an_niu_yang_shi" class="f-icon-anchor"></a>
            </h3>
            <p>为其添加按钮样式，使它看起来像一按钮。</p>


            <div>
                <f-dropdowns button>
                    <span>下拉菜单
                        <i class="f-icon-arrow-down-bold"></i>
                    </span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                        <f-dropdowns-item>厦门</f-dropdowns-item>
                        <f-dropdowns-item>杭州</f-dropdowns-item>
                    </template>
                </f-dropdowns>
            </div>


            <div v-highlight>
                <pre><code>
    {{`<f-dropdowns button>
        <span>下拉菜单
            <i class="f-icon-arrow-down-bold"></i>
        </span>
        <template #dropdownMenu>
            <f-dropdowns-item>北京</f-dropdowns-item>
            <f-dropdowns-item>上海</f-dropdowns-item>
            <f-dropdowns-item>广州</f-dropdowns-item>
            <f-dropdowns-item>深圳</f-dropdowns-item>
            <f-dropdowns-item>厦门</f-dropdowns-item>
            <f-dropdowns-item>杭州</f-dropdowns-item>
        </template>
    </f-dropdowns>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="chi_cun">尺寸
                <a href="#chi_cun" class="f-icon-anchor"></a>
            </h3>
            <p>下拉菜单在按钮样式下拥有三种不同的尺寸。</p>

            <div class="demo-dropdowns">
                <f-dropdowns size="small" button>
                    <span>小号样式
                        <i class="f-icon-arrow-down-bold"></i>
                    </span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                        <f-dropdowns-item>厦门</f-dropdowns-item>
                        <f-dropdowns-item>杭州</f-dropdowns-item>
                    </template>
                </f-dropdowns>

                <f-dropdowns size="default" button>
                    <span>默认大小
                        <i class="f-icon-arrow-down-bold"></i>
                    </span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                        <f-dropdowns-item>厦门</f-dropdowns-item>
                        <f-dropdowns-item>杭州</f-dropdowns-item>
                    </template>
                </f-dropdowns>

                <f-dropdowns size="large" button>
                    <span>大号样式
                        <i class="f-icon-arrow-down-bold"></i>
                    </span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                        <f-dropdowns-item>厦门</f-dropdowns-item>
                        <f-dropdowns-item>杭州</f-dropdowns-item>
                    </template>
                </f-dropdowns>
            </div>


            <div v-highlight>
                <pre><code>
    {{`<f-dropdowns size="small" button>
        <span>小号样式
            <i class="f-icon-arrow-down-bold"></i>
        </span>
        <template #dropdownMenu>
            <f-dropdowns-item>北京</f-dropdowns-item>
            <f-dropdowns-item>上海</f-dropdowns-item>
            <f-dropdowns-item>广州</f-dropdowns-item>
            <f-dropdowns-item>深圳</f-dropdowns-item>
            <f-dropdowns-item>厦门</f-dropdowns-item>
            <f-dropdowns-item>杭州</f-dropdowns-item>
        </template>
    </f-dropdowns>

    <f-dropdowns size="default" button>
        <span>默认大小
            <i class="f-icon-arrow-down-bold"></i>
        </span>
        <template #dropdownMenu>
            <f-dropdowns-item>北京</f-dropdowns-item>
            <f-dropdowns-item>上海</f-dropdowns-item>
            <f-dropdowns-item>广州</f-dropdowns-item>
            <f-dropdowns-item>深圳</f-dropdowns-item>
            <f-dropdowns-item>厦门</f-dropdowns-item>
            <f-dropdowns-item>杭州</f-dropdowns-item>
        </template>
    </f-dropdowns>

    <f-dropdowns size="large" button>
        <span>大号样式
            <i class="f-icon-arrow-down-bold"></i>
        </span>
        <template #dropdownMenu>
            <f-dropdowns-item>北京</f-dropdowns-item>
            <f-dropdowns-item>上海</f-dropdowns-item>
            <f-dropdowns-item>广州</f-dropdowns-item>
            <f-dropdowns-item>深圳</f-dropdowns-item>
            <f-dropdowns-item>厦门</f-dropdowns-item>
            <f-dropdowns-item>杭州</f-dropdowns-item>
        </template>
    </f-dropdowns>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jin_yong">禁用
                <a href="#jin_yong" class="f-icon-anchor"></a>
            </h3>
            <p>您不可以与其交互，并为其添加不可用样式。</p>

            <div class="desc">
                整体禁用。
            </div>

            <div>
                <f-dropdowns disabled>
                    <span>下拉菜单
                        <i class="f-icon-arrow-down-bold"></i>
                    </span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                        <f-dropdowns-item>厦门</f-dropdowns-item>
                        <f-dropdowns-item>杭州</f-dropdowns-item>
                    </template>
                </f-dropdowns>
            </div>

            <div class="desc">
                禁用选项。
            </div>

            <div>
                <f-dropdowns>
                    <span>下拉菜单
                        <i class="f-icon-arrow-down-bold"></i>
                    </span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item disabled>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                        <f-dropdowns-item disabled>厦门</f-dropdowns-item>
                        <f-dropdowns-item>杭州</f-dropdowns-item>
                    </template>
                </f-dropdowns>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div>整体整体。</div>
    <f-dropdowns :animate="false">
        <span>下拉菜单
            <i class="f-icon-arrow-down-bold"></i>
        </span>
        <template #dropdownMenu>
            <f-dropdowns-item>北京</f-dropdowns-item>
            <f-dropdowns-item>上海</f-dropdowns-item>
            <f-dropdowns-item>广州</f-dropdowns-item>
            <f-dropdowns-item>深圳</f-dropdowns-item>
            <f-dropdowns-item>厦门</f-dropdowns-item>
            <f-dropdowns-item>杭州</f-dropdowns-item>
        </template>
    </f-dropdowns>

    <div>整体选项。</div>
    <f-dropdowns>
        <span>下拉菜单
            <i class="f-icon-arrow-down-bold"></i>
        </span>
        <template #dropdownMenu>
            <f-dropdowns-item>北京</f-dropdowns-item>
            <f-dropdowns-item disabled>上海</f-dropdowns-item>
            <f-dropdowns-item>广州</f-dropdowns-item>
            <f-dropdowns-item>深圳</f-dropdowns-item>
            <f-dropdowns-item disabled>厦门</f-dropdowns-item>
            <f-dropdowns-item>杭州</f-dropdowns-item>
        </template>
    </f-dropdowns>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="shen_zhan_fang_xiang">伸展方向
                <a href="#shen_zhan_fang_xiang" class="f-icon-anchor"></a>
            </h3>
            <p>下拉菜单拥有6种不同的伸展方向。</p>

            <div class="desc">
                通过配置属性 <b>placement</b> 来实现。
            </div>

            <div class="demo-dropdowns" style="margin-bottom: 30px;">
                <f-dropdowns placement="top-left" button>
                    <span>top-left</span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                    </template>
                </f-dropdowns>

                <f-dropdowns placement="top-center" button>
                    <span>top-center</span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                    </template>
                </f-dropdowns>

                <f-dropdowns placement="top-right" button>
                    <span>top-right</span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                    </template>
                </f-dropdowns>
            </div>

            <div class="demo-dropdowns">
                <f-dropdowns placement="bottom-left" button>
                    <span>bottom-center</span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                    </template>
                </f-dropdowns>

                <f-dropdowns placement="bottom-center" button>
                    <span>bottom-center</span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                    </template>
                </f-dropdowns>

                <f-dropdowns placement="bottom-right" button>
                    <span>bottom-right</span>
                    <template #dropdownMenu>
                        <f-dropdowns-item>北京</f-dropdowns-item>
                        <f-dropdowns-item>上海</f-dropdowns-item>
                        <f-dropdowns-item>广州</f-dropdowns-item>
                        <f-dropdowns-item>深圳</f-dropdowns-item>
                    </template>
                </f-dropdowns>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-dropdowns placement="top-left" button>
        <span>top-left</span>
        <template #dropdownMenu>
            <f-dropdowns-item v-for="item in area" :key="item">\{\{item\}\}</f-dropdowns-item>
        </template>
    </f-dropdowns>

    <f-dropdowns placement="top-center" button>
        <span>top-center</span>
        <template #dropdownMenu>
            <f-dropdowns-item v-for="item in area" :key="item">\{\{item\}\}</f-dropdowns-item>
        </template>
    </f-dropdowns>

    <f-dropdowns placement="top-right" button>
        <span>top-right</span>
        <template #dropdownMenu>
            <f-dropdowns-item v-for="item in area" :key="item">\{\{item\}\}</f-dropdowns-item>
        </template>
    </f-dropdowns>

    <f-dropdowns placement="bottom-left" button>
        <span>bottom-center</span>
        <template #dropdownMenu>
            <f-dropdowns-item v-for="item in area" :key="item">\{\{item\}\}</f-dropdowns-item>
        </template>
    </f-dropdowns>

    <f-dropdowns placement="bottom-center" button>
        <span>bottom-center</span>
        <template #dropdownMenu>
            <f-dropdowns-item v-for="item in area" :key="item">\{\{item\}\}</f-dropdowns-item>
        </template>
    </f-dropdowns>

    <f-dropdowns placement="bottom-right" button>
        <span>bottom-right</span>
        <template #dropdownMenu>
            <f-dropdowns-item v-for="item in area" :key="item">\{\{item\}\}</f-dropdowns-item>
        </template>
    </f-dropdowns>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                area: [
                    '北京',
                    '上海',
                    '广州',
                    '深圳',
                ]
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
    toRefs
} from 'vue'
import FDropdowns from '/@/views/packages/dropdowns/Dropdowns.vue'
import FDropdownsItem from '/@/views/packages/dropdowns/Dropdowns-item.vue'

export default defineComponent({
    components: {
        FDropdowns,
        FDropdownsItem,
    },
    setup () {
        const data = reactive({
            area: [
                '北京',
                '上海',
                '广州',
                '深圳',
                '厦门',
                '杭州'
            ]
        })

        const c = (a: any) => {
            console.log(a)
        }

        const aaa = (data: any) => {
            console.log(data)
        }
        return{
            ...toRefs(data),
            c,
            aaa
        }
    }
})
</script>

<style scoped lang="scss">
.demo-dropdowns{
    .f-dropdowns + .f-dropdowns{
        margin-left: 30px;
    }
}
</style>
