import { createRouter, RouteRecordRaw, createMemoryHistory, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('/@/views/home.vue')
    },
    {
        path: '/doc',
        name: 'doc',
        component: () => import('/@/views/doc.vue'),
        children: [
            {
                path: '/doc/button',
                name: 'button',
                component: () => import('/@/views/display/button.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '幽灵按钮': 'you_ling_an_niu',
                    '按钮圆角': 'yuan_jiao',
                    '禁用按钮': 'jin_yong',
                    '文本按钮': 'wen_ben',
                    '尺寸': 'chi_cun'
                }
            },
            {
                path: '/doc/icon',
                name: 'icon',
                component: () => import('/@/views/display/icon.vue'),
                meta: {
                    '基本使用': 'ji_ben_shi_yong',
                    '全部图标': 'suo_you'
                }
            },
            {
                path: '/doc/tag',
                name: 'tag',
                component: () => import('/@/views/display/tag.vue'),
                meta: {
                    '基本用法': 'ji_ben_shi_yong',
                    '尺寸': 'cicun'
                }
            },
            {
                path: '/doc/switch',
                name: 'switch',
                component: () => import('/@/views/display/switch.vue'),
                meta: {
                   '基本用法': 'ji_ben_yong_fa',
                   '禁用': 'jin_yong',
                   '文本': 'wen_ben',
                   '内嵌': 'nei_qian',
                   '加载中': 'jia_zai_zhong',
                   '内嵌文本': 'nei_qian_wen_ben',
                   '尺寸': 'chi_cun',
                }
            },
            {
                path: '/doc/box',
                name: 'box',
                component: () => import('/@/views/display/box.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '盒子阴影': 'he_zi_yin_ying'
                }
            },
            {
                path: '/doc/grid',
                name: 'grid',
                component: () => import('/@/views/display/grid.vue'),
                meta: {
                    '基本布局': 'ji_ben_bu_ju',
                    '栅格换行': 'huan_hang',
                    '栅格间隔': 'jian_ge',
                    '栅格偏移': 'pian_yi',
                    '横向对齐方式': 'heng_xiang_dui_qi_fang_shi',
                    '竖向对齐方式': 'shu_xiang_dui_qi_fang_shi',
                }
            },
            {
                path: '/doc/breadcrumb',
                name: 'breadcrumb',
                component: () => import('/@/views/display/breadcrumb.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '分隔符号': 'fen_ge_fu_hao',
                    '导航跳转': 'dao_hang_tiao_zhuan',
                    '跳转方式': 'tiao_zhuan_fang_shi',
                    '尺寸': 'chi_cun',
                }
            },
            {
                path: '/doc/dropdowns',
                name: 'dropdowns',
                component: () => import('/@/views/display/dropdowns.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '移除动画': 'yi_chu_dong_hua',
                    '触发方式': 'chu_fa_fang_shi',
                    '按钮样式': 'an_niu_yang_shi',
                    '尺寸': 'chi_cun',
                    '禁用': 'jin_yong',
                    '伸展方向': 'shen_zhan_fang_xiang'
                }
            },
            {
                path: '/doc/slider',
                name: 'slider',
                component: () => import('/@/views/display/slider.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '禁用': 'jin_yong',
                    '只读': 'zhi_du',
                    '提示框': 'ti_shi_kuang',
                    '步长': 'bu_chang'
                }
            },
            {
                path: '/doc/input',
                name: 'input',
                component: () => import('/@/views/display/input.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '可清空内容': 'ke_qing_kong',
                    '输入框插槽': 'cha_cao',
                    '限制长度': 'xian_zhi_chang_du',
                    '禁用': 'jin_yong',
                    '只读': 'zhi_du',
                    '密码输入框': 'mi_ma',
                    '文本域': 'wen_ben_yu'
                }
            },
            {
                path: '/doc/select',
                name: 'select',
                component: () => import('/@/views/display/select.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '可清空': 'ke_qing_kong',
                    '只读': 'zhi_du',
                    '尺寸': 'chi_cun',
                    '禁用': 'jin_yong',
                    '可多选': 'ke_duo_xuan',
                    '限制数量': 'xian_zhi_shu_liang',
                    '可搜索': 'ke_sou_suo',
                    '自定义模板': 'zi_ding_yi_mo_ban',
                    '多选分组': 'duo_xuan_fen_zu'
                }
            },
            {
                path: '/doc/tabs',
                name: 'tabs',
                component: () => import('/@/views/display/tabs.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '卡片样式': 'ka_pian_yang_shi',
                    '尺寸': 'chi_cun',
                    '可关闭标签': 'ke_guan_bi',
                    '禁用标签': 'jin_yong',
                    '标签前缀图标': 'qian_zhui_tu_biao',
                    '自定义标签': 'zi_ding_yi_biao_qian',
                    '标签位置': 'wei_zhi',
                    '轮滑': 'lun_hua'
                }
            },
            {
                path: '/doc/pagination',
                name: 'pagination',
                component: () => import('/@/views/display/pagination.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '禁用': 'jin_yong',
                    '圆形': 'yuan_xing',
                    '位置': 'wei_zhi',
                    '尺寸': 'chi_cun',
                    '按钮个数': 'xian_zhi_chang_du',
                    '翻页步长': 'bu_chang',
                    '文本样式': 'wen_ben',
                    '简洁分页器': 'jian_jie'
                }
            },
            {
                path: '/doc/radio',
                name: 'radio',
                component: () => import('/@/views/display/radio.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '禁用': 'jin_yong',
                    '带边框': 'bian_kuang',
                    '尺寸': 'chi_cun',
                    '单选框组': 'dan_xuan_kuang_zu'
                }
            },
            {
                path: '/doc/checkbox',
                name: 'checkbox',
                component: () => import('/@/views/display/checkbox.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '禁用': 'jin_yong',
                    '带边框': 'bian_kuang',
                    '变为块级元素': 'kuai_ji_yuan_su',
                    '尺寸': 'chi_cun',
                    '多选按钮组': 'duo_xuan_zu'
                }
            },
            {
                path: '/doc/model',
                name: 'model',
                component: () => import('/@/views/display/model.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '禁用遮罩层关闭': 'jin_yong_zhe_zhao',
                    '禁用esc关闭': 'jin_yong_esc',
                    '多层嵌套': 'duo_ceng_qian_tao'
                }
            },
            {
                path: '/doc/popconfirm',
                name: 'popconfirm',
                component: () => import('/@/views/display/popconfirm.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '自定义': 'zi_ding_yi',
                    '出现位置': 'chu_xian_wei_zhi',
                    '禁用': 'jin_yong',
                    '无动画': 'wu_dong_hua'
                }
            },
            {
                path: '/doc/table',
                name: 'table',
                component: () => import('/@/views/display/table.vue')
            },
            {
                path: '/doc/tooltip',
                name: 'tooltip',
                component: () => import('/@/views/display/tooltip.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '出现位置': 'chu_xian_wei_zhi',
                    '自定义内容': 'zi_ding_yi_nei_rong',
                    '主题': 'zhu_ti',
                    '显示、消失延迟': 'yan_chi',
                }
            },
            {
                path: '/doc/timeline',
                name: 'timeline',
                component: () => import('/@/views/display/timeline.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    // '左右交替': 'zuo_you_jiao_ti',
                    '时间节点状态': 'shi_jian_jie_dian_zhuang_tai',
                }
            },
            {
                path: '/doc/drawer',
                name: 'drawer',
                component: () => import('/@/views/display/drawer.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '弹出方向': 'tan_chu_fang_xiang',
                    '多层嵌套': 'duo_ceng_qian_tao'
                }
            },
            {
                path: '/doc/toTop',
                name: 'toTop',
                component: () => import('/@/views/display/toTop.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa'
                }
            },
            {
                path: '/doc/spin',
                name: 'spin',
                component: () => import('/@/views/display/spin.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '样式': 'yang_shi',
                    '大小、宽度、色彩': 'da_xiao_kuan_du_se_cai',
                    '提示文字': 'ti_shi_wen_zi'
                }
            },
            {
                path: '/doc/progress',
                name: 'progress',
                component: () => import('/@/views/display/progress.vue'),
                meta: {
                    '基本样式': 'ji_ben_yang_shi',
                    '提示文本': 'ti_shi_wen_ben_xin_xi',
                    '圆角': 'yuan_jiao',
                    '动效': 'dong_xiao',
                    '环形': 'huan_xing',
                }
            },
            {
                path: '/doc/badge',
                name: 'badge',
                component: () => import('/@/views/display/badge.vue'),
                meta: {
                    '基本样式': 'ji_ben_yang_shi',
                }
            },
            {
                path: '/doc/layout',
                name: 'layout',
                component: () => import('/@/views/display/layout.vue'),
                meta: {}
            }
        ]
    },
]

export default createRouter({
    routes,
    history: process.env.NODE_ENV === 'development' ? createWebHistory() : createMemoryHistory()
})
