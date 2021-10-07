import request from '@/utils/request'

// 获取编辑菜单页面信息
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
