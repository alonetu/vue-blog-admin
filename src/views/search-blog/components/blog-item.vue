<template>
  <div class="blog-item">
    <div class="blog-item-header" @click="inBlogDetail(blogContent.id)">
      {{ blogContent.title }}
    </div>
    <div class="blog-item-intro">
      简介：{{ blogContent.intro }}
    </div>
    <div class="blog-item-info">
      <span class="blog-item-info-auth">
        <i class="el-icon-user"></i>
        {{ blogContent.auth }}
      </span>
      <span class="blog-item-info-comment">
        <i class="el-icon-chat-dot-square"></i>
        {{ blogContent.comment ? blogContent.comment : 0 }}
      </span>
      <span class="blog-item-info-collect">
        <i class="el-icon-star-off"></i>
        {{ blogContent.collect ? blogContent.collect : 0 }}
      </span>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: 'blog-item',
  props: {
    blogContent: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    /** 新窗口打开文章详情页 */
    inBlogDetail(id) {
      const params = { id: id };
      let routeData = this.$router.resolve({
        path: `/article-detail/${id}`,
        query: params
      });
      window.open(routeData.location.path, "_blank");
    }
  }
}
</script>

<style lang="scss">
.blog-item {
  width: 800px;
  margin: 0 auto;
  .blog-item-header {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    margin: 8px 0;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .blog-item-intro {
    font-size: 13px;
    line-height: 1.5;
    color: #999;
    margin-bottom: 16px;
  }
  .blog-item-info {
    .blog-item-info-auth {
      margin-right: 16px;
    }
    .blog-item-info-comment {
      margin-right: 16px;
    }
  }
}
</style>