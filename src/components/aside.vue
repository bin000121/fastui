<template>
    <div class="aside" ref="Aside">
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
    reactive,
    onMounted,
    onUnmounted,
    ref
} from 'vue'
import { throttle } from '/@/utils/throttle'

export default defineComponent( {
    setup () {
        const element = {
            '/doc/button': 'Button 按钮',
            '/doc/icon': 'Icon 图标',
            '/doc/layout': 'Layout 布局',
            '/doc/tag': 'Tag 标签',
            '/doc/switch': 'Switch 开关',
            '/doc/box': 'Box 盒子',
            '/doc/grid': 'Grid 栅格',
            '/doc/breadcrumb': 'Breadcrumb 面包屑',
            '/doc/dropdowns': 'Dropdowns 下拉菜单',
            '/doc/slider': 'Slider 滑块',
            '/doc/input': 'Input 输入框',
            '/doc/input_number': 'InputNumber 步进器',
            '/doc/select': 'Select 下拉框',
            '/doc/tabs': 'Tabs 标签页',
            '/doc/pagination': 'Pagination 分页器',
            '/doc/radio': 'Radio 单选按钮',
            '/doc/checkbox': 'Checkbox 多选按钮',
            '/doc/model': 'Model 弹出框',
            '/doc/popconfirm': 'Popconfirm 气泡弹出框',
            // '/doc/menu': 'Menu 导航菜单',
            '/doc/message': 'Message 消息通知',
            // '/doc/table': 'Table 表格',
            '/doc/tooltip': 'Tooltip 文字提示',
            '/doc/timeline': 'Timeline 时间线',
            '/doc/drawer': 'Drawer 抽屉',
            '/doc/toTop': 'ToTop 返回顶部',
            '/doc/spin': 'Spin 加载中',
            '/doc/progress': 'Progress 进度条',
            '/doc/badge': 'Badge 徽章',
        }

        const Aside = ref(null)
        let asideDom: HTMLElement | any

        // const onScroll = throttle(() => {
        //     let scrollTop = document.documentElement.scrollTop
        //     scrollTop > 60 ? asideDom.classList.add('aside__sticky') : asideDom.classList.remove('aside__sticky')
        // }, 25)

        // onMounted(() => {
        //     asideDom = Aside.value as any
        //     window.addEventListener('scroll', onScroll)
        // })
        //
        // onUnmounted(() => {
        //     window.removeEventListener('scroll', onScroll)
        // })
        return {
            Aside,
            element
        }
    }
})
</script>

<style scoped lang="scss">
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
.aside__sticky{
    position: absolute!important;
    top: 0;
}
ul{
    margin: 0;
    list-style: none;
    li{
        height: 45px;
        line-height: 45px;
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
</style>
