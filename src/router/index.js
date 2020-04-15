import Vue from 'vue';
import Router from 'vue-router';
import { Notification } from 'element-ui'

Vue.use(Router);

const Login = () => import('../views/login.vue')
const MainView = () => import('../views/main-view.vue')
const HomePage = () => import('../views/home-page/home-page.vue')
const UserManage = () => import('../views/user-manage/user-manage.vue')
const BlogManage = () => import('../views/blog-manage/blog-manage.vue')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
        }
      ]
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   if (to.meta.auth) {
//     Notification({
//       type: 'warning',
//       title: '需要认证'
//     });
//     next(false)
//   } else {
//     next();
//   }
// })

export default router;