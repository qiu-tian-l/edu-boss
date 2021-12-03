<template>
  <div class="alloc-role">
    <el-select v-model="selectedRoles" multiple placeholder="请选择">
      <el-option v-for="role in allRoles" :key="role.id" :value="role.id" :label="role.name"></el-option>
    </el-select>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { getAllRoles, getRolesWithUserPermission, allocateUserRole } from '@/services/role'
export default {
  name: 'AllocRole',
  props: {
    currentUserId: {
      type: [Number, String]
    }
  },
  created () {
    this.loadAllRoles()
    this.loadRolesWithUserPermission()
  },
  data () {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 所有角色
      allRoles: [],
      // 选中的角色
      selectedRoles: []
    }
  },
  methods: {
    onCancel () {
      this.$emit('cancel')
      this.selectedRoles = []
    },
    async onSubmit () {
      const { data } = await allocateUserRole({
        userId: this.currentUserId,
        roleIdList: this.selectedRoles
      })
      // console.log('给用户分配角色')
      // console.log(data)
      this.$emit('success')
      this.$message.success('分配角色成功')
      this.selectedRoles = []
    },
    async loadAllRoles () {
      const { data } = await getAllRoles()
      this.allRoles = data.data
    },
    async loadRolesWithUserPermission () {
      this.selectedRoles = []
      const { data } = await getRolesWithUserPermission(this.currentUserId)
      if (data.code === '000000') {
        data.data.forEach(element => {
          if (element.hasPermission) {
            this.selectedRoles.push(element.id)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
