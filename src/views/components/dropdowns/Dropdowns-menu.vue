<template>
    <transition name="fade-in" mode="out-in">
        <ul class="f-dropdowns-menu" ref="fDropdownsMenu">
            <slot></slot>
        </ul>
    </transition>
</template>

<script lang="ts">
import {
    defineComponent,
    inject,
    onMounted,
    ref
} from 'vue'

export default defineComponent({
    setup () {
        const fDropdownsMenu = ref(null)

        return{
            fDropdownsMenu
        }
    }
})
</script>

<style scoped lang="scss">
.f-dropdowns-menu{
    padding: 10px 0;
    margin: 10px 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 1px 3px #ddd;
    z-index: 999;
    transition: opacity .2s;
    &::before, &::after{
        content: '';
        display: block;
        position: absolute;
        top: -14px;
        left: 50%;
        transform: translateX(-50%);
        height: 0;
        width: 0;
        border: 7px solid transparent;
        border-bottom-color: #fff;
        z-index: 10;
    }
    &::after{
        top: -16px;
        z-index: 9;
        border-bottom-color: #eee;
    }
}

</style>
