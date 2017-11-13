import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import NotFoundComponent from '@/components/NotFoundComponent';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true, title: 'ЕДДС' },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: 'Авторизация' },
    },
    {
      path: '*',
      name: 'error',
      component: NotFoundComponent,
    },
  ],
});
