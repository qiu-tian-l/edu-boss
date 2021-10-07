<template>
  <div class="course-section">
    <el-card>
      <el-tree :data="sections" :props="defaultProps" @node-click="handleNodeClick" draggable :allow-drop="handleAllowDrop" @node-drop="handleNodeDrop" v-loading="isLoading">
        <div class="inner" slot-scope="{ node, data}">
          <!-- 内容设置 -->
          <span>{{node.label}}</span>
          <!-- 后续按钮结构 -->
          <span v-if="data.sectionName" class="actions">
            <el-button>编辑</el-button>
            <el-button>添加课时</el-button>
            <el-button>状态</el-button>
          </span>
          <span v-else class="actions">
            <el-button>编辑</el-button>
            <!-- <template slot-scope="scope"> -->
            <el-button @click="$router.push({
              name: 'course-video',
              params: {
                courseId
              },
              query: {
                lessonId: data.id
              }
            })">上传视频</el-button>
            <!-- </template> -->
            <el-button>状态</el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdateLesson } from '@/services/section'
// import CourseVideo from './video'
export default {
  name: 'CourseSection',
  // components: {
  //   CourseVideo
  // },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  created () {
    this.loadSectionAndLesson()
  },
  data () {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (data) {
          // data 是章节或课时时，label的属性名不同，需要检测后使用
          return data.sectionName || data.theme
        }
      },
      isLoading: false
    }
  },
  methods: {
    // 节点拖拽完毕后的处理函数
    async handleNodeDrop (draggingNode, dropNode, type, event) {
      this.isLoading = true
      // 由于有很多章节和课时，所以需要给每个章节与课时都进行最新的排序顺序的请求
      try {
        await Promise.all(dropNode.parent.childNodes.map((item, index) => {
          // 判断当前是章节还是课时。再给对应接口发送请求
          if (draggingNode.data.sectionId) {
            // 课时
            return saveOrUpdateLesson({
              courseId: this.courseId,
              id: item.data.id,
              orderNum: index
            })
          } else {
            // 章节
            return saveOrUpdateSection({
              courseId: this.courseId,
              id: item.data.id,
              orderNum: index
            })
          }
        }))
        this.$message.success('数据更新成功')
      } catch (err) {
        this.$message.error('数据更新失败', err)
      } finally {
        this.isLoading = false
      }
    },
    // 节点拖拽时的处理函数
    handleAllowDrop (draggingNode, dropNode, type) {
      // 规则1：只能进行同级拖拽，即type 不能为'inner'
      // 规则2：课时不能移动到其他章节中
      return type !== 'inner' && draggingNode.data.sectionId === dropNode.data.sectionId
    },
    async loadSectionAndLesson () {
      const { data } = await getSectionAndLesson(this.courseId)
      if (data.code === '000000') {
        this.sections = data.data
      }
    },
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.inner{
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

::v-deep .el-tree-node__content{
  height: auto;
}
</style>
