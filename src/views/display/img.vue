<template>
    <div>
        <h2>Img 图片容器</h2>
        <p>经过包装后返回的一的img图片容器，它拓展了一些功能。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p></p>
            <div class="demo-img">
                <f-img
                    src="/@/assets/img/demo3.jpg"
                    width="300px"
                    height="300px"
                    object-fit="cover"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue'
import fImg from '/@/views/packages/img/Img.vue'

export default defineComponent({
    components: {
        fImg,
    },
    setup() {
        return{

        }
    }
})
</script>

<style scoped lang="scss">
.demo-img{

}
</style>