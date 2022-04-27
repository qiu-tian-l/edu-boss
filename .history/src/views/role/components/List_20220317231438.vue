<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="输入搜索" prop="name">
            <el-input v-model="form.name" placeholder="角色名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="onReset">重置</el-button>
          </el-form-item>
          <el-form-item :disabled="isLoading">
            <el-button size="mini" type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button @click="dialogFormVisible = true">添加角色</el-button>
      <el-table
        :data="roles"
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          label="添加时间">
          <template slot-scope="scope">
            <span>{{scope.row.createdTime | dateFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="allocMenu(scope.row)">分配菜单</el-button>
            <el-button size="mini" @click="handleMenu(scope.row)">分配资源</el-button>
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加角色的对话框结构 -->
      <el-dialog :title="isEdit? '编辑角色':'添加角色' " :visible.sync="dialogFormVisible" width="30>
        <!-- 将添加与编辑功能单独封装到组件中 -->
        <create-or-edit :is-edit="isEdit" :form-dialog="formDialog" @success="handleSuccess" @cancel="handleCancel"></create-or-edit>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getAllRoles, getRolePages, deleteRole, getRoleByID } from '@/services/role'
// 引入编辑或添加角色组件
import CreateOrEdit from './CreateOrEdit'
export default {
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  created () {
    this.loadAllRoles()
  },
  data () {
    return {
      roleId: '',
      isEdit: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      isLoading: false,
      form: {
        name: ''
      },
      roles: [],
      formDialog: {
        id: '',
        code: '',
        name: '',
        description: ''
      }
    }
  },
  methods: {
    allocMenu (rowData) {
      this.$router.push({
        name: 'alloc-menu',
        params: {
          roleId: rowData.id
        }
      })
    },
    async handleEdit (rowData) {
      this.roleId = rowData.id
      const { data } = await getRoleByID(this.roleId)
      console.log(data)
      if (data.code === '000000') {
        this.isEdit = true
        this.dialogFormVisible = true
        this.formDialog = data.data
        console.log('对话框数据为 ', this.formDialog)
      }
    },
    // 监听子组件的添加状态，取消时触发，跟成功添加分开写 可以减少一个加载所有角色 的请求
    handleCancel () {
      this.dialogFormVisible = false
      this.isEdit = false
      this.roleId = ''
      this.formDialog = {}
    },
    // 监听子组件的添加状态，成功时触发
    handleSuccess () {
      // console.log(data)
      // console.log('父组件接收值')
      this.dialogFormVisible = false
      this.isEdit = false
      this.roleId = ''
      this.formDialog = {}
      this.loadAllRoles()
    },
    async handleDelete (rowData) {
      const { data } = await deleteRole(rowData.id)
      if (data.code === '000000') {
        this.$message.success('删除成功')
        this.loadAllRoles()
      }
    },
    async loadAllRoles () {
      const { data } = await getAllRoles()
      if (data.code === '000000') {
        this.roles = data.data
      }
    },
    async onSubmit () {
      this.isLoading = true
      const { data } = await getRolePages({
        name: this.form.name
      })
      if (data.code === '000000') {
        this.roles = data.data.records
      }
      this.isLoading = false
    },
    onReset () {
      this.$refs.form.resetFields('form')
    }
  },
  filters: {
    dateFormat (date) {
      date = new Date(date)
      return `
        ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      `
    }
  }
}
</script>

<style lang="scss" scoped></style>
