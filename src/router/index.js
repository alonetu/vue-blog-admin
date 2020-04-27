import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Login = () => import('@/views/login')
const MainView = () => import('@/views/main-view')
const HomePage = () => import('@/views/home-page/home-page')
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
      path: '*',
      redirect: '/login'
    }
  ]
})
router.beforeEach((to, from, next) => {
  next();
})

export default router;