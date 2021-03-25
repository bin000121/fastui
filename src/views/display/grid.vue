<template>
    <div class="Grid">
        <h2>Grid 栅格</h2>
        <p>将网页（视口viewport）整体分割成 24 格。</p>

        <div>
            <h3 id="ji_ben_bu_ju">基本布局
                <a href="#ji_ben_bu_ju" class="f-icon-anchor"></a>
            </h3>
            <p>基础 24 格布局系统。</p>

            <div class="desc">
                使用时必须用 <b>f-row</b> 包裹 <b>f-col</b>，另外可以使用属性 <b>span</b> 来控制 <b>f-col</b> 的宽度。
            </div>
            <div class="desc">
                如果传入 <b>span</b> 的值是一个小数，将会取整当作列宽（见最后一列）。
            </div>
            <div>
                <MnRow>
                    <MnCol :span="24"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>

                <MnRow>
                    <MnCol :span="12"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="12"><div class="demo-col-content demo-col-light"></div></MnCol>
                </MnRow>

                <MnRow>
                    <MnCol :span="8"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="8"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="8"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>

                <MnRow>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6" ><div class="demo-col-content demo-col-light"></div></MnCol>
                </MnRow>

                <MnRow>
                    <MnCol :span="4"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="4"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="4"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="4"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="4"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="4"><div class="demo-col-content demo-col-light"></div></MnCol>
                </MnRow>

                <MnRow>
                    <MnCol :span="4.1"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="4.2"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="4.3"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="4.4"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="4.5"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="4.6"><div class="demo-col-content demo-col-light"></div></MnCol>
                </MnRow>

                <div v-highlight>
                    <pre><code>
    {{`<f-row>
        <f-col :span="24"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>

    <f-row>
        <f-col :span="12"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="12"><div class="demo-col-content demo-col-light"></div></f-col>
    </f-row>

    <f-row>
        <f-col :span="8"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="8"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="8"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>

    <f-row>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6" ><div class="demo-col-content demo-col-light"></div></f-col>
    </f-row>

    <f-row>
        <f-col :span="4"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="4"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="4"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="4"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="4"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="4"><div class="demo-col-content demo-col-light"></div></f-col>
    </f-row>

    <!-- 如果传入 span 的值是一个小数，将会取整当作列宽-->
    <f-row>
        <f-col :span="4.1"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="4.2"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="4.3"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="4.4"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="4.5"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="4.6"><div class="demo-col-content demo-col-light"></div></f-col>
    </f-row>


    <style>
        .demo-col-dark{
            background-color: #2b73af;
        }
        .demo-col-light{
            background-color: #9fc7e8;
        }
        .demo-col-content{
            min-height: 40px;
        }
    </style> `}}
                    </code></pre>
                </div>
            </div>
        </div>


        <div>
            <h3 id="huan_hang">栅格换行
                <a href="#huan_hang" class="f-icon-anchor"></a>
            </h3>
            <p>让栅格进行换行展示。</p>

            <div class="desc">
                你可以对 <b>f-row</b> 设置属性 <b>warp</b> 来换行。
            </div>

            <div class="desc">
                <b>f-row</b> 是默认换行的。
            </div>

            <div>
                <MnRow>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                </MnRow>

                <MnRow :wrap="false">
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-row>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
    </f-row>

    <f-row :wrap="false">
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>


    <style>
        .demo-col-dark{
            background-color: #2b73af;
        }
        .demo-col-light{
            background-color: #9fc7e8;
        }
        .demo-col-content{
            min-height: 40px;
        }
    </style>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="jian_ge">栅格间隔
                <a href="#jian_ge" class="f-icon-anchor"></a>
            </h3>
            <p>基础 24 格布局系统。</p>

            <div class="desc">
                你可以对 <b>f-row</b> 使用 <b>gutter</b> 属性来产生间隔。
            </div>

            <div>
                <MnRow :gutter="20" :wrap="false">
                    <MnCol :span="8"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="8"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="8"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>

                <MnRow :gutter="30" :wrap="false">
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                </MnRow>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-row :gutter="20">
        <f-col :span="8"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="8"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="8"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>

    <f-row :gutter="30">
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="pian_yi">栅格偏移
                <a href="#pian_yi" class="f-icon-anchor"></a>
            </h3>
            <p>栅格可以进行偏移放置。</p>

            <div class="desc">
                通过对 <b>f-col</b> 配置属性 <b>offset</b> 来达到栅格偏移效果。
            </div>

            <div>
                <MnRow>
                    <MnCol :span="6" :offset="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6" :offset="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                </MnRow>

                <MnRow>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6" :offset="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                </MnRow>
                <MnRow>
                    <MnCol :span="12" :offset="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-row>
        <f-col :span="6" :offset="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6" :offset="6"><div class="demo-col-content demo-col-light"></div></f-col>
    </f-row>

    <f-row>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6" :offset="6"><div class="demo-col-content demo-col-light"></div></f-col>
    </f-row>

    <f-row>
        <f-col :span="12" :offset="6"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>



    <style>
        .demo-col-dark{
            background-color: #2b73af;
        }
        .demo-col-light{
            background-color: #9fc7e8;
        }
    </style>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="heng_xiang_dui_qi_fang_shi">横向对齐方式
                <a href="#heng_xiang_dui_qi_fang_shi" class="f-icon-anchor"></a>
            </h3>
            <p>栅格在横向方向的排版方式。</p>

            <div class="desc">
                通过对 <b>f-row</b> 配置属性 <b>justify-content</b> 来控制横向排版，默认start。
            </div>

            <div>
                <MnRow class="bgc-dark">
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>
                <MnRow justify-content="center" class="bgc-dark">
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>
                <MnRow justify-content="end" class="bgc-dark">
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>
                <MnRow justify-content="space-between" class="bgc-dark">
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>
                <MnRow justify-content="space-around" class="bgc-dark">
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>
            </div>

            <div v-highlight>
            <pre><code>
    {{`<f-row class="bgc-dark">
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>
    <f-row justify-content="center" class="bgc-dark">
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>
    <f-row justify-content="end" class="bgc-dark">
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>
    <f-row justify-content="space-between" class="bgc-dark">
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>
    <f-row justify-content="space-around" class="bgc-dark">
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>


    <style>
        .demo-col-dark{
            background-color: #2b73af;
        }
        .demo-col-light{
            background-color: #9fc7e8;
        }
        .demo-col-content{
            min-height: 40px;
        }
        .bgc-dark{
            padding: 8px 0;
            background-color: #eee;
        }
    </style>`}}
            </code></pre>
            </div>
        </div>

        <div>
            <h3 id="shu_xiang_dui_qi_fang_shi">竖向对齐方式
                <a href="#shu_xiang_dui_qi_fang_shi" class="f-icon-anchor"></a>
            </h3>
            <p>栅格在竖向方向的排版方式。</p>

            <div>
                <div class="desc">
                    通过对 <b>f-row</b> 配置属性 <b>align-items</b> 来控制竖向排版，默认start。
                </div>
            </div>
            <div>
                <MnRow class="bgc-dark-align-items">
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>
                <MnRow class="bgc-dark-align-items" align-items="stretch">
                    <MnCol :span="6"><div class="demo-col-content-stretch demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content-stretch demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content-stretch demo-col-dark"></div></MnCol>
                </MnRow>
                <MnRow class="bgc-dark-align-items" align-items="center">
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>
                <MnRow class="bgc-dark-align-items" align-items="end">
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-col-dark"></div></MnCol>
                </MnRow>
                <MnRow class="bgc-dark-align-items" align-items="baseline">
                    <MnCol :span="6"><div class="demo-col-content-align-items-1 demo-col-dark">baseline</div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content-align-items-2 demo-col-light">baseline</div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content-align-items-3 demo-col-dark">baseline</div></MnCol>
                </MnRow>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-row class="bgc-dark-align-items">
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>

    <f-row class="bgc-dark-align-items" align-items="stretch">
        <f-col :span="6"><div class="demo-col-content-stretch demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content-stretch demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content-stretch demo-col-dark"></div></f-col>
    </f-row>

    <f-row class="bgc-dark-align-items" align-items="center">
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>

    <f-row class="bgc-dark-align-items" align-items="end">
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-col-dark"></div></f-col>
    </f-row>

    <f-row class="bgc-dark-align-items" align-items="baseline">
        <f-col :span="6">
            <div class="demo-col-content-align-items-1 demo-col-dark">baseline</div>
        </f-col>
        <f-col :span="6">
            <div class="demo-col-content-align-items-2 demo-col-light">baseline</div>
        </f-col>
        <f-col :span="6">
            <div class="demo-col-content-align-items-3 demo-col-dark">baseline</div>
        </f-col>
    </f-row>


    <style>
        .demo-col-dark{
            background-color: #2b73af;
        }
        .demo-col-light{
            background-color: #9fc7e8;
        }
        .bgc-dark-align-items{
            height: 80px;
            background-color: #eee;
        }
        .demo-col-content-stretch{
            height: 100%;
        }
        .demo-col-content-align-items-1{
            box-sizing: border-box;
            padding-top: 15px;
            height: 45px;
        }
        .demo-col-content-align-items-2{
            height: 55px;
        }
        .demo-col-content-align-items-3{
            box-sizing: border-box;
            padding-top: 15px;
            height: 65px;
        }
    </style>`}}
                </code></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import MnRow from '../components/Row.vue'
import MnCol from '../components/Col.vue'

export default defineComponent({
    components: {
        MnRow,
        MnCol
    },
    setup () {
        return {

        }
    }
})
</script>

<style scoped lang="scss">
.f-row{
    margin-bottom: 15px
}
.demo-col-dark{
    background-color: #2b73af;
}
.demo-col-light{
    background-color: #9fc7e8;
}
.demo-col-content{
    min-height: 40px;
}
.bgc-dark{
    padding: 8px 0;
    background-color: #eee;
}
.bgc-dark-align-items{
    height: 80px;
    background-color: #eee;
}
.demo-col-content-stretch{
    height: 100%;
}
.demo-col-content-align-items-1{
    box-sizing: border-box;
    padding-top: 15px;
    height: 45px;
}
.demo-col-content-align-items-2{
    height: 55px;
}
.demo-col-content-align-items-3{
    box-sizing: border-box;
    padding-top: 15px;
    height: 65px;
}
</style>
