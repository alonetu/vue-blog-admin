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
    <div class="access-container-left" v-show="isShowSidebar">
      <department-list/>
    </div>
    <div class="access-container-right" :style="{'width': containerWidth, 'margin-left': marginLeft}">
      <i
        class="el-icon-s-fold sidebar-icon"
        v-show="isShowSidebar"
        @click="showSidebar"
      ></i>
      <i
        class="el-icon-s-unfold sidebar-icon"
        v-show="!isShowSidebar"
        @click="showSidebar"
      ></i>
    </div>
  </div>
</template>

<script>
import DepartmentList from './components/department-list'
import API from './api'
import qs from 'qs'

export default {
  name: 'access-config',
  components: {
    DepartmentList
  },
  data() {
    return {
      keyword: '',
      isShowSidebar: true,
      containerWidth: 'calc(100% - 256px)',
      marginLeft: '256px'
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
        const developer = data.filter(item => item.department === "研发部");
      }catch(err) {
        console.log(err);
      }finally {

      }
    },
    showSidebar() {
      this.isShowSidebar = !this.isShowSidebar;
      this.containerWidth = this.isShowSidebar? 'calc(100% - 256px)': '100%';
      this.marginLeft = this.isShowSidebar? '256px': '0';
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
    // transition: width .5s linear;
    // transition: margin-left .5s linear;
    .sidebar-icon {
      cursor: pointer;
      font-size: 18px;
    }
  }
}
</style>