<template>
  <div class="login">
    <el-form 
      class="login-container" 
      ref="loginForm" 
      :model="loginForm" 
      :rules="loginRules" 
      label-position="left" 
    >
      <h2>Welcome</h2>
      <el-form-item prop="username">
        <el-input 
          v-model="loginForm.username" 
          type="text" 
          placeholder="账号" 
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input 
          v-model="loginForm.password" 
          type="password"
          placeholder="密码" 
        />
      </el-form-item>
      <el-checkbox v-model="checked" checked>记住密码</el-checkbox>
      <el-form-item>
        <el-button 
          @click.native.prevent="handleLogin" 
          :loading="loading" 
          type="primary"
        >login</el-button>
        <el-button type="primary" class="resetBtn">reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>

export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      checked: true,
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$router.push({ path: '/main-view/home-page' });
    }
  }
}
</script>
 
<style lang="less">
body {
  background: #dfe9fb;
}
.login {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  /* css3线性渐变 */
  background-image: linear-gradient(45deg, #9fbaa8, #57606f);
  transition: 0.4s;
  .login-container {
    width: 350px;
    margin: auto;
    border: 1px solid #ced6e0;
    box-sizing: border-box;
    padding: 10px 30px;
    border-radius: 5px;
    .el-button {
      width: 100%;
      box-sizing: border-box;
      margin: 10px 0;
    }
    .el-button+.el-button {
      margin-left: 0;
    }
  }
}
</style>