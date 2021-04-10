<template>
    <div>
        <h2>Badge 徽章</h2>
        <p>图标、元素右上角的提示信息。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>常见的用法</p>

            <div class="desc">
                当 <b>dot</b> 与 <b>count</b>并存时，后者的优先级更高！
            </div>

            <div class="demo-badge">
                <f-badge dot>
                    <f-button>消息通知</f-button>
                </f-badge>

                <f-badge :count="12">
                    <div class="block"></div>
                </f-badge>

                <f-badge :count="99">
                    <i class="f-icon-audio" style="font-size: 24px"></i>
                </f-badge>

                <f-badge dot>
                    <a href="https://www.baidu.com">www.baidu.com</a>
                </f-badge>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-badge dot>
        <f-button>
            消息通知
        </f-button>
    </f-badge>

    <f-badge :count="12">
        <div class="block"></div>
    </f-badge>

    <f-badge dot>
        <i class="f-icon-audio" style="font-size: 24px"></i>
    </f-badge>

    <f-badge dot>
        <a href="https://www.baidu.com">www.baidu.com</a>
    </f-badge>


    <style lang="scss">
    .demo-badge{
        margin-top: 15px;
        display: inline-flex;
        align-items: center;
        .f-badge + .f-badge{
            margin-left: 30px;
        }
        .block{
            width: 36px;
            height: 36px;
            background-color: #ddd;
        }
    }
    </style>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="duo_zhong_se_cai">多种色彩
                <a href="#duo_zhong_se_cai" class="f-icon-anchor"></a>
            </h3>
            <p>徽章可以使用预设值颜色或者自定义颜色。</p>
            <div class="desc">
                当二者并存时，自定义颜色的优先级更高！
            </div>

            <div style="margin-bottom: 30px;">
                <p style="margin-bottom: 10px;">预设: （设置属性type）</p>
                <div style="margin-right: 30px;">
                    <span class="demo-preset-color" style="background-color: var(--error);"></span>
                    <span>error</span>
                </div>
                <div style="margin-right: 30px;">
                    <span class="demo-preset-color" style="background-color: var(--success);"></span>
                    <span>success</span>
                </div>
                <div style="margin-right: 30px;">
                    <span class="demo-preset-color" style="background-color: var(--warning);"></span>
                    <span>warning</span>
                </div>
                <div style="margin-right: 30px;">
                    <span class="demo-preset-color" style="background-color: var(--info);"></span>
                    <span>info</span>
                </div>
            </div>
            <div style="margin-bottom: 30px;">
                <p style="margin-bottom: 10px;">自定义: （设置属性color）</p>
                <div style="margin-right: 30px;">
                    <span class="demo-preset-color" style="background-color: cyan;"></span>
                    <span>cyan</span>
                </div>
                <div style="margin-right: 30px;">
                    <span class="demo-preset-color" style="background-color: yellow;"></span>
                    <span>yellow</span>
                </div>
                <div style="margin-right: 30px;">
                    <span class="demo-preset-color" style="background-color: orange;"></span>
                    <span>orange</span>
                </div>
                <div style="margin-right: 30px;">
                    <span class="demo-preset-color" style="background-color: red;"></span>
                    <span>red</span>
                </div>
                <div style="margin-right: 30px;">
                    <span class="demo-preset-color" style="background-color: #1661ab;"></span>
                    <span>#1661ab</span>
                </div>
                <div style="margin-right: 30px;">
                    <span class="demo-preset-color" style="background-color: #333;"></span>
                    <span>#333</span>
                </div>
                <div style="margin-right: 30px;">
                    <span class="demo-preset-color" style="background-color: #797bea;"></span>
                    <span>#797bea</span>
                </div>
                <div style="margin-right: 30px;">
                    <span>&hellip;&hellip;&hellip;</span>
                </div>
            </div>
            <div class="demo-badge">
                <f-badge dot type="success">
                    <f-button>消息</f-button>
                </f-badge>

                <f-badge dot type="success" color="red">
                    <f-button>消息</f-button>
                </f-badge>

                <f-badge :count="5" type="success" color="orange">
                    <f-button>消息</f-button>
                </f-badge>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-badge dot type="success">
        <f-button>
            消息
        </f-button>
    </f-badge>

    <f-badge dot type="success" color="red">
        <f-button>
            消息
        </f-button>
    </f-badge>

    <f-badge :count="5" type="success" color="orange">
        <f-button>
            消息
        </f-button>
    </f-badge>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="wei_zhi">位置
                <a href="#wei_zhi" class="f-icon-anchor"></a>
            </h3>
            <p>徽章采用绝对定位，可以自行调整位置。</p>

            <div class="desc">
                设置属性 <b>placement</b> 来控制位置，该属性接受一个长度为2的数字数组，即为 [right, top]
            </div>

            <div class="demo-badge">
                <f-badge dot :placement="[0, 15]">
                    <f-button>消息</f-button>
                </f-badge>

                <f-badge dot :placement="[15, 0]">
                    <f-button>消息</f-button>
                </f-badge>

                <f-badge dot :placement="[15, 30]">
                    <f-button>消息</f-button>
                </f-badge>
                <f-badge dot :placement="[30, 15]">
                    <f-button>消息</f-button>
                </f-badge>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-badge dot :placement="[0, 15]">
        <f-button>消息</f-button>
    </f-badge>

    <f-badge dot :placement="[15, 0]">
        <f-button>消息</f-button>
    </f-badge>

    <f-badge dot :placement="[15, 30]">
        <f-button>消息</f-button>
    </f-badge>
    <f-badge dot :placement="[30, 15]">
        <f-button>消息</f-button>
    </f-badge>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="zi_ding_yi_yang_shi">自定义样式
                <a href="#zi_ding_yi_yang_shi" class="f-icon-anchor"></a>
            </h3>
            <p>dot与count模式下对应着不同的样式。</p>

            <div class="demo-badge">
                <f-badge dot :dot-style="{
                    width: '15px',
                    height: '15px'
                }">
                    <f-button>消息</f-button>
                </f-badge>

                <f-badge dot :dot-style="{
                    width: '20px',
                    height: '20px'
                }">
                    <f-button>消息</f-button>
                </f-badge>

                <f-badge :count="5" :count-style="{
                    fontSize: '16px'
                }">
                    <f-button>消息</f-button>
                </f-badge>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-badge dot :dot-style="{
        width: '15px',
        height: '15px'
    }">
        <f-button>消息</f-button>
    </f-badge>

    <f-badge dot :dot-style="{
        width: '20px',
        height: '20px'
    }">
        <f-button>消息</f-button>
    </f-badge>

    <f-badge :count="5" :count-style="{
        fontSize: '16px'
    }">
        <f-button>消息</f-button>
    </f-badge>`}}
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
import fBadge from '/@/views/packages/badge/Badge.vue'
import fButton from '/@/views/packages/button/Button.vue'
export default defineComponent({
    components: {
        fBadge,
        fButton,
    },
    setup() {

    }
})
</script>

<style scoped lang="scss">
.demo-badge{
    margin-top: 15px;
    display: inline-flex;
    align-items: center;
    .f-badge + .f-badge{
        margin-left: 30px;
    }
    .block{
        width: 36px;
        height: 36px;
        background-color: #ddd;
    }
}
.demo-preset-color{
    display: inline-block;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    margin-right: 10px;
    & + span{
        font-size: 14px;
        color: #333;
    }
}
</style>