<template>
    <div class="aside">
        <ul>
            <li v-for="([k, v]) in Object.entries(element)" :key="k">
                <router-link :to="k" active-class="active">{{v}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive
} from 'vue'

export default defineComponent( {
    setup () {
        const element = reactive({
            '/doc/button': 'Button 按钮',
            '/doc/tag': 'Tag 标签',
            '/doc/switch': 'Switch 开关',
            '/doc/box': 'Box 盒子',
            '/doc/grid': 'Grid 栅格',
            '/doc/breadcrumb': 'Breadcrumb 面包屑',
            '/doc/dropdowns': 'Dropdowns 下拉菜单',
            '/doc/slider': 'Slider 滑块',
            '/doc/input': 'Input 输入框',
            '/doc/select': 'Select 下拉框',
            '/doc/pagination': 'Pagination 分页',
            '/doc/toTop': 'ToTop 返回顶部',
        })
        return {
            element
        }
    }
})
</script>

<style scoped lang="scss">
ul{
    margin: 0;
    list-style: none;
    li{
        height: 40px;
        line-height: 40px;
    }
    a{
        color: #999;
        transition: color .2s;
        width: 100%;
        height: 100%;
        display: inline-block;
        &:hover{
            /*color: #58a397;*/
            color: #3cd0be;
        }
    }
}
.aside{
    min-height: calc(100vh - 60px);
    width: 248px;
    min-width: 200px;
    box-sizing: border-box;
    border-right: 1px solid #eee;
    padding: 5px 2px 5px 5px;
    ul{
        padding: 0;
    }
    .active{
        color: #3cd0be;
        background-color: #3cd0be1a;
        border-right: 3px solid #3cd0be;
    }
}
</style>
