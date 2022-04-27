<template>
  <div class="user">
    <user-list></user-list>
  </div>
</template>

<script>
import UserList from './components/List'
require('@/utils/temp')
export default {
  name: 'UserIndex',
  components: {
    UserList
  },
  created () {
    console.log1('user文件')
  }
}
</script>

<style lang="scss" scoped></style>
