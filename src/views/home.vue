<template>
    <Header/>
    <div class="container">
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#f-icon-jirounan"></use>
            </svg>
        </div>
        <h1>猛男 UI</h1>
        <h2>一款基于Vue3、Typescript的UI框架，让开发更简单。</h2>
        <div class="link">
            <router-link to="/doc">Getting Started</router-link>
            <a href="https://github.com/bin000121/fastui" target="_blank">github</a>
        </div>
    </div>
    <div style="height: 800px;">
<!--        <div class="clockContainer">-->
<!--&lt;!&ndash;            中心点&ndash;&gt;-->
<!--            <div class="centerPoint">-->
<!--                <div class="hour"></div>-->
<!--                <div class="min"></div>-->
<!--                <div class="sec" style=""></div>-->
<!--            </div>-->
<!--&lt;!&ndash;            数字&ndash;&gt;-->
<!--            <div-->
<!--                v-for="item in 12"-->
<!--                class="clockNum"-->
<!--                :style="`transform: translateX(-50%) rotate(${item * 30}deg);`"-->
<!--            >-->
<!--                {{ item }}-->
<!--&lt;!&ndash;                <div :style="`transform: rotate(${-item * 30}deg)`">{{ item }}</div>&ndash;&gt;-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script lang="ts">
import Header from '../components/header.vue'

import {
    defineComponent,
    reactive,
    toRefs,
    onMounted
} from 'vue'

export default defineComponent( {
    components: {
        Header
    },
    setup () {
        const data = reactive({
            sec: 0,
        })

        window.scrollTo(0, 0)

        // const
        // setInterval(() => {
        //
        // }, 1000)

        return{
            ...toRefs(data),
        }
    }
})
</script>

<style scoped lang="scss">
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    font-size: 188px;
}
.app{
    height: 100%;
}
.container{
    box-sizing: border-box;
    padding-bottom: 60px;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #3cd0be;
    h1{
        letter-spacing: 1px;
        font-size: 60px;
        margin: 15px 0;
        color: #fff;
    }
    h2{
        letter-spacing: 1px;
        margin: 0;
        font-size: 36px;
        font-weight: 300;
        font-family: Helvetica;
        color: #fff;
    }
    .link{
        width: 300px;
        margin: 30px auto;
        display: flex;
        justify-content: space-between;
    }
    a{
        padding: 12px 20px;
        text-decoration: none;
        border: 1px solid #fff;
        border-radius: 10px;
        color: #fff;
        transition: all .2s;
        &:hover{
            background-color: #fff;
            color: #3cd0be;
        }
    }
}
</style>
