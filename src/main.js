import Vue from 'vue';
import App from './App';
import router from './router';
import auth from './auth';

Vue.config.productionTip = false;

auth.checkAuth();

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.title)) {
    document.title = to.meta.title;
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isAuth()) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
