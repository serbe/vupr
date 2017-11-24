<template>
  <div class="container">
    <div>
      <nav class="level is-mobile">
        <div class="level-left">
          <p class="level-item">
            <!-- <a class="button" :href="'/' + this.name + '/0'">Добавить</a> -->
          </p>
        </div>
        <div class="level-rigth">
          <p class="level-item">
            <span class="select">
              <select v-model="perPage">
                <option>100</option>
                <option>200</option>
                <option>500</option>
                <option>1000</option>
              </select>
            </span>
          </p>
        </div>
      </nav>
      <p class="control mb1">
        <input class="input is-expanded" type="search" placeholder="Поиск" v-model="query" autofocus>
      </p>
      <!-- <vue-pagination v-if="pagination" :page="page" :allElems="all" :perPage="perPage" @pagination="filter"></vue-pagination> -->
      <table class="table is-narrow center-table">
        <thead>
          <tr>
            <th class="has-text-centered">#</th>
            <th class="has-text-centered">Host</th>
            <th class="has-text-centered">Port</th>
            <th class="has-text-centered">Response</th>
            <th class="has-text-centered">Work</th>
            <th class="has-text-centered">Anon</th>
            <th class="has-text-centered">Create</th>
            <th class="has-text-centered">Update</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(proxy, key) in list" v-bind:key="key">
            <td class="has-text-centered">{{ key }}</td>
            <td class="has-text-centered">{{ proxy.host }}</td>
            <td class="has-text-centered">{{ proxy.port }}</td>
            <td class="has-text-right">{{ proxy.response }}</td>
            <td class="has-text-centered">{{ proxy.work }}</td>
            <td class="has-text-centered">{{ proxy.anon }}</td>
            <td class="has-text-centered">{{ proxy.create }}</td>
            <td class="has-text-centered">{{ proxy.update }}</td>
          </tr>
        </tbody>
      </table>
      <!-- <vue-pagination v-if="pagination" :page="page" :allElems="all" :perPage="perPage" @pagination="filter"></vue-pagination> -->
    </div>

  </div>
</template>

<script>
import request from '@/request'

export default {
  name: 'work',
  // components: {
  //   'vue-pagination': pagination,
  //   'vue-cell': cell,
  // },
  data () {
    return {
      query: '',
      page: 1,
      perPage: 500,
      fetched: false,
      list: []
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    $route () {
      this.fetchData()
    }
    // $router() {
    //   console.log(this.$route.params)
    // }
  },
  methods: {
    fetchData () {
      if (!this.fetched) {
        request({
          url: 'proxies/anon',
          method: 'GET'
        })
          .then((r) => {
            this.list = this.createList(r.data.proxies)
            this.fetched = true
          })
      }
    },
    createList (proxies) {
      let list = []
      if (proxies) {
        list = proxies.map((proxy) => {
          const str = [
            proxy.host,
            proxy.port,
            proxy.response,
            proxy.work,
            proxy.anon,
            proxy.checks,
            proxy.create,
            proxy.update
          ]
          const nc = proxy
          nc.response = this.responseStr(nc.response)
          nc.str = str.join(' ').toLowerCase()
          return nc
        })
      }
      return list
    },
    responseStr (r) {
      let s = ''
      if (r > 1000000000) {
        s = (r / 1000000000).toFixed(2) + 's'
      } else if (r > 1000000) {
        s = (r / 1000000).toFixed(0) + 'ms'
      } else if (r > 1000) {
        s = (r / 1000).toFixed(0) + 'µs'
      } else {
        s = r + 'ns'
      }
      return s
    }
  }
}
</script>

<style scoped>
</style>
