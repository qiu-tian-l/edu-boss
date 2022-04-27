<template>
  <div class="course">
    <course-list></course-list>
  </div>
</template>

<script>
import CourseList from './components/List'
require('@/utils/temp')
export default {
  name: 'CourseIndex',
  components: {
    CourseList
  }
}
</script>

<style lang="scss" scoped></style>
