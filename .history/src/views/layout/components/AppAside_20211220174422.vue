<template>
  <div class="app-aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
    >
    <template v-for="(item,index) in navList" :key="index">
      <template v-if="item.children && item.meta.flag === '2'">
        <el-submenu :index="item.path">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="tip in item.children">
            <el-submenu v-if="tip.children" :index="tip.path">
              <template slot="title">
                <span>{{ tip.name }}</span>
              </template>
              <el-menu-item v-for="option in tip.children" :index="option.path">{{ option.name }}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="tip.path">{{ tip.name }}</el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-if="item.children && item.meta.flag === '1'">
        <el-menu-item :index="item.children[0].path">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.children[0].name}}</span>
        </el-menu-item>
      </template>
    </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AppAside',
  data () {
    return {
      routeList: [],
      routeName: '',
      navList: []
    }
  },
  mounted () {
    this.$store.state.routers.splice(1, 1)
    console.log(this.$store.state.routers)
    this.navList = this.$store.state.routers
  }
}
</script>

<style lang="scss" scoped>
.app-aside {
  height: 100%;
  .el-menu {
    height: 100%;
    border-right: 0 none;
  }
}
</style>
