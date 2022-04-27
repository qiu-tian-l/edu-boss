import request from '@/utils/request'

// 获取编辑菜单页面信息
// 行内命名导出，声明变量同时又导出变量。外部模块可以导入这个模块，而这个变量将成为这个导入模块的一个属性
// 如果不写成行内命名导出，那么就只能写成 命名导出export {变量名1,变量名2 as 变量名2别名,...,变量n}   或 默认导出export default 变量名 的形式，其中，默认导出只能有一个。由于命名导出和默认导出不冲突，所以一个模块中可以同时支持这两种导出
export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    // url: `/boss/menu/getEditMenuInfo?id=${id}`
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const createOrUpdateMenu = data => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = id => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

// 获取所有菜单并按层级展示
export const getAllMenuSNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

// 给角色分配菜单
export const allocateRoleMenus = data => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}

// 获取当前角色拥有的菜单列表
export const getRoleMenus = (roleId) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}
