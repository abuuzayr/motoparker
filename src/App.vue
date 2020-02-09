<template>
  <div id="app">
    <Header />
    <Map />
    <slideout-panel></slideout-panel>
    <Footer />
  </div>
</template>

<script>
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
  methods: {
    showPanel() {
      const panelResult = this.$showPanel({
          component : Panel,
          openOn: 'right',
          width: 400
        })

      panelResult.promise
        .then(() => {
          this.$store.dispatch('setLocation', null)
          this.$store.dispatch('setInfo', '')
        });
    }
  },
  mounted() {
    this.$store.subscribe((mutation) => {
      if (mutation.payload) {
        if (mutation.type === 'setLocation' || mutation.type === 'setInfo') {
          this.showPanel()
        }
      }
    })
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

</style>
