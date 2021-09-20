<template>
    <div>
        <h2>Rate 打分</h2>
        <p>用于对某些事物进行打分、评价。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>常规用法</p>
            <div class="demo-rate">
                <f-rate
                    v-model:value="rate"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-rate
        v-model:value="rate"
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
            return{ ...toRefs(data)}
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
                使用作用域插槽来自定义文本展示格式 <b>slot='label'</b>。
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