<template>
  <el-container>
    <el-aside width="200px">
      <!-- 侧边栏组件 -->
      <app-aside @visiting-change="handleChange"></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <app-header :visiting-name="visitingName"></app-header>
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
  data () {
    return {
      visitingName: ''
    }
  },
  components: {
    AppAside,
    AppHeader
  },
  methods: {
    handleChange (data) {
      console.log('layout页面接收并处理')
      switch (data) {
        case 'role':
          this.visitingName = '角色管理'
          break
        case 'resource':
          this.visitingName = '资源管理'
          break
        case 'menu':
          this.visitingName = '菜单管理'
          break
        case 'user':
          this.visitingName = '用户管理'
          break
        case 'course':
          this.visitingName = '课程管理'
          break
        case 'advert':
          this.visitingName = '广告列表'
          break
        case 'advert-space':
          this.visitingName = '广告位列表'
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 // scoped给style设置私有作用域
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
