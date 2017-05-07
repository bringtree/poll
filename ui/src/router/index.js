import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/login'
import Poll from '@/components/poll'
import Detail from '@/components/detail'
import Header from '@/components/header'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path:'/header',
      name:'header',
      component:Header,
      children:[
        {
          path:'login',
          name: 'Login',
          component:Login
        },
        {
          path:'poll',
          name:'poll',
          component:Poll
        },
        {
          path:'detail',
          name:'detail',
          component:Detail
        }
      ]
    }
  ]
})
