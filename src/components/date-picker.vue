<template>
  <el-date-picker
    v-model="dateTime"
    type="datetimerange"
    size="samll"
    format="yyyy-MM-dd HH:mm:ss"
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  ></el-date-picker>
</template>

<script>
export default {
  props: {
    datePicker: {
      type: Array,
      default: []
    }
  },
  watch: {
    datePicker() {
      this.dateTime = this.datePicker;
    }
  },
  data() {
    return {
      dateTime: [Date.parse(new Date()), Date.parse(new Date()) + 5 * 1000]
    }
  }
}
</script>

<style lang="scss">
.el-range-editor.el-input__inner {
  padding: 0 8px;
}
</style>