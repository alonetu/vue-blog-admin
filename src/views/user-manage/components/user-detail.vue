<template>
  <div class="user-detail">
    <el-form label-position="left">
      <el-form-item label="姓名:" prop="cname">
        <span v-html="userDetail.cname"></span>
      </el-form-item>
      <el-form-item label="账号:" prop="name">
        <span v-html="userDetail.name"></span>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <span v-html="userDetail.password"></span>
      </el-form-item>
      <el-form-item label="部门:" prop="department">
        <span v-html="userDetail.department"></span>
      </el-form-item>
      <el-form-item label="职位:" prop="role">
        <span v-html="userDetail.role"></span>
      </el-form-item>
      <el-form-item label="博客总数:" prop="article_count">
        <span v-html="userDetail.article_count"></span>
      </el-form-item>
      <el-form-item label="创建时间:" prop="create_time">
        <span v-html="userDetail.create_time"></span>
      </el-form-item>
      <el-form-item label="更新时间:" prop="update_time">
        <span v-html="userDetail.update_time"></span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "user-detail",
  props: {
    userDetail: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss">
.user-detail {
  .el-form-item__label {
    line-height: 24px;
  }
  .el-form-item__content {
    line-height: 24px;
  }
}
</style>