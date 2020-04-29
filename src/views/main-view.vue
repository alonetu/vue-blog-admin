<template>
  <div class="main-view">
    <!-- 左侧导航栏 -->
    <div class="side-bar" :style="{width: isCollapse ? '64px' : '200px'}">
      <sidebar :isCollapse="isCollapse" :routerPath="routerPath"/>
    </div>
    <div class="container" :style="{width: isCollapse ? 'calc(100% - 64px)' : 'calc(100% - 200px)'}">
      <!-- 顶部导航栏 -->
      <div class="container-header">
        <navbar @checkCollapse="checkCollapse"/>
        <tags @switchPage="switchPage"/>
      </div>
      <!-- 内容显示区 路由跳转 -->
      <div class="container-router">
        <!-- <keep-alive>
          
        </keep-alive> -->
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar'
import navbar from '@/components/navbar'
import tags from '@/components/tags'

export default {
  name: 'main-view',
  components: {
    sidebar,
    navbar,
    tags
  },
  data() {
    return {
      isCollapse: false,
      routerPath: ''
    }
  },
  methods: {
    checkCollapse(res) {
      this.isCollapse = res;
    },
    switchPage(path) {
      this.routerPath = path;
    }
  }
};
</script>

<style lang="scss">
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
      height: 80px;
    }
    .container-router {
      padding: 24px;
      height: calc(100% - 128px);
      overflow: auto;
    }
  }
}
</style>
