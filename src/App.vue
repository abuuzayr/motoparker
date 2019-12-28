<template>
  <div id="app">
    <Header />
    <Map />
  </div>
</template>

<script>
import Map from './components/Map.vue'
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    Map,
    Header
  }
}
</script>

<style>

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}
</style>
