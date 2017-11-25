<template>
  <div class="container">
    <vue-table
      name="Anon"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :headClasses="['', 'is-hidden-mobile', '', 'nowrap']"
      pagination
      search
      fullwidth
    ></vue-table>
  </div>
</template>

<script>
import vtable from '@/elements/Table'
import request from '@/request'

export default {
  name: 'work',
  components: {
    'vue-table': vtable
  },
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
