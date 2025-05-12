import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', component: HomePage,
    },
  ],
})
