<template>
  <div class="alloc-menu">
    <el-card>
      {{ checkedKeys }}
      <el-tree ref="menu-tree" :data="menus" :props="defaultProps" show-checkbox default-expand-all node-key="id" :default-checked-keys="checkedKeys"></el-tree>
      <div style="margin: 20px;">
        <el-button @click="onClear">清空</el-button>
        <el-button @click="onSave" type="primary">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getAllMenuSNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
export default {
  name: 'AllocMenu',
  props: {
    // 通过props设置的动态路由参数
    roleId: {
      type: [Number, String],
      required: true
    }
  },
  created () {
    console.log('created方法中', this.$refs['menu-tree'])
    // 获取所有的菜单信息，展示tree结构
    this.loadAllMenusNodeList()
    // 加载当前角色已经分配的菜单列表
    this.loadRoleMenus()
  },
  beforeMount () {
    console.log('beforeMount方法中', this.$refs['menu-tree'])
  },
  mounted () {
    console.log('mounted方法中', this.$refs['menu-tree'])
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: [],
      tmpArr: []
    }
  },
  methods: {
    // 自己封装的用于数据筛选的方法（筛选出被选中菜单项的iD）
    getCheckKeys (menus) {
      console.log('开始执行筛选功能')
      // 遍历数组，将所有存在子节点的node排除，对子节点列表进行筛选
      menus.forEach(menu => {
        // 未选中，结束
        if (!menu.selected) {
          return
        }
        // 检测是否存在子节点
        if (menu.subMenuList) {
          // 对子节点再进行选中检测
          return this.getCheckKeys(menu.subMenuList)
        }
        // 说明为选中的叶子节点
        this.checkedKeys.push(menu.id)
        // this.tmpArr.push(menu.id)
        // this.checkedKeys = [...this.checkedKeys, menu.id]
      })
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      if (data.code === '000000') {
        console.log('获取已选中的')
        this.getCheckKeys(data.data)
        console.log(this.checkedKeys)
        // this.checkedKeys = this.tmpArr
        console.log(this.checkedKeys)
        // this.$refs['menu-tree'].setCheckedKeys(this.checkedKeys)
      }
    },
    onClear () {
      this.$refs['menu-tree'].setCheckedKeys([])
    },
    async onSave () {
      // 发送请求，传递角色ID 和 选中的菜单项ID
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList: this.$refs['menu-tree'].getCheckedKeys()
      })
      if (data.code === '000000') {
        this.$message.success('分配菜单成功')
        this.$router.push({
          name: 'role'
        })
      }
    },
    async loadAllMenusNodeList () {
      const { data } = await getAllMenuSNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
