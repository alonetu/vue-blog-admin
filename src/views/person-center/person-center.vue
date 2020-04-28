<template>
  <div class="person-center wrapper-main">
    <div class="person-container-left">
      <person-info/>
    </div>
    <div class="person-container-right">
      <el-tabs v-model="activePage" @tab-click="handleClick">
        <el-tab-pane label="已发布的博客" name="first">
          <publish-list/>
        </el-tab-pane>
        <el-tab-pane label="收藏的博客" name="second">收藏</el-tab-pane>
        <el-tab-pane label="赞过的博客" name="third">赞</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import PersonInfo from './components/person-info'
import PublishList from './components/publish-list'

export default {
  name: 'person-center',
  components: {
    PersonInfo,
    PublishList
  },
  data() {
    return {
      activePage: 'first'
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style lang="scss">
.person-center {
  display: flex;
  .person-container-left {
    width: 240px;
  }
  .person-container-right {
    flex: 1;
  }
}
</style>