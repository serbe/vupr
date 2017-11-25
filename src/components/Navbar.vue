<template>
  <div class="container">
    <nav class="navbar ">
      <div class="navbar-brand">
        <template v-if="user.authenticated">
          <router-link to="/" class="navbar-item" exact>Pr</router-link>
          <!-- <router-link to="/all" class="navbar-item">Все</router-link> -->
          <router-link to="/work" class="navbar-item">Рабочие</router-link>
          <router-link to="/anon" class="navbar-item">Анонимные</router-link>
        </template>
        <router-link v-else to="/login" class="navbar-item">Авторизация</router-link>
        <div class="navbar-burger burger" data-target="navMenu" @click="toggle" :class="active">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenu" class="navbar-menu" :class="active">
        <div class="navbar-start">
          <template v-if="user.authenticated">
            <!-- <router-link to="/sirens" class="navbar-item">Сирены</router-link> -->
          </template>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field">
              <p class="control">
                <a v-if="user.authenticated" class="button navbar-item is-info" @click="logout">Выход</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'vue-navigation',
  data () {
    return {
      active: '',
      tabShow: false,
      user: auth.user
    }
  },
  methods: {
    logout () {
      auth.logout()
      this.$router.push('/login')
    },
    toggle () {
      this.active = this.active === '' ? 'is-active' : ''
    },
    toggleTab () {
      this.tabShow = !this.tabShow
    }
  }
}
</script>

<style scoped>
a.is-active {
  border-bottom: 3px solid #363636;
}
</style>
