import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home.vue')
    },
    {
        path: '/doc',
        name: 'doc',
        component: () => import('../views/doc.vue'),
        children: [
            {
                path: '/doc/button',
                name: 'button',
                component: () => import('../views/display/button.vue')
            },
            {
                path: '/doc/tag',
                name: 'tag',
                component: () => import('../views/display/tag.vue')
            },
            {
                path: '/doc/switch',
                name: 'switch',
                component: () => import('../views/display/switch.vue')
            },
            {
                path: '/doc/box',
                name: 'box',
                component: () => import('../views/display/box.vue')
            },
            {
                path: '/doc/grid',
                name: 'grid',
                component: () => import('../views/display/grid.vue')
            }
        ]
    },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
