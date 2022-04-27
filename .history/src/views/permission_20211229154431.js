import router from '@/router/index1.js'
import store from '@/store'

const whiteList = ['/login']

// 导航守卫功能，全局前置，在请求前先执行该操作
// from 从哪个地址跳转， to 要跳转到哪个地址 ， next 要执行的操作
router.beforeEach(async (to, from, next) => {
  console.log('router ->', router)
  // console.log('进入导航守卫功能')
  // 判断to路由是否需要进行身份认证(只要当前路由中有一条需要认证，那么就都需要认证)
  // 验证vuex中的store中的user信息是否存在
  // 用户已登录的情况下
  if (store.state.user) {
    // 判断要访问的地址是不是登录页面，如果是，就跳转至首页，可能出现在同时打开一个网站的多个页面时
    if (to.path === '/login') {
      console.log(to)
      next({ path: '/' })
    } else {
      // 判断是否已经根据用户登录的信息拿到了该用户对应的角色列表，根据角色列表，再结合前端的一个完整的路由列表，动态生成该用户登录后首页侧边栏的菜单列表路由，以实现一定程度上的权限管理
      if (store.state.routerList.length === 0) {
        console.log('准备请求权限列表')
        // 如果没有对应的角色列表，就先发起请求获取
        await store.dispatch('getRouter')
        // 添加 用户自己侧边栏的路由 到 公共路由中
        store.dispatch('generationRouter', store.state.routerList).then(res => {
          router.addRoutes([
            ...store.state.addRouters,
            {
              // 路由地址
              path: '*',
              // 路由名称
              name: 'error-page',
              // 组件
              component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
            }
          ])
          next({ ...to, replace: true })
        })
      } else {
        console.log(to)
        // 如果用户登录了，且已经存在了侧边栏路由，就直接继续向下执行
        next()
      }
    }
  } else {
    // 用户未登录的情况下
    // 如果用户访问的地址是登录地址，就直接继续向下执行
    if (whiteList.indexOf(to.path) !== -1) {
      console.log(to)
      next()
    } else {
      console.log(to)
      // 未登录的情况下，访问的地址不是登录地址，先跳转到登录页面，登录成功后再跳转到实际要访问的页面
      console.log('登录')
      return next({
        // 指定要跳转到哪个路由上
        name: 'login',
        // 查询字符串参数，?后面的信息
        query: {
          // 将本次路由的fullPath传递给 login页面
          redirect: to.fullPath
        }
      })
    }
  }
  // console.log('不需要认证', to)
  // 已经登录，允许通过
  next()
})
