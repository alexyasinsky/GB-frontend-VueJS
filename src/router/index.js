import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "PageHome" */ '../views/HomeView.vue'),
    children: [
      {
        path: "add/payment/:category",
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
    redirect: {path: '/home/1'}
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
