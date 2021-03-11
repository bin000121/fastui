<template>
    <div class="f-dropdowns" ref="dropdowns">
        <div :id="getDropdownId" class="f-dropdowns-control">
            <slot></slot>
        </div>
        <transition :name="animate ? 'f-dropdowns-fade' : ''" mode="out-in">
            <ul
                :style="`text-align: ${textAlign || 'left'}`"
                class="f-dropdowns-menu"
                :id="getDropdownMenuId"
                v-show="showMenu"
                @toggleHideAndShow="toggleHideAndShow"
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
    ref,
    onMounted,
    computed
} from 'vue'
import { getRandomId } from '../../../utils/getRandomId'
import { debounce } from '../../../utils/debounce'

export default defineComponent({
    props: {
        trigger: {
            type: String,
            default: 'hover',
            validator: (value: string) => ['hover', 'click'].includes(value)
        },
        textAlign: {
            type: String,
            validator: (value: string) => ['center', 'right'].includes(value)
        },
        animate: {
            type: Boolean,
            default: true
        }
    },
    setup ({ trigger, textAlign }, ctx) {
        const isShowMenu = !!ctx.slots['f-dropdowns-menu']
        const dropdowns = ref(null)
        const dropdownsMenu = ref(null)
        const showMenu = ref(false)
        const getDropdownId = getRandomId('dropdowns')
        const getDropdownMenuId = getRandomId('dropdowns-menu')
        const toggleHideAndShow = () => {
            showMenu.value = !showMenu.value
        }
        document.addEventListener('click', (e: any) => {
            e.stopPropagation()
            if (trigger === 'hover') return
            if(e.target.parentNode.classList.contains('f-dropdowns-control')) return
            if (!showMenu.value) return
            showMenu.value = false
        })

        onMounted(() => {
            const Dom: any = document.getElementById(getDropdownId)
            const menuDom: HTMLElement = dropdownsMenu.value as any
            menuDom.style.top = Dom.offsetHeight + 'px'
            if (trigger === 'hover') {
                Dom.addEventListener('mouseenter', debounce(toggleHideAndShow, 200))
                menuDom.addEventListener('mouseenter', debounce(toggleHideAndShow, 200))
                Dom.addEventListener('mouseleave', debounce(toggleHideAndShow, 200))
                menuDom.addEventListener('mouseleave', debounce(toggleHideAndShow, 200))
            } else {
                Dom.addEventListener('click', toggleHideAndShow)
            }
        })
        return{
            isShowMenu,
            dropdowns,
            getDropdownId,
            getDropdownMenuId,
            showMenu,
            toggleHideAndShow,
            dropdownsMenu,
            textAlign
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
    text-align: left;
    box-sizing: border-box;
    padding: 10px 0;
    margin: 10px 0;
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    /*border: 1px solid #eee;*/
    border-radius: 5px;
    box-shadow: 0 1px 5px #ddd;
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
</style>
