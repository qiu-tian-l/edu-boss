import axios from 'axios'
import store from '@/store'
// 通过局部引入element的message组件功能
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

// create 创建axois实例 create中会传入一个对象，用来对实例进行配置
const request = axios.create({
  // timeout: 2000
  // baseURL
  // header
})

function getBaseURL (url) {
  if (url.startsWith('/front')) {
    return 'http://edufront.lagou.com'
  } else {
    return 'http://eduboss.lagou.com'
  }
}

// axois的请求拦截器，拦截请求URL，判断前缀是/front还是/boss
request.interceptors.request.use(function (config) {
  // config，表示配置项
  // console.log(config)
  // baseURL：axios的config中自带属性 判断config.url的前缀，来进行请求baseURL的设置
  config.baseURL = getBaseURL(config.url)
  // 发送请求前 统一设置token信息
  // 解构获取 user信息
  const { user } = store.state
  if (user && user.access_token) {
    // 在请求头中设置 Authorization 的值
    config.headers.Authorization = user.access_token
  }
  return config
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      // currentRoute就是存储了路由信息的对象$route
      redirect: router.currentRoute.fullPath
    }
  })
}

// 存储是否正在更新 token 的状态
let isRefreshing = false
// 存储因为等待token而挂起的请求
let todoRequests = []

// axios的响应拦截器，先对响应的状态码进行拦截处理
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response) {
    // 请求发送成功，响应接收完毕，但状态码为失败的情况
    // 1. 判断失败的状态码情况（主要处理401的情况）
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
      // 2.1 无token信息
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }

      // 检测是否已经存在了正在刷新 token 的请求
      if (isRefreshing) {
        // 将当前失败的请求存储到请求列表中
        return todoRequests.push(() => {
          // 当前函数调用后，会自动发送本次失败的请求
          request(error.config)
        })
      }
      isRefreshing = true
      // 2.2 token无效（过期）处理
      // 发送请求，获取新的access_token信息
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        // 刷新token失败
        if (res.data.state !== 1) {
          // 清除无效用户信息
          store.commit('setUser', null)
          redirectLogin()
          // 哪个地方处理完，就直接返回
          return Promise.reject(error)
        }
        // 刷新token成功
        // 存储新的token
        store.commit('setUser', res.data.content)
        // 重新发送失败的请求 error.config为本次失败的请求的配置对象（根据todoRequests发送所有失败的请求）
        todoRequests.forEach(callback => callback())
        // 发送完毕，清除todoRequests内容即可
        todoRequests = []
        return request(error.config)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        // 请求发送完毕，响应处理完毕，将刷新状态更改为false状态即可
        isRefreshing = false
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务端错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求发送成功，但是没有接收到响应
    Message.error('请求超时，请重试')
  } else {
    // 意外情况的错误
    Message.error(error)
  }
  // 将本次请求的错误对象继续向后抛出，让接收响应的处理函数进行操作
  return Promise.reject(error)
})

export default request
