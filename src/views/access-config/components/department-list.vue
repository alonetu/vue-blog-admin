<template>
  <div class="department-list">
    <el-tree
      ref="tree"
      :data="treeData"
      :default-expanded-keys="defaultExpand"
      :default-checked-keys="defaultCheck"
      :props="defaultProps"
      node-key="id"
      show-checkbox
      @check="getCheck"
    ></el-tree>
  </div>
</template>

<script>
import {treeData} from '../data'

export default {
  name: "department-list",
  data() {
    return {
      treeData,
      defaultProps: {
        children: "children",
        label: "label"
      },
      defaultExpand: [100],
      defaultCheck: [100]
    }
  },
  created() {
    this.getCheck();
  },
  methods: {
    getCheck(obj, objInfo) {
      if(!objInfo) { return }
      const {checkedNodes} = objInfo;
    }
  }
}
</script>