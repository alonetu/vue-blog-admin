<template>
  <div class="collect-list">
    <el-tabs
      tab-position="left"
    >
      <el-tab-pane
        v-for="(item, index) in tabFolder"
        :key="`${item}${index}`"
      >
        <span slot="label">
          {{item.label}}
          <i class="el-icon-folder-opened"></i>
        </span>
        <template v-for="(item, index) in articleList">
          <article-item :key="`${item}${index}`" style="margin-bottom: 16px;">
            <div slot="article-name"  class="article-name">{{item.articleName}}</div>
            <div slot="article-intro" class="article-intro">{{item.articleInfo}}</div>
            <span slot="article-author" class="article-author">auth: {{item.articleAuth}}</span>
            <span slot="article-update-time" class="article-update-time">最后更新时间: {{item.lastUpdateTime}}</span>
            <el-button 
              slot="article-btn-second"
              class="article-btn-second"
              icon="el-icon-view"
              size="small"
              circle
            ></el-button>
            <el-button 
              slot="article-btn-thirdly"
              class="article-btn-thirdly"
              icon="el-icon-star-on"
              size="small"
              v-if="isCollect"
              @click="isCollect=false"
              circle
            ></el-button>
            <el-button 
              slot="article-btn-thirdly"
              class="article-btn-thirdly"
              icon="el-icon-star-off"
              size="small"
              v-if="!isCollect"
              @click="isCollect=true"
              circle
            ></el-button>
          </article-item>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {tabFolder, articleList} from '../data'
import ArticleItem from '@/components/article-item'

export default {
  name: 'collect-list',
  components: {
    ArticleItem
  },
  data() {
    return {
      tabFolder,
      articleList,
      isCollect: true
    }
  },
  methods: {}
}
</script>

<style lang="scss">
@import '@/style/slot.scss';
.collect-list {
  margin: 0;
}
</style>