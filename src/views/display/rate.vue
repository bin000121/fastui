<template>
    <div>
        <h2>Rate 评分</h2>
        <p>用于对某些事物进行评分。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>常规用法</p>
            <div class="desc">
                监听事件 <b>update:value</b> 来感知变化。
            </div>
            <div class="demo-rate">
                <f-rate
                    v-model:value="rate"
                    @update:value="handelChange"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-rate
        v-model:value="rate"
        @update:value="handelChange"
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
                rate: '1.0',
                toolTip: ['差劲', '还行', '不错', '很好', '非常棒']
            })
            const handelChange = (val: number | string) => {
                console.log(val)
            }
            return{
                ...toRefs(data),
                handelChange
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zi_ding_yi">自定义
                <a href="#zi_ding_yi" class="f-icon-anchor"></a>
            </h3>
            <p>罗列一些自定义的写法</p>

            <div class="desc">
                设置属性 <b>show-label</b> 可以呈现文本。
            </div>

            <div class="demo-rate">
                <f-rate
                    v-model:value="rate2"
                    show-label
                />
            </div>

            <div class="desc">
                设置属性 <b>tool-tip</b> 可以使每个评价阶段呈现自定义的tooltip。
            </div>

            <div class="demo-rate">
                <f-rate
                    v-model:value="rate3"
                    show-label
                    :tool-tip="toolTip"
                />
            </div>

            <div class="desc">
                如果自定义tooltip数量与最大评分数不匹配，那么最后一个匹配上的阶级之后均显示自定义tooltip最后一项。<br>
                下面是一个例子：
            </div>

            <div class="demo-rate">
                <f-rate
                    v-model:value="rate4"
                    show-label
                    :tool-tip="toolTip2"
                />
            </div>

            <div class="desc">
                设置属性 <b>selectedColor / noSelectedColor（选中 / 未选中）</b> 可以自定义评分的颜色，
            </div>

            <div class="demo-rate">
                <f-rate
                    v-model:value="rate5"
                    show-label
                    selected-color="#52c41a"
                    no-selected-color="#eee"
                />
            </div>

            <div class="desc">
                使用作用域插槽来自定义文本展示格式 <b>slot='label'</b>，这时必须设置 <b>show-label</b>。
            </div>

            <div class="demo-rate">
                <f-rate
                    v-model:value="rate6"
                    show-label
                >
                    <template #label="scope">
                       当前评价：{{scope.label.toFixed(1)}} 分
                    </template>
                </f-rate>
            </div>

            <div class="desc">
                设置属性 <b>count-num</b> 可以自定义评分的数量。
            </div>

            <div class="demo-rate">
                <f-rate
                    v-model:value="rate7"
                    show-label
                    :count-num="10"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div class="desc">
        设置属性 <b>show-label</b> 可以呈现文本。
    </div>
    <f-rate
        v-model:value="rate"
        show-label
    />

    <div class="desc">
        设置属性 <b>tool-tip</b> 可以使每个评价阶段呈现自定义的tooltip。
    </div>
    <f-rate
        v-model:value="rate2"
        show-label
        :tool-tip="toolTip"
    />

    <div class="desc">
        如果自定义tooltip数量与最大评分数不匹配，那么最后一个匹配上的阶级之后均显示自定义tooltip最后一项。<br>
        下面是一个例子：
    </div>
    <f-rate
        v-model:value="rate3"
        show-label
        :tool-tip="toolTip2"
    />

    <div class="desc">
        设置属性 <b>tool-tip</b> 可以使每个评价阶段呈现自定义的tooltip。
    </div>
    <f-rate
        v-model:value="rate4"
        show-label
        :tool-tip="toolTip"
    />

    <div class="desc">
        设置属性 <b>selectedColor / noSelectedColor（选中 / 未选中）</b> 可以自定义评分的颜色，
    </div>
    <f-rate
        v-model:value="rate5"
        show-label
        selected-color="#52c41a"
        no-selected-color="#eee"
    />

    <div class="desc">
        使用作用域插槽来自定义文本展示格式 <b>slot='label'</b>，这时必须设置 <b>show-label</b>。
    </div>
    <f-rate
        v-model:value="rate6"
        show-label
    >
        <template #label="scope">
           当前评价：\{\{scope.label.toFixed(1)\}\} 分
        </template>
    </f-rate>

    <div class="desc">
        设置属性 <b>count-num</b> 可以自定义评分的数量。
    </div>
    <f-rate
        v-model:value="rate7"
        show-label
        :count-num="10"
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
                rate: 1,
                rate2: 2,
                rate3: 1,
                rate4: 1,
                rate5: 1,
                rate6: 1,
                rate7: 1,
                toolTip: ['差劲', '还行', '不错', '很好', '非常棒'],
                toolTip2: ['差劲', '还行', '不错']
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
            <p>您不能与rate组件进行交互。</p>
            <div class="demo-rate">
                <f-rate
                    v-model:value="rate"
                    show-label
                    disabled
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-rate
        v-model:value="rate"
        show-label
        disabled
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
                rate: 1
            })
            return{ ...toRefs(data) }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ke_ban_xuan">可半选
                <a href="#ke_ban_xuan" class="f-icon-anchor"></a>
            </h3>
            <p>允许您进行半选评分。</p>
            <div class="demo-rate">
                <f-rate
                    v-model:value="rate10"
                    show-label
                    allow-half
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-rate
        v-model:value="rate"
        show-label
        allow-half
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
                rate: 2.5
            })
            return{ ...toRefs(data) }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ren_yi_zi_fu">任意字符
                <a href="#ren_yi_zi_fu" class="f-icon-anchor"></a>
            </h3>
            <p>可以是字符串、图标、汉字、单词等。</p>
            <div class="desc">
                设置属性 <b>icon</b> 来将星星替换，另外也支持插槽 <b>slot="icon"</b> 方式，这时插槽优先级最高。
            </div>

            <div class="demo-rate">
                <f-rate
                    v-model:value="rate11"
                    allow-half
                    show-label
                    icon="OK"
                />

                <div class="desc">优先级示例：</div>
                <f-rate
                    v-model:value="rate12"
                    allow-half
                    show-label
                    icon="OK"
                    selected-color="pink"
                >
                    <template #icon>
                        <i class="f-icon-nv" style="font-size: 30px"></i>
                    </template>
                </f-rate>

                <div class="desc">中文汉字：</div>
                <f-rate
                    v-model:value="rate13"
                    show-label
                    allow-half
                    icon="猛男"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-rate
        v-model:value="rate"
        show-label
        allow-half
    />

    <p>优先级示例：</p>
    <f-rate
        v-model:value="rate2"
        allow-half
        show-label
        icon="OK"
        selected-color="pink"
    >
        <template #icon>
            <i class="f-icon-nv " style="font-size: 30px"></i>
        </template>
    </f-rate>

    <p>中文汉字：</p>
    <f-rate
        v-model:value="rate3"
        show-label
        allow-half
        icon="猛男"
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
                rate: 2.5,
                rate2: 3,
                rate2: 4.5,
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
    onMounted,
} from 'vue'
import FRate from '/@/views/packages/rate/Rate.vue'
export default defineComponent({
    components: {
        FRate
    },
    setup () {
        const data = reactive({
            rate: 1,
            rate2: 1,
            rate3: 2,
            rate4: 1,
            rate5: 1,
            rate6: 1,
            rate7: 1,
            rate8: 1,
            rate9: 1,
            rate10: 2.5,
            rate11: 2.5,
            rate12: 3,
            rate13: 4.5,
            toolTip: ['差劲', '还行', '不错', '很好', '非常棒'],
            toolTip2: ['差劲', '还行', '不错']
        })
        const handelChange = (val: number) => {
            console.log(val)
        }
        return{
            ...toRefs(data),
            handelChange
        }
    }
})
</script>

<style scoped lang="scss">
.demo-rate{
    margin-bottom: 15px;
}
</style>