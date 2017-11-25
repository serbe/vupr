<template>
  <div>
    <nav class="level is-mobile">
      <div class="level-left">
        <p class="level-item">
          <p class="control mb1" v-if="search">
            <input class="input is-expanded" type="search" placeholder="Поиск" v-model="query" autofocus>
          </p>
        </p>
      </div>
      <div class="level-rigth">
        <p class="level-item">
          <span class="select">
            <select v-model="rowsSelect">
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
              <option>100</option>
            </select>
          </span>
        </p>
      </div>
    </nav>
    <vue-pagination class="mb1" v-if="pagination" :page="page" :allElems="all" :perPage="perPage" @pagination="filter"></vue-pagination>
    <table class="table center-table" :class="tableClass">
      <thead>
        <tr>
          <th class="has-text-centered">ID</th>
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
        <tr v-for="(item, key) in rows" v-bind:key="key">
          <td class="has-text-centered">{{ item.id }}</td>
          <td class="has-text-centered">{{ item.host }}</td>
          <td class="has-text-centered">{{ item.port }}</td>
          <td class="has-text-centered">{{ item.response }}</td>
          <td class="has-text-centered">{{ item.work }}</td>
          <td class="has-text-centered">{{ item.anon }}</td>
          <td class="has-text-centered">{{ item.create }}</td>
          <td class="has-text-centered">{{ item.update }}</td>
        </tr>
      </tbody>
    </table>
    <vue-pagination class="mt1" v-if="pagination" :page="page" :allElems="all" :perPage="perPage" @pagination="filter"></vue-pagination>
  </div>
</template>

<script>
import pagination from '@/elements/Pagination'

export default {
  name: 'vue-table',
  components: {
    'vue-pagination': pagination
  },
  data () {
    return {
      query: '',
      page: 1,
      rowsSelect: 50
    }
  },
  props: {
    tableClasses: {
      type: String,
      required: false
    },
    headClasses: {
      type: Array,
      required: false
    },
    cellClasses: {
      type: Array,
      required: false
    },
    tableData: {
      type: Array,
      required: true
    },
    search: {
      type: Boolean,
      default: false,
      required: false
    },
    pagination: {
      type: Boolean,
      default: false,
      required: false
    },
    rowsPerPage: {
      type: Number,
      default: 50,
      required: false
    }
  },
  computed: {
    rows () {
      let result = []
      if (this.filtered) {
        const tp = this.page
        const pp = this.perPage
        result = this.filtered.filter((c, i) => i >= (tp - 1) * pp && i < tp * pp)
      }
      return result
    },
    all () {
      return this.filtered ? this.filtered.length : 0
    },
    filtered () {
      if (this.tableData) {
        const queryArr = this.query.toLowerCase().split(' ')
        return this.tableData.filter(f => queryArr.every(q => f.str.includes(q)))
      }
      return []
    },
    tableClass () {
      return this.tableClasses ? this.tableClasses : ''
    },
    perPage () {
      return Number(this.rowsSelect)
    }
  },
  mounted () {
    if (this.pagination && this.rowsPerPage > 0 && this.rowsPerPage !== this.rowsSelect) {
      this.rowsSelect = this.rowsPerPage
    }
  },
  methods: {
    headClass (index) {
      return this.headClasses ? this.headClasses[index] : ''
    },
    cellClass (index) {
      return this.cellClasses ? this.cellClasses[index] : this.headClass(index)
    },
    cellType (index) {
      return this.cellTypes ? this.cellTypes[index] : ''
    },
    filter (num) {
      if (num !== this.page) {
        this.page = num
      }
    }
  },
  watch: {
    query (val) {
      this.query = val
      this.page = 1
    }
  }
}
</script>

<style scoped>
.link {
  cursor: pointer !important;
}

.mb1 {
  margin-bottom: 1rem;
}

.mt1 {
  margin-top: 1rem;
}

/*.fixed_table {*/
  /*table-layout: fixed !important;*/
/*}*/

.center-table {
  margin: auto;
}

.fullwidth {
  width: 100%;
}

.nowrap {
  white-space: nowrap;
}
</style>
