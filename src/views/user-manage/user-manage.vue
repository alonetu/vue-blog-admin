<template>
  <div class="user-manage wrapper-main">
    <div class="user-container">
      <div class="user-container-header">
        <el-input
          class="search-input"
          v-model="searchInput"
          placeholder="请输出查询账号"
          @keyup.enter.native="searchUser"
        >
          <i 
            class="el-icon-search search-icon" 
            slot="suffix" 
            @click="searchUser"
          ></i>
        </el-input>
        <el-button 
          size="small" 
          type="primary" 
          @click="showAdd"
        >新增用户</el-button>
        <el-button 
          size="small" 
          type="danger" 
          @click="deleteSelect"
          style="display:none;"
        >批量删除</el-button>
      </div>
      <div class="user-container-table">
        <el-table
          :data="tableData"
          :loading="loading"
          style="width: 100%"
          @sort-change="changeTableSort"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form 
                label-position="left"
                class="demo-table-expand"
              >
                <el-form-item 
                  label="姓名"
                  prop="user_cname"
                >
                  <span>{{ props.row.user_cname }}</span>
                </el-form-item>
                <el-form-item 
                  label="账号"
                  prop="user_name"
                >
                  <span>{{ props.row.user_name }}</span>
                </el-form-item>
                <el-form-item 
                  label="密码"
                  prop="user_password"
                >
                  <span>{{ props.row.user_password }}</span>
                </el-form-item>
                <el-form-item 
                  label="部门"
                  prop="user_department"
                >
                  <span>{{ props.row.user_department }}</span>
                </el-form-item>
                <el-form-item 
                  label="职位"
                  prop="user_role"
                >
                  <span>{{ props.row.user_role }}</span>
                </el-form-item>
                <el-form-item 
                  label="创建时间"
                  prop="create_time"
                >
                  <span>{{ props.row.create_time }}</span>
                </el-form-item>
                <el-form-item 
                  label="更新时间"
                  prop="update_time"
                >
                  <span>{{ props.row.update_time }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column 
            prop="user_cname" 
            label="姓名"
          ></el-table-column>
          <el-table-column 
            prop="user_name" 
            label="账号"
            align="left"
            sortable="custom"
          ></el-table-column>
          <!-- <el-table-column 
            prop="user_password" 
            label="密码"
          >{{'******'}}</el-table-column> -->
          <el-table-column
            prop="user_department"
            label="部门"
            align="left"
          >
          </el-table-column>
          <el-table-column 
            prop="user_role" 
            label="职位"
            align="left"
            width="180"
          ></el-table-column>
          <el-table-column 
            sortable="custom" 
            prop="article_count" 
            label="博客总数"
            align="left"
            width="140"
          ></el-table-column>
          <el-table-column 
            sortable 
            prop="create_time" 
            label="创建时间"
            align="left"
            width="200"
          ></el-table-column>
          <el-table-column 
            sortable 
            prop="update_time" 
            label="更新时间"
            align="left"
            width="200"
          ></el-table-column>
          <el-table-column 
            fixed="right" 
            label="操作" 
            width="120"
          >
            <template slot-scope="scope">
              <!-- <el-tooltip 
                class="item" 
                effect="dark" 
                content="查看详情" 
                placement="bottom"
              >
                <el-button 
                  @click="showDetail(scope.row)" 
                  size="small" 
                  icon="el-icon-view" 
                  circle
                ></el-button>
              </el-tooltip> -->
              <el-tooltip 
                class="item" 
                effect="dark" 
                content="编辑当前行" 
                placement="bottom"
              >
                <el-button
                  @click="showEdit(scope.row)"
                  size="small"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip 
                class="item" 
                effect="dark" 
                content="删除当前行" 
                placement="bottom"
              >
                <el-button
                  @click="deleteRow(scope.row.id)"
                  size="small"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="user-container-footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="用户详情"
      :visible.sync="detailVisible"
      :before-close="handleDetailClose"
      width="25%"
    >
      <user-detail :userDetail="userDetail" />
    </el-dialog>
    <el-dialog 
      :title="editTitle" 
      :visible.sync="editVisible" 
      v-if="editVisible" 
      width="30%"
    >
      <user-edit 
        :editData="editData" 
        :editType="editType" 
        @getUserList="getUserList"
      />
    </el-dialog>
  </div>
</template>

<script>
import { tableData } from "./data";
import API from "./api";
import UserDetail from "./components/user-detail";
import UserEdit from "./components/user-edit";

export default {
  name: "user-manage",
  components: {
    UserDetail,
    UserEdit
  },
  data() {
    return {
      tableData,
      currentPage: 1,
      pageTotal: 10,
      pageSize: 10,
      searchInput: "",
      detailVisible: false,
      editVisible: false,
      addVisible: false,
      loading: false,
      editTitle: "新增用户",
      editData: {},
      editType: 1, // 1,表示編輯，2,表示新增
      userDetail: {},
      sortOrder: "DESC",
      sortField: ""
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }
      try {
        this.loading = true;
        let result = await API.getUserList(params);
        let { code, message, pageTotal } = result;
        if (code === 200) {
          this.tableData = message;
          this.pageTotal = pageTotal;
        }
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    searchUser() {
      this.loading = true;
      if (!this.searchInput) {
        this.getUserInfo();
      } else {
        this.getUserByUserName();
      }
    },
    async getUserByUserName() {
      try {
        let params = {
          user_name: this.searchInput
        };
        let result = await API.getUserByUserName(params);
        let { code, message } = result;
        if (code === 200) {
          this.tableData = message;
        }
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserInfo();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserInfo();
    },
    filterTag(value, row) {
      return row.user_department === value;
    },
    handleDetailClose() {
      this.detailVisible = false;
    },
    showDetail(data) {
      this.detailVisible = true;
      this.userDetail = data;
    },
    showEdit(data) {
      this.editTitle = "编辑用户";
      this.editVisible = true;
      this.editData = data;
      this.editType = 1;
    },
    showAdd() {
      this.editTitle = "新增用户";
      this.editVisible = true;
      this.editData = {};
      this.editType = 2;
    },
    deleteSelect() {},
    deleteRow(id) {
      this.$confirm("确认删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          this.deleteUserById(id);
          this.loading = false;
          this.getUserInfo();
        })
        .catch(() => {});
    },
    async deleteUserById(id) {
      try {
        let params = { id };
        let result = await API.deleteUserById(params);
        let { code } = result;
        if (200 === code) {
          this.$notify.success({
            message: "删除当前行成功！",
            showClose: false,
            duration: 800
          });
        } else {
          this.$notify.error({
            message: "删除当前行失败！",
            showClose: false,
            duration: 800
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    changeTableSort(val) {
      this.sortOrder = val.order === "ascending" ? "ASC" : "DESC";
      this.sortField = val.prop;
    },
    getUserList() {
      this.editVisible = false;
      this.getUserInfo();
    }
  }
};
</script>

<style lang="less">
.user-manage {
  .user-container-header {
    width: 100%;
    margin-bottom: 32px;
    .search-input {
      width: 400px;
      margin-right: 8px;
      .search-icon {
        position: relative;
        margin: 10px;
        cursor: pointer;
      }
    }
  }
  .user-container-table {
    .el-form-item__label {
      line-height: 24px;
    }
    .el-form-item__content {
      line-height: 24px;
    }
  }
  .user-container-footer {
    background-color: #fff;
    margin-top: 24px;
    .el-pagination {
      text-align: right;
      .el-pagination__total {
        float: left;
      }
      .el-pagination__sizes {
        float: left;
      }
    }
  }
  .el-button + .el-button {
    margin-left: 8px;
  }
}
</style>