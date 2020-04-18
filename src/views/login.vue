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
        label="username:"
        :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]"
      >
        <el-input 
          v-model="loginForm.username" 
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item
        prop="password"
        label="password:"
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <el-input 
          v-model="loginForm.password" 
          type="password" 
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item style="margin-bottom: 0;">
        <el-button 
          type="primary" 
          size="small" 
          @click="submitForm('loginForm')"
        >login</el-button>
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
    async handleLogin(user_name) {
      const baseURL = process.env.NODE_ENV === 'development'?'/blog': '127.0.0.1:3000';
      return await Server.axios('GET', baseURL, `/getuserbyusername?user_name=${user_name}`)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleLogin(this.loginForm.username)
              .then(res => {
                const {code, data} = res;
                const user = data[0];
                const userInfo = {name: user.user_cname, id: user.user_name};
                if(code !== 200 || user.user_password !== this.loginForm.password) {
                  return Notification.error({
                    message: '用户名或密码错误',
                    showClose: false,
                    duration: 1000
                  })
                }
                /**
                 * 登录成功，将user信息写入session
                 * 同时将user信息保存vuex
                 * 跳转到home-page页面
                 */
                this.$store.commit('login', userInfo);
                this.$nextTick(() => {
                  sessionStorage.setItem('state', JSON.stringify(this.$store.state));
                  this.$router.push({ path: "/main-view/home-page" });
                })
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
 
<style lang="less">
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
}
</style>