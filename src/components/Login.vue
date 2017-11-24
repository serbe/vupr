<template>
  <div class="container w300">
    <div class="content has-text-centered">
      <h2>Авторизация</h2>
    </div>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <div class="field">
      <label class="label">Имя пользователя</label>
      <div class="control">
        <input class="input" type="text" v-model="name" placeholder="Имя пользователя">
      </div>
    </div>
    <div class="field">
      <label class="label">Пароль</label>
      <div class="control">
        <input class="input" type="password" v-model="pass" placeholder="Пароль" @keyup="onKeyup">
      </div>
    </div>
    <div class="field is-grouped pt10">
      <div class="control">
        <button class="button pl20 is-primary" @click="login">Вход</button>
      </div>
      <div class="control">
        <button class="button pl20 is-light" @click="close">Закрыть</button>
      </div>
    </div>
    <p v-if="error" class="error">Bad login information</p>
  </div>
</template>

<script>
import auth from '@/auth'
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      name: '',
      pass: '',
      error: false
    }
  },
  methods: {
    login () {
      const router = this.$router
      let url = '/login'
      const data = {
        username: this.name,
        password: this.pass
      }
      if (process.env.NODE_ENV === 'development') {
        url = 'http://localhost:9090/login'
      }
      axios({
        url,
        method: 'POST',
        data
      })
        .then((r) => {
          if (r.data.token && r.data.token !== '') {
            auth.login(r.data.token)
            router.push({ name: 'home' })
          }
        })
        .catch(() => {
          // console.log(error);
        })
    },
    close () {
      this.$router.push('/')
    },
    onKeyup (event) {
      if (event.key === 'Enter') {
        this.login()
      }
    }
  }
}
</script>

<style>
.error {
  color: red;
}

.w300 {
  width: 300px !important;
}

.pt10 {
  padding-top: 10px;
}

.pl20 {
  padding-left: 20px;
}
</style>
