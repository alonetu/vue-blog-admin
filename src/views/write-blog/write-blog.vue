<template>
  <div class="write-blog wrapper-main">
    <div class="write-blog-head">
      <el-input
        v-model="title"
        type="text"
        maxlength="20"
        show-word-limit
        placeholder="请输入博客标题"
        class="blog-head-input"
      ></el-input>
      <el-input
        v-model="intro"
        type="text"
        maxlength="30"
        show-word-limit
        placeholder="请输入博客简介"
        class="blog-head-input"
      ></el-input>
      <el-button
        type="primary"
        class="blog-head-btn"
      >
        发布博客
      </el-button>
    </div>
    <div class="write-blog-container">
      <editor />
    </div>
  </div>
</template>

<script>
import Editor from '@/components/editor'

export default {
  name: 'write-blog',
  components: {
    Editor
  },
  data() {
    return {
      title: '',
      intro: ''
    }
  }
}
</script>

<style lang="scss">
.write-blog {
  overflow: auto;
  .write-blog-head {
    position: relative;
    .blog-head-input {
      margin-bottom: 8px;
      width: calc(100% - 240px);
    }
    .blog-head-btn {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
