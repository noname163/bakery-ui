import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/authen/LoginView.vue'),
    },
    {
      path: '/employees',
      name: 'employees',
      component: () => import('../views/tables/EmployeeTable.vue'),
    },
    {
      path: '/materials',
      name: 'materials',
      component: () => import('../views/tables/MaterialTable.vue'),
    },
    {
      path: '/',
      name: 'home',
      omponent: () => import('../views/tables/MaterialTable.vue'),
    },
  ],
})

export default router
