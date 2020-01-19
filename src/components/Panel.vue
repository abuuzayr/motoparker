<template>
  <div v-if="data">
    <h1>
      {{ data.name }}
    </h1>
    <div>
      directions: {{ data.directions }}
    </div>
    <div>
      charges: {{ data.charges }}
    </div>
    <div>
      ura: {{ data.ura }}
    </div>
    <div>
      hdb: {{ data.hdb }}
    </div>
    <div>
      free: {{ data.free }}
    </div>
    <div>
      lat: {{ data.lat }}
    </div>
    <div>
      lng: {{ data.lng }}
    </div>
    <div>
      createdAt: {{ data.createdAt }}
    </div>
    <div>
      updatedAt: {{ data.updatedAt }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Panel',
  components: {
  },
  data() {
    return {
      location: this.$store.state.location,
      data: {}
    }
  },
  methods: {
  },
  async mounted() {
    if (this.location) {
      const response = await axios.get(`/location/${this.location}`)
      this.data = response.data.location
    }
  }
}
</script>

<style scoped>
</style>