<template>
  <div class="course-list">
    <el-card>
      <div class="clearfix" slot="header">
        <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="form.courseName" placeholder="课程名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="全部" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" size="mini" :disabled="isLoading">查询搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="addCourse" size="mini" type="primary" :disabled="isLoading">+新建课程</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
      <el-table
        :data="courses"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序">
        </el-table-column>
        <el-table-column
        prop="status"
        label="状态"
        width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="scope.row.isStatusLoading"
            @change="onStatusChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="onUp(scope.row)">上架</el-button>
            <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="onContentManage(scope.row)">内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    </el-card>
  </div>
</template>

<script>
import { getQueryCourses, changeState } from '@/services/course'
export default {
  name: 'CourseList',
  created () {
    this.loadAllCourses()
  },
  data () {
    return {
      isLoading: false,
      form: {
        courseName: '',
        status: '',
        currentPage: 1,
        pageSize: 300
      },
      courses: []
    }
  },
  methods: {
    // 上下架切换处理
    async onStatusChange (course) {
      const { data } = await changeState({
        courseId: course.id,
        status: course.status
      })
      if (data.code === '000000') {
        this.$message.success(`${course.status === 1 ? '上架' : '下架'}成功`)
      }
    },
    onSubmit () {
      this.loadAllCourses()
    },
    addCourse () {
      this.$router.push({
        name: 'course-create'
      })
    },
    async loadAllCourses () {
      this.isLoading = true
      const { data } = await getQueryCourses(this.form)
      if (data.code === '000000') {
        data.data.records.forEach(item => {
          // 用于表示更改的状态
          item.isStatusLoading = false
        })
        this.courses = data.data.records
        this.isLoading = false
      }
    },
    onUp () {},
    onEdit (rowData) {
      this.$router.push({
        name: 'course-edit',
        params: {
          courseId: rowData.id
        }
      })
    },
    onContentManage (rowData) {
      this.$router.push({
        name: 'course-section',
        params: {
          courseId: rowData.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
