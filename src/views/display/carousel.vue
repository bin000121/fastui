<template>
    <div>
        <h2>Carousel 走马灯</h2>
        <p>即常见的轮播图，多用于一组图文展示。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>最基本的使用方法。</p>

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
        </div>

        <div>
            <h3 id="zi_dong_qie_huan">自动切换
                <a href="#zi_dong_qie_huan" class="f-icon-anchor"></a>
            </h3>
            <p>走马灯会定时的切换下一张，且进行循环播放。</p>

            <div class="demo-carousel">

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted
} from 'vue'
import fCarousel from '/@/views/packages/carousel/Carousel.vue'
import fCarouselItem from '/@/views/packages/carousel/Carousel-item.vue'

export default defineComponent({
    components: {
        fCarousel,
        fCarouselItem
    },
    setup () {
        const carousel = ref(null)
        return{
            carousel
        }
    }
})
</script>

<style scoped lang="scss">
.demo-carousel{
    width: 600px;
    position: relative;
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