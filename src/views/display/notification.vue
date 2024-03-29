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

            <div v-highlight>
                <pre><code>
    {{`<f-button @click="openPlacement('top-right')">top-right</f-button>
    <f-button @click="openPlacement('top-left')">top-left</f-button>
    <f-button @click="openPlacement('bottom-right')">bottom-right</f-button>
    <f-button @click="openPlacement('bottom-left')">bottom-left</f-button>


    <script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        setup() {
            const openPlacement = (placement: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
                $notify.info({
                    placement,
                    title: '弹出位置：' + placement,
                    content: '这是一条从 \${placement} 出现的消息！'
                })
            }
            return{ openPlacement }
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
            <p>消息通知框的icon、底部bar等可以自定义。</p>

            <div class="desc">
                设置属性 <b>isShowIcon = false</b> 可以隐藏图标。
            </div>

            <div>
                <f-button @click="hideIcon">hide icon</f-button>
            </div>

            <div class="desc">
                设置属性 <b>isShowBar = false</b> 可以隐藏底部类型条。
            </div>

            <div>
                <f-button @click="hideBar">hide bar</f-button>
            </div>

            <div class="desc">
                设置属性 <b>isShowClose = false</b> 可以隐藏底部类型条。
            </div>

            <div>
                <f-button @click="hideCloseIcon">hide closeIcon</f-button>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button @click="hideIcon">hide icon</f-button>
    <f-button @click="hideBar">hide bar</f-button>
    <f-button @click="hideCloseIcon">hide closeIcon</f-button>


    <script lang="ts">
    import { defineComponent } from 'vue'
    import $notify from "/@/views/packages/notification";
    export default defineComponent({
        setup() {
            const hideIcon = () => {
                $notify.info({
                    isShowIcon: false,
                    title: '隐藏icon',
                    content: '这是一条icon被隐藏掉的消息！',
                })
            }
            const hideBar = () => {
                $notify.info({
                    isShowBar: false,
                    title: '隐藏bar',
                    content: '这是一条底部类型条被隐藏掉的消息！',
                })
            }
            const hideCloseIcon = () => {
                $notify.info({
                    isShowClose: false,
                    title: '隐藏关闭图标',
                    content: '这是一条关闭图标被隐藏掉的消息！',
                })
            }
            return{
                hideIcon,
                hideBar,
                hideCloseIcon
            }
        }
    })
    </script>`}}
    </code></pre>
            </div>
        </div>

        <div>
            <h3 id="pian_yi_liang">横、纵向偏移量
                <a href="#pian_yi_liang" class="f-icon-anchor"></a>
            </h3>
            <p>你可以自定义消息通知框初始的横、纵向偏移量，横向默认30px，纵向默认20px。</p>

            <div class="desc">
                在初始偏移量中，横向对应属性 <b>offsetX</b>，纵向对应 <b>offsetY</b>。
            </div>

            <div class="demo-notification">
                <f-button @click="openAtOffsetX(100)">offsetX 100px</f-button>
                <f-button @click="openAtOffsetX(200)">offsetX 200px</f-button>
            </div>

            <div>
                <f-button @click="openAtOffsetY('5vh', 'top-right')">offsetY 5vh</f-button>
                <f-button @click="openAtOffsetY('15vh', 'top-left')">offsetY 15vh</f-button>
            </div>

            <div v-highlight>
            <pre><code>
    {{ `<f-button @click="openAtOffsetX(100)">offsetX 100px</f-button>
    <f-button @click="openAtOffsetX(200)">offsetX 200px</f-button>
    <f-button @click="openAtOffsetY('5vh', 'top-right')">offsetY 5vh</f-button>
    <f-button @click="openAtOffsetY('15vh', 'top-left')">offsetY 15vh</f-button>


    <script lang="ts">
    import {
        defineComponent
    } from 'vue'
    type Placement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    export default defineComponent({
        setup() {
            const openAtOffsetX = (value: number | string) => {
                $notify.info({
                    title: '横向偏移量',
                    offsetX: value,
                    content: '这是一条具有横向偏移量 \${value} 的消息！'
                })
            }
            const openAtOffsetY = (value: number | string, placement: Placement) => {
                $notify.info({
                    title: '纵向偏移量',
                    offsetY: value,
                    placement,
                    content: '这是一条具有纵向偏移量 \${value} 的消息！'
                })
            }
            return{
                openAtOffsetX,
                openAtOffsetY
            }
        }
    })
    </script>` }}
            </code></pre>
            </div>
        </div>

        <div>
            <h3 id="hui_diao_han_shu">回调函数
                <a href="#hui_diao_han_shu" class="f-icon-anchor"></a>
            </h3>
            <p>消息通知框在处于某个特定状态时会向外触发的特定的回调函数。</p>

            <div class="desc">
                消息通知框会在总共可能会处于4种不同状态。<b>onOpen</b> 刚打开时立刻执行、 <b>onOpened</b> 被打开且等到入场动画结束后立刻执行、 <b>onClose</b> 刚关闭时立刻执行、 <b>onClosed</b> 被关闭且等到出场动画结束后立刻执行
            </div>


            <div class="desc">
                下面是一个回调例子，请打开控制台查看。
            </div>

            <div class="demo-notification">
                <f-button @click="openAndEmitEvent">打开消息并执行回调</f-button>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-button @click="openAndEmitEvent">打开消息并执行回调</f-button>


    <script lang="ts">
    import { defineComponent } from 'vue'
    import $notify from "/@/views/packages/notification";
    export default defineComponent({
        setup() {
            const openAndEmitEvent = () => {
                $notify.info({
                    title: '请前往控制台查看',
                    content: '消息通知框将会执行这4种回调函数。',
                    onOpen: () => {
                        console.log('onOpen：执行于刚打开时！')
                    },
                    onOpened: () => {
                        console.log('onOpened：执行于被打开且入场动画结束后！')
                    },
                    onClose: () => {
                        console.log('onClose：执行于刚关闭时！')
                    },
                    onClosed: () => {
                        console.log('onClosed：执行于被关闭且出场动画结束后！')
                    }
                })
            }
            return{
                openAndEmitEvent
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
    defineComponent
} from 'vue'
import fButton from '/@/views/packages/button/Button.vue'
import $notify from '/@/views/packages/notification'
type Placement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
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
                content: `这是一条 ${type} 消息！`,
            })
        }
        const openPlacement = (placement: Placement) => {
            $notify.info({
                placement,
                title: '弹出位置：' + placement,
                content: `这是一条从 ${placement} 出现的消息！`
            })
        }
        const hideIcon = () => {
            $notify.info({
                isShowIcon: false,
                title: '隐藏icon',
                content: `这是一条icon被隐藏掉的消息！`,
            })
        }
        const hideBar = () => {
            $notify.info({
                isShowBar: false,
                title: '隐藏bar',
                content: `这是一条底部类型条被隐藏掉的消息！`,
            })
        }
        const hideCloseIcon = () => {
            $notify.info({
                isShowClose: false,
                title: '隐藏关闭图标',
                content: `这是一条关闭图标被隐藏掉的消息！`,
            })
        }
        const openAtOffsetX = (value: number | string) => {
            $notify.info({
                title: '横向偏移量',
                offsetX: value,
                content: `这是一条具有横向偏移量 ${value} 的消息！`
            })
        }
        const openAtOffsetY = (value: number | string, placement: Placement) => {
            $notify.info({
                title: '纵向偏移量',
                offsetY: value,
                placement,
                content: `这是一条具有纵向偏移量 ${value} 的消息！`
            })
        }
        const openAndEmitEvent = () => {
            $notify.info({
                title: '请前往控制台查看',
                content: '消息通知框将会执行这4种回调函数。',
                onOpen: () => {
                    console.log('onOpen：执行于刚打开时！')
                },
                onOpened: () => {
                    console.log('onOpened：执行于被打开且入场动画结束后！')
                },
                onClose: () => {
                    console.log('onClose：执行于刚关闭时！')
                },
                onClosed: () => {
                    console.log('onClosed：执行于被关闭且出场动画结束后！')
                }
            })
        }
        return{
            open,
            open2,
            openType,
            openPlacement,
            hideIcon,
            hideBar,
            hideCloseIcon,
            openAtOffsetX,
            openAtOffsetY,
            openAndEmitEvent,
        }
    }
})
</script>

<style scoped lang="scss">
.demo-notification{
    margin-bottom: 15px;
}
</style>