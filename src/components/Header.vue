<template>
  <header>
      <div class="left">
        <compass-icon size="1.3x" class="icon"></compass-icon>
        <h2>Motoparker</h2>
      </div>
      <div class="right">
        <a href="#" class="login" v-on:click="login">Sign In</a>
      </div>
  </header>
</template>

<script>
import { CompassIcon } from 'vue-feather-icons'

export default {
  name: 'Header',
  components: {
      CompassIcon
  },
  methods: {
      login: function () {
          alert('Login')
      }
  }
}
</script>

<style scoped>
header {
    height: 30px;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    z-index: 100;
    width: calc(100% - 40px);
    padding: 10px 20px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

header .icon {
    color: #000;
    margin-right: 10px;
}

header .left > * {
    display: inline-block;
}
</style>