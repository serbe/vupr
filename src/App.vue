<template>
  <div id="app">
    <vue-navbar></vue-navbar>
    <section class="section pt1">
      <router-view></router-view>
    </section>
    <footer class="footer bot">
      <div class="container">
        <div class="content has-text-centered">© 2017 Сочи</div>
      </div>
    </footer>
  </div>
</template>

<script>
import vnavbar from '@/components/Navbar';

export default {
  name: 'app',
  components: {
    'vue-navbar': vnavbar,
  },
};
</script>

<style>
@import "~bulma/css/bulma.css";
</style>
