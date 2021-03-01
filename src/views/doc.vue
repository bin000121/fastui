<template>
    <Header showBorder></Header>
    <div class="doc">
        <Aside></Aside>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import Header from '../components/header.vue'
import Aside from '../components/aside.vue'

import {
    defineComponent,
    ref,
    reactive
} from 'vue'

export default defineComponent( {
    components: {
        Header,
        Aside
    },
    setup () {
        return {
        }
    }
})
</script>

<style scoped>
.doc{
    height: calc(100% - 60px);
    display: flex;
    justify-content: center;
    padding: 0 2vw;
}
.content{
    flex-basis: 768px;
    padding: 20px 25px 200px;
    box-sizing: border-box;
    overflow: auto;
}
</style>
