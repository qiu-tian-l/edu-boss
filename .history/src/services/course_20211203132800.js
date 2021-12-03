import request from '@/utils/request'

export const getQueryCourses = data => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 课程上下架接口
export const changeState = params => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}

// 保存或者更新课程信息
export const saveOrUpdateCourse = data => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

// 上传图片接口
export const uploadImages = (data, onUploadProgress) => {
  return request({
    // data应当为 FormData 对象
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // axios提供的 onUploadProgress 用于检测上传进度
    onUploadProgress
  })
}

// 通过课程ID获取课程信息
export const getCourseById = id => {
  return request({
    method: 'GET',
    url: `/boss/course/getCourseById?courseId=${id}`
  })
}
