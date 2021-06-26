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
                >
                    <f-carousel-item>
                        <div class="deep-1">
                            <b>Carousel 1</b>
                        </div>
                    </f-carousel-item>
                    <f-carousel-item>
                        <div class="deep-2">
                            <b>Carousel 2</b>
                        </div>
                    </f-carousel-item>
                    <f-carousel-item>
                        <div class="deep-3">
                            <b>Carousel 3</b>
                        </div>
                    </f-carousel-item>
                    <f-carousel-item>
                        <div class="deep-1">
                            <b>Carousel 4</b>
                        </div>
                    </f-carousel-item>
                    <f-carousel-item>
                        <div class="deep-2">
                            <b>Carousel 5</b>
                        </div>
                    </f-carousel-item>
                </f-carousel>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import fCarousel from '/@/views/packages/carousel/Carousel.vue'
import fCarouselItem from '/@/views/packages/carousel/Carousel-item.vue'

export default defineComponent({
    components: {
        fCarousel,
        fCarouselItem
    },
    setup() {

    }
})
</script>

<style scoped lang="scss">
.demo-carousel{
    width: 600px;
}
.deep-1, .deep-2, .deep-3{
    background-color: rgba(var(--primary-rgba), .7);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
    letter-spacing: 1px;
}
.deep-2{
    background-color: var(--primary);
}
.deep-3{
    background-color: rgba(var(--primary-rgba), .4);
}
</style>