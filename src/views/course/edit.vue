<template>
  <div class="edit-course">
    <create-or-edit isEdit :course-id="courseId"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit'
export default {
  name: 'EditCourse',
  components: {
    CreateOrEdit
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
