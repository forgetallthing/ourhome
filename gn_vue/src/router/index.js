import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect:'login'
    },{
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve),
    },{
      path: '/home',
      name: 'home',
      component: resolve => require(['@/components/home'], resolve),
      redirect: {
        name: 'socket'
      },
      children:[{
        path: '/list',
        name: 'list',
        component: resolve => require(['@/components/list'], resolve)
      },{
        path: '/socket',
        name: 'socket',
        component: resolve => require(['@/components/socket'], resolve)
      }]
    }
    
  ]
})
