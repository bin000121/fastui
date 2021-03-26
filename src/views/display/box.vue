<template>
    <div class="switch">
        <h2>Box 盒子</h2>
        <p>一个通用容器。可以承载文字、图片等，使其突出。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>常规用法</p>

            <div class="desc">
                通过 <b>slot</b> 指定名字传入Dom。
            </div>
            <div class="flexBox">
                <MnBox class="box">
                    <template #header>
                        <div>header</div>
                    </template>
                    <div v-for="item in 3" :key="item" class="box-content">盒子内容</div>
                </MnBox>
                <MnBox class="box">
                    <div v-for="item in 3" :key="item" class="box-content">盒子内容</div>
                </MnBox>
            </div>
            <div v-highlight>
                <pre><code>
                    {{`<f-box class="box">
                        <template #header>
                            <div>header</div>
                        </template>

                        <div v-for="item in 3" :key="item">盒子内容</div>
                    </f-box>

                    <f-box class="box">
                        <div v-for="item in 3" :key="item">盒子内容</div>
                    </f-box>



                    <style>
                        .box{
                            width: 500px;
                        }
                        .box-content{
                            margin: 10px 0;
                        }
                    </style>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="he_zi_yin_ying">盒子阴影
                <a href="#he_zi_yin_ying" class="f-icon-anchor"></a>
            </h3>
            <p>可以显示控制阴影呈现方式。</p>

            <div class="desc">
                通过配置属性 <b>shadow</b> 来使得卡片拥有不同的阴影展示时机。（ <b>hover</b> 或 <b>none</b> ）
            </div>

            <div class="flexBox">
                <MnBox :box-style="{ width: '200px'}">默认展示</MnBox>
                <MnBox :box-style="{ width: '200px'}" shadow="hover">hover时展示</MnBox>
                <MnBox :box-style="{ width: '200px'}" shadow="none">不展示</MnBox>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div class="flexBox">
        <f-box
            :box-style="{ width: '200px'}">
            默认展示
        </f-box>

        <f-box
            :box-style="{ width: '200px'}"
            shadow="hover">
            hover时展示
        </f-box>

        <f-box
            :box-style="{ width: '200px'}"
            shadow="none">
            不展示
        </f-box>
    </div>



    <style>
        .flexBox{
            display: flex;
            justify-content: space-between;
        }
    </style>`}}
                </code></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue'

import MnBox from '/@/views/packages/box/Box.vue'

export default defineComponent({
    components: {
        MnBox
    },
    setup () {
        const flag = ref(true)
        return {
            flag
        }
    }
})
</script>

<style scoped lang="scss">
.box{
    width: 300px;
    .box-content{
        margin: 10px 0;
    }
}
.flexBox{
    display: flex;
    justify-content: space-between;
}
</style>
