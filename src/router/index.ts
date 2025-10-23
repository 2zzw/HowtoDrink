import { createRouter, createWebHistory } from 'vue-router'
import { useDrinkStore } from '@/store/drinkStore'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tea',
      name: 'tea',
      component: () => import('../views/TeaView.vue')
    },
    {
      path: '/coffee',
      name: 'coffee',
      component: () => import('../views/CoffeeView.vue')
    },
    {
      path: '/alcohol',
      name: 'alcohol',
      component: () => import('../views/AlcoholView.vue')
    },
    {
      path: '/drink/:id',
      name: 'drink-detail',
      component: () => import('../views/DrinkDetailView.vue'),
      props: true
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 总是滚动到顶部
    return { top: 0 }
  }
})

// 可选：添加导航守卫来处理搜索状态
router.beforeEach((to, from, next) => {
  // 如果从其他页面跳转到首页，并且有搜索条件，则保持搜索状态
  next()
})

export default router
