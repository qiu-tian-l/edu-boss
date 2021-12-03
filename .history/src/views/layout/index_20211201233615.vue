<template>
  <el-container>
    <el-aside width="200px">
      <!-- 侧边栏组件 -->
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入侧边栏组件
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'

export default {
  name: 'Layout',
  components: {
    AppAside,
    AppHeader
  }
}
</script>

// scoped给style设置私有作用域
<style lang="scss" scoped>
.el-container {
  // 视口高度，高度拉满
  height: 100vh;
  min-width: 980px;
}

.el-aside {
  background-color: #d3dce6;
}

.el-header {
  background-color: #fff;
}

.el-main {
  background-color: #e9eef3;
}
</style>
