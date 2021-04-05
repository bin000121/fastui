<template>
    <div>
        <h2>Timeline 时间线</h2>
        <p>梳理、呈现、展示一段时间流信息。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>默认垂直自上而下的方向，横向靠左对齐。</p>

            <div class="desc">
                设置属性 <b>type</b> 可以为其应用不同的对齐方式。
            </div>

            <div class="demo-timeline">
                <div style="margin-bottom: 15px;">
                    <f-radio label="left" v-model:value="type" border>默认</f-radio>
                    <f-radio label="right" v-model:value="type" border>靠右</f-radio>
                    <f-radio label="reverse" v-model:value="type" border>反向</f-radio>
                    <f-radio label="alternate" v-model:value="type" border>左右交替</f-radio>
                </div>
                <f-timeline :type="type">
                    <f-timeline-item>
                        <p><b>唐朝（618年－907年）</b></p>
                        <p>唐朝是中国封建社会中统一时间最长，国力最强盛的朝代之一，唐朝共历274年（包括武周是289年），20位皇帝。唐朝声誉远及海外，与南亚、西亚和欧洲国家均有往来</p>
                    </f-timeline-item>
                    <f-timeline-item>
                        <p><b>宋朝（960年－1279年）</b></p>
                        <p>宋朝是中国历史上承五代十国、下启元朝的时代，分北宋和南宋。960年，后周大将赵匡胤黄袍加身，建立宋朝；宋朝历十八帝三百二十年，是中国古代历史上经济、文化教育与科学创新高度繁荣的时代，宋朝时中国GDP占世界比重60%，为各朝代第一，期间出现了宋明理学，科技发展亦突飞猛进，政治也较开明廉洁。</p>
                    </f-timeline-item>
                    <f-timeline-item>
                        <p><b>元朝（1271年－1368年）</b></p>
                        <p>元朝是中国历史上由蒙古族建立的王朝，定都大都（北京市）。</p>
                    </f-timeline-item>
                    <f-timeline-item>
                        <p><b>明朝（1368年－1644年）</b></p>
                        <p>明朝是中国历史上最后一个由汉族建立的中原王朝。历经十二世、十六位皇帝，国祚二百七十六年。明朝是继汉唐宋后又一个强盛的中原王朝。明代，虽特务横行，奸宦弄权，但无汉之外戚、唐之藩镇、宋之岁币，天子守国门，君主死社稷。清朝官修史书《明史》中评价明朝是“治隆唐宋”、“远迈汉唐”。</p>
                    </f-timeline-item>
                    <f-timeline-item>
                        <p><b>清朝（1636年－1912年）</b></p>
                        <p>清朝是中国历史上第二个由少数民族建立的统一政权，也是中国最后一个封建帝制王朝。从后金建立开始算起，共有十二帝，国祚276年。清朝历经康雍乾三朝，发展到鼎峰。这一时期统一多民族国家得到巩固，基本上奠定了中国版图，同时君主专制发展到顶峰。</p>
                    </f-timeline-item>
                </f-timeline>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div class="demo-timeline">
        <div style="margin-bottom: 15px;">
            <f-radio label="left" v-model:value="type" border>默认</f-radio>
            <f-radio label="right" v-model:value="type" border>靠右</f-radio>
            <f-radio label="reverse" v-model:value="type" border>反向</f-radio>
            <f-radio label="alternate" v-model:value="type" border>左右交替</f-radio>
        </div>

        <f-timeline :type="type">
            <f-timeline-item>
                <p><b>唐朝（618年－907年）</b></p>
                <p>唐朝是中国封建社会中统一时间最长，国力最强盛的朝代之一，唐朝共历274年（包括武周是289年），20位皇帝。唐朝声誉远及海外，与南亚、西亚和欧洲国家均有往来</p>
            </f-timeline-item>
            <f-timeline-item>
                <p><b>宋朝（960年－1279年）</b></p>
                <p>宋朝是中国历史上承五代十国、下启元朝的时代，分北宋和南宋。960年，后周大将赵匡胤黄袍加身，建立宋朝；宋朝历十八帝三百二十年，是中国古代历史上经济、文化教育与科学创新高度繁荣的时代，宋朝时中国GDP占世界比重60%，为各朝代第一，期间出现了宋明理学，科技发展亦突飞猛进，政治也较开明廉洁。</p>
            </f-timeline-item>
            <f-timeline-item>
                <p><b>元朝（1271年－1368年）</b></p>
                <p>元朝是中国历史上由蒙古族建立的王朝，定都大都（北京市）。</p>
            </f-timeline-item>
            <f-timeline-item>
                <p><b>明朝（1368年－1644年）</b></p>
                <p>明朝是中国历史上最后一个由汉族建立的中原王朝。历经十二世、十六位皇帝，国祚二百七十六年。明朝是继汉唐宋后又一个强盛的中原王朝。明代，虽特务横行，奸宦弄权，但无汉之外戚、唐之藩镇、宋之岁币，天子守国门，君主死社稷。清朝官修史书《明史》中评价明朝是“治隆唐宋”、“远迈汉唐”。</p>
            </f-timeline-item>
            <f-timeline-item>
                <p><b>清朝（1636年－1912年）</b></p>
                <p>清朝是中国历史上第二个由少数民族建立的统一政权，也是中国最后一个封建帝制王朝。从后金建立开始算起，共有十二帝，国祚276年。清朝历经康雍乾三朝，发展到鼎峰。这一时期统一多民族国家得到巩固，基本上奠定了中国版图，同时君主专制发展到顶峰。</p>
            </f-timeline-item>
        </f-timeline>
    </div>


    <script lang="ts">
    import {
        defineComponent,
        ref
    } from 'vue'
    export default defineComponent({
        setup() {
            const type = ref('left')
            return{
                type
            }
        }
    })
    </script>


    <style lang="scss">
    .demo-timeline{
        padding: 20px 0;
        b{
            font-size: 16px;
        }
    }
    </style>`}}
                </code></pre>
            </div>
        </div>

<!--        <div>-->
<!--            <h3 id="zuo_you_jiao_ti">左右交替-->
<!--                <a href="#zuo_you_jiao_ti" class="f-icon-anchor"></a>-->
<!--            </h3>-->
<!--            <p>时间轴组件将会应用左右交替展现的样式。</p>-->

<!--            <div class="desc">-->
<!--                设置属性 <b>alternate</b> 即可生效。-->
<!--            </div>-->

<!--            <div class="demo-timeline">-->
<!--                <f-timeline type="alternate">-->
<!--                    <f-timeline-item>-->
<!--                        <p><b>唐朝（618年－907年）</b></p>-->
<!--                        <p>唐朝是中国封建社会中统一时间最长，国力最强盛的朝代之一。</p>-->
<!--                    </f-timeline-item>-->
<!--                    <f-timeline-item>-->
<!--                        <p><b>宋朝（960年－1279年）</b></p>-->
<!--                        <p>宋朝是中国历史上承五代十国、下启元朝的时代，分北宋和南宋。</p>-->
<!--                    </f-timeline-item>-->
<!--                    <f-timeline-item>-->
<!--                        <p><b>元朝（1271年－1368年）</b></p>-->
<!--                        <p>元朝是中国历史上由蒙古族建立的王朝，定都大都（北京市）。</p>-->
<!--                    </f-timeline-item>-->
<!--                    <f-timeline-item>-->
<!--                        <p><b>明朝（1368年－1644年）</b></p>-->
<!--                        <p>明朝是中国历史上最后一个由汉族建立的中原王朝。</p>-->
<!--                    </f-timeline-item>-->
<!--                    <f-timeline-item>-->
<!--                        <p><b>清朝（1636年－1912年）</b></p>-->
<!--                        <p>清朝是中国历史上第二个由少数民族建立的统一政权，也是中国最后一个封建帝制王朝。</p>-->
<!--                    </f-timeline-item>-->
<!--                </f-timeline>-->
<!--            </div>-->

<!--            <div v-highlight>-->
<!--                <pre><code>-->
<!--    {{`<f-timeline type="alternate">-->
<!--        <f-timeline-item>-->
<!--            <p><b>唐朝（618年－907年）</b></p>-->
<!--            <p>唐朝是中国封建社会中统一时间最长，国力最强盛的朝代之一。</p>-->
<!--        </f-timeline-item>-->
<!--        <f-timeline-item>-->
<!--            <p><b>宋朝（960年－1279年）</b></p>-->
<!--            <p>宋朝是中国历史上承五代十国、下启元朝的时代，分北宋和南宋。</p>-->
<!--        </f-timeline-item>-->
<!--        <f-timeline-item>-->
<!--            <p><b>元朝（1271年－1368年）</b></p>-->
<!--            <p>元朝是中国历史上由蒙古族建立的王朝，定都大都（北京市）。</p>-->
<!--        </f-timeline-item>-->
<!--        <f-timeline-item>-->
<!--            <p><b>明朝（1368年－1644年）</b></p>-->
<!--            <p>明朝是中国历史上最后一个由汉族建立的中原王朝。</p>-->
<!--        </f-timeline-item>-->
<!--        <f-timeline-item>-->
<!--            <p><b>清朝（1636年－1912年）</b></p>-->
<!--            <p>清朝是中国历史上第二个由少数民族建立的统一政权，也是中国最后一个封建帝制王朝。</p>-->
<!--        </f-timeline-item>-->
<!--    </f-timeline>`}}-->
<!--                </code></pre>-->
<!--            </div>-->
<!--        </div>-->

        <div>
            <h3 id="shi_jian_jie_dian_zhuang_tai">时间节点状态
                <a href="#shi_jian_jie_dian_zhuang_tai" class="f-icon-anchor"></a>
            </h3>
            <p>时间轴的节点拥有3种不同的颜色，默认是蓝色，代表正常；红色代表失败、错误等；绿色表示成功、完成等。</p>

            <div class="demo-timeline">
                <f-timeline>
                    <f-timeline-item>
                        <b>登录游戏账号中...</b>
                    </f-timeline-item>
                    <f-timeline-item>
                        <b>校验账号用户名、密码。</b>
                    </f-timeline-item>
                    <f-timeline-item status="error">
                        <b>密码错误！</b>
                    </f-timeline-item>
                    <f-timeline-item>
                        <b>再次校验账号数据...</b>
                    </f-timeline-item>
                    <f-timeline-item status="success">
                        <b>登陆成功！</b>
                    </f-timeline-item>
                    <f-timeline-item status="success">
                        <b>加载游戏地图成功！</b>
                    </f-timeline-item>
                    <f-timeline-item status="success">
                        <b>加载人物数据成功！</b>
                    </f-timeline-item>
                    <f-timeline-item status="error" icon="f-icon-computer">
                        <b>网络连接中断，请检查您的网络！</b>
                    </f-timeline-item>
                </f-timeline>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-timeline>
        <f-timeline-item>
            <b>登录游戏账号中...</b>
        </f-timeline-item>
        <f-timeline-item>
            <b>校验账号用户名、密码。</b>
        </f-timeline-item>
        <f-timeline-item status="error">
            <b>密码错误！</b>
        </f-timeline-item>
        <f-timeline-item>
            <b>再次校验账号数据...</b>
        </f-timeline-item>
        <f-timeline-item status="success">
            <b>登陆成功！</b>
        </f-timeline-item>
        <f-timeline-item status="success">
            <b>加载游戏地图成功！</b>
        </f-timeline-item>
        <f-timeline-item status="success">
            <b>加载人物数据成功！</b>
        </f-timeline-item>
        <f-timeline-item status="error">
            <b>网络连接中断，请检查您的网络！</b>
        </f-timeline-item>
    </f-timeline>`}}
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
import fTimeline from '/@/views/packages/timeline/Timeline.vue'
import fTimelineItem from '/@/views/packages/timeline/Timeline-item.vue'
import fRadio from '/@/views/packages/radio/Radio.vue';
export default defineComponent({
    components: {
        fTimeline,
        fTimelineItem,
        fRadio
    },
    setup() {
        const type = ref('left')
        return{
            type
        }
    }
})
</script>

<style scoped lang="scss">
.demo-timeline{
    padding: 20px 0;
    b{
        font-size: 16px;
    }
}
</style>