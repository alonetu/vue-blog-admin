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
        maxlength="50"
        show-word-limit
        placeholder="请输入博客简介"
        class="blog-head-input"
      ></el-input>
      <el-popconfirm
        title="确认发布吗？"
        @onConfirm="confirmPublish"
      >
        <el-button
          type="primary"
          class="blog-head-btn"
          slot="reference"
          size="small"
        >
          发布博客
        </el-button>
      </el-popconfirm>
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
  },
  methods: {
    confirmPublish() {
      this.$notify.success({
        message: '发布成功',
        duration: 1000
      })
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
      margin-bottom: 16px;
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
