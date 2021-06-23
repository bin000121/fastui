<template>
    <div>
        <h2>Collapse 折叠面板</h2>
        <p>一块可以将内容展开、收起的盒子容器，可以使得页面整洁。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>基础的使用方式</p>

            <div class="desc">
                对某个 f-collapse-item 设置 <b>show-arrow="false"</b> 可以隐藏该项头部的箭头图标。
            </div>

            <div class="desc">
                对某个 f-collapse-item 设置 <b>icon</b> 可以自定义该项头部的图标。
            </div>

            <div class="desc">
                对某个 f-collapse-item 设置 <b>icon-placement="right"</b> 可以将头部的图标置于右侧，默认值为left。
            </div>

            <div class="demo-collapse">
                <f-collapse v-model:value="defaultOpen">
                    <f-collapse-item title="唐朝（618年－907年）" name="one" icon="f-icon-arrow-right-filling">
                        <p>唐朝是中国封建社会中统一时间最长，国力最强盛的朝代之一，唐朝共历274年（包括武周是289年），20位皇帝。唐朝声誉远及海外，与南亚、西亚和欧洲国家均有往来。</p>
                    </f-collapse-item>
                    <f-collapse-item title="宋朝（960年－1279年）" name="two" icon-placement="right">
                        <p>宋朝是中国历史上承五代十国、下启元朝的时代，分北宋和南宋。960年，后周大将赵匡胤黄袍加身，建立宋朝；宋朝历十八帝三百二十年，是中国古代历史上经济、文化教育与科学创新高度繁荣的时代，宋朝时中国GDP占世界比重60%，为各朝代第一，期间出现了宋明理学，科技发展亦突飞猛进，政治也较开明廉洁。</p>
                    </f-collapse-item>
                    <f-collapse-item title="元朝（1271年－1368年）" name="three" :show-arrow="false">
                        <p>元朝是中国历史上由蒙古族建立的王朝，定都大都（北京市）。</p>
                    </f-collapse-item>
                    <f-collapse-item title="明朝（1368年－1644年）" name="four" icon="f-icon-arrow-right-filling" icon-placement="right">
                        <p>明朝是中国历史上最后一个由汉族建立的中原王朝。历经十二世、十六位皇帝，国祚二百七十六年。明朝是继汉唐宋后又一个强盛的中原王朝。明代，虽特务横行，奸宦弄权，但无汉之外戚、唐之藩镇、宋之岁币，天子守国门，君主死社稷。清朝官修史书《明史》中评价明朝是“治隆唐宋”、“远迈汉唐”。</p>
                    </f-collapse-item>
                    <f-collapse-item title="清朝（1636年－1912年）" name="five" :show-arrow="false">
                        <p>清朝是中国历史上第二个由少数民族建立的统一政权，也是中国最后一个封建帝制王朝。从后金建立开始算起，共有十二帝，国祚276年。清朝历经康雍乾三朝，发展到鼎峰。这一时期统一多民族国家得到巩固，基本上奠定了中国版图，同时君主专制发展到顶峰。</p>
                    </f-collapse-item>
                </f-collapse>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-collapse>
        <f-collapse-item title="唐朝（618年－907年）" name="one" icon="f-icon-arrow-right-filling">
            <p>唐朝是中国封建社会中统一时间最长，国力最强盛的朝代之一，唐朝共历274年（包括武周是289年），20位皇帝。唐朝声誉远及海外，与南亚、西亚和欧洲国家均有往来。</p>
        </f-collapse-item>
        <f-collapse-item title="宋朝（960年－1279年）" name="two" icon-placement="right">
            <p>宋朝是中国历史上承五代十国、下启元朝的时代，分北宋和南宋。960年，后周大将赵匡胤黄袍加身，建立宋朝；宋朝历十八帝三百二十年，是中国古代历史上经济、文化教育与科学创新高度繁荣的时代，宋朝时中国GDP占世界比重60%，为各朝代第一，期间出现了宋明理学，科技发展亦突飞猛进，政治也较开明廉洁。</p>
        </f-collapse-item>
        <f-collapse-item title="元朝（1271年－1368年）" name="three" :show-arrow="false">
            <p>元朝是中国历史上由蒙古族建立的王朝，定都大都（北京市）。</p>
        </f-collapse-item>
        <f-collapse-item title="明朝（1368年－1644年）" name="four" icon="f-icon-arrow-right-filling" icon-placement="right">
            <p>明朝是中国历史上最后一个由汉族建立的中原王朝。历经十二世、十六位皇帝，国祚二百七十六年。明朝是继汉唐宋后又一个强盛的中原王朝。明代，虽特务横行，奸宦弄权，但无汉之外戚、唐之藩镇、宋之岁币，天子守国门，君主死社稷。清朝官修史书《明史》中评价明朝是“治隆唐宋”、“远迈汉唐”。</p>
        </f-collapse-item>
        <f-collapse-item title="清朝（1636年－1912年）" name="five" :show-arrow="false">
            <p>清朝是中国历史上第二个由少数民族建立的统一政权，也是中国最后一个封建帝制王朝。从后金建立开始算起，共有十二帝，国祚276年。清朝历经康雍乾三朝，发展到鼎峰。这一时期统一多民族国家得到巩固，基本上奠定了中国版图，同时君主专制发展到顶峰。</p>
        </f-collapse-item>
    </f-collapse>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'
    export default defineComponent({
        setup() {
            const data = reactive({
                defaultOpen: ['one', 'three']
            })
            return{ ...toRefs(data) }
        }
    })
    </script>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="shou_feng_qin">手风琴
                <a href="#shou_feng_qin" class="f-icon-anchor"></a>
            </h3>
            <p>每次只能打开一个面板。</p>

            <div class="desc">
                为 f-collapse 设置属性 <b>accordion</b> 即可。
            </div>

            <div class="demo-collapse">
                <f-collapse accordion>
                    <f-collapse-item title="唐朝（618年－907年）" name="one">
                        <p>唐朝是中国封建社会中统一时间最长，国力最强盛的朝代之一，唐朝共历274年（包括武周是289年），20位皇帝。唐朝声誉远及海外，与南亚、西亚和欧洲国家均有往来。</p>
                    </f-collapse-item>
                    <f-collapse-item title="宋朝（960年－1279年）" name="two">
                        <p>宋朝是中国历史上承五代十国、下启元朝的时代，分北宋和南宋。960年，后周大将赵匡胤黄袍加身，建立宋朝；宋朝历十八帝三百二十年，是中国古代历史上经济、文化教育与科学创新高度繁荣的时代，宋朝时中国GDP占世界比重60%，为各朝代第一，期间出现了宋明理学，科技发展亦突飞猛进，政治也较开明廉洁。</p>
                    </f-collapse-item>
                    <f-collapse-item title="元朝（1271年－1368年）" name="three">
                        <p>元朝是中国历史上由蒙古族建立的王朝，定都大都（北京市）。</p>
                    </f-collapse-item>
                    <f-collapse-item title="明朝（1368年－1644年）" name="four">
                        <p>明朝是中国历史上最后一个由汉族建立的中原王朝。历经十二世、十六位皇帝，国祚二百七十六年。明朝是继汉唐宋后又一个强盛的中原王朝。明代，虽特务横行，奸宦弄权，但无汉之外戚、唐之藩镇、宋之岁币，天子守国门，君主死社稷。清朝官修史书《明史》中评价明朝是“治隆唐宋”、“远迈汉唐”。</p>
                    </f-collapse-item>
                    <f-collapse-item title="清朝（1636年－1912年）" name="five">
                        <p>清朝是中国历史上第二个由少数民族建立的统一政权，也是中国最后一个封建帝制王朝。从后金建立开始算起，共有十二帝，国祚276年。清朝历经康雍乾三朝，发展到鼎峰。这一时期统一多民族国家得到巩固，基本上奠定了中国版图，同时君主专制发展到顶峰。</p>
                    </f-collapse-item>
                </f-collapse>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-collapse accordion>
        <f-collapse-item title="唐朝（618年－907年）" name="one">
            <p>唐朝是中国封建社会中统一时间最长，国力最强盛的朝代之一，唐朝共历274年（包括武周是289年），20位皇帝。唐朝声誉远及海外，与南亚、西亚和欧洲国家均有往来。</p>
        </f-collapse-item>
        <f-collapse-item title="宋朝（960年－1279年）" name="two">
            <p>宋朝是中国历史上承五代十国、下启元朝的时代，分北宋和南宋。960年，后周大将赵匡胤黄袍加身，建立宋朝；宋朝历十八帝三百二十年，是中国古代历史上经济、文化教育与科学创新高度繁荣的时代，宋朝时中国GDP占世界比重60%，为各朝代第一，期间出现了宋明理学，科技发展亦突飞猛进，政治也较开明廉洁。</p>
        </f-collapse-item>
        <f-collapse-item title="元朝（1271年－1368年）" name="three">
            <p>元朝是中国历史上由蒙古族建立的王朝，定都大都（北京市）。</p>
        </f-collapse-item>
        <f-collapse-item title="明朝（1368年－1644年）" name="four">
            <p>明朝是中国历史上最后一个由汉族建立的中原王朝。历经十二世、十六位皇帝，国祚二百七十六年。明朝是继汉唐宋后又一个强盛的中原王朝。明代，虽特务横行，奸宦弄权，但无汉之外戚、唐之藩镇、宋之岁币，天子守国门，君主死社稷。清朝官修史书《明史》中评价明朝是“治隆唐宋”、“远迈汉唐”。</p>
        </f-collapse-item>
        <f-collapse-item title="清朝（1636年－1912年）" name="five">
            <p>清朝是中国历史上第二个由少数民族建立的统一政权，也是中国最后一个封建帝制王朝。从后金建立开始算起，共有十二帝，国祚276年。清朝历经康雍乾三朝，发展到鼎峰。这一时期统一多民族国家得到巩固，基本上奠定了中国版图，同时君主专制发展到顶峰。</p>
        </f-collapse-item>
    </f-collapse>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jin_yong_mian_ban">禁用面板
                <a href="#jin_yong_mian_ban" class="f-icon-anchor"></a>
            </h3>
            <p>您不能与之交互，并添加禁用样式。</p>

            <div class="desc">
                为 f-collapse-item 设置属性 <b>disabled</b> 即可禁用面板。
            </div>

            <div class="demo-collapse">
                <f-collapse>
                    <f-collapse-item title="唐朝（618年－907年）" name="one">
                        <p>唐朝是中国封建社会中统一时间最长，国力最强盛的朝代之一，唐朝共历274年（包括武周是289年），20位皇帝。唐朝声誉远及海外，与南亚、西亚和欧洲国家均有往来。</p>
                    </f-collapse-item>
                    <f-collapse-item title="宋朝（960年－1279年）" name="two">
                        <p>宋朝是中国历史上承五代十国、下启元朝的时代，分北宋和南宋。960年，后周大将赵匡胤黄袍加身，建立宋朝；宋朝历十八帝三百二十年，是中国古代历史上经济、文化教育与科学创新高度繁荣的时代，宋朝时中国GDP占世界比重60%，为各朝代第一，期间出现了宋明理学，科技发展亦突飞猛进，政治也较开明廉洁。</p>
                    </f-collapse-item>
                    <f-collapse-item title="元朝（1271年－1368年）" name="three" disabled>
                        <p>元朝是中国历史上由蒙古族建立的王朝，定都大都（北京市）。</p>
                    </f-collapse-item>
                    <f-collapse-item title="明朝（1368年－1644年）" name="four">
                        <p>明朝是中国历史上最后一个由汉族建立的中原王朝。历经十二世、十六位皇帝，国祚二百七十六年。明朝是继汉唐宋后又一个强盛的中原王朝。明代，虽特务横行，奸宦弄权，但无汉之外戚、唐之藩镇、宋之岁币，天子守国门，君主死社稷。清朝官修史书《明史》中评价明朝是“治隆唐宋”、“远迈汉唐”。</p>
                    </f-collapse-item>
                    <f-collapse-item title="清朝（1636年－1912年）" name="five">
                        <p>清朝是中国历史上第二个由少数民族建立的统一政权，也是中国最后一个封建帝制王朝。从后金建立开始算起，共有十二帝，国祚276年。清朝历经康雍乾三朝，发展到鼎峰。这一时期统一多民族国家得到巩固，基本上奠定了中国版图，同时君主专制发展到顶峰。</p>
                    </f-collapse-item>
                </f-collapse>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-collapse>
        <f-collapse-item title="唐朝（618年－907年）" name="one">
            <p>唐朝是中国封建社会中统一时间最长，国力最强盛的朝代之一，唐朝共历274年（包括武周是289年），20位皇帝。唐朝声誉远及海外，与南亚、西亚和欧洲国家均有往来。</p>
        </f-collapse-item>
        <f-collapse-item title="宋朝（960年－1279年）" name="two">
            <p>宋朝是中国历史上承五代十国、下启元朝的时代，分北宋和南宋。960年，后周大将赵匡胤黄袍加身，建立宋朝；宋朝历十八帝三百二十年，是中国古代历史上经济、文化教育与科学创新高度繁荣的时代，宋朝时中国GDP占世界比重60%，为各朝代第一，期间出现了宋明理学，科技发展亦突飞猛进，政治也较开明廉洁。</p>
        </f-collapse-item>
        <f-collapse-item title="元朝（1271年－1368年）" name="three" disabled>
            <p>元朝是中国历史上由蒙古族建立的王朝，定都大都（北京市）。</p>
        </f-collapse-item>
        <f-collapse-item title="明朝（1368年－1644年）" name="four">
            <p>明朝是中国历史上最后一个由汉族建立的中原王朝。历经十二世、十六位皇帝，国祚二百七十六年。明朝是继汉唐宋后又一个强盛的中原王朝。明代，虽特务横行，奸宦弄权，但无汉之外戚、唐之藩镇、宋之岁币，天子守国门，君主死社稷。清朝官修史书《明史》中评价明朝是“治隆唐宋”、“远迈汉唐”。</p>
        </f-collapse-item>
        <f-collapse-item title="清朝（1636年－1912年）" name="five">
            <p>清朝是中国历史上第二个由少数民族建立的统一政权，也是中国最后一个封建帝制王朝。从后金建立开始算起，共有十二帝，国祚276年。清朝历经康雍乾三朝，发展到鼎峰。这一时期统一多民族国家得到巩固，基本上奠定了中国版图，同时君主专制发展到顶峰。</p>
        </f-collapse-item>
    </f-collapse>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jian_jie_mian_ban">简洁样式
                <a href="#jian_jie_mian_ban" class="f-icon-anchor"></a>
            </h3>
            <p>为折叠面板应用简洁样式。</p>

            <div class="desc">
                为 f-collapse 设置属性 <b>simple</b> 即可使用简洁面板样式。
            </div>

            <div class="demo-collapse">
                <f-collapse simple>
                    <f-collapse-item title="唐朝（618年－907年）" name="one">
                        <p>唐朝是中国封建社会中统一时间最长，国力最强盛的朝代之一，唐朝共历274年（包括武周是289年），20位皇帝。唐朝声誉远及海外，与南亚、西亚和欧洲国家均有往来。</p>
                    </f-collapse-item>
                    <f-collapse-item title="宋朝（960年－1279年）" name="two">
                        <p>宋朝是中国历史上承五代十国、下启元朝的时代，分北宋和南宋。960年，后周大将赵匡胤黄袍加身，建立宋朝；宋朝历十八帝三百二十年，是中国古代历史上经济、文化教育与科学创新高度繁荣的时代，宋朝时中国GDP占世界比重60%，为各朝代第一，期间出现了宋明理学，科技发展亦突飞猛进，政治也较开明廉洁。</p>
                    </f-collapse-item>
                    <f-collapse-item title="元朝（1271年－1368年）" name="three">
                        <p>元朝是中国历史上由蒙古族建立的王朝，定都大都（北京市）。</p>
                    </f-collapse-item>
                    <f-collapse-item title="明朝（1368年－1644年）" name="four">
                        <p>明朝是中国历史上最后一个由汉族建立的中原王朝。历经十二世、十六位皇帝，国祚二百七十六年。明朝是继汉唐宋后又一个强盛的中原王朝。明代，虽特务横行，奸宦弄权，但无汉之外戚、唐之藩镇、宋之岁币，天子守国门，君主死社稷。清朝官修史书《明史》中评价明朝是“治隆唐宋”、“远迈汉唐”。</p>
                    </f-collapse-item>
                    <f-collapse-item title="清朝（1636年－1912年）" name="five">
                        <p>清朝是中国历史上第二个由少数民族建立的统一政权，也是中国最后一个封建帝制王朝。从后金建立开始算起，共有十二帝，国祚276年。清朝历经康雍乾三朝，发展到鼎峰。这一时期统一多民族国家得到巩固，基本上奠定了中国版图，同时君主专制发展到顶峰。</p>
                    </f-collapse-item>
                </f-collapse>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-collapse>
        <f-collapse-item title="唐朝（618年－907年）" name="one">
            <p>唐朝是中国封建社会中统一时间最长，国力最强盛的朝代之一，唐朝共历274年（包括武周是289年），20位皇帝。唐朝声誉远及海外，与南亚、西亚和欧洲国家均有往来。</p>
        </f-collapse-item>
        <f-collapse-item title="宋朝（960年－1279年）" name="two">
            <p>宋朝是中国历史上承五代十国、下启元朝的时代，分北宋和南宋。960年，后周大将赵匡胤黄袍加身，建立宋朝；宋朝历十八帝三百二十年，是中国古代历史上经济、文化教育与科学创新高度繁荣的时代，宋朝时中国GDP占世界比重60%，为各朝代第一，期间出现了宋明理学，科技发展亦突飞猛进，政治也较开明廉洁。</p>
        </f-collapse-item>
        <f-collapse-item title="元朝（1271年－1368年）" name="three">
            <p>元朝是中国历史上由蒙古族建立的王朝，定都大都（北京市）。</p>
        </f-collapse-item>
        <f-collapse-item title="明朝（1368年－1644年）" name="four">
            <p>明朝是中国历史上最后一个由汉族建立的中原王朝。历经十二世、十六位皇帝，国祚二百七十六年。明朝是继汉唐宋后又一个强盛的中原王朝。明代，虽特务横行，奸宦弄权，但无汉之外戚、唐之藩镇、宋之岁币，天子守国门，君主死社稷。清朝官修史书《明史》中评价明朝是“治隆唐宋”、“远迈汉唐”。</p>
        </f-collapse-item>
        <f-collapse-item title="清朝（1636年－1912年）" name="five">
            <p>清朝是中国历史上第二个由少数民族建立的统一政权，也是中国最后一个封建帝制王朝。从后金建立开始算起，共有十二帝，国祚276年。清朝历经康雍乾三朝，发展到鼎峰。这一时期统一多民族国家得到巩固，基本上奠定了中国版图，同时君主专制发展到顶峰。</p>
        </f-collapse-item>
    </f-collapse>`}}
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
import fCollapse from '/@/views/packages/collapse/Collapse.vue'
import fCollapseItem from '/@/views/packages/collapse/Collapse-item.vue'

export default defineComponent({
    components: {
        fCollapse,
        fCollapseItem
    },
    setup() {
        const data = reactive({
            defaultOpen: ['one', 'three']
        })
        return{
            ...toRefs(data)
        }
    }
})
</script>

<style scoped lang="scss">
.demo-collapse{
}
</style>