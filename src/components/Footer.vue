<template>
  <footer>
    <div>
      &copy; 2020 Muhammad Fawwaz - 
      motorcycle icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">Flaticon</a></div>
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
  font-size: 0.6rem;
}

footer a {
  color: #333 !important;
  text-decoration: none;
}
</style>