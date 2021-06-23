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
    ref
} from 'vue'

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
            '/doc/cascader': 'Cascader 级联选择器',
            '/doc/carousel': 'Carousel 走马灯',
            '/doc/tabs': 'Tabs 标签页',
            '/doc/pagination': 'Pagination 分页器',
            '/doc/radio': 'Radio 单选按钮',
            '/doc/checkbox': 'Checkbox 多选按钮',
            '/doc/model': 'Model 弹出框',
            '/doc/popconfirm': 'Popconfirm 气泡弹出框',
            // '/doc/menu': 'Menu 导航菜单',
            '/doc/message': 'Message 消息通知',
            '/doc/notification': 'Notification 消息通知框',
            // '/doc/table': 'Table 表格',
            '/doc/tooltip': 'Tooltip 文字提示',
            '/doc/timeline': 'Timeline 时间线',
            '/doc/drawer': 'Drawer 抽屉',
            '/doc/toTop': 'ToTop 返回顶部',
            '/doc/spin': 'Spin 加载中',
            '/doc/progress': 'Progress 进度条',
            '/doc/badge': 'Badge 徽章',
            '/doc/img': 'Img 图片容器',
            '/doc/collapse': 'Collapse 折叠面板',
        }

        const Aside = ref(null)

        return {
            Aside,
            element
        }
    }
})
</script>

<style scoped lang="scss">
.aside{
    position: fixed;
    top: 60px;
    bottom: 0;
    width: 220px;
    box-sizing: border-box;
    border-right: 1px solid #eee;
    background-color: #fff;
    padding: 15px 0 45px 5px;
    overflow: hidden;
    z-index: 1;
    &:hover{
        overflow-x: hidden;
        overflow-y: auto;
    }
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
