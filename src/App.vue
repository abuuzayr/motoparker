<template>
  <div id="app" :class="{ editing: $store.state.edit }">
    <Header />
    <Map :locations="locations" doubleClickZoom="true" />
    <slideout-panel></slideout-panel>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import Map from './components/Map.vue'
import Header from './components/Header.vue'
import Panel from './components/Panel.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Map,
    Header,
    Footer
  },
  data() {
    return {
      locations: []
    }
  },
  methods: {
    showPanel() {
      const panelResult = this.$showPanel({
          component : Panel,
          openOn: 'right',
          width: 400
        })

      // Called when panel is closed
      panelResult.promise
        .then(() => {
          // Reset state & retrieve latest locations
          this.$store.dispatch('setLocation', null)
          this.$store.dispatch('setInfo', '')
          this.$store.dispatch('setEdit', false)
          this.getLocations()
        });
    },
    async getLocations() {
      const response = await axios.get(process.env.VUE_APP_LOCATIONS_GET)
      this.locations = response.data.locations
    }
  },
  async mounted() {
    this.$store.subscribe((mutation) => {
      if (mutation.payload) {
        if (['setLocation', 'setInfo'].includes(mutation.type) && !this.$store.state.edit) {
          this.showPanel()
        }
      }
    })
    this.$store.subscribeAction((action, state) => {
      if (action.type === 'setEdit') {
        if (state.edit && !action.payload) {
          // if moving from editing state -> not editing
          this.getLocations()
          this.toast.goAway(0)
        } else if (action.payload && !state.edit) {
          // if moving from not editing state -> editing
          // show only one marker for the location we are editing
          this.locations = this.locations.filter(location => location._id === this.$store.state.location)
          this.toast = action.payload === 'new' ? this.$toasted.global.newToast() : this.$toasted.global.dragToast()
        }
      }
    })
    await this.getLocations()
  }
}
</script>

<style>

* {
  outline: none;
}

body {
  margin: 0;
  --gray: #2c3e50;
  --light-gray: #f0f1f6;
  --red: #e74c3c;
  --green: #2ecc71;
  --orange: #e67e22;
}

#app {
  font-family: 'Inter', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--gray);
  margin-top: 50px;
}

.toasted-container .toasted.toast {
  font-family: 'Inter', 'Avenir', Helvetica, Arial, sans-serif;
  padding: 0 20px;
  min-height: 30px;
}

#app.editing .slideout-panel-bg {
  display: none;
}

</style>
