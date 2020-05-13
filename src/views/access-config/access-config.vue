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
    <div 
      class="access-container-right" 
      :style="{'width': containerWidth, 'margin-left': marginLeft}"
    >
      <div class="access-container-right-head">
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
        <el-checkbox v-model="showDepartment" style="margin-left:120px;">部门</el-checkbox>
        <el-checkbox v-model="showCreateTime">入职日期</el-checkbox>
      </div>
      <div class="access-container-right-content">
        <el-table
          :data="userList"
        >
          <el-table-column
            prop="cname"
            label="姓名"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="账号"
          ></el-table-column>
          <el-table-column
            prop="department"
            label="部门"
            v-if="showDepartment"
          ></el-table-column>
          <el-table-column
            prop="role"
            label="职位"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="入职时间"
            v-if="showCreateTime"
          ></el-table-column>
          <el-table-column
            label="权限"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                style="display: block"
                v-model="scope.row.access"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="管理员"
                inactive-text="普通用户"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      marginLeft: '256px',
      userList: [{
        cname: 'admin',
        name: 'admin',
        department: '研发部',
        role: '产品经理',
        createTime: '2020-03-12',
        access: true
      }],
      showDepartment: false,
      showCreateTime: false
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
  overflow-x: hidden;
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
    transition: width .2s linear;
    transition: margin-left .2s linear;
    .sidebar-icon {
      cursor: pointer;
      font-size: 18px;
    }
    .access-container-right-content {
      margin-top: 16px;
    }
  }
}
</style>