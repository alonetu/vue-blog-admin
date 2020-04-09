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
        :rules="[{ required: true, message: '请输入账号'}]"
      >
        <el-input 
          v-model="loginForm.username" 
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item
        prop="password"
        label="password:"
        :rules="[{ required: true, message: '请输入密码' }]"
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
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push({ path: "/main-view/home-page" });
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
    border: 1px solid #57606f;
    margin: auto;
    .el-button {
      width: 100%;
      height: 32px;
    }
  }
}
</style>