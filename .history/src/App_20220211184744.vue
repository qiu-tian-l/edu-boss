<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    }
  }
}
</script>

<style lang="scss"></style>
