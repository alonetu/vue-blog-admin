<template>
  <div class="system-list">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps"
    ></el-tree>
  </div>
</template>

<script>
import {treeData} from '../data'

export default {
  name: "system-list",
  data() {
    return {
      data: treeData,
      defaultProps: {
        children: "children",
        label: "label"
      }
    }
  }
}
</script>