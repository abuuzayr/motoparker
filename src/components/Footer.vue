<template>
  <footer>
    <div>
      &copy; 2020 @abuuzayr - 
      scooter icon by <a href="https://www.flaticon.com/authors/freepik" title="Freepik" target="_blank">Freepik</a> 
      via <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">Flaticon</a> 
      <a href="#" @click="setInfo('privacy')"> - Privacy</a> 
      <a href="#" @click="setInfo('terms')"> - Terms of Use</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
    setInfo: function (info) {
      this.$store.dispatch('setInfo', info)
    }
  }
}
</script>

<style scoped>
footer {
  background: rgba(255,255,255,0.6);
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  width: 100%;
  font-size: 10px;
}

footer a {
  color: #333;
  text-decoration: none;
}
</style>