<template>
  <div class="course-image">
    <el-form-item :label="label">
      <!-- 上传进度条组件 -->
      <el-progress type="circle" :percentage="progressPercentage" :width="178" v-if="isUploading" :status="progressPercentage === 100 ? 'success' : undefined"></el-progress>
      <el-upload
        v-else
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="handleUpload">
        <!-- img为预览图片的显示位置 -->
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
  </div>
</template>

<script>
import { uploadImages } from '@/services/course'
export default {
  name: 'CourseImage',
  props: {
    value: {
      type: String
    },
    label: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      // 保存上传状态
      isUploading: false,
      progressPercentage: 0
    }
  },
  methods: {
    // 图片上传处理函数，option为上传的相关信息 option.file为要上传的文件信息
    async handleUpload (option) {
      this.isUploading = true
      // console.log(option)
      const fd = new FormData()
      fd.append('file', option.file)
      const { data } = await uploadImages(fd, event => {
        // this.progressPercentage = 100
        this.progressPercentage = Math.floor(event.loaded / event.total * 100)
      })
      // console.log(data)
      if (data.code === '000000') {
        // data.name 为服务端响应的，图片上传成功后的线上地址
        // 子组件向父组件传值：v-model默认通过input触发 图片线上地址
        this.$emit('input', data.data.name)
        this.isUploading = false
        // 上传成功后设置进度条为0，避免再次上传时出现回退的情况
        this.progressPercentage = 0
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传图片前的回调函数
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
