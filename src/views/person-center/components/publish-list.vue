<template>
  <div class="publish-list">
    <template v-for="(item, index) in articleList">
      <article-item :key="`${item}${index}`" style="margin-bottom: 16px;">
        <div slot="article-name" class="article-name">{{item.articleName}}</div>
        <div slot="article-intro" class="article-intro">{{item.articleInfo}}</div>
        <span slot="article-author" class="article-author">auth: {{item.articleAuth}}</span>
        <span slot="article-update-time" class="article-update-time">lastUpdateTime: {{item.lastUpdateTime}}</span>
        <el-button 
          slot="article-btn-first"
          class="article-btn-first"
          icon="el-icon-view"
          size="small"
          circle
        ></el-button>
        <el-button 
          slot="article-btn-second"
          class="article-btn-second"
          icon="el-icon-edit"
          size="small"
          circle
        ></el-button>
        <el-button 
          slot="article-btn-thirdly"
          class="article-btn-thirdly"
          icon="el-icon-delete"
          size="small"
          type="danger"
          circle
        ></el-button>
      </article-item>
    </template>
  </div>
</template>

<script>
import {articleList} from '../data'
import ArticleItem from "@/components/article-item";

export default {
  name: "publish-list",
  components: {
    ArticleItem
  },
  data() {
    return {
      articleList
    }
  }
}
</script>

<style lang="scss">
@import "@/style/slot.scss";
.publish-list {
  margin: 0;
}
</style>