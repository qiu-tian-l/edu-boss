import request from '@/utils/request'
import qs from 'qs'

// 用户登录接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // url-encoded格式：k=v&k=v qs用于对对象格式数据进行格式转换，转换成url-encoded格式【axios默认的请求参数是JSON格式，而登录接口需要的是url-encoded格式】
    // data 为 axios中发送POST请求时需要放到body中的参数名；发送GET请求时的参数名为params
    data: qs.stringify(data)
  })
}
// 用户基本信息接口
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

// 分页查询用户信息接口
export const getUserPages = data => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}
