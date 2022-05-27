<template>
    <div class="aside" ref="Aside">
        <div
            v-for="([k, v], idx) in pathAside"
            :key="k"
            :class="{
                'menu-item': true,
                'active': idx === activeIdx
            }"
            @click="handleClick(k, idx)"
        >
            {{v}}
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue'
import { useRouter } from 'vue-router'
import {pathAside} from '/@/utils/aside'
export default defineComponent( {
    setup () {
        const router = useRouter()

        const Aside = ref(null)
        const activeIdx = ref(-1)

        const handleClick = (to: string, idx: number) => {
            activeIdx.value = idx
            router.push(to)
        }

        return {
            activeIdx,
            Aside,
            pathAside: Object.entries(pathAside),
            handleClick
        }
    }
})
</script>

<style scoped lang="scss">
.aside{
    width: 250px;
    box-sizing: border-box;
    border-right: 1px solid #ddd;
    background-color: #fff;
    padding-bottom: 40px;
    overflow: hidden;
    &:hover{
        overflow-x: hidden;
        overflow-y: auto;
    }
}
.aside__sticky{
    position: absolute!important;
    top: 0;
}
.menu-item{
    padding-left: 30px;
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
    transition: all .2s;
    cursor: pointer;
    color: #aaa;
    border-right: 4px solid #fff;
}
.menu-item.active, .menu-item:hover{
    color: #3cd0be;
    background-color: #3cd0be1a;
    border-right: 4px solid #3cd0be;
}
</style>
