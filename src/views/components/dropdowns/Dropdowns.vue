<template>
    <div class="f-dropdowns" ref="dropdowns" >
        <div :id="getDropdownId" class="f-dropdowns-control">
            <slot></slot>
        </div>
        <transition name="fade-in" mode="out-in">
            <ul
                class="f-dropdowns-menu"
                :id="getDropdownMenuId"
                v-show="showMenu"
                @click="toggleHideAndShow"
                ref="dropdownsMenu"
            >
                <slot name="dropdown"></slot>
            </ul>
        </transition>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    provide,
    ref,
    onMounted
} from 'vue'
import { getRandomId } from '../../../utils/getRandomId'

export default defineComponent({
    props: {
        trigger: {
            type: String,
            default: 'hover',
            validator: (value: string) => ['hover', 'click'].includes(value)
        }
    },
    setup (props, ctx) {
        const isShowMenu = !!ctx.slots['f-dropdowns-menu']
        const dropdowns = ref(null)
        const dropdownsMenu = ref(null)
        const showMenu = ref(false)
        const getDropdownId = getRandomId('dropdowns')
        const getDropdownMenuId = getRandomId('dropdowns-menu')
        const toggleHideAndShow = () => {
            showMenu.value = !showMenu.value
        }
        // document.addEventListener('click', () => {
        //     if ()
        // })
        onMounted(() => {
            const Dom: any = document.getElementById(getDropdownId)

            Dom.addEventListener('click', toggleHideAndShow)
        })
        return{
            isShowMenu,
            dropdowns,
            getDropdownId,
            getDropdownMenuId,
            showMenu,
            toggleHideAndShow,
            dropdownsMenu
        }
    }
})
</script>

<style scoped lang="scss">
.f-dropdowns{
    display: inline-block;
    position: relative;
}
.f-dropdowns-control{
    cursor: pointer;
    color: #007acc;
    font-size: 14px;
}
.f-dropdowns-menu{
    padding: 10px 0;
    margin: 10px 0;
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 1px 3px #ddd;
    z-index: 999;
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
.fade-in-enter{
    opacity: 1;
}
.fade-in-leave-to{
    opacity: 0;
}
.fade-in-enter-active, .fade-in-leave-active{
    transition: all .2s;
}
</style>
