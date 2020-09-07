<template>
  <el-dialog 
    title="保存条件" 
    width="50%"
    :visible.sync="visible"
    :before-close="oncancel"
  >
    <el-table
      :data="conditionList"
      :loading="tableLoading"
      max-height="280"
    >
      <el-table-column 
        property="saveName" 
        label="名称" 
        width="150"
      ></el-table-column>
      <el-table-column
        label="部门"
      >
        <template slot-scope="scope">
          <span>{{ departmentMap[scope.row.department] }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        property="keyword" 
        label="关键字"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ scope.row.keyword===""?"- -":scope.row.keyword }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        property="dateTime" 
        label="时间段"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="操作" 
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            style="margin-right:10px;"
            circle
            icon="el-icon-search"
            @click="searchCondition(scope.row)"
          ></el-button>
          <el-popconfirm
            title="确认删除吗?"
            @onConfirm="confirmDel(scope.row.id)"
          >
            <el-button
              size="small"
              type="danger"
              slot="reference"
              circle
              icon="el-icon-delete"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import API from '../api'

export default {
  name: 'save-condition',
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
  data() {
    return {
      conditionList: [],
      tableLoading: false,
      departmentMap: {
        all: '全部',
        dev: '研发部',
        design: '设计部',
        test: '测试部',
        person: '人事部'
      }
    }
  },
  // created() {
  //   this.getAllCondition();
  // },
  watch: {
    visible() {
      this.getAllCondition();
    }
  },
  methods: {
    async getAllCondition() {
      this.tableLoading = true;
      try {
        const result = await API.getsavesearch();
        const {code, data} = result;
        if(code !== 200) { return }
        this.conditionList = data;
      }catch(err) {
        console.log(err);
      }finally {
        this.tableLoading = false;
      }
    },
    searchCondition(row) {
      this.$emit('reSearch', row);
      this.oncancel();
    },
    deleteCondition(row) {
      console.log(row);
    },
    async confirmDel(id) {
      try {
        const result = await API.deletesearchbyid(id);
        const {code} = result;
        if(code !== 200) { return }
        this.$notify.success({
          message: '删除成功',
          showClose: false,
          duration: 1000
        })
      }catch(err) {
        console.log(err);
      }finally {
        this.getAllCondition();
      }
    }
  }
}
</script>

