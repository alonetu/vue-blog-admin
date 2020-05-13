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
      placeholder="请输入保存条件名称"
      maxlength="10"
      show-word-limit
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
import API from '../api'
import moment from 'moment';
import qs from 'qs'

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
    department: {
      type: String,
      default: 'all'
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
    async saveSearchName() {
      let params = {
        username: 'admin',
        saveName: this.saveName,
        department: this.department,
        keyword: this.keyword,
        dateTime: JSON.stringify([this.startTime, this.endTime])
      }
      try {
        let result = await API.addsavesearch(params);
        const {code} = result;
        if(code !== 200) { return }
        this.$notify.success({
          message: '保存成功',
          showClose: false,
          duration: 1000
        })
      }catch (err) {
        console.log(err)
      }finally {
        this.cancelSave();
      }
    }
  }
}
</script>

<style lang="scss">
  
</style>