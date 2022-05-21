import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "Pagedashboard" */ '../views/DashBoardView.vue'),
    children: [
      {
        path: ":action/:context/:category",
      },
      {
        path: ":page",
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "PageAbout" */ '../views/AboutView.vue')
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: () => import(/* webpackChunkName: "PageNotFound" */ '../views/NotFoundView.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "PageHome" */ '../views/HomeView.vue')
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
