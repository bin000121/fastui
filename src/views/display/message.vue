<template>
    <div>
        <h2>Message 消息通知</h2>
        <p>类似于移动端的toast，用于主动向用户提供操作反馈信息，或者告知一个通知。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>该消息通知默认从屏幕上方进入，在 3 秒后会主动消失，且页面中最多存在 10 条消息。</p>

            <div class="demo-message">
                <f-button @click="openMsg">
                    open a default's message
                </f-button>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button @click="openMsg">
        open a default's message
    </f-button>

    <script lang="ts">
    import {
        defineComponent
    } from 'vue'
    import $msg from '/@/views/packages/message/message'
    export default defineComponent({
        setup() {
            const openMsg = () => {
                $msg('我是一条消息')
            }
            return { openMsg }
        }
    })
    </script>`}}
            </code></pre>
            </div>
        </div>

        <div>
            <h3 id="xiao_xi_lei_xing">消息类型
                <a href="#xiao_xi_lei_xing" class="f-icon-anchor"></a>
            </h3>
            <p>消息通知组件拥有 6 种不同的消息类型，开头已经介绍了默认类型，下面是其他的 5 种。</p>

            <div class="demo-message">
                <f-button @click="openMsgType('success')">
                    success
                </f-button>
                <f-button @click="openMsgType('error')">
                    error
                </f-button>
                <f-button @click="openMsgType('warning')">
                    warning
                </f-button>
                <f-button @click="openMsgType('info')">
                    info
                </f-button>
                <f-button @click="openMsgType('loading')">
                    loading
                </f-button>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button @click="openMsgType('success')">
        success
    </f-button>

    <f-button @click="openMsgType('error')">
        error
    </f-button>

    <f-button @click="openMsgType('warning')">
        warning
    </f-button>

    <f-button @click="openMsgType('info')">
        info
    </f-button>


    <script lang="ts">
    import {
        defineComponent
    } from 'vue'
    import $msg from '/@/views/packages/message/message'
    export default defineComponent({
        setup() {
            const openMsgType = (type: string) => {
                $msg({
                    type,
                    message: '我是一条消息'
                })
            }
            return { openMsgType }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ke_guan_bi">可关闭
                <a href="#ke_guan_bi" class="f-icon-anchor"></a>
            </h3>
            <p>消息可关闭</p>

            <div class="desc">
                在配置项里设置 <b>isShowClose</b> 即可开启关闭功能。
            </div>

            <div class="demo-message">
                <f-button @click="openMsgShowClose">
                    showCloseIcon message
                </f-button>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button @click="openMsgShowClose">
        showCloseIcon message
    </f-button>


    <script lang="ts">
    import {
        defineComponent
    } from 'vue'
    import $msg from '/@/views/packages/message/message'
    export default defineComponent({
        setup() {
            const openMsgShowClose = () => {
                $msg({
                    message: '我是一条消息',
                    isShowClose: true
                })
            }
            return { openMsgShowClose }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zi_ding_yi_zhan_shi_mu_ban">自定义展示模板
                <a href="#zi_ding_yi_zhan_shi_mu_ban" class="f-icon-anchor"></a>
            </h3>
            <p>渲染自定义的html结构</p>

            <div class="desc">
                在配置项中设置目标html结构即可 <b>template</b> 即可。
            </div>
            <div class="desc">
                <b style="color: red;line-height: 1.5">需要注意的是，该功能会在你的页面中动态渲染html，因此可能会产生XSS攻击或其他未知风险，所以请确定该html结构在绝对可信的情况下插入！</b>
            </div>

            <div class="demo-message">
                <f-button @click="openMsgCustom">
                    custom message display structure
                </f-button>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button @click="openMsgCustom">
        custom message display structure
    </f-button>


    <script lang="ts">
    import {
        defineComponent
    } from 'vue'
    import $msg from '/@/views/packages/message/message'
    export default defineComponent({
        setup() {
            const openMsgCustom = () => {
                $msg({
                    isShowIcon: false,
                    isShowClose: true,
                    message: '这条消息可以关闭！',
                    template: \`<div>
                        <i style="color: gold">床前明月光</i>
                        <b style="color: red">疑是地上霜</b>
                        <br>
                        <span style="color: green">举头望明月</span>
                        <em style="color: deepskyblue">低头思故乡</em>
                    </div>\`
                })
            }
            return { openMsgCustom }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zi_ding_yi_shi_chang">自定义时长
                <a href="#zi_ding_yi_shi_chang" class="f-icon-anchor"></a>
            </h3>
            <p>自定义消息展示时长。</p>

            <div class="demo-message">
                <f-button @click="openMsgDuration">
                    custom message duration
                </f-button>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button @click="openMsgDuration">
        custom message duration
    </f-button>


    <script lang="ts">
    import {
        defineComponent
    } from 'vue'
    import $msg from '/@/views/packages/message/message'
    export default defineComponent({
        setup() {
            const openMsgDuration = () => {
                $msg({
                    message: '这条消息5秒后被关闭！',
                    duration: 5000
                })
            }
            return { openMsgDuration }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="guan_bi_suo_you_xiao_xi">关闭所有消息
                <a href="#guan_bi_suo_you_xiao_xi" class="f-icon-anchor"></a>
            </h3>
            <p>关闭页面上的所有消息，并删除其dom。</p>

            <div class="demo-message">
                <f-button @click="createManyMsg">
                    创建 10 条消息
                </f-button>

                <f-button @click="closeAllMsg">
                    关闭所有消息
                </f-button>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button @click="createManyMsg">
        创建 10 条消息
    </f-button>

    <f-button @click="closeAllMsg">
        关闭所有消息
    </f-button>


    <script lang="ts">
    import {
        defineComponent
    } from 'vue'
    import $msg from '/@/views/packages/message/message'
    export default defineComponent({
        setup() {
            const createManyMsg = () => {
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => $msg(\`我是第 \${i + 1} 条消息\`))
                }
            }
            const closeAllMsg = () => {
                $msg.closeAll()
            }
            return {
                closeAllMsg,
                createManyMsg,
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
    inject
} from 'vue'
import fButton from '/@/views/packages/button/Button.vue'
import $msg from '/@/views/packages/message'
export default defineComponent({
    components: {
        fButton,
    },
    setup() {
        const openMsg = () => {
            $msg('我是一条消息')
        }
        const openMsgType = (type: string) => {
            $msg({
                type,
                message: '我是一条消息'
            })
        }

        const openMsgShowClose = () => {
            $msg({
                message: '这条消息可以关闭！',
                isShowClose: true
            })
        }
        const openMsgDuration = () => {
            $msg({
                message: '这条消息5秒后被关闭！',
                duration: 5000
            })
        }

        const openMsgCustom = () => {
            $msg({
                isShowIcon: false,
                isShowClose: true,
                message: '这条消息可以关闭！',
                template: `<div>
                    <i style="color: gold">床前明月光</i>
                    &nbsp;
                    <b style="color: red">疑是地上霜</b>
                    <br>
                    <span style="color: green">举头望明月</span>
                    &nbsp;
                    <em style="color: deepskyblue">低头思故乡</em>
                </div>`
            })
        }

        const createManyMsg = () => {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => $msg(`我是第 ${i + 1} 条消息`))
            }
        }

        const closeAllMsg = () => {
            $msg.closeAll()
        }
        return {
            openMsg,
            openMsgType,
            openMsgShowClose,
            openMsgCustom,
            openMsgDuration,
            closeAllMsg,
            createManyMsg,
        }
    }
})
</script>

<style scoped lang="scss">
.demo-message{

}
</style>