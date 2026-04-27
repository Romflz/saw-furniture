import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../Views/Home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../Views/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

router.beforeEach((to) => {
  // If logged out, force only login screen
  // If logged in, don't allow seeing login
  const auth = useAuthStore()
  if (!auth.isLoggedIn && to.name !== 'login') {
    return { name: 'login' }
  }
  if (auth.isLoggedIn && to.name === 'login') {
    return { name: 'home' }
  }
})

export default router
