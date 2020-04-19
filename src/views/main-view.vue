<template>
  <div class="main-view">
    <!-- 左侧导航栏 -->
    <div class="side-bar" :style="{width: isCollapse ? '64px' : '200px'}">
      <sidebar :isCollapse="isCollapse"/>
    </div>
    <div class="container" :style="{width: isCollapse ? 'calc(100% - 64px)' : 'calc(100% - 200px)'}">
      <!-- 顶部导航栏 -->
      <div class="container-header">
        <navbar @checkCollapse="checkCollapse"/>
      </div>
      <!-- 内容显示区 路由跳转 -->
      <div class="container-router">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar'
import navbar from '@/components/navbar'

export default {
  name: 'main-view',
  components: {
    sidebar,
    navbar
  },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    checkCollapse(res) {
      this.isCollapse = res;
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
    height: 100%;
    transition: width .2s linear;
  }
  .container {
    transition: width .2s linear;
    .container-header {
      height: 60px;
    }
    .container-router {
      padding: 24px;
      height: calc(~"100% - 108px");
      overflow: auto;
    }
  }
}
</style>
