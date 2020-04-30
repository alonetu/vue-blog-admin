<template>
  <el-date-picker
    v-model="dateTime"
    type="datetimerange"
    size="samll"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  ></el-date-picker>
</template>

<script>
export default {
  data() {
    return {
      dateTime: []
    }
  }
}
</script>

<style lang="scss">
.el-range-editor.el-input__inner {
  padding: 0 8px;
}
</style>