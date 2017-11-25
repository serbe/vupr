<template>
  <div class="container">
    <vue-table
      name="Anon"
      :tableData="list"
      tableClasses="is-narrow is-striped fullwidth"
      :rowsPerPage="50"
      pagination
      search
      fullwidth
    ></vue-table>
  </div>
</template>

<script>
import vtable from '@/elements/Table'
import request from '@/request'
import mixin from '@/mixins/funcs'

export default {
  name: 'work',
  mixins: [mixin],
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
    }
  }
}
</script>

<style scoped>
</style>
