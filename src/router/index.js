import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);

const router = new Router({
  // mode: 'history', // 路由history模式
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'main-view',
      component: () => import('@/views/main-view'),
      children: [
        {
          path: 'home-page',
          name: 'home-page',
          component: () => import('@/views/home-page/home-page'),
          meta: { title: '首页' }
        },
        {
          path: 'write-blog',
          name: 'write-blog',
          component: () => import('@/views/write-blog/write-blog'),
          meta: { title: '写博客' }
        },
        {
          path: 'search-blog',
          name: 'search-blog',
          component: () => import('@/views/search-blog/search-blog'),
          meta: { title: '查询博客' }
        },
        {
          path: 'user-manage',
          name: 'user-manage',
          component: () => import('@/views/user-manage/user-manage'),
          meta: { title: '用户管理' }
        },
        {
          path: 'person-center',
          name: 'person-center',
          component: () => import('@/views/person-center/person-center'),
          meta: { title: '个人中心' }
        },
        {
          path: 'access-config',
          name: 'access-config',
          component: () => import('@/views/access-config/access-config'),
          meta: { title: '权限配置' }
        }
      ]
    },
    {
      path: '/article-detail/:id',
      name: 'article-detail',
      component: () => import('@/views/article-detail/article-detail'),
      meta: { title: '文章详情页' }
    }
  ]
})

// 路由导航守卫 前置导航
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})

// 路由导航守卫 后置导航
router.afterEach((to, from) => {
  NProgress.done();
})

export default router;