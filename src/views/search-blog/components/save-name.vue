<template>
  <el-dialog 
    title="保存名称" 
    width="30%"
    :visible.sync="visible"
    :before-close="oncancel"
  >
    <el-input
      v-model.trim="saveName"
      size="small"
      placeholder="请输入保存条件名称(不超过10个字符)"
    ></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button 
        size="small"
        @click="saveNameVisible = false"
      >取 消</el-button>
      <el-button 
        type="primary" 
        size="small"
        @click="saveSearchName"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      saveName: ''
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    oncancel: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    saveSearchName() {
      const startTime = moment(this.$refs.dataPicker.dateTime[0]).format("YYYY-MM-DD HH:mm:ss");
      const endTime = moment(this.$refs.dataPicker.dateTime[1]).format("YYYY-MM-DD HH:mm:ss");
      const params = {
        name: '',
        keyword: '',
        dateTime: [startTime, endTime]
      }
    }
  }
}
</script>

<style lang="scss">
  
</style>