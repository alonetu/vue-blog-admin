<template>
  <div class="person-center wrapper-main">
    <div class="person-container-left">
      <person-info/>
    </div>
    <div class="person-container-right">
      <el-tabs 
        v-model="activePage" 
        @tab-click="handleClick"
      >
        <el-tab-pane label="发布的博客" name="showPublish">
          <publish-list/>
        </el-tab-pane>
        <el-tab-pane label="收藏的博客" name="showCollect">
          <collect-list/>
        </el-tab-pane>
      </el-tabs>
      <el-button
        type="primary"
        size="small"
        slot="label"
        v-show="activePage=='showCollect'"
        style="position: absolute;top: 0; right: 0;"
      >
        <i class="el-icon-plus"></i>
        <span>新建文件夹</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import PersonInfo from './components/person-info'
import PublishList from './components/publish-list'
import CollectList from './components/collect-list'

export default {
  name: 'person-center',
  components: {
    PersonInfo,
    PublishList,
    CollectList
  },
  data() {
    return {
      activePage: 'showPublish'
    }
  },
  methods: {
    handleClick(tab) {
      const {name} = tab;
      this[name] = true;
    }
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
    overflow: auto;
    position: relative;
    flex: 1;
  }
}
</style>