<template>
    <div :class="['header', showBorder ? 'header-bottom' : '']">
        <div
            class="title"
            @click="router.push('/')"
            title="猛男 UI"
        >Mengnan</div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive,
} from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent( {
    props: {
        showBorder: Boolean
    },
    setup () {
        const router = useRouter()
        return {
            router
        }
    }
})
</script>

<style scoped lang="scss">
.header{
    height: 60px;
    /*background-color: #58a397;*/
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 5vw;
    border-bottom: 1px solid #ddd;
    .title{
        cursor: pointer;
        user-select: none;
    }
}
.title{
    color: #3cd0be;
    font-size: 20px;
    font-family: "Microsoft YaHei UI";
}
</style>
