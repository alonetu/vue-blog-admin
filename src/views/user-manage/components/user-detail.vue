<template>
  <div class="user-detail">
    <div class="user-info">
      <span class="label">姓名：</span>
      <span class="name">{{userDetail.user_cname}}</span>
    </div>
    <div class="user-info">
      <span class="label">账号：</span>
      <span class="name">{{userDetail.user_name}}</span>
    </div>
    <div class="user-info">
      <span class="label">密码：</span>
      <span class="name">{{userDetail.user_password}}</span>
    </div>
    <div class="user-info">
      <span class="label">部门：</span>
      <span class="name">{{userDetail.user_department}}</span>
    </div>
    <div class="user-info">
      <span class="label">职位：</span>
      <span class="name">{{userDetail.user_role}}</span>
    </div>
    <div class="user-info">
      <span class="label">博客总数：</span>
      <span class="name">{{userDetail.article_count}}</span>
    </div>
    <div class="user-info">
      <span class="label">创建时间：</span>
      <span class="name">{{userDetail.create_time}}</span>
    </div>
    <div class="user-info">
      <span class="label">更新时间：</span>
      <span class="name">{{userDetail.update_time}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-detail',
  props: {
    userDetail: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="less">
.user-detail {
  .user-info {
    padding-left: 48px;
    margin-bottom: 16px;
    .label {
      display: inline-block;
      width: 142px;
      text-align: right;
      margin-right: 16px;
    }
  }
}
</style>