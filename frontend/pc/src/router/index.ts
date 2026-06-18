import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

/** 布局组件 */
import Layout from '@/pages/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: 'Login' },
    component: () => import('@/pages/login/index.vue'),
  },
  {
    path: '/main',
    component: Layout,
    children: [
      {
        path: 'chat',
        name: 'Chat',
        meta: { title: 'Chat' },
        component: () => import('@/pages/chat/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
