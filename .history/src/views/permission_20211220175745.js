import router from '@/router/index1.js'
import store from '@/store'

const whiteList=['/login']

// 导航守卫功能，全局前置，在请求前先执行该操作
// from 从哪个地址跳转， to 要跳转到哪个地址 ， next 要执行的操作
router.beforeEach(async (to, from, next) => {
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
    if (store.state.user) {
      if (store.state.routerList.length === 0) {
        await store.dispatch('getRouter')
        store.dispatch('generationRouter', store.state.routerList).then((res => {
          router.addRoutes(store.state.addRouters)
        }))
      } else {
        next()
      }
    } else {
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
    }
    next()
  }
})