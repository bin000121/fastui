<template>
    <Header showBorder></Header>
    <div class="doc">
        <Aside></Aside>
        <div class="content">
            <router-view v-slot="{ Component }">
                <transition mode="out-in" name="doc-sliderTo">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
            <div
                :class="{
                    'anchor': true,
                    'anchor__hide': isAnchorHide,
                }"
            >
                <h4>索引锚点</h4>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Header from '/@/components/header.vue'
import Aside from '/@/components/aside.vue'
import { debounce } from '/@/utils/debounce'

import {
    defineComponent,
    onMounted,
    ref
} from 'vue'

export default defineComponent( {
    components: {
        Header,
        Aside
    },
    setup () {
        const isAnchorHide = ref(false)

        const onResize = debounce(() => {
            let pageWidth = document.body.offsetWidth
            isAnchorHide.value = pageWidth < 1400
        }, 100)

        onMounted(() => {
            onResize()
            window.addEventListener('resize', onResize)
        })
        return {
            isAnchorHide
        }
    }
})
</script>

<style scoped lang="scss">
.doc{
    height: calc(100% - 60px);
    display: flex;
    justify-content: center;
    padding: 0 2vw;
    min-width: 996px;
}

.content{
    flex-basis: 768px;
    padding: 20px 25px 200px;
    box-sizing: border-box;
    overflow: auto;
    & :deep(h3):hover{
        a{
            display: inline-block;
        }
    }
}
.anchor{
    padding: 10px;
    font-family: Helvetica;
    width: 160px;
    max-height: 75vh;
    min-height: 40vh;
    background-color: #fff;
    border: 1px solid #3cd0be;
    border-radius: 10px;
    position: fixed;
    right: 40px;
    top: 100px;
    transition: right .15s;
    backdrop-filter: blur(5px);
    z-index: 99;
    color: #3cd0be;
    h4{
        text-align: center;
        margin: 0;
        margin-bottom: 10px;
    }
}
.anchor__hide{
    right: -145px;
    h4{
        display: none;
    }
    &:hover{
        right: 0;
        h4{
          display: block;
        }
    }
}

</style>
