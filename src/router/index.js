import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
import Signup from '@/components/signup'
import Signin from '@/components/signin'
import Personal from '@/components/personal'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import Editor from '@/components/editor'

Vue.use(iView)
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
				{
					path: 'profile',
					component: Personal
				}
			]
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/signin',
      component: Signin
    },
    {
      path: '/new',
      component: Editor    
    }
  ]
})

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
});

export default router
