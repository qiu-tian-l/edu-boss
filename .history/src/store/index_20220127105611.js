import Vue from 'vue'
import Vuex from 'vuex'
import { routes, allRoleRoutes } from '@/router/index1.js'
import { getRoleByUserID } from '@/services/role'

Vue.use(Vuex)

export default new Vuex.Store({
  // 存储动态共享数据,任意页面均可访问，在视图模板组件中通过$store.state.数据名 访问，在代码js数据中访问时需加上this.
  state: {
    // 用于登录成功后保存用户信息(初始尝试读取本地存储)
    // 进行请求时需要先判断是否有用户信息，也就是是否登录，只有用户登录后才能进入页面（利用导航守卫实现）
    // login后负责将登录信息存起来
    // router：在进行router前获取一下登录信息是否存在
    user: JSON.parse(window.localStorage.getItem('user') || null),
    // 不同用户对应的自己拥有的角色的集合
    routerList: [],
    // 用于合成 该用户对应的 公共路由+自己独有的侧边栏页面路由
    routers: routes,
    // 根据不同用户 动态生成的 用于在 侧边栏展示 的页面路由集合
    addRouters: []
  },
  // 更改state的唯一方法就是提交mutation-commit
  mutations: {
    // 存储用户数据 可以向store.commit传入额外的参数，即mutation的载荷payload
    setUser (state, payload) {
      // 将payload字符串转换为对象后进行存储
      state.user = JSON.parse(payload)
      // 将payload数据添加到本地存储 存不了对象数据，只能存字符串数据
      // JSON.stringify()将对象、数组转换成字符串，JSON.parse()将字符串转成JSON对象
      window.localStorage.setItem('user', payload)
    },
    // 设置用户所拥有的角色
    setRouter (state, val) {
      state.routerList = val
    },
    // 用户退出时清空用户所拥有的角色
    delRouter (state) {
      state.routerList = []
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = routes.concat(state.addRouters)
    }
  },
  // 因为mutation不能执行异步操作，action可以，所以需要将异步操作放到action中，而修改state操作的同步代码还是放到mutation中，然后通过action提交 -dispatch
  actions: {
    // 获取用户所拥有的角色
    async getRouter (context) {
      const { data } = await getRoleByUserID(context.state.user.user_id)
      const roles = data.data.map(element => {
        return element.code
      })
      context.commit('setRouter', roles)
    },
    // 根据用户拥有的角色，动态生成该用户 侧边栏的路由列表
    generationRouter ({ commit }, data) {
      const roles = data
      console.log('roles[0] -> ', roles[0])
      const accessedRouters = allRoleRoutes.filter((item) => {
        // if (item.meta.role && item.meta.role.indexOf(roles[0]) >= 0) {
        //   return item
        // }
        if (item.meta.role) {
          for (let i = 0; i < roles.length; i++) {
            if (item.meta.role.indexOf(roles[i]) >= 0) {
              return item
            }
          }
        }
      })
      console.log('accessedRouters-> ', accessedRouters)
      commit('SET_ROUTERS', accessedRouters)
    }
  },
  // 模块
  modules: {
  }
})
