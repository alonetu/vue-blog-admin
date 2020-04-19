<template>
  <div class="tag-router">
    <el-tag
      size="small"
      effect="plain"
      v-for="item in tags"
      :key="item.label"
      :type="item.type"
      @click="switchPage"
    >{{ item.label }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'tag-router',
  data() {
    return {
      tags: [
        { 
          type: 'info', 
          label: '首页'
        },
        { 
          type: 'info', 
          label: '首页1'
        },
        { 
          type: 'info', 
          label: '首页2'
        },
        { 
          type: 'info', 
          label: '首页3'
        }
      ]
    }
  },
  methods: {
    switchPage() {

    }
  }
}
</script>

<style lang="scss">
.tag-router {
  height: 30px;
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
  padding-left: 11px;
  padding-right: 16px;
  box-sizing: border-box;
  .el-tag--plain.el-tag--info {
    margin-top: 3px;
    margin-left: 5px;
  }
}
</style>