import request from '@/utils/request'

// 获取章节内容
export const getSectionAndLesson = id => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId: id
    }
  })
}

// 保存或更新章节内容
export const saveOrUpdateSection = data => {
  return request({
    method: 'POST',
    url: '/boss/course/section/saveOrUpdateSection',
    data
  })
}

// 保存或更新课时内容
export const saveOrUpdateLesson = data => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}
