<template>
  <div class="container">
    <div class="content has-text-centered">
      <div class="columns">
        <div class="column is-half">
          <table v-if="educationsFetched" class="table">
            <tbody>
              <tr v-for="(item, index) in educationsList" v-bind:key="index" :class="trClass(item.start_date)">
                <td><a :href="'/education/' + item.id">{{ tinyDate(item.start_date) }}</a></td>
                <td><a :href="'/contact/' + item.contact_id">{{ item.contact_name }}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column">
          <table v-if="practicesFetched" class="table">
            <tbody>
              <tr v-for="(item, index) in practicesList" v-bind:key="index" :class="trClass(item.date_of_practice)">
                <td><a :href="'/practice/' + item.id">{{ tinyDate(item.date_of_practice) }}</a></td>
                <td><a :href="'/practice/' + item.id">{{ item.kind_short_name }}</a></td>
                <td><a :href="'/company/' + item.company_id">{{ item.company_name }}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '@/auth';
import request from '@/request';

export default {
  name: 'home',
  data() {
    return {
      practicesFetched: false,
      educationsFetched: false,
      practicesList: [],
      educationsList: [],
      user: auth.user,
    };
  },
  created() {
    this.fetchPractices();
    this.fetchEducations();
  },
  methods: {
    fetchPractices() {
      if (this.user.authenticated && !this.fetched) {
        request({
          url: 'practices/near',
          method: 'GET',
        })
          .then((r) => {
            this.practicesList = r.data.practices;
            this.practicesFetched = true;
          });
      }
    },
    fetchEducations() {
      if (this.user.authenticated && !this.fetched) {
        request({
          url: 'educations/near',
          method: 'GET',
        })
          .then((r) => {
            this.educationsList = r.data.educations;
            this.educationsFetched = true;
          });
      }
    },
    trClass(date) {
      const m = new Date();
      const d = new Date(date);
      if (d < m) {
        return 'is-success';
      }
      m.setMonth(m.getMonth() + 1);
      if (d < m) {
        return 'is-danger';
      }
      return 'is-warning';
    },
    tinyDate(date) {
      if (date.length === 10) {
        return `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(2, 4)}`;
      }
      return date;
    },
  },
};
</script>

<style scoped>
tr.is-success {
  background-color: #23d160;
  color: #fff;
}

tr.is-warning {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

tr.is-danger {
  background-color: #ff3860;
  color: #fff;
}
</style>
