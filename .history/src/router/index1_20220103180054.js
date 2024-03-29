import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/index'

// 将VueRouter注册为Vue的插件
Vue.use(VueRouter)

// 路由规则（添加需要认证的 requiresAuth信息）
// 公共路由，所有的用户角色都共有的页面
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
    component: Layout,
    // 给某个路由设置后，内部的子路由及当前路由将都需要认证
    meta: { requireAuth: true, title: '首页', flag: '1' },
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
  }
  // {
  //   // 路由地址
  //   path: '*',
  //   // 路由名称
  //   name: 'error-page',
  //   // 组件
  //   component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  // }
]

// 侧边栏显示，包含所有角色的路由页面累加
export const allRoleRoutes = [
  {
    path: '/',
    name: '权限管理页面',
    component: Layout,
    meta: { requireAuth: true, title: '权限管理', role: ['ADMIN', 'admin2'], flag: '2' },
    children: [
      {
        // 路由地址
        path: '/role',
        // 路由名称
        name: 'role',
        // 组件
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index'),
        meta: {
          title: '角色管理',
          icon: '',
          // 表示只有拥有角色code为 admin和123 的用户，在登录后，侧边栏才会显示此页面
          role: ['ADMIN', 'admin2']
        }
      },
      {
        // 路由地址
        path: '/resource',
        // 路由名称
        name: 'resource',
        // 组件
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index'),
        meta: {
          title: '资源管理',
          icon: '',
          role: ['ADMIN', 'admin2']
        }
      },
      {
        // 路由地址
        path: '/menu',
        // 路由名称
        name: 'menu',
        // 组件
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index'),
        meta: {
          title: '菜单管理',
          icon: '',
          role: ['ADMIN', 'admin2']
        }
      }
    ]
  },
  {
    path: '/',
    name: '用户管理页面',
    component: Layout,
    meta: { requireAuth: true, title: '用户管理页面', role: ['ADMIN', 'admin2'], flag: '1' },
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
          role: ['ADMIN', 'admin2']
        }
      }
    ]
  },
  {
    path: '/',
    name: '课程管理页面',
    component: Layout,
    meta: { requireAuth: true, title: '课程管理页面', role: ['ADMIN', 'admin2'], flag: '1' },
    children: [
      {
        // 路由地址
        path: '/course',
        // 路由名称
        name: 'course',
        // 组件
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index'),
        meta: {
          title: '课程管理',
          icon: '',
          role: ['ADMIN', 'admin2']
        }
      }
    ]
  },
  {
    path: '',
    name: '广告管理页面',
    component: Layout,
    meta: { requireAuth: true, title: '广告管理', role: ['ADMIN', 'admin2'], flag: '2' },
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
          role: ['admin2']
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
          title: '广告位列表',
          icon: '',
          role: ['admin2']
        }
      }
    ]
  },
  {
    path: '/menu',
    // 路由名称
    name: 'menu-create',
    component: Layout,
    meta: { requireAuth: true, role: ['ADMIN', 'admin2'] },
    children: [
      {
        // 路由地址
        path: 'create',
        // 路由名称
        name: 'menu-create',
        // 组件
        component: () => import(/* webpackChunkName: 'menu-create' */'@/views/menu/create')
      }
    ]
  },
  {
    path: '/menu',
    // 路由名称
    name: 'menu-edit',
    component: Layout,
    meta: { requireAuth: true, role: ['ADMIN', 'admin2'] },
    children: [
      {
        path: ':id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */'@/views/menu/edit')
      }
    ]
  },
  {
    path: '/role',
    // 路由名称
    name: 'alloc-menu',
    component: Layout,
    meta: { requireAuth: true, role: ['ADMIN', 'admin2'] },
    children: [
      {
        path: ':roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */'@/views/role/alloc-menu'),
        props: true
      }
    ]
  },
  {
    path: '/course',
    // 路由名称
    name: 'course-create',
    component: Layout,
    meta: { requireAuth: true, role: ['ADMIN', 'admin2'] },
    children: [
      {
        // 路由地址
        path: 'create',
        // 路由名称
        name: 'course-create',
        // 组件
        component: () => import(/* webpackChunkName: 'course-create' */'@/views/course/create')
      }
    ]
  },
  {
    path: '/course',
    // 路由名称
    name: 'course-edit',
    component: Layout,
    meta: { requireAuth: true, role: ['ADMIN', 'admin2'] },
    children: [
      {
        path: ':courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course-edit' */'@/views/course/edit'),
        props: true
      }
    ]
  },
  {
    path: '/course',
    // 路由名称
    name: 'course-section',
    component: Layout,
    meta: { requireAuth: true, role: ['ADMIN', 'admin2'] },
    children: [
      {
        path: ':courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course-section' */'@/views/course/section'),
        props: true
      }
    ]
  },
  {
    path: '/course',
    // 路由名称
    name: 'course-video',
    component: Layout,
    meta: { requireAuth: true, role: ['ADMIN', 'admin2'] },
    children: [
      {
        path: ':courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'course-video' */'@/views/course/video'),
        props: true
      }
    ]
  }
]

// 创建vue router实例
const router = new VueRouter({
  // mode: 'history',
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
