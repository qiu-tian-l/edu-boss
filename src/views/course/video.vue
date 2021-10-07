<template>
  <div class="course-video">
    <el-card>
      <div slot="header">
        课程相关信息
      </div>
      <el-form>
        <el-form-item label="视频上传">
          <input type="file" ref="video-file">
        </el-form-item>
        <el-form-item label="封面上传">
          <input type="file" ref="image-file">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpload">开始上传</el-button>
          <el-button @click="$router.push({
            name: 'course-section',
            params: {
              courseId
            }
          })">返回</el-button>
        </el-form-item>
        <el-form-item>
          <p v-if="uploadPercentage !== 0">视频上传中：{{uploadPercentage}} %</p>
          <p v-if="isUploadFinish">{{!isTranscodeFinish ? '视频转码中...' : '视频转码完成'}}</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
import {
  aliyunImagUploadAddressAdnAuth, 
  aliyunVideoUploadAddressAdnAuth, 
  aliyunTranscode, 
  aliyunTranscodePercent
} from '@/services/aliyun-upload'
export default {
  name: 'CourseVideo',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      // 保存上传实例
      uploader: null,
      // 图片上传后的地址，用于视频上传凭证请求
      imageUrl: '',
      // 保存上传视频的ID
      videoId: null,
      // 视频上传进度
      uploadPercentage: 0,
      // 上传视频完毕状态
      isUploadFinish: false,
      // 转码完毕状态
      isTranscodeFinish: false
    }
  },
  created () {
    this.initUploader()
    console.log(this.uploader)
  },
  methods: {
    handleUpload () {
      this.isUploadFinish = false
      this.isTranscodeFinish = false
      this.uploadPercentage = 0
      const videoFile = this.$refs['video-file'].files[0]
      const imageFile = this.$refs['image-file'].files[0]
      const uploader = this.uploader
      // 将要上传的文件添加到上传列表中
      uploader.addFile(imageFile)
      uploader.addFile(videoFile)
      // 开始上传
      uploader.startUpload()
    },
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // userID，必填，只需有值即可。
        userId: '1618139964448548',
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: '',
        // 分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        // onUploadstarted: function (uploadInfo) {
        //   console.log(uploadInfo)
        //   if (uploadInfo.isImage) {

        //   }
        // },
        onUploadstarted: async uploadInfo => {
          let uploadAddressAndAuth = null
          console.log(uploadInfo)
          // 检测是图片还是视频
          // 图片处理
          if (uploadInfo.isImage) {
            const { data } = await aliyunImagUploadAddressAdnAuth()
            // console.log(data)
            if (data.code === '000000') {
              uploadAddressAndAuth = data.data
              this.imageUrl = uploadAddressAndAuth.imageUrl
            }
          } else {
            // 视频处理
            const { data } = await aliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageUrl
            })
            // console.log(data)
            if (data.code === '000000') {
              uploadAddressAndAuth = data.data
              this.videoId = data.data.videoId
            }
          }
          // 设置凭证与地址
          // uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
          this.uploader.setUploadAuthAndAddress(
            uploadInfo, 
            uploadAddressAndAuth.uploadAuth, 
            uploadAddressAndAuth.uploadAddress, 
            uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
          )
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo, totalSize, loadedPercent) => {
          // 视频上传进度
          if (!uploadInfo.isImage) {
            this.uploadPercentage = Math.floor(loadedPercent * 100)
          }
        },
        // 上传凭证或STS token超时
        onUploadTokenExpired: function (uploadInfo) {
        },
        // 全部文件上传结束
        onUploadEnd: async uploadInfo => {
          this.isUploadFinish = true
          const lessonId = this.$route.query.lessonId
          // 发送视频转码请求
          const { data } = await aliyunTranscode({
            lessonId: lessonId,
            coverImageUrl: this.imageUrl,
            fileId: this.videoId,
            fileName: this.$refs['video-file'].files[0].name
          })
          // console.log(data)
          if (data.code === '000000') {
            // 轮询转码进度
            const timer = setInterval(async () => {
              const { data } = await aliyunTranscodePercent(lessonId)
              console.log(data)
              if (data.code === '000000') {
                if (data.data === 100) {
                  this.isTranscodeFinish = true
                  this.$message.success('视频转码成功')
                  clearInterval(timer)
                }
              }
            }, 1000)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
