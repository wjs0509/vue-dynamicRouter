import Vue from 'vue'
import Router from 'vue-router'
const Layout = () => import("@/views/layout/index.vue")

Vue.use(Router)


const constantRouterMap = constantRouterMap

export default new Router({
  routes: constantRouterMap
})
