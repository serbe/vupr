import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import All from '@/components/All';
import Login from '@/components/Login';
import NotFoundComponent from '@/components/NotFoundComponent';

Vue.use(Router);

export default new Router({
  hashbang: false,
  linkActiveClass: 'is-active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true, title: 'Home' },
    },
    {
      path: '/all',
      name: 'all',
      component: All,
      meta: { requiresAuth: true, title: 'All' },
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
