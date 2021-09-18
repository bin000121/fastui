<template>
    <div class="aside" ref="Aside">
        <div
            v-for="([k, v], idx) in Object.entries(element)"
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

export default defineComponent( {
    setup () {
        const router = useRouter()
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
        const activeIdx = ref(-1)

        const handleClick = (to: string, idx: number) => {
            activeIdx.value = idx
            router.push(to)
        }

        return {
            activeIdx,
            Aside,
            element,
            handleClick
        }
    }
})
</script>

<style scoped lang="scss">
.aside{
    width: 250px;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
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
}
.menu-item.active, .menu-item:hover{
    color: #3cd0be;
    background-color: #3cd0be1a;
    border-right: 3px solid #3cd0be;
}
</style>
