<template>
    <div class="model">
        <h2>Model 弹出框</h2>
        <p>即对话框，用于加强用户的交互性。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>弹出框可以有两种打开方式。</p>

            <div class="desc">
                您可以使用插槽 <b>footer</b> 来自定义底部的内容。
            </div>

            <div class="desc">
                ref下函数open、hide分别控制开、关，另外您可以给函数 <b>open</b> 传递参数，这可能让你在对 model 二次封装时得到帮助。
            </div>

            <div class="demo-model">
                <f-button @click="open" style="margin-right: 15px;">打开model（v-model:value）</f-button>
                <f-button @click="open2">打开model（ref）</f-button>
                <f-model
                    title="v-model:value方式打开"
                    v-model:value="showModel"
                >
                    <div>
                        <span>内容区</span>
                    </div>
                    <template #footer>
                        <span>底部内容自定义</span>
                    </template>
                </f-model>

                <f-model
                    title="ref方式打开"
                    ref="model"
                >
                    <div><span>内容区</span></div>
                    <template #footer>
                        <div style="text-align:right">
                            <f-button type="primary" @click="hide" size="small">关闭</f-button>
                        </div>
                    </template>
                </f-model>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button
        @click="open"
        style="margin-right: 15px;"
    >打开model（v-model:value）</f-button>

    <f-button @click="open2">打开model（ref）</f-button>

    <f-model
        title="v-model:value方式打开"
        v-model:value="showModel"
    >
        <div><span>内容区</span></div>
        <template #footer>
            <span>底部内容自定义</span>
        </template>
    </f-model>

    <f-model
        title="ref方式打开"
        ref="model"
    >
        <div><span>内容区</span></div>
        <template #footer>
            <div style="text-align:right">
                <f-button type="primary" @click="hide" size="small">关闭</f-button>
            </div>
        </template>
    </f-model>

    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                model: null,
                showModel: false
            })
            const open = () => {
                data.showModel = true
            }

            const hide = () => {
                const modelDom = data.model as any
                modelDom.hide()
            }

            const open2 = () => {
                const modelDom = data.model as any
                modelDom.open()
            }
            return{
                open,
                hide,
                open2,
                ...toRefs(data),
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jin_yong_zhe_zhao">禁用遮罩层关闭
                <a href="#jin_yong_zhe_zhao" class="f-icon-anchor"></a>
            </h3>
            <p>点击遮罩层不会关闭弹出框。</p>

            <div class="desc">
                对其设置属性 <b>click-mask-not-close</b> 即可。
            </div>

            <div class="demo-model">
                <f-button @click="showModel2 = true">禁用遮罩层关闭</f-button>

                <f-model
                    title="禁用遮罩层关闭"
                    v-model:value="showModel2"
                    click-mask-not-close
                >
                    <div><span>内容区</span></div>
                    <template #footer>
                        <span>底部内容自定义</span>
                    </template>
                </f-model>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button @click="showModel2 = true">禁用遮罩层关闭</f-button>

    <f-model
        title="v-model:value方式打开"
        v-model:value="showModel2"
        click-mask-not-close
    >
        <div><span>内容区</span></div>
        <template #footer>
            <span>底部内容自定义</span>
        </template>
    </f-model>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                showModel2: false
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
            <h3 id="jin_yong_esc">禁用esc关闭
                <a href="#jin_yong_esc" class="f-icon-anchor"></a>
            </h3>
            <p>按下esc不会关闭弹出框。</p>

            <div class="desc">
                对其设置属性 <b>press-esc-not-close</b> 即可。
            </div>

            <div class="demo-model">
                <f-button @click="showModel3 = true">禁用esc关闭且隐藏右上角关闭按钮</f-button>

                <f-model
                    title="禁用esc关闭且隐藏右上角关闭按钮"
                    v-model:value="showModel3"
                    press-esc-not-close
                    :show-close="false"
                >
                    <div><span>内容区</span></div>
                    <template #footer>
                        <span>底部内容自定义</span>
                    </template>
                </f-model>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button @click="showModel = true">禁用esc关闭且隐藏右上角关闭按钮</f-button>

    <f-model
        title="v-model:value方式打开"
        v-model:value="showModel"
        click-mask-not-close
        :show-close="false"
    >
        <div><span>内容区</span></div>
        <template #footer>
            <span>底部内容自定义</span>
        </template>
    </f-model>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                showModel: false
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
            <h3 id="duo_ceng_qian_tao">多层嵌套
                <a href="#duo_ceng_qian_tao" class="f-icon-anchor"></a>
            </h3>
            <p>弹出框里的弹出框...，一直套娃...。</p>

            <div class="demo-model">
                <f-button @click="showModel4 = true">打开第一层弹出框</f-button>

                <f-model
                    title="第一层弹出框"
                    v-model:value="showModel4"
                    top="10vh"
                >
                    <f-button @click="showModel5 = true">打开第二层弹出框</f-button>
                    <f-model
                        title="第二层弹出框"
                        v-model:value="showModel5"
                        top="20vh"
                    >
                        <f-button @click="showModel6 = true">打开第三层弹出框</f-button>
                        <f-model
                            title="第三层弹出框"
                            v-model:value="showModel6"
                            top="30vh"
                        >
                            <template #footer>
                                <span>第三层弹出框底部内容区</span>
                            </template>
                        </f-model>
                        <template #footer>
                            <span>第二层弹出框底部内容区</span>
                        </template>
                    </f-model>
                    <template #footer>
                        <span>第一层弹出框底部内容区</span>
                    </template>
                </f-model>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button @click="showModel = true">打开第一层弹出框</f-button>

    <f-model
        title="第一层弹出框"
        v-model:value="showModel"
        top="10vh"
    >
        <f-button @click="showModel2 = true">打开第二层弹出框</f-button>
        <f-model
            title="第二层弹出框"
            v-model:value="showModel2"
            top="20vh"
        >
            <f-button @click="showModel3 = true">打开第三层弹出框</f-button>
            <f-model
                title="第三层弹出框"
                v-model:value="showModel4"
                top="30vh"
            >
                <template #footer>
                    <span>第三层弹出框底部内容区</span>
                </template>
            </f-model>
            <template #footer>
                <span>第二层弹出框底部内容区</span>
            </template>
        </f-model>
        <template #footer>
            <span>第一层弹出框底部内容区</span>
        </template>
    </f-model>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                showModel: false,
                showModel2: false,
                showModel3: false,
            })
            return{
                ...toRefs(data),
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
import FModel from '/@/views/packages/model/Model.vue'
import FButton from '/@/views/packages/button/Button.vue'

export default defineComponent({
    components: {
        FModel,
        FButton
    },
    setup () {
        const data = reactive({
            model: null,
            showModel: false,
            showModel2: false,
            showModel3: false,
            showModel4: false,
            showModel5: false,
            showModel6: false,
        })
        const open = () => {
            const modelDom = data.model as any
            // modelDom.open(666)
            data.showModel = true
        }

        const hide = () => {
            const modelDom = data.model as any
            modelDom.hide()
        }

        const open2 = () => {
            const modelDom = data.model as any
            modelDom.open()
        }
        return{
            open,
            hide,
            open2,
            ...toRefs(data),
        }
    }
})
</script>

<style scoped lang="scss">
.demo-model{

}
</style>
