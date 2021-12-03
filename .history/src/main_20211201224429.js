import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Element
import ElementUI from 'element-ui'
// 引入Element的主题文件
// import 'element-ui/lib/theme-chalk/index.css'
// 引入自己的全局样式文件
import './styles/index.scss'

// 将ElementUI注册为 Vue插件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
