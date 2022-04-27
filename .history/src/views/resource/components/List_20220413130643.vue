<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" placeholder="资源名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url" placeholder="资源路径" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" placeholder="全部" clearable>
              <el-option v-for="item in resourceCategories" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="onReset" size="mini">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="mini" :disabled="isLoading">查询搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        v-loading="isLoading"
        :data="resources"
        style="width: 100%">
        <el-table-column prop="id" label="编号" width="100"></el-table-column>
        <el-table-column
          prop="name"
          label="资源名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <!-- 设置过滤器需要使用作用域插槽来获取数据 -->
        <el-table-column
          label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | dateFormat}}</span>
          </template>
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[10, 15, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getResourcePages, getResourceCategories } from '@/services/resource'
export default {
  name: 'ResourceList',
  created () {
    this.loadResourcePages()
    this.loadResourceCategories()
  },
  data () {
    return {
      form: {
        // 当前显示页号
        current: 1,
        // 每页显示条数
        size: 10,
        // 资源名称
        name: '',
        // 资源路径
        url: '',
        // 资源分类ID
        categoryId: ''
      },
      // 存储资源分类信息
      resourceCategories: [],
      // 数据条数总数
      totalCount: 0,
      isLoading: false,
      resources: []
    }
  },
  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      if (data.code === '000000') {
        this.resourceCategories = data.data
      }
    },

    async loadResourcePages () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.totalCount = data.data.total
        this.isLoading = false
      }
    },
    handleEdit () {},
    handleDelete () {},
    // 重置表单按钮
    onReset () {
      this.$refs.form.resetFields()
    },
    onSubmit () {
      // 请求数据前，将请求页面更改为1
      this.form.current = 1
      this.loadResourcePages()
    },
    // 每页显示条数变化时触发
    handleSizeChange (val) {
      this.form.size = val
      // 由于修改了每页显示的条数，所以应该将当前页设置为默认值 1
      this.form.current = 1
      this.loadResourcePages()
    },
    // 页号改变时触发
    handleCurrentChange (val) {
      this.form.current = val
      this.loadResourcePages()
    }
  },
  filters: {
    dateFormat (date) {
      date = new Date(date)
      return `
        ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
        `
      // return `
      //   ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      // `
    }
  }
}
</script>

<style lang="scss" scoped>
.clearfix{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
