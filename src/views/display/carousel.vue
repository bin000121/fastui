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
                    height="350px"
                >
                    <f-carousel-item class="blue"/>
                    <f-carousel-item class="red"/>
                    <f-carousel-item class="pink"/>
                    <f-carousel-item class="red"/>
                    <f-carousel-item class="blue"/>
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
.red{
    background-color: red;
}
.blue{
    background-color: blue;
}
.pink{
    background-color: pink;
}
</style>