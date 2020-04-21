<template>
  <div class="tag-router">
    <el-tag
      size="small"
      effect="plain"
      v-for="item in tags"
      :key="item.label"
      :type="item.type"
      :class="item.path === path? 'active-tag': ''"
      :closable="item.label==='首页'? false: true"
      @click="switchPage(item.path)"
      @close="handleClose(item)"
    >{{ item.label }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'tag-router',
  data() {
    return {
      path: '/main-view/home-page',
      prePath: '/main-view/home-page',
      activePath: '/main-view/home-page',
      tags: [
        {
          label: '首页',
          path: '/main-view/home-page'
        },
        {
          label: '用户管理',
          path: '/main-view/user-manage'
        },
        {
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
    },
    handleClose(tag) {
      let index = this.tags.indexOf(tag);
      let preTag = this.tags[index - 1];
      this.tags.splice(index, 1);
      this.path = preTag.path;
      this.$router.push(this.path);
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
  .el-tag--plain {
    color: #495060;
    border: 1px solid #d8dce5;
    margin-top: 3px;
    margin-left: 5px;
  }
  .active-tag {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
  }
  .el-tag--plain .el-tag__close {
    color: #fff;
  }
}
</style>