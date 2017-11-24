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
            <th>#</th>
            <th>Host</th>
            <th>Port</th>
            <th>Response</th>
            <th>Work</th>
            <th>Anon</th>
            <th>Create</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(proxy, key) in list" v-bind:key="key">
              <td>{{ key }}</td>
              <td>{{ proxy.host }}</td>
              <td>{{ proxy.port }}</td>
              <td>{{ proxy.response }}</td>
              <td>{{ proxy.work }}</td>
              <td>{{ proxy.anon }}</td>
              <td>{{ proxy.create }}</td>
              <td>{{ proxy.update }}</td>
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
          url: 'proxies/work',
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
          nc.str = str.join(' ').toLowerCase()
          return nc
        })
      }
      return list
    }
  }
}
</script>

<style scoped>
</style>
