<template>
<!-- ref用来获取editor -->
  <div class="text-editor" ref="editor"></div>
</template>

<script>
import { uploadImages } from '@/services/course'
import E from 'wangeditor'
export default {
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null,
      // 用于标记编辑的数据是否加载完毕
      isLoading: false
    }
  },
  mounted () {
    // 富文本初始化
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor)
      // 创建富文本编辑器之前进行事件设置
      editor.config.onchange = value => {
        this.$emit('input', value)
      }
      // 配置自定义的图片上传功能
      editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadImages(fd)
        // console.log(data)
        if (data.code === '000000') {
          // 通过insertImgFn传回给富文本编辑器进行显示
          insertImgFn(data.data.name)
        }
      }
      editor.create()
      // 内容处理
      editor.txt.html(this.value)
      this.editor = editor
    }
  },
  // 侦听器
  watch: {
    value () {
      if (this.isLoading === false) {
        // 得到了加载的新数据，设置给富文本编辑器
        this.editor.txt.html(this.value)
        this.isLoading = true
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
