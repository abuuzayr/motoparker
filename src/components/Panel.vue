<template>
  <fragment v-if="data">
    <div v-if="location">
      <h2>
        {{ data.name }}
      </h2>
      <table>
        <tr v-for="(value, key) in filteredData" :key="key">
          <td>
            {{ key }}
          </td>
          <td>
            {{ value }}
          </td>
        </tr>
      </table>
    </div>
    <div v-else-if="info">
      <h2>
        {{ data.title }}
      </h2>
      <p v-html="data.content">
      </p>
    </div>
  </fragment>
  <div v-else>
    No data
  </div>
</template>

<script>
import axios from 'axios'
import { Fragment } from 'vue-fragment'
import Privacy from '../data/privacy.json'
import Terms from '../data/terms.json'

const dataToShow = [
  'directions',
  'charges',
  'updatedAt',
]

export default {
  name: 'Panel',
  components: {
    Fragment
  },
  data() {
    return {
      location: this.$store.state.location,
      info: this.$store.state.info,
      data: {}
    }
  },
  methods: {
  },
  computed: {
    filteredData: function () {
      const obj = {}
      Object.keys(this.data).map(key => {
        if (dataToShow.includes(key)) {
          obj[key] = this.data[key]
        }
      })
      return obj
    }
  },
  async mounted() {
    if (this.location) {
      const response = await axios.get(`${process.env.VUE_APP_LOCATION_GET}&id=${this.location}`)
      this.data = response.data.location
    }
    if (this.info) {
      this.data = this.info === 'privacy' ? Privacy : Terms
     }
  }
}
</script>

<style scoped>
h2 {
  line-height: 1.5rem;
  border-bottom: 1px solid var(--gray);
  padding-bottom: 1.5rem;
}
table {
  text-align: left;
  width: calc(100% - 20px);
  margin: 0 10px;
  table-layout: auto;
}

td {
  border-right: 1px solid;
  border-bottom: 1px solid;
  padding: 5px 10px;
}

td:first-child {
  border-left: 1px solid;
  font-weight: bold;
}

tr:first-child td {
  border-top: 1px solid;
}
</style>