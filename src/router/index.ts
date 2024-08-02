import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

import userRoutes from '@/features/user/routes'
import HomeView from '@/features/home/view/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      component: DefaultLayout,
      children: [...userRoutes],
    },
  ],
})

export default router
