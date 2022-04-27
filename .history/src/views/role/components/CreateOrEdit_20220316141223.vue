<template>
  <div class="create-or-edit">
    <el-form :model="formDialog">
      <el-form-item label="角色名称：">
        <el-input autocomplete="off" v-model="formDialog.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码：">
        <el-input autocomplete="off" v-model="formDialog.code"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input type="textarea" v-model="formDialog.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { saveOrUpdateRole } from '@/services/role'
export default {
  name: 'CreateOrEdit',
  props: {
    // roleId: {
    //   type: [Number, String]
    // },
    formDialog: {
      type: Object
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created () {
    console.log('对话框中的form表单组件-created执行')
  },
  destroyed () {
    console.log('对话框中的form表单组件-destroyed执行')
  },
  data () {
    return {
      // form: {
      //   id: '',
      //   code: '',
      //   name: '',
      //   description: ''
      // },
      dialogFormVisibleChild: true
    }
  },
  methods: {
    // async loadSingleRole () {
    //   const { data } = await getRoleByID(this.roleId)
    //   if (data.code === '000000') {
    //     this.form = data.data
    //   }
    // },
    onCancel () {
      this.$emit('cancel')
      // this.formDialog = {}
    },
    async onSubmit () {
      const { data } = await saveOrUpdateRole(this.formDialog)
      if (data.code === '000000') {
        this.$message.success('添加角色成功')
        // 关闭提示框（需要子组件向父组件传递状态）
        // console.log(!this.dialogFormVisibleChild)
        // console.log('子组件传值')
        this.$emit('success')
        // 清除表单内容
        // this.formDialog = {}
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
