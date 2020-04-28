<template>
  <div class="person-center wrapper-main">
    <div class="person-container-left">
      <person-info/>
    </div>
    <div class="person-container-right">
      <el-tabs v-model="activePage" @tab-click="handleClick" :lazy=true>
        <el-tab-pane label="已发布的博客" name="showPublish">
          <transition name="breadcrumb">
            <publish-list v-if="showPublish"/>
          </transition>
        </el-tab-pane>
        <el-tab-pane label="收藏的博客" name="showCollect">
          <transition name="breadcrumb">
            <collect-list v-if="showCollect"/>
          </transition>
        </el-tab-pane>
        <el-tab-pane label="赞过的博客" name="showPraise">
          <transition name="breadcrumb">
            <praise-list v-if="showPraise"/>
          </transition>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import PersonInfo from './components/person-info'
import PublishList from './components/publish-list'
import CollectList from './components/collect-list'
import PraiseList from './components/praise-list'

export default {
  name: 'person-center',
  components: {
    PersonInfo,
    PublishList,
    CollectList,
    PraiseList
  },
  data() {
    return {
      activePage: 'showPublish',
      showPublish: true,
      showCollect: false,
      showPraise: false
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
    flex: 1;
  }
}
</style>