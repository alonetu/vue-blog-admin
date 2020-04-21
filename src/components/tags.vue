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
import {mapState} from 'vuex'

export default {
  name: 'tag-router',
  data() {
    return {
      path: '/main-view/home-page',
      tags: [
        {
          label: '首页',
          path: '/main-view/home-page'
        }
      ]
    }
  },
  mounted() {
    this.path = window.location.pathname;
    // 如果sessionStorage中保存了所有打开的页面，则从sessionStage中取值
    const state = sessionStorage.getItem('state');
    if(state && JSON.parse(state).allOpenPage) {
      this.tags = JSON.parse(state).allOpenPage;
    }
  },
  computed: {
    ...mapState(['allOpenPage'])
  },
  watch: {
    /**
     * 监听路由变化
     * 记录当前路由赋给当前tag
     */
    $route() {
      this.path = window.location.pathname;
    },
    /**
     * 监听vuex中保存所有打开页面
     */
    allOpenPage() {
      this.tags = this.allOpenPage;
    }
  },
  methods: {
    /**
     * 切换标签
     */
    switchPage(path) {
      this.path = path;
      this.$router.push({ path });
      this.$emit('switchPage', path);
    },
    /**
     * 关闭标签时跳转到前一个页面
     */
    handleClose(tag) {
      let index = this.tags.indexOf(tag);
      let preTag = this.tags[index - 1];
      this.tags.splice(index, 1);
      this.path = preTag.path;
      // 如果关闭标签的前一个标签是当前页面则不做跳转
      if(this.path === window.location.pathname) { return }
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