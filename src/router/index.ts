import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
                component: () => import('/@/views/display/button.vue')
            },
            {
                path: '/doc/tag',
                name: 'tag',
                component: () => import('/@/views/display/tag.vue')
            },
            {
                path: '/doc/switch',
                name: 'switch',
                component: () => import('/@/views/display/switch.vue')
            },
            {
                path: '/doc/box',
                name: 'box',
                component: () => import('/@/views/display/box.vue')
            },
            {
                path: '/doc/grid',
                name: 'grid',
                component: () => import('/@/views/display/grid.vue')
            },
            {
                path: '/doc/breadcrumb',
                name: 'breadcrumb',
                component: () => import('/@/views/display/breadcrumb.vue')
            },
            {
                path: '/doc/dropdowns',
                name: 'dropdowns',
                component: () => import('/@/views/display/dropdowns.vue')
            },
            {
                path: '/doc/slider',
                name: 'slider',
                component: () => import('/@/views/display/slider.vue')
            },
            {
                path: '/doc/input',
                name: 'input',
                component: () => import('/@/views/display/input.vue')
            },
            {
                path: '/doc/select',
                name: 'select',
                component: () => import('/@/views/display/select.vue')
            },
            {
                path: '/doc/pagination',
                name: 'pagination',
                component: () => import('/@/views/display/pagination.vue')
            },
            {
                path: '/doc/toTop',
                name: 'toTop',
                component: () => import('/@/views/display/toTop.vue')
            }
        ]
    },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
