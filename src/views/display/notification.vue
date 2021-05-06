<template>
    <div>
        <h2>Notification 消息通知框</h2>
        <p>有别与message，notification更适合去承载较为复杂的的通知内容，并且其交互性得到增强。</p>

        <div>
            <h3>基本用法</h3>
            <p>最基本的使用方法。</p>

            <div class="demo-notification">
                <div class="f-notification">
                    <div class="bar"></div>
                    <div class="f-notification-container">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'

export default defineComponent({
    setup() {

    }
})
</script>

<style scoped lang="scss">
.f-notification{
    display: flex;
    align-items: center;
    width: 350px;
    border-radius: 5px;
    box-shadow: 0 0 10px #ddd;
    overflow: hidden;
    .bar{
        height: 100%;
        width: 6px;
        background-color: var(--primary);
    }
}
.f-notification-container{
    word-break: break-word;
    box-sizing: border-box;
    flex: 1;
    padding: 12px 20px;
}
</style>