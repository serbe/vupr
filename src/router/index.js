import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import All from '@/components/All'
import Work from '@/components/Work'
import Anon from '@/components/Anon'
import Login from '@/components/Login'
import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router)

export default new Router({
  hashbang: false,
  linkActiveClass: 'is-active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true, title: 'Home' }
    },
    {
      path: '/all',
      name: 'all',
      component: All,
      meta: { requiresAuth: true, title: 'All' }
    },
    {
      path: '/work',
      name: 'work',
      component: Work,
      meta: { requiresAuth: true, title: 'Work' }
    },
    {
      path: '/anon',
      name: 'anon',
      component: Anon,
      meta: { requiresAuth: true, title: 'Anon' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: 'Авторизация' }
    },
    {
      path: '*',
      name: 'error',
      component: NotFoundComponent
    }
  ]
})
