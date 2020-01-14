<template>
  <header>
      <div class="left">
        <font-awesome-icon icon="motorcycle" size="2x" class="icon"/>
        <h2>Motoparker</h2>
      </div>
      <div class="right">
        <a href="#" class="login" v-on:click="login">Sign In</a>
        <a href="https://github.com/abuuzayr/motoparker" target="_blank">
          <font-awesome-icon :icon="['fab', 'github']" size="2x" class="icon"/>
        </a>
      </div>
  </header>
</template>

<script>
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faGithub,
  faMotorcycle
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  name: 'Header',
  components: {
      FontAwesomeIcon
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
    color: var(--gray);
    margin: 0 10px;
    vertical-align: middle;
}

header .left,
header .right {
    display: flex;
    align-items: center;
}

</style>