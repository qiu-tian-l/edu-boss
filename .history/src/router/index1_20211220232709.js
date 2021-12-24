import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'

// 将VueRouter注册为Vue的插件
Vue.use(VueRouter)

// 路由规则（添加需要认证的 requiresAuth信息）
// 公共路由，所有的用户角色都共有的页面
export const routes = []

// 侧边栏显示，包含所有角色的路由页面累加
export const allRoleRoutes = [
  {
    path: '/home',
    name: '首页',
    component: () => import(/* webpackChunkName: 'home' */'@/views/home/index'),
    meta: { requireAuth: true, title: '首页', role: ['ADMIN', '123'], flag: '1' },
    children: [
      {
        // 路由地址
        path: '',
        // 路由名称
        name: 'home',
        // 组件
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index'),
        meta: { title: '首页', icon: '', role: ['ADMIN', '123'] }
      }
    ]
  },
  {
    path: '/permission',
    name: '权限管理页面',
    component: () => import(/* webpackChunkName: 'home' */'@/views/home/index'),
    meta: { requireAuth: true, title: '权限管理', role: ['ADMIN', '123'], flag: '2' },
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
          // 表示只有拥有角色code为 admin和123 的用户，在登录后，侧边栏才会显示此页面
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
    meta: { requireAuth: true, title: '用户管理页面', role: ['ADMIN', '123'], flag: '1' },
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
    meta: { requireAuth: true, title: '课程管理页面', role: ['ADMIN', '123'], flag: '1' },
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
    meta: { requireAuth: true, title: '广告管理', role: ['123'], flag: '2' },
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
          title: '广告位列表',
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

export default router
