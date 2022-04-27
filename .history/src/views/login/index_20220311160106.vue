<template>
  <div class="login">
    <!-- :model="form" 表示给当前表单绑定的数据的名称 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLoginLoading" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入user中的login模块
import { login } from '@/services/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 存储表单数据的对象
      form: {
        phone: '18201288771',
        password: '111111'
      },
      // 用于设置表单校验规则
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '请输入6-18位的密码', trigger: 'blur' }
        ]
      },
      // 用于保存加载状态
      isLoginLoading: false
    }
  },
  methods: {
    // 登录功能
    async onSubmit () {
      // 通过回调形式处理时，内部嵌套的if else较多，层级较复杂，所以改成async和await形式
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //   }
      // })
      // async和await搭配，进行功能简化，当验证通过时可以正常执行，失败的话会报错处理，所以利用try..catch进行处理
      try {
        // 1. 设置校验成功后的功能（请求）
        await this.$refs.form.validate()
        // 2. 发送请求
        // 查看响应结果(是一个对象)发现，里边有一个data属性是我们需要用到的，所以通过对象解构提取到data值，然后判断data里边的state值是否成功
        // login(this.form)是一个promise对象
        // 处理重复请求，在发送请求前和发送请求后都将登录按钮置为 未加载可点击状态
        this.isLoginLoading = true
        // const { data } = await request({
        //   method: 'POST',
        //   url: '/front/user/login',
        //   // url-encoded格式：k=v&k=v
        //   data: qs.stringify(this.form)
        // })
        const { data } = await login(this.form)
        this.isLoginLoading = false
        // 3. 处理响应结果
        if (data.state === 1) {
          // 将用户信息存储到vuex中 可以向store.commit传入额外的参数，即mutation的载荷payload
          this.$store.commit('setUser', data.content)
          this.$message.success('登录成功')
          // 根据可能存在的redirect数据进行跳转设置（如果有重定向地址，就跳转到该地址，否则跳转到首页）
          // this.$route存储的是当前路由的路由信息
          this.$router.push(this.$route.query.redirect || '/')
        } else {
          this.$message.error('登录失败')
        }
      } catch (err) {
        // 设置校验失败后的功能（提示）
        console.log('未通过校验')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form{
    background-color: #fff;
    padding: 20px;
    width: 300px;
    border-radius: 10px;

    .el-button{
      width: 100%;
    }
  }
}
</style>
