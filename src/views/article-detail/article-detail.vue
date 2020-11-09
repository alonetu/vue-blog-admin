<template>
  <div class="article-detail">
    <div class="article-detail-container">
      <div class="article-title">{{article.title}}</div>
      <div class="article-intro">简介：{{article.intro}}</div>
      <div class="article-info">
        <span class="article-info-auth">作者: {{article.auth}}</span>
        <span class="article-info-time">更新时间: {{updateTime}}</span>
      </div>
      <div class="article-content" v-html="article.content"></div>
    </div>
  </div>
</template>

<script>
import API from "./api";
import { formatTime } from "@/utils/";

export default {
  name: 'article-detail',
  created() {
    this.getArticleDetail(this.$route.params.id);
  },
  data() {
    return {
      article: {}
    }
  },
  methods: {
    async getArticleDetail(id) {
      const result = await API.getArticleDetail(id);
      const {code, data} = result;
      if(code !== 0) { return }
      this.article = data[0];
    }
  },
  computed: {
    updateTime() {
      return formatTime(this.article.updateTime);
    }
  }
}
</script>

<style lang="scss">
.article-detail {
  background-color: #dddddd;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  .article-detail-container {
    height: calc(100vh - 48px);
    width: 48%;
    padding: 24px;
    border-radius: 4px;
    overflow-y: auto;
    background-color: #fff;
    .article-title {
      text-align: left;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .article-intro {
      text-align: left;
      font-size: 14px;
      line-height: 1.5;
      color: #999;
      margin-bottom: 16px;
    }
    .article-info {
      margin-bottom: 16px;
      .article-info-auth {
        margin-right: 24px;
      }
    }
  }
}
</style>
