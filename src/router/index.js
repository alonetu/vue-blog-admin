import Vue from 'vue';
import Router from 'vue-router';

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
  const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {};
  if(to.path === '/login') {
    sessionStorage.setItem('state', JSON.stringify({}));
    next();
  }else {
    if(!state.user) {
      next('/login');
    }else {
      next();
    }
  }
})

export default router;