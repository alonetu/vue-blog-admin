<template>
  <div class="user-manage wrapper-main">
    <div class="user-container">
      <div class="user-container-header">
        <el-input
          :clearable=true
          class="search-input"
          size="small"
          v-model="keyword"
          placeholder="请输入关键字搜索"
          @keyup.enter.native="searchKeyword"
        >
          <i 
            class="el-icon-search el-input__icon" 
            slot="suffix" 
            @click="searchKeyword"
          ></i>
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
          :loading="tableLoading"
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
          >
          <template slot-scope="scope">
              <span v-html="setHeighLight(scope.row.user_cname)"></span>
            </template>
          </el-table-column>
          <el-table-column 
            prop="user_name" 
            label="账号" 
            align="left" 
            sortable="custom"
          >
            <template slot-scope="scope">
              <span v-html="setHeighLight(scope.row.user_name)"></span>
            </template>
          </el-table-column>
          <el-table-column 
            prop="user_department" 
            label="部门" 
            align="left"
          >
            <template slot-scope="scope">
              <span v-html="setHeighLight(scope.row.user_department)"></span>
            </template>
          </el-table-column>
          <el-table-column 
            prop="user_role" 
            label="职位" 
            align="left" 
            width="180"
          >
            <template slot-scope="scope">
              <span v-html="setHeighLight(scope.row.user_role)"></span>
            </template>
          </el-table-column>
          <el-table-column
            sortable="custom"
            prop="article_count"
            label="博客总数"
            align="left"
            width="140"
          >
            <template slot-scope="scope">
              <span v-html="setHeighLight(scope.row.article_count)"></span>
            </template>
          </el-table-column>
          <el-table-column 
            sortable="custom"
            prop="create_time" 
            label="创建时间" 
            align="left" 
            width="200"
          >
            <template slot-scope="scope">
              <span v-html="setHeighLight(scope.row.create_time)"></span>
            </template>
          </el-table-column>
          <el-table-column 
            sortable="custom"
            prop="update_time" 
            label="更新时间" 
            align="left" 
            width="200"
          >
            <template slot-scope="scope">
              <span v-html="setHeighLight(scope.row.update_time)"></span>
            </template>
          </el-table-column>
          <el-table-column 
            fixed="right" 
            label="操作" 
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click="showEdit(scope.row)"
                size="small"
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
                @click="deleteRow(scope.row.id)"
                size="small"
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
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
      tableData: [],
      tableLoading: false,
      sortOrder: "DESC",
      sortField: "",
      currentPage: 1,
      pageTotal: 10,
      pageSize: 10,
      keyword: "",
      detailVisible: false,
      editVisible: false,
      editTitle: "新增用户",
      editType: 1, // 1,表示编辑，2,表示新增
      editData: {}
    };
  },
  /**
   * 生命周期函数
   * 页面创建时调用方法获取用户信息
   */
  created() {
    this.getUserInfo();
  },
  methods: {
    /**
     * 分页获取用户信息, 表头排序
     * @param {number} pageNo 当前页
     * @param {number} pageSize 页数
     * @param {string} sortFiel 排序字段
     * @param {string} sort 排序方式 ASC|DESC
     */
    async getUserInfo() {
      this.tableLoading = true;
      let params = {
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        sortField: this.sortField,
        sort: this.sortOrder,
        keyword: this.keyword
      };
      try {
        const result = await API.getUserList(qs.stringify(params));
        // ES6解构赋值
        const { code, data, pageTotal } = result; 
        if (code === 200) {
          this.tableData = data;
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
     * 按关键字搜索即获取匹配到所有用户
     */
    searchKeyword() {
      // 每次搜索前将表格重置为第一页
      this.currentPage = 1;
      this.getUserInfo();
    },
    /**
     * 设置字段高亮
     */
    setHeighLight(field){
      let tableItem = field;
      if(tableItem == null) {
        return tableItem;
      }
      tableItem = tableItem.toString().replace(new RegExp(this.keyword, "gm"),
        "<span style='color:red;font-weight:700'>" 
        + this.keyword 
        + "</span>"
      )
      return tableItem;
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
     * @param {object} data 当前行信息
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
          this.deleteUserById(id);
          this.getUserInfo();
        })
        .catch(() => {});
    },
    /**
     * 删除接口
     * @param {number} id 用户id
     */
    async deleteUserById(id) {
      this.tableLoading = true;
      try {
        let params = { id };
        const result = await API.deleteUserById(params);
        const { code } = result;
        if (200 === code) {
          this.resetCurrentPage();
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
      } finally {
        this.getUserInfo();
        this.tableLoading = false;
      }
    },
    /**
     * 删除当前页所有数据时，页码跳转到上一页
     */
    resetCurrentPage() {
      if(this.pageTotal % this.pageSize === 1) {
        this.currentPage = this.currentPage - 1;
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
  padding: 16px;
  .user-container-header {
    width: 100%;
    margin-bottom: 24px;
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