<template>
  <div>
    <nav class="pagination is-centered" v-if="max > 1" ref="pagination" :class="sizeClass" role="navigation" aria-label="pagination">
      <a class="pagination-previous" v-if="value > 1" @click="onClick(value - 1)">Назад</a>
      <a class="pagination-next" v-if="value < max" @click="onClick(value + 1)">Далее</a>
      <ul class="pagination-list">
        <li v-if="value !== 1">
          <a class="pagination-link" @click="onClick(1)" aria-label="Goto page 1">1</a>
        </li>
        <li v-if="value > 3">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-if="value > 2">
          <a class="pagination-link" @click="onClick(value - 1)" :aria-label="'Goto page ' + (value - 1)">{{ value - 1 }}</a>
        </li>
        <li>
          <a class="pagination-link is-current" :aria-label="'Goto page ' + value" aria-current="page">{{ value }}</a>
        </li>
        <li v-if="value < max - 1">
          <a class="pagination-link" @click="onClick(value + 1)" :aria-label="'Goto page ' + (value + 1)">{{ value + 1 }}</a>
        </li>
        <li v-if="value < max - 2">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-if="value != max">
          <a class="pagination-link" @click="onClick(max)" :aria-label="'Goto page ' + max">{{ max }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
/* eslint no-bitwise: ["error", { "int32Hint": true }] */
export default {
  name: 'vue-pagination',
  props: {
    allElems: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    size: {
      type: String,
      required: false
    }
  },
  computed: {
    value () {
      if (this.page > this.max) {
        this.onClick(this.max)
      }
      return this.page
    },
    max () {
      if (this.allElems % this.perPage === 0) {
        return this.allElems / this.perPage | 0
      }
      return (this.allElems / this.perPage | 0) + 1
    },
    sizeClass () {
      if (this.size) {
        return `is-${this.size}`
      }
      return ''
    }
  },
  methods: {
    onClick (num) {
      this.$emit('pagination', num)
      window.scrollTo(0, 0)
    }
  }
}
</script>
