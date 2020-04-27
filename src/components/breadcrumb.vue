<template>
  <el-breadcrumb class="nav-breadcrumd" separator="/">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <transition name="breadcrumb">
      <el-breadcrumb-item 
        v-for="(item, index) in levelList"
        :key="`${index}${item.path}`"
      >
        <a @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'nav-breadcrumd',
  data() {
    return {
      levelList: null
    }
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      const matched = this.$route.matched.filter( item => item.meta && item.meta.title );
      this.levelList = matched.filter(item => item.meta && item.meta.title !== '首页' );
    },
    handleLink(item) {}
  }
}
</script>

<style lang="scss">
.nav-breadcrumd {
  display: inline-block;
  margin-left: 8px;
}
</style>