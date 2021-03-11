<template>
    <div class="checkbox">
        <h2>Checkbox 多选按钮</h2>
        <p></p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>多选按钮的基本用法。</p>

            <div class="demo-checkbox">
                <p>选中值：{{checkbox}}</p>
                <f-checkbox v-model:value="checkbox" label="f-checkbox"></f-checkbox>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>选中值：\{\{checkbox\}\}</p>

    <f-checkbox v-model:value="checkbox" label="f-checkbox"></f-checkbox>


    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'

    export default defineComponent({
        setup () {
            const checkbox = ref(false)
            return{
                checkbox
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jin_yong">禁用
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>为多选按钮添加禁用样式，另外您不可以与之交互。</p>

            <div class="desc">
                为其添加属性 <b>disabled</b> 即可。
            </div>

            <div class="demo-checkbox">
                <f-checkbox v-model:value="checkbox2" label="f-checkbox" disabled></f-checkbox>
                <f-checkbox v-model:value="checkbox3" label="f-checkbox" disabled></f-checkbox>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-checkbox v-model:value="checkbox" label="f-checkbox" disabled></f-checkbox>

    <f-checkbox v-model:value="checkbox2" label="f-checkbox" disabled></f-checkbox>


    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'

    export default defineComponent({
        setup () {
            const checkbox = ref(true)
            const checkbox2 = ref(false)
            return{
                checkbox,
                checkbox2
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="bian_kuang">带边框
                <a href="#bian_kuang" class="f-icon-anchor"></a>
            </h3>
            <p></p>

            <div class="desc">
                只要为其设置 <b>border</b> 就可以使多选按钮添加边框样式。
            </div>

            <div class="demo-checkbox">
                <f-checkbox v-model:value="checkbox4" label="iphoneX" border></f-checkbox>
                <f-checkbox v-model:value="checkbox5" label="iphone11 pro" border></f-checkbox>
                <f-checkbox v-model:value="checkbox6" label="iphone12 mini" border></f-checkbox>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-checkbox v-model:value="checkbox" label="iphoneX" border></f-checkbox>

    <f-checkbox v-model:value="checkbox2" label="iphone11 pro" border></f-checkbox>

    <f-checkbox v-model:value="checkbox3" label="iphone12 mini" border></f-checkbox>


    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'

    export default defineComponent({
        setup () {
            const checkbox = ref(false)
            const checkbox2 = ref(false)
            const checkbox3 = ref(false)
            return{
                checkbox
                checkbox2,
                checkbox3
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="kuai_ji_yuan_su">变为块级元素
                <a href="#kuai_ji_yuan_su" class="f-icon-anchor"></a>
            </h3>
            <p></p>

            <div class="desc">
                只要为其设置 <b>block</b> 就可以使多选按钮变成块级元素。
            </div>

            <div class="demo-checkbox">
                <f-checkbox v-model:value="checkbox4" label="iphoneX" border block></f-checkbox>
                <f-checkbox v-model:value="checkbox5" label="iphone11 pro" border block></f-checkbox>
                <f-checkbox v-model:value="checkbox6" label="iphone12 mini" border block></f-checkbox>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-checkbox v-model:value="checkbox" label="iphoneX" border></f-checkbox>

    <f-checkbox v-model:value="checkbox2" label="iphone11 pro" border></f-checkbox>

    <f-checkbox v-model:value="checkbox3" label="iphone12 mini" border></f-checkbox>


    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'

    export default defineComponent({
        setup () {
            const checkbox = ref(false)
            const checkbox2 = ref(false)
            const checkbox3 = ref(false)
            return{
                checkbox
                checkbox2,
                checkbox3
            }
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
            <p></p>

            <div class="desc">
                多选按钮拥有三种尺寸，默认 <b>size</b> 为 default。
            </div>

            <div class="demo-checkbox">
                <f-checkbox v-model:value="checkbox4" label="iphoneX" border size="small"></f-checkbox>
                <f-checkbox v-model:value="checkbox5" label="iphone11 pro" border size="small"></f-checkbox>
                <f-checkbox v-model:value="checkbox6" label="iphone12 mini" border size="small"></f-checkbox>
            </div>

            <div class="demo-checkbox">
                <f-checkbox v-model:value="checkbox4" label="iphoneX" border></f-checkbox>
                <f-checkbox v-model:value="checkbox5" label="iphone11 pro" border></f-checkbox>
                <f-checkbox v-model:value="checkbox6" label="iphone12 mini" border></f-checkbox>
            </div>

            <div class="demo-checkbox">
                <f-checkbox v-model:value="checkbox4" label="iphoneX" border size="large"></f-checkbox>
                <f-checkbox v-model:value="checkbox5" label="iphone11 pro" border size="large"></f-checkbox>
                <f-checkbox v-model:value="checkbox6" label="iphone12 mini" border size="large"></f-checkbox>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-checkbox v-model:value="checkbox" label="iphoneX" border></f-checkbox>

    <f-checkbox v-model:value="checkbox2" label="iphone11 pro" border></f-checkbox>

    <f-checkbox v-model:value="checkbox3" label="iphone12 mini" border></f-checkbox>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                checkbox: false,
                checkbox2: false,
                checkbox2: false
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
            <h3 id="duo_xuan_zu">多选按钮组
                <a href="#duo_xuan_zu" class="f-icon-anchor"></a>
            </h3>
            <p>建议总是使用多选按钮组来包裹多选按钮。</p>

            <div class="demo-checkbox">
                <p>选中值：{{checkbox7}}</p>
                <f-checkbox-group v-model:value="checkbox7" size="small">
                    <f-checkbox label="iphoneX" value="iphoneX"></f-checkbox>
                    <f-checkbox label="iphone xs max" value="iphone xs max"></f-checkbox>
                    <f-checkbox label="iphone11" value="iphone11"></f-checkbox>
                    <f-checkbox label="iphone12 mini" value="iphone12 mini"></f-checkbox>
                </f-checkbox-group>
            </div>

            <div class="demo-checkbox">
                <f-checkbox-group v-model:value="checkbox7" border>
                    <f-checkbox label="iphoneX" value="iphoneX"></f-checkbox>
                    <f-checkbox label="iphone xs max" value="iphone xs max"></f-checkbox>
                    <f-checkbox label="iphone11" value="iphone11"></f-checkbox>
                    <f-checkbox label="iphone12 mini" value="iphone12 mini"></f-checkbox>
                </f-checkbox-group>
            </div>

            <div class="demo-checkbox">
                <f-checkbox-group v-model:value="checkbox7" size="large" vertical>
                    <f-checkbox label="iphoneX" value="iphoneX"></f-checkbox>
                    <f-checkbox label="iphone xs max" value="iphone xs max"></f-checkbox>
                    <f-checkbox label="iphone11" value="iphone11"></f-checkbox>
                    <f-checkbox label="iphone12 mini" value="iphone12 mini"></f-checkbox>
                </f-checkbox-group>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<p>选中值：\{\{checkbox\}\}</p>

    <f-checkbox-group v-model:value="checkbox" size="small">
        <f-checkbox label="iphoneX" value="iphoneX"></f-checkbox>
        <f-checkbox label="iphone xs max" value="iphone xs max"></f-checkbox>
        <f-checkbox label="iphone11" value="iphone11"></f-checkbox>
        <f-checkbox label="iphone12 mini" value="iphone12 mini"></f-checkbox>
    </f-checkbox-group>

    <f-checkbox-group v-model:value="checkbox" border>
        <f-checkbox label="iphoneX" value="iphoneX"></f-checkbox>
        <f-checkbox label="iphone xs max" value="iphone xs max"></f-checkbox>
        <f-checkbox label="iphone11" value="iphone11"></f-checkbox>
        <f-checkbox label="iphone12 mini" value="iphone12 mini"></f-checkbox>
    </f-checkbox-group>

    <f-checkbox-group v-model:value="checkbox" size="large" vertical>
        <f-checkbox label="iphoneX" value="iphoneX"></f-checkbox>
        <f-checkbox label="iphone xs max" value="iphone xs max"></f-checkbox>
        <f-checkbox label="iphone11" value="iphone11"></f-checkbox>
        <f-checkbox label="iphone12 mini" value="iphone12 mini"></f-checkbox>
    </f-checkbox-group>



    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'

    export default defineComponent({
        setup () {
            const checkbox = ref(['iphoneX'])
            return{
                checkbox
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>
        <f-top :scroll-top="500">
            <i class="f-icon-to-top"></i>
        </f-top>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    toRefs
} from 'vue'
import FCheckbox from '/@/views/components/checkbox/Checkbox.vue'
import FCheckboxGroup from '/@/views/components/checkbox/Checkbox-group.vue'
import FTop from '/@/views/components/ToTop.vue'

export default defineComponent({
    components: {
        FCheckbox,
        FCheckboxGroup,
        FTop
    },
    setup () {
        const data = reactive({
            checkbox: false,
            checkbox2: true,
            checkbox3: false,
            checkbox4: false,
            checkbox5: false,
            checkbox6: false,
            checkbox7: ['iphoneX']
        })

        const change = (a: any) => {
            console.log(a)
        }

        return{
            change,
            ...toRefs(data)
        }
    }
})
</script>

<style scoped lang="scss">
.demo-checkbox{
    margin-bottom: 30px;
    &:last-child{
        margin-bottom: 0;
    }
    p{
        color: #999;
    }
    .f-checkbox-label + .f-checkbox-label{
        margin-left: 30px;
    }
}
</style>
