import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);

const Login = () => import('@/views/login')
const MainView = () => import('@/views/main-view')
const HomePage = () => import('@/views/home-page/home-page')
const WriteBlog = () => import('@/views/write-blog/write-blog')
const SearchBlog = () => import('@/views/search-blog/search-blog')
const ArticleDetail = () => import('@/views/article-detail/article-detail')
const UserManage = () => import('@/views/user-manage/user-manage')
const PersonCenter = () => import('@/views/person-center/person-center')
const AccessConfig = () => import('@/views/access-config/access-config')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'main-view',
      component: MainView,
      children: [
        {
          path: 'home-page',
          name: 'home-page',
          component: HomePage,
          meta: { title: '首页' }
        },
        {
          path: 'write-blog',
          name: 'write-blog',
          component: WriteBlog,
          meta: { title: '写博客' }
        },
        {
          path: 'search-blog',
          name: 'search-blog',
          component: SearchBlog,
          meta: { title: '查询博客' }
        },
        {
          path: 'user-manage',
          name: 'user-manage',
          component: UserManage,
          meta: { title: '用户管理' }
        },
        {
          path: 'person-center',
          name: 'person-center',
          component: PersonCenter,
          meta: { title: '个人中心' }
        },
        {
          path: 'access-config',
          name: 'access-config',
          component: AccessConfig,
          meta: { title: '权限配置' }
        }
      ]
    },
    {
      path: '/article-detail/:id',
      name: 'article-detail',
      component: ArticleDetail,
      meta: { title: '文章详情页' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})
router.afterEach((to, from) => {
  NProgress.done();
})

export default router;