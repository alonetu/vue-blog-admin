<template>
  <div class="main-view">
    <!-- 左侧导航栏 -->
    <div class="side-bar">
      <div class="project-name">博客后台</div>
      <el-menu
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :default-active="defaultPage"
        class="el-menu-sidebar"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" @click="toHomePage">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toUserManage">
          <i class="el-icon-setting"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="toBlogManage">
          <i class="el-icon-location"></i>
          <span slot="title">博客管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 内容显示区域 -->
    <div class="container">
      <!-- 顶部导航栏 -->
      <div class="container-header">
        <el-menu
          class="el-menu-blog" 
          mode="horizontal" 
          @select="handleSelect"
        >
          <el-submenu index="1">
            <template slot="title">admin</template>
            <el-menu-item index="1-1">个人中心</el-menu-item>
            <el-menu-item index="1-2" @click="dropBtn">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <!-- 路由跳转 -->
      <div class="container-router">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      defaultPage: '1'    // 默认激活页面
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    handleSelect() {},
    toHomePage() {
      this.$router.push({ path: '/main-view/home-page' });
    },
    toUserManage() {
      this.$router.push({ path: '/main-view/user-manage' });
    },
    toBlogManage() {
      this.$router.push({ path: '/main-view/blog-manage' });
    },
    dropBtn() {
      this.$router.push({ path: '/' });
    }
  }
};
</script>

<style lang="less">
.main-view {
  height: 100vh;
  display: flex;
  background: #eff5fd;
  box-sizing: border-box;
  overflow: auto;
  .side-bar {
    position: fixed;
    width: 180px;
    height: calc(~"100% - 48px");
    padding: 24px;
    color: #ecf0f1;
    background-color: #545c64;
    .project-name {
      margin-left: 20px;
      margin-bottom: 10px;
      font-size: 20px;
    }
  }
  .container {
    margin-left: 230px;
    width: calc(100% - 230px);
    .container-header {
      height: 60px;
      .el-menu-blog {
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }
    }
    .container-router {
      margin-top: 16px;
      height: calc(~"100% - 76px");
    }
  }
  .el-menu {
    border: none;
  }
}
</style>
