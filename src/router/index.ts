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
                    '幽灵样式': 'you_ling_yang_shi',
                    '可关闭': 'ke_guan_bi',
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
                    '栅格顺序': 'shun_xu',
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
                path: '/doc/input_number',
                name: 'input_number',
                component: () => import('/@/views/display/input-number.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '禁用': 'jin_yong',
                    '只读': 'zhi_du',
                    '格式化呈现': 'ge_shi_hua',
                    '步长': 'bu_chang',
                    '尺寸': 'chi_cun',
                    '简洁步进器': 'jian_jie_bu_jin_qi'
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
                path: '/doc/cascader',
                name: 'cascader',
                component: () => import('/@/views/display/cascader.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '自定义显示': 'zi_ding_yi_xian_shi',
                    '尺寸': 'chi_cun',
                    '可清空': 'ke_qing_kong',
                    '触发方式': 'chu_fa_fang_shi',
                    '禁用': 'jin_yong',
                    '只显示最后一级': 'zui_hou_yi_ji',
                    '选择即停下': 'xuan_ze_ji_jie_guo',
                    '可搜索': 'ke_sou_suo',
                    '动态加载': 'dong_tai_jia_zai',
                    '自定义字段名': 'zi_ding_yi_zi_duan_ming',
                }
            },
            {
                path: '/doc/carousel',
                name: 'carousel',
                component: () => import('/@/views/display/carousel.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '内部方法': 'nei_bu_fang_fa',
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
                    '元素顺序': 'yuan_su_shun_xu',
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
                path: '/doc/message',
                name: 'message',
                component: () => import('/@/views/display/message.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '消息类型': 'xiao_xi_lei_xing',
                    '可关闭': 'ke_guan_bi',
                    '自定义展示模板': 'zi_ding_yi_zhan_shi_mu_ban',
                    '自定义时长': 'zi_ding_yi_shi_chang',
                    '关闭所有消息': 'guan_bi_suo_you_xiao_xi',
                }
            },
            {
                path: '/doc/table',
                name: 'table',
                component: () => import('/@/views/display/table.vue')
            },
            {
                path: '/doc/menu',
                name: 'menu',
                component: () => import('/@/views/display/menu.vue')
            },
            {
                path: '/doc/tooltip',
                name: 'tooltip',
                component: () => import('/@/views/display/tooltip.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '出现位置': 'chu_xian_wei_zhi',
                    '自定义内容': 'zi_ding_yi_nei_rong',
                    '移除箭头': 'yi_chu_jian_tou',
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
                    '基本用法': 'ji_ben_yong_fa',
                    '多种色彩': 'duo_zhong_se_cai',
                    '位置': 'wei_zhi',
                    '自定义样式': 'zi_ding_yi_yang_shi',
                }
            },
            {
                path: '/doc/img',
                name: 'img',
                component: () => import('/@/views/display/img.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '容错处理': 'rong_cuo_chu_li',
                    '加载中占位': 'jia_zai_zhong_zhan_wei',
                    '查看大图': 'cha_kan_da_tu',
                    '多图预览': 'duo_tu_yu_lan',
                    '懒加载': 'lan_jia_zai',
                }
            },
            {
                path: '/doc/layout',
                name: 'layout',
                component: () => import('/@/views/display/layout.vue'),
                meta: {
                    '基本布局': 'ji_ben_bu_ju',
                }
            },
            {
                path: '/doc/collapse',
                name: 'collapse',
                component: () => import('/@/views/display/collapse.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '手风琴': 'shou_feng_qin',
                    '禁用面板': 'jin_yong_mian_ban',
                    '简洁样式': 'jian_jie_mian_ban',
                }
            },
            {
                path: '/doc/notification',
                name: 'notification',
                component: () => import('/@/views/display/notification.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '自定义显示时长': 'zi_ding_yi_xian_shi_shi_chang',
                    '消息类型': 'xiao_xi_lei_xing',
                    '弹出位置': 'tan_chu_wei_zhi',
                    '自定义': 'zi_ding_yi',
                    '横、纵向偏移量': 'pian_yi_liang',
                    '回调函数': 'hui_diao_han_shu',
                }
            },
            {
                path: '/doc/rate',
                name: 'rate',
                component: () => import('/@/views/display/rate.vue'),
                meta: {
                    '基本用法': 'ji_ben_yong_fa',
                    '自定义': 'zi_ding_yi',
                    '禁用': 'jin_yong',
                }
            }
        ]
    },
]

export default createRouter({
    routes,
    history: process.env.NODE_ENV === 'development' ? createWebHistory() : createMemoryHistory()
})
