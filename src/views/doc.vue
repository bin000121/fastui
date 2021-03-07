<template>
    <Header showBorder></Header>
    <div class="doc">
        <Aside></Aside>
        <div class="content">
            <router-view v-slot="{ Component }">
                <transition mode="out-in" name="sliderTo">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
            <div class="anchor">
                <h4>索引锚点</h4>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Header from '../components/header.vue'
import Aside from '../components/aside.vue'

import {
    defineComponent,
    onMounted
} from 'vue'

export default defineComponent( {
    components: {
        Header,
        Aside
    },
    setup () {
        // onMounted(() => {
        //     window.addEventListener('resize', debounce((e: Event) => {
        //         let pageWidth = e.target.innerWidth
        //         if (pageWidth < 1200) {
        //
        //         }
        //         console.log()
        //     }, 150))
        // })
        return {
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
    width: 200px;
    max-height: 75vh;
    min-height: 40vh;
    background-color: pink;
    position: fixed;
    right: 2vw;
    top: 60px;
    backdrop-filter: blur(5px);
    z-index: 100;
}
.anchor h4{
    text-align: center;
    margin: 0;
    margin-bottom: 10px;
}
.sliderTo-enter-from,
.sliderTo-leave-to{
    transform: translateX(25px);
    opacity: 0;
}
.sliderTo-leave-active, .sliderTo-enter-active{
    transition: all .15s;
}
</style>
