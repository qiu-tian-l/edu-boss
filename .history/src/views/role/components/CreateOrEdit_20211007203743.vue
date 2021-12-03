<template>
  <div class="create-or-edit">
    <el-form :model="form">
      <el-form-item label="角色名称：">
        <el-input autocomplete="off" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码：">
        <el-input autocomplete="off" v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { saveOrUpdateRole, getRoleByID } from '@/services/role'
export default {
  name: 'CreateOrEdit',
  props: {
    roleId: {
      type: [Number, String]
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created () {
    console.log('执行')
    if (this.isEdit) {
      this.loadSingleRole()
    }
  },
  data () {
    return {
      form: {
        id: '',
        code: '',
        name: '',
        description: ''
      },
      dialogFormVisibleChild: true
    }
  },
  methods: {
    async loadSingleRole () {
      const { data } = await getRoleByID(this.roleId)
      if (data.code === '000000') {
        this.form = data.data
      }
    },
    onCancel () {
      this.$emit('cancel')
      this.form = {}
    },
    async onSubmit () {
      const { data } = await saveOrUpdateRole(this.form)
      if (data.code === '000000') {
        this.$message.success('添加角色成功')
        // 关闭提示框（需要zi组件向父组件传递状态）
        // console.log(!this.dialogFormVisibleChild)
        // console.log('子组件传值')
        this.$emit('success')
        // 清除表单内容
        this.form = {}
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
