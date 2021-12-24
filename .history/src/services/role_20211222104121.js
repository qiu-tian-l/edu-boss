import request from '@/utils/request'

export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

export const getRolePages = (data) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const deleteRole = (id) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

export const saveOrUpdateRole = (data) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const getRoleByUserID = (id) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${id}`
  })
}

export const getRoleByID = (id) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

// 列出所有角色，并且标记当前用户ID是否拥有该角色
export const getRolesWithUserPermission = (id) => {
  return request({
    method: 'GET',
    url: `/boss/role/getRolesWithUserPermission?userId=${id}`
  })
}

// 给用户分配角色
export const allocateUserRole = (data) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}
