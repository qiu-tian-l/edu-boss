import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 存储共享数据,任意页面均可访问，在视图模板组件中通过$store.state.数据名 访问，在数据中需加上this.
  state: {
    // 用于登录成功后保存用户信息(初始尝试读取本地存储)
    // 进行请求时需要先判断是否有用户信息，也就是是否登录，只有用户登录后才能进入页面（利用导航守卫实现）
    // login后负责将登录信息存起来
    // router：在进行router前获取一下登录信息是否存在
    user: JSON.parse(window.localStorage.getItem('user') || null)
  },
  // 更改state的唯一方法就是提交mutation-commit
  mutations: {
    // 存储用户数据
    setUser (state, payload) {
      // 将payload转换为对象后进行存储
      state.user = JSON.parse(payload)
      // 将payload数据添加到本地存储 存不了对象数据，只能存字符串数据
      window.localStorage.setItem('user', payload)
    }
  },
  // 因为mutation不能执行异步操作，action可以，所以需要将异步操作放到action中，而修改state操作的同步代码还是放到mutation中，然后通过action提交 -dispatch
  actions: {
  },
  // 模块
  modules: {
  }
})
