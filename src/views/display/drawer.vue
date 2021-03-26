<template>
    <div class="drawer">
        <h2>Drawer 抽屉</h2>
        <p>从页面边缘弹出的一个容器。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>基本的用法。</p>

            <div class="demo-drawer">
                <f-button type="primary" @click="show = true">open</f-button>
                <f-drawer
                    v-model:value="show"
                    title="这是抽屉标题"
                >
                    <p>your content...</p>
                    <p>your content...</p>
                    <p>your content...</p>
                </f-drawer>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button type="primary" @click="show = true">open</f-button>
    <f-drawer
        v-model:value="show"
        title="这是抽屉标题"
    >
        <p>your content...</p>
        <p>your content...</p>
        <p>your content...</p>
    </f-drawer>


    <script lang="ts">
    import {
        defineComponent,
        ref,
    } from 'vue'
    export default defineComponent({

        setup () {
            const show = ref(false)
            return{
                show
            }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="tan_chu_fang_xiang">弹出方向
                <a href="#tan_chu_fang_xiang" class="f-icon-anchor"></a>
            </h3>
            <p>抽屉拥有4个种不同的弹出方向。</p>

            <div class="desc">
                对其设置属性 <b>direction</b> 即可。
            </div>

            <div class="demo-drawer">
                <f-radio-group v-model:value="direction" border>
                    <f-radio label="rtl">从右往左</f-radio>
                    <f-radio label="ltr">从左往右</f-radio>
                    <f-radio label="btt">从下往上</f-radio>
                    <f-radio label="ttb">从上往下</f-radio>
                </f-radio-group>
                &nbsp;
                <f-button type="primary" @click="show2 = true">open</f-button>
                <f-drawer
                    v-model:value="show2"
                    title="这是抽屉标题"
                    :direction="direction"
                    width="50%"
                    height="25%"
                >
                    <p>your content...</p>
                    <p>your content...</p>
                    <p>your content...</p>
                </f-drawer>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-radio-group v-model:value="direction" border>
        <f-radio label="rtl">从右往左</f-radio>
        <f-radio label="ltr">从左往右</f-radio>
        <f-radio label="btt">从下往上</f-radio>
        <f-radio label="ttb">从上往下</f-radio>
    </f-radio-group>
    &nbsp;
    <f-button type="primary" @click="show = true">open</f-button>
    <f-drawer
        v-model:value="show"
        title="这是抽屉标题"
        :direction="direction"
        width="50%"
        height="25%"
    >
        <p>your content...</p>
        <p>your content...</p>
        <p>your content...</p>
    </f-drawer>


    <script lang="ts">
    import {
        defineComponent,
        ref,
    } from 'vue'
    export default defineComponent({
        setup () {
            const show = ref(false)
            const direction = ref('rtl')
            return{
                show,
                direction,
            }
        }
    })
    </script>`}}</code></pre>
            </div>
        </div>

        <div>
            <h3 id="duo_ceng_qian_tao">多层嵌套
                <a href="#duo_ceng_qian_tao" class="f-icon-anchor"></a>
            </h3>
            <p>抽屉里的抽屉...，一直套娃...。</p>

            <div class="demo-drawer">
                <f-button type="primary" @click="show3 = true">open</f-button>
                <f-drawer
                    v-model:value="show3"
                    title="我是第一层抽屉"
                    width="45%"
                >
                    <p>我是第一层抽屉</p>
                    <p>我是第一层抽屉</p>
                    <p>我是第一层抽屉</p>
                    <f-button type="primary" @click="show4 = true">open第二层</f-button>
                    <f-drawer
                        v-model:value="show4"
                        title="我是第二层抽屉"
                        width="35%"
                    >
                        <p>我是第二层抽屉</p>
                        <p>我是第二层抽屉</p>
                        <p>我是第二层抽屉</p>
                        <f-button type="primary" @click="show5 = true">open第三层</f-button>
                        <f-drawer
                                v-model:value="show5"
                                title="我是第三层抽屉"
                                width="25%"
                        >
                            <p>我是第三层抽屉</p>
                            <p>我是第三层抽屉</p>
                            <p>我是第三层抽屉</p>
                        </f-drawer>
                    </f-drawer>
                </f-drawer>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button type="primary" @click="show = true">open</f-button>
    <f-drawer
        v-model:value="show"
        title="我是第一层抽屉"
        width="45%"
    >
        <p>我是第一层抽屉</p>
        <p>我是第一层抽屉</p>
        <p>我是第一层抽屉</p>
        <f-button type="primary" @click="show2 = true">open第二层</f-button>
        <f-drawer
            v-model:value="show2"
            title="我是第二层抽屉"
            width="35%"
        >
            <p>我是第二层抽屉</p>
            <p>我是第二层抽屉</p>
            <p>我是第二层抽屉</p>
            <f-button type="primary" @click="show3 = true">open第三层</f-button>
            <f-drawer
                v-model:value="show3"
                title="我是第三层抽屉"
                width="25%"
            >
                <p>我是第三层抽屉</p>
                <p>我是第三层抽屉</p>
                <p>我是第三层抽屉</p>
            </f-drawer>
        </f-drawer>
    </f-drawer>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                show: false,
                show2: false,
                show3: false
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
    ref,
    reactive,
    toRefs
} from 'vue'
import FButton from '/@/views/packages/button/Button.vue'
import FDrawer from '/@/views/packages/drawer/Drawer.vue'
import FRadioGroup from '/@/views/packages/radio/Radio-group.vue'
import FRadio from '/@/views/packages/radio/Radio.vue'

export default defineComponent({
    components: {
        FDrawer,
        FButton,
        FRadioGroup,
        FRadio,
    },
    setup () {
        const data = reactive({
            show: false,
            show2: false,
            show3: false,
            show4: false,
            show5: false,
            direction: 'rtl'
        })
        const showDrawer = () => {
            data.show = true
        }
        return{
            ...toRefs(data),
            showDrawer
        }
    }
})
</script>

<style scoped lang="scss">
.demo-drawer{

}
</style>
