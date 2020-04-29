<template>
  <el-menu
    :default-active="defaultPage"
    :unique-opened=true
    :collapse="isCollapse"
    class="el-menu-sidebar"
    background-color="#1f2d3d"
    text-color="#fff"
    active-text-color="#1890ff"
    router
  >
    <el-menu-item class="menu-sidebar-head">
      <span slot="title">vue-blog-admin</span>
    </el-menu-item>
    <template v-for="menu in sideMenu">
      <el-submenu
        v-if="menu.children && menu.children.length !== 0"
        :index="menu.path"
        :key="menu.path"
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.label }}</span>
        </template>
        <el-menu-item
          v-for="childMenu in menu.children"
          :key="childMenu.path"
          :index="childMenu.path"
        >
          <i :class="childMenu.icon"></i>
          <span slot="title">{{ childMenu.label }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        v-else
        :index="menu.path"
        :key="menu.path"
        @click="activePage(menu)"
      >
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.label }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import {getAllOpenPage} from '@/utils/'

export default {
  name: 'sidebar',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    routerPath: {
      type: String,
      default: '/home-page'
    }
  },
  watch: {
    routerPath: {
      handler(val) {
        this.defaultPage = val;
      },
      deep: true
    },
    $route() {
      this.defaultPage = window.location.pathname;
    }
  },
  mounted() {
    // 如果sessionStorage中保存了所有打开的页面，则从sessionStage中取值
    this.allOpenPage = getAllOpenPage();
    this.defaultPage = window.location.pathname;
  },
  data() {
    return {
      defaultPage: '',
      sideMenu: [
        {
          icon: 'el-icon-data-analysis',
          label: '首页',
          path: '/home-page'
        },
        {
          icon: 'el-icon-edit-outline',
          label: '写博客',
          path: '/write-blog'
        },
        {
          icon: 'el-icon-search',
          label: '查询博客',
          path: '/search-blog'
        },
        {
          icon: 'el-icon-setting',
          label: '用户管理',
          path: '/user-manage'
        },
        {
          icon: 'el-icon-lock',
          label: '权限配置',
          path: '/access-config'
        },
        {
          icon: 'el-icon-user',
          label: '个人中心',
          path: '/person-center'
        }
      ],
      allOpenPage: [{
        icon: 'el-icon-data-analysis',
        label: '首页',
        path: '/home-page'
      }]
    }
  },
  methods: {
    /**
     * 路由跳转, 保存已打开页面到vuex中
     */
    activePage(menu) {
      if(menu.label === '首页') { return }
      const index = this.allOpenPage.findIndex(item => item.label === menu.label);
      if(-1 === index) {
        this.allOpenPage.push(menu);
      }
      this.$store.commit('allOpenPage', this.allOpenPage);
    }
  }
}
</script>

<style lang="scss">
.el-menu-sidebar {
  height: 100%;
  .menu-sidebar-head{
    height: 60px;
    line-height: 60px;
    margin-bottom: 2px;
    &:hover {
      background: transparent;
    }
  }
}
</style>