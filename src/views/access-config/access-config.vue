<template>
  <div class="access-config">
    <div class="access-container-header">
      <el-input 
        v-model="keyword"
        class="search-keyword"
        placeholder="请输入关键字查找"
      ></el-input>
      <el-button
        size="small"
        type="primary"
      >查询</el-button>
    </div>
    <div class="access-container-left">
      <system-list/>
    </div>
    <div class="access-container-right">
      
    </div>
  </div>
</template>

<script>
import SystemList from './components/system-list'

export default {
  name: 'access-config',
  components: {
    SystemList
  },
  data() {
    return {
      keyword: ''
    }
  }
}
</script>

<style lang="scss">
.access-config {
  .access-container-header {
    padding: 24px 16px;
    margin-bottom: 16px;
    background-color: #fff;
    border-radius: 4px;
    .search-keyword {
      width: calc(100% - 72px);
      margin-right: 16px;
    }
  }
  .access-container-left {
    position: fixed;
    padding: 16px;
    box-sizing: border-box;
    width: 240px;
    min-height: calc(100vh - 224px);
    background-color: #fff;
    border-radius: 4px;
  }
  .access-container-right {
    padding: 16px;
    box-sizing: border-box;
    margin-left: 256px;
    width: calc(100% - 256px);
    height: calc(100vh - 224.4px);
    background-color: #fff;
    border-radius: 4px;
    overflow-y: auto;
  }
}
</style>