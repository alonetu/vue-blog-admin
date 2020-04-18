<template>
  <div class="el-menu-navbar">
    <i 
      class="show-collapse" 
      :class="isShowSidebar ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleCollapse"
    ></i>
    <el-dropdown 
      class="show-submenu"
      @command="handleRouter"
    >
      <span class="el-dropdown-link">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <template v-for="itemMenu in topMenu">
          <el-dropdown-item
            :key="itemMenu.path"
            :command="itemMenu.path"
          >
            {{ itemMenu.label }}
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "navbar",
  computed: {
    ...mapState({
      username:state=>state.user.user_cname
    })
  },
  data() {
    return {
      isShowSidebar: true,
      topMenu: [
        {
          icon: 'el-icon-menu',
          label: '个人中心',
          path: '/main-view/person-center'
        },
        {
          icon: 'el-icon-menu',
          label: '退出',
          path: '/login'
        }
      ]
    }
  },
  methods: {
    /**
     * 处理侧边栏显隐
     */
    handleCollapse() {
      this.isShowSidebar = !this.isShowSidebar;
      this.$emit('checkCollapse', !this.isShowSidebar);
    },
    handleRouter(path) {
      this.$router.push({path});
    }
  }
}
</script>

<style lang="less">
.el-menu-navbar {
  position: relative;
  background: #fff;
  width: 100%;
  .show-collapse {
    padding: 20px;
    font-size: 20px;
    cursor:pointer;
  }
  .show-submenu {
    position: absolute;
    right: 32px;
    top: 20px;
    bottom: 0;
    cursor: pointer;
  }
}
</style>