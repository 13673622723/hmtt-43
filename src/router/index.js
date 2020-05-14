import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login")
  },
  {
    path: "/register",
    component: () => import("@/views/Register")
  },
  {
    path: "/personal",
    component: () => import("@/views/Personal")
  },
  {
    path: "/edit",
    component: () => import("@/views/Edit")
  },
  {
    path: "/concerns",
    component: () => import("@/views/Concerns")
  },
  {
    path: "/collection",
    component: () => import("@/views/Collection")
  },
  {
    path: "/comment",
    component: () => import("@/views/Comment")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
