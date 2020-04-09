<template>
  <div class="user-manage wrapper-main">
    <div class="user-container">
      <div class="user-container-header">
        <el-input
          class="search-input"
          v-model="keyword"
          placeholder="请输出查询账号"
          @keyup.enter.native="searchUser"
        >
          <i class="el-icon-search search-icon" slot="suffix" @click="searchUser"></i>
        </el-input>
        <el-button 
          size="small" 
          type="primary" 
          @click="showAdd"
        >新增用户</el-button>
      </div>
      <div class="user-container-table">
        <el-table
          :data="tableData"
          :loading="loading"
          style="width: 100%"
          @sort-change="changeTableSort"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <user-detail :userDetail="scope.row" />
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
          >
            <template slot-scope="scope">
              <span v-html="scope.row.user_name"></span>
            </template>
          </el-table-column>
          <el-table-column 
            prop="user_department" 
            label="部门" 
            align="left"
          ></el-table-column>
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
          :total="pageTotal"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
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
import API from "./api";
import qs from "qs"

import { tableData } from "./data";
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
      loading: false,
      sortOrder: "DESC",
      sortField: "",
      currentPage: 1,
      pageTotal: 10,
      pageSize: 10,
      keyword: "",
      detailVisible: false,
      editVisible: false,
      editTitle: "新增用户",
      editType: 1, // 1,表示編輯，2,表示新增
      editData: {}
    };
  },
  /**
   * 生命周期函数
   * 页面创建是调用方法获取用户信息
   */
  created() {
    this.getUserInfo();
  },
  methods: {
    /**
     * 分页获取用户信息, 表头排序
     * @param pageNo 当前页
     * @param pageSize 页数
     * @param sortFiel 排序字段
     * @param sort 排序方式 ASC|DESC
     */
    async getUserInfo() {
      this.loading = true;
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        sortField: this.sortField,
        sort: this.sortOrder
      };
      try {
        let result = await API.getUserList(qs.stringify(params));
        // ES6解构赋值
        let { code, message, pageTotal } = result; 
        if (code === 200) {
          this.tableData = message;
          this.pageTotal = pageTotal;
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    /**
     * 搜索框调用方法
     * 为空搜索即获取用户列表
     * 按名称搜索即获取匹配用户信息
     */
    searchUser() {
      this.loading = true;
      // 每次搜索前将表格重置为第一页
      this.currentPage = 1;
      // 去除搜索框内空格
      this.keyword = this.keyword.replace(new RegExp(' ', 'gm'), '');
      if (!this.keyword) {
        this.getUserInfo();
      } else {
        this.getUserByUserName();
      }
    },
    /**
     * 根据用户名称获取用户
     * @param user_name 用户名称
     */
    async getUserByUserName() {
      try {
        let params = {
          user_name: this.keyword
        };
        let result = await API.getUserByUserName(params);
        let { code, message, pageTotal } = result;
        if (code === 200) {
          this.tableData = message;
          this.pageTotal = pageTotal;
          this.handleHeighLight(this.tableData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    /**
     * 搜索匹配字段高亮
     */
    handleHeighLight(data) {
      data.forEach(item => {
        item.user_name = item.user_name.replace(new RegExp(this.keyword, "gm"),
          "<span style='color:red;font-weight:700'>" 
          + this.keyword 
          + "</span>"
        );
      });
    },
    /**
     * 改变页数调用方法
     */
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserInfo();
    },
    /**
     * 改变当前页调用方法
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserInfo();
    },
    /**
     * 点击编辑
     * @param data 当前行信息
     */
    showEdit(data) {
      this.editTitle = "编辑用户";
      this.editVisible = true;
      this.editData = data;
      this.editType = 1;
    },
    /**
     * 点击新增
     */
    showAdd() {
      this.editTitle = "新增用户";
      this.editVisible = true;
      this.editData = {};
      this.editType = 2;
    },
    /**
     * 删除当前行
     */
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
    /**
     * 删除接口
     * @param id 用户id
     */
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
    /**
     * 表头排序
     * ASC正序，DESC倒序
     */
    changeTableSort(val) {
      this.sortOrder = val.order === "ascending" ? "ASC" : "DESC";
      this.sortField = val.prop;
      this.currentPage = 1;
      this.getUserInfo();
    },
    /**
     * 父子组件传值
     * 子组件调用父组件方法
     * 隐藏编辑弹框，获取用户列表
     */
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