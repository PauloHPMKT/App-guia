import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('../Layout/AppLayout.vue'),
      redirect: { name: 'dashboard' },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/app/Dashboard.vue')
        },   
        {
          path: 'content-revisor',
          name: 'content-revisor',
          component: () => import('../views/app/ContentRevisor/index.vue')
        },   
      ]
    }
  ]
})