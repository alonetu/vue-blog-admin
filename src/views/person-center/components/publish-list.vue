<template>
  <div class="publish-list">
    <article-item>
      <div slot="article-name"  class="article-name">文章名称</div>
      <div slot="article-intro" class="article-intro">文章简介</div>
      <span slot="article-author" class="article-author">文章作者</span>
      <span slot="article-update-time" class="article-update-time">最后更新时间</span>
    </article-item>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'

export default {
  name: 'publish-list',
  components: {
    ArticleItem
  }
}
</script>

<style lang="scss">
@import '@/style/slot.scss';
.publish-list {
  margin: 0;
}
</style>