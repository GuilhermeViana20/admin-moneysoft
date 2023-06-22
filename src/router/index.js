import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import routes from '@/router/routes'
import { sidebarState } from '@/composables'
import api from '@/api'

const router = createRouter({
  history: createWebHashHistory('kui-dashboard-vue'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const token = localStorage.getItem('token');

  if (!token && to.path !== '/auth/login') {
    next('/auth/login');
  } else if (token && to.path !== '/auth/login') {
    try {
      const response = await api.get('/auth/validate-token');

      if (response.status === 200) {
        next();
      } else {
        next('/auth/login');
      }
    } catch (e) {
      next('/auth/login');
    }
  } else {
    next();
  }
})

router.afterEach(() => {
  if (window.innerWidth <= 1024) {
    sidebarState.isOpen = false
  }
  NProgress.done()
})

export default router
