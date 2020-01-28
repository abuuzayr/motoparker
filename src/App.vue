<template>
  <div id="app">
    <Header />
    <Map />
    <slideout-panel></slideout-panel>
  </div>
</template>

<script>
import Map from './components/Map.vue'
import Header from './components/Header.vue'
import Panel from './components/Panel.vue'

export default {
  name: 'app',
  components: {
    Map,
    Header
  },
  methods: {
    showPanel() {
    if (this.panelResult) {
      this.panelResult.show();

      return;
    }

    this.panelResult = this.$showPanel({
        component : Panel,
        openOn: 'right',
        width: 400
      })
    }
  },
  mounted() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'setLocation') {
        this.showPanel()
      }
    })
  }
}
</script>

<style>

body {
  margin: 0;
  --gray: #2c3e50;
  --red: #e74c3c;
  --green: #2ecc71;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--gray);
  margin-top: 50px;
}
</style>
