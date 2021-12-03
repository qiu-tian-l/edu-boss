<template>

  <div class="app-header">
    <!-- 左侧面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <!-- 右侧用户信息 -->
    <span class="el-dropdown-link">
      <!-- 用户头像，使用Avatar组件 -->
      <el-avatar :size="30" :src="userInfo.portrait"></el-avatar>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>{{ userInfo.userName}}</el-dropdown-item>
      <el-dropdown-item divided @click.native="handleLogout">登出</el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserInfo } from '@/services/user'

export default {
  name: 'AppHeader',
  created () {
    // 加载用户信息
    this.loadUserInfo()
    // this.loadUserInfo()
    // this.loadUserInfo()
    // this.loadUserInfo()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    handleLogout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1.清除 store中的用户数据以及localStorage中的数据
        this.$store.commit('setUser', null)
        // 2.跳转登录页
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header{
  height: 100%;
  display: flex;
  // 在纵轴的对齐方式
  align-items: center;
  // 在横轴的对齐方式，两端对齐
  justify-content: space-between;
  .el-dropdown-link{
    display: flex;
    align-items: center;
  }
}
</style>
