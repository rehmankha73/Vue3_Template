import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

import userRoutes from '@/views/user/routes'
import companyRoutes from '@/views/company/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [...userRoutes, ...companyRoutes],
    },
  ],
})

export default router
