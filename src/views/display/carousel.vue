<template>
    <div>
        <h2>Carousel 走马灯</h2>
        <p>即常见的轮播图，多用于一组图文展示。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>下面是控制台，您可以自行配置以查看效果。</p>

            <div class="control">
                <div class="form">
                    <span class="label">自动切换：</span>
                    <div class="item">
                        <f-switch  v-model:value="loop" inset></f-switch>
                    </div>
                </div>
                <div class="form">
                    <span class="label">显示指示器：</span>
                    <div class="item">
                        <f-switch  v-model:value="showDots" inset></f-switch>
                    </div>
                </div>
                <div class="form">
                    <span class="label">指示器类型：</span>
                    <div class="item">
                        <f-radio-group v-model:value="dotsType">
                            <f-radio label="circle" border size="small">圆形</f-radio>
                            <f-radio label="rect" border size="small">方形</f-radio>
                        </f-radio-group>
                    </div>
                </div>
                <div class="form">
                    <span class="label">指示器触发切换方式：</span>
                    <div class="item">
                        <f-radio-group v-model:value="dotTrigger">
                            <f-radio label="click" border size="small">click</f-radio>
                            <f-radio label="hover" border size="small">hover</f-radio>
                        </f-radio-group>
                    </div>
                </div>
                <div class="form">
                    <span class="label">显示切换箭头：</span>
                    <div class="item">
                        <f-switch  v-model:value="showArrow" inset></f-switch>
                    </div>
                </div>
                <div class="form">
                    <span class="label">切换箭头显示时机：</span>
                    <div class="item">
                        <f-radio-group v-model:value="showArrowType">
                            <f-radio label="hover" border size="small">hover</f-radio>
                            <f-radio label="always" border size="small">always</f-radio>
                        </f-radio-group>
                    </div>
                </div>
                <div class="form">
                    <span class="label">切换间隔：</span>
                    <div class="item">
                        <f-radio-group v-model:value="interval">
                            <f-radio :label="1500" border size="small">1.5s</f-radio>
                            <f-radio :label="3500" border size="small">3.5s</f-radio>
                            <f-radio :label="5500" border size="small">5.5s</f-radio>
                        </f-radio-group>
                    </div>
                </div>
            </div>

            <div class="demo-carousel">
                <f-carousel
                    height="300px"
                    ref="carousel"
                    :loop="loop"
                    :showDots="showDots"
                    :showArrow="showArrow"
                    :dotsType="dotsType"
                    :showArrowType="showArrowType"
                    :dotTrigger="dotTrigger"
                    :interval="interval"
                >
                    <f-carousel-item
                        v-for="item in 6"
                        :key="item"
                    >
                        <div
                            :class="[item % 2 === 0 ? 'carousel-item-oven' : 'carousel-item-odd']">
                            <b>{{`Carousel ${item}`}}</b>
                        </div>
                    </f-carousel-item>
                </f-carousel>
            </div>

            <div v-highlight>
    <pre><code>
    {{ `<f-carousel
        height="300px"
        :loop="loop"
        :showDots="showDots"
        :showArrow="showArrow"
        :dotsType="dotsType"
        :showArrowType="showArrowType"
        :dotTrigger="dotTrigger"
        :interval="interval"
    >
        <f-carousel-item v-for="item in 6" :key="item">
            <div
                :class="[item % 2 === 0 ? 'carousel-item-oven' : 'carousel-item-odd']">
                <b>\{\{\`Carousel $\{item}\`\}\}</b>
            </div>
        </f-carousel-item>
    </f-carousel>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs,
    } from 'vue'
    export default defineComponent({
        setup () {
            const data = reactive({
                loop: true,
                showDots: true,
                showArrow: true,
                dotsType: 'circle',
                showArrowType: 'hover',
                dotTrigger: 'click',
                interval: 3500,
            })
            return { ...toRefs(data) }
        }
    })
    </script>


    <style lang="scss">
    .carousel-item-odd, .carousel-item-oven{
        background-color: var(--primary);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 40px;
        letter-spacing: 1px;
        opacity: .75;
    }
    .carousel-item-oven{
        opacity: 1;
    }
    </style>` }}
    </code></pre>
            </div>
        </div>

        <div>
            <h3 id="nei_bu_fang_fa">内部方法
                <a href="#nei_bu_fang_fa" class="f-icon-anchor"></a>
            </h3>
            <p>编程式地控制轮播图的切换。</p>
            <div class="demo-carousel">
                <f-carousel
                    height="300px"
                    ref="carousel"
                >
                    <f-carousel-item
                        v-for="item in 6"
                        :key="item"
                    >
                        <div
                            :class="[item % 2 === 0 ? 'carousel-item-oven' : 'carousel-item-odd']">
                            <b>{{`Carousel ${item}`}}</b>
                        </div>
                    </f-carousel-item>
                </f-carousel>
            </div>

            <div class="demo-carousel">
                <f-button @click="prev">上一页</f-button>
                <f-button @click="next">下一页</f-button>
                <f-button @click="goto(1)">跳转去第二页</f-button>
                <f-button @click="goto(4)">跳转去第五页</f-button>
            </div>

            <div v-highlight>
                <pre><code>
    {{ `<f-carousel
        height="300px"
        ref="carousel"
    >
        <f-carousel-item
            v-for="item in 6"
            :key="item"
        >
            <div
                :class="[item % 2 === 0 ? 'carousel-item-oven' : 'carousel-item-odd']">
                <b>\{\{\`Carousel $\{item}\`\}\}</b>
            </div>
        </f-carousel-item>
    </f-carousel>

    <f-button @click="prev">上一页</f-button>
    <f-button @click="next">下一页</f-button>
    <f-button @click="goto(1)">跳转去第二页</f-button>
    <f-button @click="goto(4)">跳转去第五页</f-button>


    <script lang="ts">
    import {
        defineComponent,
        ref,
        onMounted
    } from 'vue'
    export default defineComponent({
        setup () {
            const carousel = ref(null)
            let carouselDom: any
            const prev = () => {
                carouselDom.prev()
            }
            const next = () => {
                carouselDom.next()
            }
            const goto = (idx: number) => {
                carouselDom.goto(idx)
            }
            onMounted(() => {
                carouselDom = carousel.value
            })
            return{
                prev,
                next,
                goto,
                carousel
            }
        }
    })
    </script>


    <style lang="scss">
    .carousel-item-odd, .carousel-item-oven{
        background-color: var(--primary);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 40px;
        letter-spacing: 1px;
        opacity: .75;
    }
    .carousel-item-oven{
        opacity: 1;
    }
    </style>` }}
                </code></pre>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
    toRefs,
    onMounted
} from 'vue'
import fCarousel from '/@/views/packages/carousel/Carousel.vue'
import fCarouselItem from '/@/views/packages/carousel/Carousel-item.vue'
import fRadio from '/@/views/packages/radio/Radio.vue'
import fRadioGroup from '/@/views/packages/radio/Radio-group.vue'
import fSwitch from '/@/views/packages/switch/Switch.vue'
import fButton from '/@/views/packages/button/Button.vue'
export default defineComponent({
    components: {
        fCarousel,
        fCarouselItem,
        fRadio,
        fRadioGroup,
        fSwitch,
        fButton,
    },
    setup () {
        const carousel = ref(null)
        let carouselDom: any
        const data = reactive({
            loop: true,
            showDots: true,
            showArrow: true,
            dotsType: 'circle',
            showArrowType: 'hover',
            dotTrigger: 'click',
            interval: 3500
        })
        const prev = () => {
            carouselDom.prev()
        }
        const next = () => {
            carouselDom.next()
        }
        const goto = (idx: number) => {
            carouselDom.goto(idx)
        }
        onMounted(() => {
            carouselDom = carousel.value
        })
        return{
            ...toRefs(data),
            prev,
            next,
            goto,
            carousel
        }
    }
})
</script>

<style scoped lang="scss">
.control{
    background-color: #fafafa;
    padding: 12px;
    margin-bottom: 15px;
    .form{
        display: flex;
        align-items: center;
        height: 32px;
        line-height: 32px;
        margin-bottom: 15px;
        &:last-child{
            margin-bottom: 0;
        }
    }
    .label{
        text-align: right;
        width: 180px;
        margin-right: 12px;
    }
}
.demo-carousel{
    width: 600px;
    position: relative;
    margin-bottom: 15px;
}
.carousel-item-odd, .carousel-item-oven{
    background-color: var(--primary);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
    letter-spacing: 1px;
    opacity: .75;
}
.carousel-item-oven{
    opacity: 1;
}
</style>