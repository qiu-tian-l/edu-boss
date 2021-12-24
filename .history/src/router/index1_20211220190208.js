import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'

// 将VueRouter注册为Vue的插件
Vue.use(VueRouter)

// 路由规则（添加需要认证的 requiresAuth信息）
export const routes = [
  {
    // 路由地址
    path: '/login',
    // 路由名称
    name: 'login',
    // 组件 路由懒加载【访问到该组件的时候才去加载】
    // @/views/login/index 中 @代表src目录
    // /* webpackChunkName: 'login' */ 魔法注释，给包设置自定义名称
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    // 根页面，表示登录成功后的页面
    path: '/',
    // 将所有登录后的功能都作为Layout的子功能/子路由进行设置
    // 页面分为侧边栏、顶部和主体部分，选择不同功能时变化的永远是主体部分，顶部只是有一些高亮选中的展示，若将每个功能页面都设置为一个单独的页面，处理起来比较麻烦，所以将整个页面作为一个Layout布局，然后将主体变化区域作为子路由进行设置展示，这样的话头部和侧边栏就可以起到复用的作用
    component: () => import(/* webpackChunkName: 'layout' */'@/views/layout/index'),
    // 给某个路由设置后，内部的子路由及当前路由将都需要认证
    meta: {
      // requireAuth: true,
      title: '首页',
      icon: 'el-icon-s-home',
      flag: '1'
    },
    children: [
      {
        // 路由地址
        path: '',
        // 路由名称
        name: 'home',
        // 组件
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index'),
        meta: { title: '首页', icon: '' }
      }
    ]
  },
  {
    // 路由地址
    path: '*',
    // 路由名称
    name: 'error-page',
    // 组件
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

export const allRoleRoutes = [
  {
    path: '/permission',
    name: '权限管理页面',
    component: () => import(/* webpackChunkName: 'home' */'@/views/home/index'),
    meta: { title: '权限管理', role: ['ADMIN', '123'], flag: '2' },
    children: [
      {
        // 路由地址
        path: 'role',
        // 路由名称
        name: 'role',
        // 组件
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index'),
        meta: {
          title: '角色管理',
          icon: '',
          role: ['ADMIN', '123']
        }
      },
      {
        // 路由地址
        path: 'resource',
        // 路由名称
        name: 'resource',
        // 组件
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index'),
        meta: {
          title: '资源管理',
          icon: '',
          role: ['ADMIN', '123']
        }
      },
      {
        // 路由地址
        path: 'menu',
        // 路由名称
        name: 'menu',
        // 组件
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index'),
        meta: {
          title: '菜单管理',
          icon: '',
          role: ['ADMIN', '123']
        }
      }
    ]
  },
  {
    path: '/u',
    name: '用户管理页面',
    component: () => import(/* webpackChunkName: 'home' */'@/views/home/index'),
    meta: { title: '用户管理页面', role: ['ADMIN', '123'], flag: '1' },
    children: [
      {
        // 路由地址
        path: '/user',
        // 路由名称
        name: 'user',
        // 组件
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index'),
        meta: {
          title: '用户管理',
          icon: '',
          role: ['ADMIN', '123']
        }
      }
    ]
  },
  {
    path: '/c',
    name: '课程管理页面',
    component: () => import(/* webpackChunkName: 'home' */'@/views/home/index'),
    meta: { title: '课程管理页面', role: ['ADMIN', '123'], flag: '1' },
    children: [
      {
        // 路由地址
        path: 'course',
        // 路由名称
        name: 'course',
        // 组件
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index'),
        meta: {
          title: '课程管理',
          icon: '',
          role: ['ADMIN', '123']
        }
      }
    ]
  },
  {
    path: '/ad',
    name: '广告管理页面',
    component: () => import(/* webpackChunkName: 'home' */'@/views/home/index'),
    meta: { title: '广告管理', role: ['123'], flag: '2' },
    children: [
      {
        // 路由地址
        path: 'advert',
        // 路由名称
        name: 'advert',
        // 组件
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index'),
        meta: {
          title: '广告列表',
          icon: '',
          role: ['123']
        }
      },
      {
        // 路由地址
        path: 'advert-space',
        // 路由名称
        name: 'advert-space',
        // 组件
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index'),
        meta: {
          title: '广告位',
          icon: '',
          role: ['123']
        }
      }
    ]
  }
]

// 创建vue router实例
const router = new VueRouter({
  routes
})

// // 导航守卫功能，全局前置，在请求前先执行该操作
// // from 从哪个地址跳转， to 要跳转到哪个地址 ， next 要执行的操作
// router.beforeEach((to, from, next) => {
//   // 判断to路由是否需要进行身份认证(只要当前路由中有一条需要认证，那么就都需要认证)
//   if (to.matched.some(record => record.meta.requireAuth)) {
//     // 验证vuex中的store中的user信息是否存在
//     if (!store.state.user) {
//       // 未登录，跳转到登录页面
//       return next({
//         // 指定要跳转到哪个路由上
//         name: 'login',
//         // 查询字符串参数，?后面的信息
//         query: {
//           // 将本次路由的fullPath传递给 login页面
//           redirect: to.fullPath
//         }
//       })
//     } else {
//       // 已经登录，允许通过
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
