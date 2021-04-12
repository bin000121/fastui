<template>
    <div>
        <h2>Menu 导航菜单</h2>
        <p>装载着页面路由信息的导航菜单容器。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>常见的使用方法。</p>

            <div class="demo-menu">

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue'
import fMenu from '/@/views/packages/menu/Menu.vue'

export default defineComponent({
    components: {
        fMenu,
    },
    setup() {

    }
})
</script>

<style scoped lang="scss">
.demo-menu{

}
</style>