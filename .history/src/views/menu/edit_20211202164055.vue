<template>
  <div class="menu-edit">
    <!-- 父组件edit 通过is-edit 给 CreateOrEdit子组件 传值 -->
    <create-or-edit :is-edit="true"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/createOrEdit'
export default {
  name: 'MenuEdit',
  components: {
    CreateOrEdit
  }
}
</script>

<style lang="scss" scoped></style>
