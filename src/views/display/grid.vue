<template>
    <div class="Grid">
        <h2>Grid 栅格</h2>
        <p>将网页（视口viewport）整体分割成 24 格。</p>

        <div>
            <h3>基本布局</h3>
            <p>基础 24 格布局系统。</p>

            <div class="desc">
                使用时必须用 <b>f-row</b> 包裹 <b>f-col</b>，另外可以使用属性 <b>span</b> 来控制 <b>f-col</b> 的宽度。
            </div>
            <div class="desc">
                如果传入 <b>span</b> 的值是一个小数，将会取整当作列宽（见最后一列）。
            </div>
            <div>
                <MnRow>
                    <MnCol :span="24"><div class="demo-col-content demo-row-dark"></div></MnCol>
                </MnRow>

                <MnRow>
                    <MnCol :span="12"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="12"><div class="demo-col-content demo-row-light"></div></MnCol>
                </MnRow>

                <MnRow>
                    <MnCol :span="8"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="8"><div class="demo-col-content demo-row-light"></div></MnCol>
                    <MnCol :span="8"><div class="demo-col-content demo-row-dark"></div></MnCol>
                </MnRow>

                <MnRow>
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="6" ><div class="demo-col-content demo-row-light"></div></MnCol>
                </MnRow>

                <MnRow>
                    <MnCol :span="4"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="4"><div class="demo-col-content demo-row-light"></div></MnCol>
                    <MnCol :span="4"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="4"><div class="demo-col-content demo-row-light"></div></MnCol>
                    <MnCol :span="4"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="4"><div class="demo-col-content demo-row-light"></div></MnCol>
                </MnRow>

                <MnRow>
                    <MnCol :span="4.1"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="4.2"><div class="demo-col-content demo-row-light"></div></MnCol>
                    <MnCol :span="4.3"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="4.4"><div class="demo-col-content demo-row-light"></div></MnCol>
                    <MnCol :span="4.5"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="4.6"><div class="demo-col-content demo-row-light"></div></MnCol>
                </MnRow>

                <div v-highlight>
                    <pre><code>
    {{`<f-row>
        <f-col></f-col>
    </f-row>

    <f-row>
        <f-col :span="12"></f-col>
        <f-col :span="12"></f-col>
    </f-row>

    <f-row>
        <f-col :span="8"></f-col>
        <f-col :span="8"></f-col>
        <f-col :span="8"></f-col>
    </f-row>

    <f-row>
        <f-col :span="6"></f-col>
        <f-col :span="6"></f-col>
        <f-col :span="6"></f-col>
        <f-col :span="6"></f-col>
    </f-row>

    <f-row>
        <f-col :span="4"></f-col>
        <f-col :span="4"></f-col>
        <f-col :span="4"></f-col>
        <f-col :span="4"></f-col>
        <f-col :span="4"></f-col>
        <f-col :span="4"></f-col>
    </f-row>

    <!-- 如果传入 span 的值是一个小数，将会取整当作列宽-->
    <f-row>
        <f-col :span="4.1"></f-col>
        <f-col :span="4.2"></f-col>
        <f-col :span="4.3"></f-col>
        <f-col :span="4.4"></f-col>
        <f-col :span="4.5"></f-col>
        <f-col :span="4.6"></f-col>
    </f-row>



    <style>
        .demo-row .f-row{
            margin-bottom: 15px;
        }
        .demo-row .demo-row-dark{
            background-color: #2b73af;
        }
        .demo-row .demo-row-light{
            background-color: #9fc7e8;
        }
        .demo-row .demo-col-content{
            min-height: 40px;
        }
    </style> `}}
                    </code></pre>
                </div>
            </div>
        </div>

        <div>
            <h3>栅格间隔</h3>
            <p>基础 24 格布局系统。</p>

            <div class="desc">
                你可以对 <b>f-row</b> 使用 <b>gutter</b> 属性来产生间隔。
            </div>

            <div>
                <MnRow :gutter="20">
                    <MnCol :span="8"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="8"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="8"><div class="demo-col-content demo-row-dark"></div></MnCol>
                </MnRow>

                <MnRow :gutter="30">
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                </MnRow>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-row :gutter="20">
        <f-col :span="8"><div class="demo-col-content demo-row-dark"></div></f-col>
        <f-col :span="8"><div class="demo-col-content demo-row-dark"></div></f-col>
        <f-col :span="8"><div class="demo-col-content demo-row-dark"></div></f-col>
    </f-row>

    <f-row :gutter="30">
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
    </f-row>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3>栅格偏移</h3>
            <p>栅格可以进行偏移放置。</p>

            <div class="desc">
                通过对 <b>f-col</b> 配置属性 <b>offset</b> 来达到栅格偏移效果。
            </div>
        </div>

        <div>
            <h3>对齐方式</h3>
            <p>栅格在横向方向的排版方式。</p>

            <div class="desc">
                通过对 <b>f-row</b> 配置属性 <b>justify-content</b> 来控制横向排版，默认start。
            </div>

            <div>
                <MnRow :gutter="20">
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                </MnRow>
                <MnRow :gutter="20" justify-content="center">
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                </MnRow>
                <MnRow :gutter="20" justify-content="end">
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                </MnRow>
                <MnRow :gutter="20" justify-content="space-between">
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                </MnRow>
                <MnRow :gutter="20" justify-content="space-around">
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-light"></div></MnCol>
                    <MnCol :span="6"><div class="demo-col-content demo-row-dark"></div></MnCol>
                </MnRow>
            </div>
        </div>

        <div v-highlight>
            <pre><code>
    {{`<f-row :gutter="20">
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
    </f-row>
    <f-row :gutter="20" justify-content="center">
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
    </f-row>
    <f-row :gutter="20" justify-content="end">
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
    </f-row>
    <f-row :gutter="20" justify-content="space-between">
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
    </f-row>
    <f-row :gutter="20" justify-content="space-around">
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-light"></div></f-col>
        <f-col :span="6"><div class="demo-col-content demo-row-dark"></div></f-col>
    </f-row>


    <style>
        .f-row{
            margin-bottom: 15px;
        }
        .demo-row-dark{
            background-color: #2b73af;
        }
        .demo-row-light{
            background-color: #9fc7e8;
        }
        .demo-col-content{
            min-height: 40px;
        }
    </style>`}}
            </code></pre>
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
    margin-bottom: 15px;
}
.demo-row-dark{
    background-color: #2b73af;
}
.demo-row-light{
    background-color: #9fc7e8;
}
.demo-col-content{
    min-height: 40px;
}
</style>
