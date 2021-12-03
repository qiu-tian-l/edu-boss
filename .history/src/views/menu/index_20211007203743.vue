<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })">添加菜单</el-button>
      </div>
      <!-- 底部菜单列表展示区 -->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column label="编号" type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级别">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序">
        </el-table-column>
        <el-table-column
          label="操作">
          <!-- 作用域插槽 -->
          <!-- slot-scope="scope"中的scope表示接收table组件内部给该插槽传递的数据，具体有什么数据，由table组件内部决定 -->
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAllMenus, deleteMenu } from '@/services/menu'
export default {
  name: 'MenuIndex',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    handleEdit (rowData) {
      // 设置跳转
      this.$router.push({
        name: 'menu-edit',
        params: { id: rowData.id }
      })
    },
    handleDelete (rowData) {
      this.$confirm('确认删除吗?', '删除提示')
        .then(async () => {
          const { data } = await deleteMenu(rowData.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            // 更新菜单数据列表
            this.loadAllMenus()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 获取所有菜单信息
    async loadAllMenus () {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.tableData = data.data
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
