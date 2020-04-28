<template>
  <div class="collect-list">
    <article-item>
      <div slot="article-name"  class="article-name">文章名称</div>
      <div slot="article-intro" class="article-intro">文章简介</div>
      <span slot="article-author" class="article-author">文章作者</span>
      <span slot="article-update-time" class="article-update-time">最后更新时间</span>
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
        icon="el-icon-star-on"
        size="small"
        circle
      ></el-button>
    </article-item>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'

export default {
  name: 'collect-list',
  components: {
    ArticleItem
  }
}
</script>

<style lang="scss">
@import '@/style/slot.scss';
.collect-list {
  margin: 0;
}
</style>