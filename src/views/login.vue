<template>
  <div class="login-page">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :hide-required-asterisk=true
      label-width="80px"
      class="login-page-container"
    >
      <el-form-item
        prop="username"
        :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]"
      >
        <el-input 
          v-model="loginForm.username" 
          placeholder="请输入账号"
          size="medium"
        >
          <i slot="prefix" class="el-icon-user "></i>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <el-input 
          v-model="loginForm.password" 
          type="password" 
          placeholder="请输入密码"
          size="medium"
          @keyup.enter.native="submitForm()"
          show-password
        >
          <i slot="prefix" class="el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 0;">
        <el-button 
          type="primary" 
          size="small" 
          @click="submitForm()"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import Server from '@/axios/'
import { Notification } from 'element-ui'

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123"
      }
    };
  },
  methods: {
    async handleLogin(name) {
      const baseURL = process.env.NODE_ENV === 'development'?'/blog': '127.0.0.1:3000';
      return await Server.axios('GET', baseURL, `/getuserbyusername?name=${name}`)
    },
    submitForm() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.handleLogin(this.loginForm.username)
              .then(res => {
                const {code, data} = res;
                const user = data[0];
                if(code !== 200 || user.password !== this.loginForm.password) {
                  return Notification.error({
                    message: '用户名或密码错误',
                    showClose: false,
                    duration: 1000
                  })
                }
                /**
                 * 登录成功
                 * 将首页路径写入vuex
                 * 将用户信息保存vuex
                 * 将vuex中的信息写入session
                 * 跳转到home-page页面
                 */
                const userInfo = {name: user.cname, id: user.name};
                const defaultPage = "/home-page";
                this.$store.commit('login', userInfo);
                this.$router.push({ path: defaultPage });
              }, err => {
                console.log(err);
              })
        } else {
          return false;
        }
      })
    }
  }
}
</script>
 
<style lang="scss">
.login-page {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(45deg, #9fbaa8, #57606f); // CSS3背景线性渐变
  transition: 0.4s;
  .login-page-container {
    width: 400px;
    padding: 24px;
    margin: auto;
    .el-button {
      width: 100%;
      height: 32px;
    }
  }
  .el-input--medium .el-input__inner {
    height: 42px;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 36px;
  }
  .el-input__prefix {
    left: 10px;
  }
  .el-input__inner {
    background-color: #57606f;
    border: 1px solid #606266;
    color: #fff;
  }
}
</style>