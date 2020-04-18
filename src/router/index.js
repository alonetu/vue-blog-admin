import Vue from 'vue';
import Router from 'vue-router';
import { Notification } from 'element-ui'

Vue.use(Router);

const Login = () => import('../views/login.vue')
const MainView = () => import('../views/main-view.vue')
const HomePage = () => import('../views/home-page/home-page.vue')
const UserManage = () => import('../views/user-manage/user-manage.vue')
const BlogManage = () => import('../views/blog-manage/blog-manage.vue')
const PersonCenter = () => import('../views/person-center/person-center')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/main-view',
      name: 'main-view',
      component: MainView,
      children: [
        {
          path: 'home-page',
          name: 'home-page',
          component: HomePage
        },
        {
          path: 'user-manage',
          name: 'user-manage',
          component: UserManage
        },
        {
          path: 'blog-manage',
          name: 'blog-manage',
          component: BlogManage
        },
        {
          path: 'person-center',
          name: 'person-center',
          component: PersonCenter
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
  const user = JSON.parse(sessionStorage.getItem('user'));
  if(to.path === '/login') {
    sessionStorage.setItem('user', JSON.stringify({}));
    next();
  }else {
    if(!user.user_name) {
      next('/login');
    }else {
      next();
    }
  }
})

export default router;