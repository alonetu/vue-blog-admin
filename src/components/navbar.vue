<template>
  <div class="navbar">
    <i 
      class="show-collapse" 
      :class="isShowSidebar ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleCollapse"
    ></i>
    <el-dropdown 
      class="show-submenu"
      trigger="click"
      @command="handleRouter"
    >
      <span class="el-dropdown-link">
        {{ $store.state.user.name }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-link 
            href="https://github.com/alonetu/vue-blog-admin" 
            target="_blank"
            :underline=false
          >项目地址</el-link>
        </el-dropdown-item>
        <template v-for="itemMenu in topMenu">
          <el-dropdown-item
            :key="itemMenu.path"
            :command="itemMenu.path"
            :divided="itemMenu.path==='/login'?true:false"
          >
            {{ itemMenu.label }}
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

export default {
  name: "navbar",
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
      if(path === '/login') {
        this.$store.commit('login', {});
      }
      this.$router.push({path});
    }
  }
}
</script>

<style lang="scss">
.navbar {
  position: relative;
  background: #fff;
  width: 100%;
  box-shadow: 1px 1px #f2f2f2;
  .show-collapse {
    padding: 15px;
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
  .el-dropdown-menu__item--divided {
    margin-top: 0;
  }
}
</style>