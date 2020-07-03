<template>
  <div class="write-blog wrapper-main">
    <div class="write-blog-head">
      <el-input
        v-model="title"
        type="text"
        maxlength="50"
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
      <editor ref="editor" :catchData="catchData"/>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/editor";
import API from "./api";
import { formatTime } from "@/utils/";

export default {
  name: 'write-blog',
  components: {
    Editor
  },
  data() {
    return {
      title: '',
      intro: '',
      content: ''
    }
  },
  methods: {
    async confirmPublish() {
      const {title, intro, content} = this;
      if(title === '' || intro === '' || content === '') {
        this.$notify.warning('请完整填写博客信息');
        return;
      }
      let params = {
        auth: this.$store.state.user.name,
        title,
        intro,
        content,
        createTime: formatTime(new Date()),
        updateTime: formatTime(new Date()),
      }
      try {
        const result = await API.addBlog(params);
        const {code} = result;
        if(code !== 200) {return}
        this.$notify.success({
          message: '发布博客成功',
          duration: 1000
        })
        // this.title = '';
        // this.intro =  '';
        // this.content = '';
        // this.$refs.editor.clearContent();
      } catch(err) {
        console.log(err);
      }
    },
    // 获取组件中html内容，博客内容
    catchData(data) {
      this.content = data;
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
