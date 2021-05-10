<template>
    <div>
        <h2>Notification 消息通知框</h2>
        <p>有别与message，notification更适合去承载较为复杂的的通知内容，并且其交互性得到增强。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>最基本的使用方法。</p>

            <div class="demo-notification">
                <f-button @click="open">open notification</f-button>
            </div>
            <div v-highlight>
                <pre><code>
    {{ `<f-button @click="open">open notification</f-button>

    <script lang="ts">
        import {
            defineComponent
        } from 'vue'
        import $notify from '/@/views/packages/notification'

        export default defineComponent({
            setup() {
                const open = () => {
                    $notify.info({
                        title: '静夜思',
                        content: '床前明月光，疑是地上霜；举头望明月，低头思故乡。'
                    })
                }
                return{ open }
            }
        })
    </script>` }}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zi_ding_yi_xian_shi_shi_chang">自定义显示时长
                <a href="#zi_ding_yi_xian_shi_shi_chang" class="f-icon-anchor"></a>
            </h3>
            <p></p>

            <div class="desc">
                消息通知框默认会在打开后的 5s 后关闭，你可以设置属性 <b>duration</b> 来自定义显示时长。
            </div>
            <div class="desc">
                如果 <b>duration</b> 的值为 0 或者负数，那么消息通知框将永远不会自动关闭。
            </div>

            <div class="demo-notification">
                <f-button @click="open2">never close notification</f-button>
            </div>

            <div v-highlight>
                <pre><code>
    {{ `<f-button @click="open">open notification</f-button>

    <script lang="ts">
        import {
            defineComponent
        } from 'vue'
        import $notify from '/@/views/packages/notification'

        export default defineComponent({
            setup() {
                const open = () => {
                    $notify.info({
                        title: '永不自动关闭',
                        duration: 0,
                        content: '这是一条永远都不会自动关闭消息！'
                    })
                }
                return{ open }
            }
        })
    </script>` }}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="xiao_xi_lei_xing">消息类型
                <a href="#xiao_xi_lei_xing" class="f-icon-anchor"></a>
            </h3>
            <p>消息通知框拥有四种不同的消息类型，默认类型是info。</p>

            <div class="demo-notification">
                <f-button @click="openType('info')">info</f-button>
                <f-button @click="openType('success')">success</f-button>
                <f-button @click="openType('error')">error</f-button>
                <f-button @click="openType('warning')">warning</f-button>
            </div>

            <div v-highlight>
                <pre><code>
    {{ `<f-button @click="open('info')">info</f-button>
    <f-button @click="open('success')">success</f-button>
    <f-button @click="open('error')">error</f-button>
    <f-button @click="open('warning')">warning</f-button>

    <script lang="ts">
        import {
            defineComponent
        } from 'vue'
        import $notify from '/@/views/packages/notification'

        export default defineComponent({
            setup() {
                const open = type => {
                    $notify({
                        type,
                        title: '类型：' + type,
                        content: '这是一条 \${type} 消息！'
                    })
                }
                return{ open }
            }
        })
    </script>` }}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="tan_chu_wei_zhi">弹出位置
                <a href="#tan_chu_wei_zhi" class="f-icon-anchor"></a>
            </h3>
            <p>消息通知框拥有四种不同的弹出位置，默认是右上角。</p>
            <div class="desc">
                设置属性 <b>placement</b> 来自定义消息通知框的弹出位置。
            </div>
            <div class="demo-notification">
                <f-button @click="openPlacement('top-right')">top-right</f-button>
                <f-button @click="openPlacement('top-left')">top-left</f-button>
                <f-button @click="openPlacement('bottom-right')">bottom-right</f-button>
                <f-button @click="openPlacement('bottom-left')">bottom-left</f-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import fButton from '/@/views/packages/button/Button.vue'
import $notify from '/@/views/packages/notification'
export default defineComponent({
    components: {
        fButton,
    },
    setup() {
        const open = () => {
            $notify.info({
                title: '静夜思',
                content: '床前明月光，疑是地上霜；举头望明月，低头思故乡。'
            })
        }
        const open2 = () => {
            $notify.info({
                title: '永不自动关闭',
                duration: 0,
                content: '这是一条永远都不会自动关闭消息！'
            })
        }
        const openType = (type: 'info' | 'success' | 'error' | 'warning') => {
            $notify({
                type,
                title: '类型：' + type,
                content: `这是一条 ${type} 消息！`
            })
        }
        const openPlacement = (placement: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
            $notify.info({
                placement,
                title: '弹出位置：' + placement,
                content: `这是一条从 ${placement} 出现的消息！`
            })
        }
        return{
            open,
            open2,
            openType,
            openPlacement,
        }
    }
})
</script>

<style scoped lang="scss">

</style>