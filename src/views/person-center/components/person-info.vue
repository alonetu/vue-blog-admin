<template>
  <div class="person-info">
    <div class="el-icon-s-custom person-info-head"></div>
    <div class="person-info-content">
      <span>{{ $store.state.user.cname }}</span>
      <el-divider direction="vertical"></el-divider>
      <span>{{ $store.state.user.department }}</span>
      <el-divider direction="vertical"></el-divider>
      <span>{{ $store.state.user.role }}</span>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state.user)
  }
}
</script>

<style lang="scss">
.person-info {
  margin: 48px 0 0;
  .person-info-head {
    display: block;
    text-align: center;
    font-size: 120px;
  }
  .person-info-content {
    text-align: center;
  }
}
</style>
