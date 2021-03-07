<template>
    <div class="app">
        <Header/>
        <div class="container">
            <h1>猛男 UI</h1>
            <h2>一款基于Vue3、Typescript的UI框架，让开发更简单。</h2>
            <div class="link">
                <router-link to="/doc">Getting Started</router-link>
                <a href="https://github.com">github</a>
            </div>
        </div>
        <div style="height: 800px;"></div>
    </div>
</template>

<script lang="ts">
import Header from '../components/header.vue'

import {
    defineComponent
} from 'vue'

export default defineComponent( {
    components: {
        Header
    }
})
</script>

<style scoped lang="scss">
.app{
    height: 100%;
}
.container{
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
