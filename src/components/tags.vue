<template>
  <div class="tag-router">
    <el-tag
      size="small"
      effect="plain"
      v-for="item in tags"
      :key="item.label"
      :type="item.type"
      :class="item.path === path? 'active-tag': ''"
      @click="switchPage(item.path)"
    >{{ item.label }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'tag-router',
  data() {
    return {
      path: '/main-view/home-page',
      activePath: '/main-view/home-page',
      tags: [
        { 
          type: 'info', 
          label: '首页',
          path: '/main-view/home-page'
        },
        { 
          type: 'info', 
          label: '用户管理',
          path: '/main-view/user-manage'
        },
        { 
          type: 'info', 
          label: '博客管理',
          path: '/main-view/blog-manage'
        }
      ]
    }
  },
  mounted() {
    this.path = window.location.pathname;
  },
  watch: {
    /**
     * 监听路由变化
     * 记录当前路由赋给当前tag
     */
    $route() {
      this.path = window.location.pathname;
    }
  },
  methods: {
    switchPage(path) {
      this.path = path;
      this.$router.push({ path });
      this.$emit('switchPage', path);
    }
  }
}
</script>

<style lang="scss">
.tag-router {
  height: 30px;
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
  padding-left: 11px;
  padding-right: 16px;
  box-sizing: border-box;
  .el-tag--plain.el-tag--info {
    margin-top: 3px;
    margin-left: 5px;
  }
  .active-tag {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
  }
  .el-tag--plain.el-tag--info .el-tag__close {
    color: #fff;
  }
}
</style>