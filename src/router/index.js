import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login'
import Register from '@/views/register/register'
import Home from '@/views/home/home'
import Vip from '@/views/vip/vip'
import Test1 from '@/views/testpage/test1'
import Test2 from '@/views/testpage/test2'
import Test3 from '@/views/testpage/test3'
import Test4 from '@/views/testpage/test4'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path:'/',
      name:'/',
      redirect:'/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      meta:{
        requireAuth: false,  // 添加该字段，表示进入这个路由是否需要登录
      },
      component: Home,
      children:[
        {
          path: 'test1',  //这里不能加'/'，否则跳转空白页
          name: 'test1',
          meta:{
             requireAuth: false,
           },
          component: Test1
        },
        {
          path: 'test2',
          name: 'test2',
          meta:{
             requireAuth: false,
           },
          component: Test2
        }
      ]
    },
    {
      path: '/vip',
      name: 'vip',
      meta:{
        requireAuth: false,
      },
      component: Vip,
      children:[
        {
          path: 'test3',
          name: 'test3',
          meta:{
             requireAuth: false,
           },
          component: Test3
        },
        {
          path: 'test4',
          name: 'test4',
          meta:{
             requireAuth: false,
           },
          component: Test4
        }
      ]
    },
  ]
})

//登录拦截
router.beforeEach((to,from,next)=>{
    if(to.matched.length === 0) {
        //如果未匹配到路由
        from.name ? next({ name:from.name }) : next('/');
        //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    }else if (to.meta.requireAuth) {
        //是否存在登录的标志
        if(localStorage.getItem('hasLogin')){
            next();
        }else{
            next({path:'/home'})
        }
    }else{
        next();
    }
})

//切换页面时，页面停止在顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});


export default router;
