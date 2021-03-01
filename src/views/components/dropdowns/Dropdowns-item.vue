<template>
    <li class="f-dropdowns-item" @click="hideMenu">
        <slot></slot>
    </li>
</template>

<script lang="ts">
import {
    defineComponent,
    inject,
    onMounted,
    getCurrentInstance
} from 'vue'

export default defineComponent({
    setup () {
        const hideMenu = () => {} // 冒泡事件
        return{
            hideMenu
        }
    }
})
</script>

<style scoped lang="scss">
.f-dropdowns-item{
    padding: 0 20px;
    cursor: pointer;
    line-height: 32px;
    &:hover{
        background-color: #eee;
    }
}
</style>
