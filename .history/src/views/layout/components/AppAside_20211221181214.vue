<template>
  <div class="app-aside">
    <el-menu
      :default-active="onRoutes"
      @select="handleSelect"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
    >
    <div v-for="(item,index) in navList" :key="index">
      <template v-if="item.children && item.meta.flag && item.meta.flag === '2'">
        <el-submenu :index="item.name">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <div v-for="(tip,index) in item.children" :key="index">
            <el-submenu v-if="tip.children" :index="tip.path">
              <template slot="title">
                <span>{{ tip.meta.title }}</span>
              </template>
              <el-menu-item v-for="(option,index) in tip.children" :index="option.name" :key="index">{{ option.meta.title }}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="tip.path">{{ tip.meta.title }}</el-menu-item>
          </div>
        </el-submenu>
      </template>
      <template v-if="item.children && item.meta.flag === '1'&&item.meta.title !== '首页'">
        <el-menu-item :index="item.children[0].path">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.children[0].meta.title}}</span>
        </el-menu-item>
      </template>
    </div>
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
  methods: {
    handleSelect (key, keyPath) {
      console.log('handleSelect-> ', key, keyPath)
      console.log('======', key.split('/')[1])
      this.$emit('visiting-change', key.split('/')[0] || key.split('/')[1])
    }
  },
  computed: {
    onRoutes () {
      // this.$emit('visiting-change', this.$route.name)
      console.log('当前点击的是哪个导航：', this.$route)
      return this.$route.path.replace('/', '')
    }
  },
  mounted () {
    this.navList = this.$store.state.addRouters
    // this.$store.state.routers.splice(0, 1)
    // console.log('mounted-->', this.$store.state.routers)
    // this.navList = this.$store.state.routers
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
