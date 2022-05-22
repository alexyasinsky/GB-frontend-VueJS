import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "PageDashboard" */ '../views/DashBoardView.vue'),
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "PageNotFound" */ '../views/NotFoundView.vue')
  },
  {
    path: '*',
    redirect: {path: '/notfound'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, form, next) => {
//   console.log(to);
//   next();
// })

export default router
