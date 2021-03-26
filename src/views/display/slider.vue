<template>
    <div class="slider">
        <h2>Slider 滑块</h2>
        <p>Slider 滑块</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>列举一些常用用法示例。</p>
            <div class="slider-demo">
                <f-slider></f-slider>
            </div>

            <div class="desc">
                对其绑定属性 <b>value / v-model:value</b> 可以确定初始值。
            </div>

            <div class="slider-demo">
                <f-slider :value="50"></f-slider>
            </div>

            <div class="slider-demo">
                <f-slider v-model:value="start"></f-slider>
            </div>

            <div class="desc">
                不展示提示框组件。
            </div>

            <div class="slider-demo">
                <f-slider :value="50" :show-tooltip="false"></f-slider>
            </div>

            <div class="desc">
                可以通过属性 <b>min</b> 与 <b>max</b> 来控制范围。
            </div>

            <div class="slider-demo">
                <f-slider :value="15" :min="10" :max="100"></f-slider>
            </div>

            <div>
                <div v-highlight>
                    <pre><code>
    {{`<div class="slider-demo">
        <f-slider></f-slider>
    </div>

    <div class="slider-demo">
        <f-slider :value="50"></f-slider>
    </div>

    <div class="slider-demo">
        <f-slider v-model:value="start"></f-slider>
    </div>

    <div class="slider-demo">
        <f-slider :value="50" :show-tooltip="false"></f-slider>
    </div>

    <div class="slider-demo">
        <f-slider :value="15" :min="10" :max="100"></f-slider>
    </div>



    <style>
        .slider-demo{
            padding: 45px 0;
        }
    </style>

    <script>
        import { defineComponent, ref } from 'vue'
        export default defineComponent({
            setup () {
                const start = ref(50)
                return {
                    start
                }
            }
        })
    </script>`}}
                </code></pre>
                </div>
            </div>
        </div>

        <div>
            <h3 id="jin_yong">禁用
                <a href="#jin_yong" class="f-icon-anchor"></a>
            </h3>
            <p>滑块呈现出禁用的样式。</p>
            <div class="slider-demo">
                <f-slider disabled :value="50"></f-slider>
            </div>

            <div>
                <div v-highlight>
                    <pre><code>
    {{`<f-slider disabled :value="50"></f-slider>`}}
                    </code></pre>
                </div>
        </div>
    </div>

        <div>
            <h3 id="zhi_du">只读
                <a href="#zhi_du" class="f-icon-anchor"></a>
            </h3>
            <p>您不能与之进行交互，且不会添加禁用的样式，他看起来是正常的模样。</p>
            <div class="slider-demo">
                <f-slider readonly :value="50"></f-slider>
            </div>

            <div>
                <div v-highlight>
                    <pre><code>
    {{`<f-slider readonly :value="50"></f-slider>`}}
                    </code></pre>
                </div>
        </div>
        </div>

        <div>
            <h3 id="ti_shi_kuang">提示框
                <a href="#ti_shi_kuang" class="f-icon-anchor"></a>
            </h3>
            <p>用于标识当前进度。</p>

            <div class="desc">
                通过设置属性 <b>tooltip-type</b> 来控制展示方式。
            </div>

            <div class="slider-demo">
                <f-slider tooltip-type="always" :value="50"></f-slider>
            </div>

            <div class="slider-demo">
                <f-slider tooltip-type="hover" :value="50"></f-slider>
            </div>

            <div>
                <div v-highlight>
                    <pre><code>
    {{`<div class="slider-demo">
        <f-slider tooltip-type="always" :value="50"></f-slider>
    </div>

    <div class="slider-demo">
        <f-slider tooltip-type="hover" :value="50"></f-slider>
    </div>`}}
                    </code></pre>
                </div>
        </div>
        </div>

        <div>
            <h3 id="bu_chang">步长
                <a href="#bu_chang" class="f-icon-anchor"></a>
            </h3>
            <p>滑块组件可以拥有 1 以上的步长。</p>

            <div class="desc">
                可以通过属性 <b>step</b> 来设置步长，以步长下分别是3、5、10。
            </div>

            <div class="slider-demo">
                <f-slider :step="3"></f-slider>
            </div>

            <div class="slider-demo">
                <f-slider :step="5"></f-slider>
            </div>

            <div class="slider-demo">
                <f-slider :step="10"></f-slider>
            </div>

            <div>
                <div v-highlight>
                    <pre><code>
    {{`<div class="slider-demo">
        <f-slider :step="3"></f-slider>
    </div>

    <div class="slider-demo">
        <f-slider :step="5"></f-slider>
    </div>

    <div class="slider-demo">
        <f-slider :step="10"></f-slider>
    </div>`}}
                    </code></pre>
                </div>
        </div>
        </div>

    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue'

import FSlider from '/@/views/packages/slider/Slider.vue'
export default defineComponent({
    components: {
        FSlider
    },
    setup () {
        const start = ref(50)
        return {
            start
        }
    }
})
</script>

<style scoped lang="scss">
.slider-demo{
    padding: 45px 0;
}
</style>
