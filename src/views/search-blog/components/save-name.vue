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
        @click="cancelSave"
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
import moment from 'moment';

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
    },
    keyword: {
      type: String,
      default: ''
    },
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    }
  },
  methods: {
    cancelSave() {
      this.saveName = '';
      this.oncancel();
    },
    saveSearchName() {
      let params = {
        name: this.saveName,
        keyword: this.keyword,
        dateTime: [this.startTime, this.endTime]
      }
      this.cancelSave();
    }
  }
}
</script>

<style lang="scss">
  
</style>