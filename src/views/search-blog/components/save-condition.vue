<template>
  <el-dialog 
    title="保存条件" 
    width="50%"
    :visible.sync="visible"
    :before-close="oncancel"
  >
    <el-table
      :data="conditionList"
    >
      <el-table-column 
        property="name" 
        label="名称" 
        width="150"
      ></el-table-column>
      <el-table-column 
        property="condition" 
        label="条件"
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
            @onConfirm="confirmDel(scope.row)"
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
      conditionList: [
        {
          name: 'name',
          condition: 'condition'
        }
      ]
    }
  },
  methods: {
    searchCondition(row) {
      console.log(row);
    },
    deleteCondition(row) {
      console.log(row);
    },
    confirmDel(row) {
      console.log(row);
    }
  }
}
</script>

<style lang="scss">
  
</style>
