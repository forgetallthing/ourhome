import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home/home'
import partner1 from '@/components/partner/partner1'
import resolve1 from '@/components/resolve/resolve1'
import product21 from '@/components/product/product21'

Vue.use(Router)

export default new Router({
  routes: [
			  {
			      path: '/home',
			      name: 'home',
			      component: home
			  },
			  {
			      path: '/partner1',
			      name: 'partner1',
			      component: partner1
			  },
			  {
			      path: '/resolve1',
			      name: 'resolve1',
			      component: resolve1
			  },
			  {
			      path: '/product21',
			      name: 'product21',
			      component: product21
			  },
			  {
			  	path:'/',
			  	redirect: '/home'
			  }
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }*/
  ]
})
