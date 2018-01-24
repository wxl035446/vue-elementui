import Vue from 'vue'
import Router from 'vue-router'

// 路由实例化
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component:  require('views/base/login.vue'), // 登陆界面
    },
    {
      path: '/modifyPsd',
      name: 'modifyPsd',
      component:  require('views/base/modifyPsd.vue'), // 修改密码
    },
    {
      path: '/register',
      name: 'register',
      component:  require('views/base/register.vue'), // 注册界面
    },
    {
      path: '/home',
      name: 'home',
      component: require('views/home/home.vue'), // 异步加载组件
      children: [
        {
          path: '/home/table',
          name: 'table',
          component: require('components/table/formTable.vue'), // 异步加载组件
        },
        {
          path: '/home/charts',
          name: 'charts',
          component: require('components/table/charts.vue'), // 异步加载组件
        },
        {
          path: '/home/mapDemo',
          name: 'mapDemo',
          component: require('components/table/mapDemo.vue'), // 地图组件案例
        },
        {
          path: '/home/main',
          name: '功能模块',
          component:  require('views/base/main.vue'), // 后天主页面
        }
      ]
    },
    {
      path: '/',
      redirect: '/login'// 重定向
    }
  ]
})
export default router
