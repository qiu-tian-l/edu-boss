import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// 将VueRouter注册为Vue的插件
Vue.use(VueRouter)

// 路由规则（添加需要认证的 requiresAuth信息）
const routes = [
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
    // 页面分为侧边栏、顶部和主体部分，选择不同功能时变化的永远是主体部分，顶部只是有一些高亮选中的展示，若将每个功能页面都设置为一个单独的页面，处理起来比较麻烦，所以将整个页面作为一个Lagout布局，然后将主体变化区域作为子路由进行设置展示，这样的话头部和侧边栏就可以起到复用的作用
    component: () => import(/* webpackChunkName: 'layout' */'@/views/layout/index'),
    // 给某个路由设置后，内部的子路由及当前路由将都需要认证
    meta: {
      requireAuth: true
    },
    children: [
      {
        // 路由地址
        path: '',
        // 路由名称
        name: 'home',
        // 组件
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index')
      },
      {
        // 路由地址
        path: '/user',
        // 路由名称
        name: 'user',
        // 组件
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index')
      },{
        // 路由地址
        path: 'role',
        // 路由名称
        name: 'role',
        // 组件
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index')
      },
      {
        // 路由地址
        path: 'resource',
        // 路由名称
        name: 'resource',
        // 组件
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index')
      },
      {
        // 路由地址
        path: 'menu',
        // 路由名称
        name: 'menu',
        // 组件
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index')
      },
      {
        // 路由地址
        path: 'course',
        // 路由名称
        name: 'course',
        // 组件
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index')
      },
      {
        // 路由地址
        path: 'advert',
        // 路由名称
        name: 'advert',
        // 组件
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index')
      },
      {
        // 路由地址
        path: 'advert-space',
        // 路由名称
        name: 'advert-space',
        // 组件
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index')
      },
      {
        // 路由地址
        path: 'menu/create',
        // 路由名称
        name: 'menu-create',
        // 组件
        component: () => import(/* webpackChunkName: 'menu-create' */'@/views/menu/create')
      },
      // 编辑菜单路由组件
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */'@/views/menu/edit')
      },
      // 角色列表中分配菜单路由组件
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */'@/views/role/alloc-menu'),
        props: true
      },
      {
        // 路由地址
        path: 'course/create',
        // 路由名称
        name: 'course-create',
        // 组件
        component: () => import(/* webpackChunkName: 'course-create' */'@/views/course/create')
      },
      // 编辑课程路由组件
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course-edit' */'@/views/course/edit'),
        props: true
      },
      // 对课程进行内容管理路由组件
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course-section' */'@/views/course/section'),
        props: true
      },
      // 上传课时视频路由组件
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'course-video' */'@/views/course/video'),
        props: true
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

// 创建vue router实例
const router = new VueRouter({
  routes
})

// 导航守卫功能，全局前置，在请求前先执行该操作
// from 从哪个地址跳转， to 要跳转到哪个地址 ， next 要执行的操作
router.beforeEach((to, from, next) => {
  // 判断to路由是否需要进行身份认证(只要当前路由中有一条需要认证，那么就都需要认证)
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 验证vuex中的store中的user信息是否存在
    if (!store.state.user) {
      // 未登录，跳转到登录页面
      return next({
        // 指定要跳转到哪个路由上
        name: 'login',
        // 查询字符串参数，?后面的信息
        query: {
          // 将本次路由的fullPath传递给 login页面
          redirect: to.fullPath
        }
      })
    } else {
      // 已经登录，允许通过
      next()
    }
  } else {
    next()
  }
})

export default router
