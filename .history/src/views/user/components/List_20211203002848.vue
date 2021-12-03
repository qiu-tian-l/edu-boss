<template>
  <el-card>
    <div slot="header">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="rangeDate">
          <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd" v-model="form.rangeDate"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="users"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="用户ID">
        </el-table-column>
        <el-table-column
          label="头像">
          <!-- 利用作用域插槽实现 -->
          <template slot-scope="scope">
            <el-avatar :size="30" :src="scope.row.portrait?scope.row.portrait:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          label="注册时间">
           <template slot-scope="scope">
            <span>{{ scope.row.createTime | dateFormat}}</span>
          </template>
        </el-table-column>
        <!-- 禁用功能，服务端未开放权限 -->
        <el-table-column
        prop="name"
        label="状态"
        width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="ENABLE"
            inactive-value="DISABLE"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="onForbiden(scope.row)">禁用</el-button>
            <el-button size="mini" @click="onAllocRole(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.currentPage"
      :page-sizes="[15, 20, 25]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="isLoading">
    </el-pagination>
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
      <alloc-role :currentUserId="currentUserId" @cancel="dialogFormVisible=false" @success="dialogFormVisible=false"></alloc-role>
    </el-dialog>
  </el-card>
</template>

<script>
import AllocRole from './AllocRole'
import { getUserPages } from '@/services/user'
import { getAllRoles, getRolesWithUserPermission } from '@/services/role'
export default {
  name: 'UserList',
  components: {
    AllocRole
  },
  created () {
    this.loadUserPages()
  },
  data () {
    return {
      form: {
        phone: '',
        rangeDate: '',
        currentPage: 1,
        pageSize: 15,
        userId: 0,
        startCreateTime: '',
        endCreateTime: ''
      },
      users: [],
      total: 0,
      isLoading: false,
      dialogFormVisible: false,
      currentUserId: 0,
      // 所有角色
      allRoles: [],
      // 选中的角色
      selectedRoles: []
    }
  },
  methods: {
    async onAllocRole (rowData) {
      this.dialogFormVisible = true
      this.currentUserId = rowData.id
      const { data } = await getAllRoles()
      this.allRoles = data.data

      this.selectedRoles = []
      const { data: data2 } = await getRolesWithUserPermission(this.currentUserId)
      if (data2.code === '000000') {
        data2.data.forEach(element => {
          if (element.hasPermission) {
            this.selectedRoles.push(element.id)
          }
        })
      }
    },
    handleSizeChange (val) {
      this.form.pageSize = val
      this.loadUserPages()
    },
    handleCurrentChange (val) {
      this.form.currentPage = val
      this.loadUserPages()
    },
    async loadUserPages () {
      this.isLoading = true
      const { rangeDate } = this.form
      // console.log(rangeDate)
      if (rangeDate && rangeDate.length) {
        this.form.startCreateTime = rangeDate[0]
        this.form.endCreateTime = rangeDate[1]
      } else {
        this.form.startCreateTime = ''
        this.form.endCreateTime = ''
      }
      const { data } = await getUserPages(this.form)
      this.users = data.data.records
      // console.log(this.users.portrait)
      this.total = data.data.total
      this.isLoading = false
    },
    onSubmit () {
      this.form.currentPage = 1
      this.loadUserPages()
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
