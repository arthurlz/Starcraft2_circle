import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
import Signup from '@/components/signup'
import Signin from '@/components/signin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/signin',
      component: Signin
    }
  ]
})
