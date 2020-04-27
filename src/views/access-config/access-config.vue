<template>
  <div class="access-config">
    <div class="access-container-header">
      <el-input
        v-model.trim="keyword"
        size="small"
        class="search-keyword"
        placeholder="请输入关键字查找"
        @keyup.enter.native="getUserList()"
      >
        <i
          slot="suffix"
          class="el-icon-search el-input__icon"
          @click="getUserList()"
        ></i>
      </el-input>
      <el-button
        size="small"
        type="primary"
        @click="getUserList"
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
import API from './api'
import qs from 'qs'

export default {
  name: 'access-config',
  components: {
    SystemList
  },
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    async getUserList() {
      const params = {
        pageNo: 1,
        pageSize: 20,
        sortField: "id",
        sort: "DESC",
        keyword: ""
      }
      try {
        const result = await API.getUserList(qs.stringify(params));
        const {code, data} = result;
        if(200 !== code) { return }
        const developer = data.filter(item => item.user_department === "研发部");
      }catch(err) {
        console.log(err);
      }finally {

      }
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
    height: calc(100vh - 225px);
    background-color: #fff;
    border-radius: 4px;
    overflow-y: auto;
  }
}
</style>