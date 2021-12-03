<template>
  <div class="create-or-edit">
    <el-card>
      <div slot="header">
        <el-steps :active="activeStep" simple="">
          <el-step v-for="(step,index) in steps" :key="step.id" :title="step.title" :icon="step.icon" @click.native="activeStep=index"></el-step>
        </el-steps>
      </div>
      <!-- 步骤对应的表单结构 -->
      <el-form label-width="80px">
        <!-- 基本信息 -->
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              v-model="course.previewFirstField"
              placeholder="概述1"
              style="width: 49%;min-width: 300px; margin-right: 15px;"
            >
              <template slot="append">{{ course.previewFirstField.length }}/20</template>
            </el-input>
            <el-input
              v-model="course.previewSecondField"
              placeholder="概述2"
              style="width: 49%;min-width: 300px;"
            ></el-input>
          </el-form-item>
          <el-form-item label="讲师名称">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number controls-position="right" v-model="course.sortNum"></el-input-number>
          </el-form-item>
        </div>
        <!-- 课程封面 -->
        <div v-show="activeStep === 1">
          <!-- 封装上传图片 -->
          <!-- v-model会自动传递一个字段为value的prop属性 -->
          <course-image v-model="course.courseListImg" label="课程封面" :limit="3"></course-image>
          <course-image v-model="course.courseImgUrl" label="解锁封面"></course-image>
        </div>
        <!-- 销售信息 -->
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格">
            <el-input placeholder="请输入内容" type="number" :min="0" v-model="course.discounts">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input placeholder="请输入内容" v-model="course.price" type="number" :min="0">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input placeholder="请输入内容" v-model="course.sales" type="number" :min="0">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input v-model="course.discountsTag">
            </el-input>
          </el-form-item>
        </div>
        <!-- 限时秒杀 -->
        <div v-show="activeStep === 3">
          <el-form-item label="限时秒杀开关" label-width="80">
            <el-switch
            v-model="course.activityCourse"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <template v-if="course.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                type="date"
                placeholder="选择开始日期"
                v-model="course.activityCourseDTO.beginTime">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                type="date"
                placeholder="选择结束日期"
                v-model="course.activityCourseDTO.endTime">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input placeholder="请输入内容" v-model="course.activityCourseDTO.stock" type="number" :min="0">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input placeholder="请输入内容" v-model="course.activityCourseDTO.amount" type="number" :min="0">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <!-- 课程描述 -->
        <div v-show="activeStep === 4">
          <el-form-item label="课程描述">
            <text-editor v-model="course.courseDescriptionMarkDown"></text-editor>
            <!-- <el-input type="textarea" v-model="course.courseDescriptionMarkDown"></el-input> -->
          </el-form-item>
          <!-- 是否上架 -->
          <el-form-item label="是否上架">
            <el-switch
            v-model="course.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSave">保存</el-button>
          </el-form-item>
        </div>
        <!-- 下一步按钮 -->
        <el-form-item v-if="activeStep !== steps.length - 1">
          <el-button @click="activeStep++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import CourseImage from './course-image'
import { saveOrUpdateCourse, getCourseById } from '@/services/course'
import TextEditor from '@/components/TextEditor'
export default {
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [Number, String]
    }
  },
  components: {
    CourseImage,
    TextEditor
  },
  created () {
    if (this.isEdit) {
      this.loadCourses()
    }
  },
  methods: {
    async loadCourses () {
      const { data } = await getCourseById(this.courseId)
      // console.log(data)
      if (data.code === '000000') {
        if (!data.data.activityCourse) {
          data.data.activityCourseDTO = {
            // id: 0,
            // courseId: 0,
            beginTime: '',
            endTime: '',
            amount: 0,
            stock: 0
          }
        }
        this.course = data.data
      }
    },
    async onSave () {
      const { data } = await saveOrUpdateCourse(this.course)
      if (data.code === '000000') {
        this.$message.success('添加课程成功')
        this.$router.push({
          name: 'course'
        })
      }
    }
  },
  data () {
    return {
      // 步骤的进度
      activeStep: 0,
      // 步骤条的相关信息
      steps: [
        { id: 1, title: '基本信息', icon: 'el-icon-edit' },
        { id: 2, title: '课程封面', icon: 'el-icon-upload' },
        { id: 3, title: '销售信息', icon: 'el-icon-picture' },
        { id: 4, title: '秒杀信息', icon: 'el-icon-edit' },
        { id: 5, title: '课程描述', icon: 'el-icon-upload' }
      ],
      // 本地预览图片地址
      imageUrl: '',
      // 添加课程的相关信息时需要将跟ID相关的数据去除，编辑功能才会使用ID
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '<h3>默认值</h3>',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        // 课程封面地址
        courseListImg: '',
        // 解锁封面地址
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        // 参与秒杀活动的课程
        activityCourse: false,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: space-between;
}
.el-step{
  cursor: pointer;
}
</style>
