<template>
    <div>
        <h2>Message 消息通知</h2>
        <p>类似于移动端的toast，用于主动向用户提供操作反馈信息，或者告知一个通知。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>该消息通知默认从屏幕上方进入，在 3秒后会主动消失。</p>

            <div class="demo-message">
                <f-button @click="openMsg">
                    open message
                </f-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import fButton from '/@/views/packages/button/Button.vue'
import $msg from '/@/views/packages/message/message'
export default defineComponent({
    components: {
        fButton,
    },
    setup() {
        const openMsg = () => {
            $msg('666')
        }
        return {
            openMsg
        }
    }
})
</script>

<style scoped lang="scss">
.demo-message{

}
</style>