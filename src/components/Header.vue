<template>
  <header>
      <div class="left">
        <font-awesome-icon icon="motorcycle" size="2x" class="icon"/>
        <h2>Motoparker</h2>
      </div>
      <div class="right">
        <font-awesome-icon :icon="['fas', 'toggle-on']" size="2x" class="icon" @click="removeFilter('gov')" v-if="this.$store.state.filters.includes('gov')"/>
        <font-awesome-icon :icon="['fas', 'toggle-off']" size="2x" class="icon" @click="addFilter('gov')" v-else/>
        HDB/URA
        <font-awesome-icon :icon="['fas', 'toggle-on']" size="2x" class="icon" @click="removeFilter('free')" v-if="this.$store.state.filters.includes('free')"/>
        <font-awesome-icon :icon="['fas', 'toggle-off']" size="2x" class="icon" @click="addFilter('free')" v-else/>
        Free
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
import { faMotorcycle, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faGithub,
  faMotorcycle,
  faToggleOn,
  faToggleOff
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  name: 'Header',
  components: {
      FontAwesomeIcon
  },
  data() {
    return {
      filter: null
    }
  },
  methods: {
      login: function () {
          alert('Login')
      },
      addFilter: function (filter) {
        this.$store.dispatch('addFilter', filter)
      },
      removeFilter: function (filter) {
        this.$store.dispatch('removeFilter', filter)
      },
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

.login {
  border: 2px solid var(--gray);
  padding: 3px 5px;
  margin: 0 5px 0 15px;
  text-decoration: none;
  color: #fff;
  background: var(--gray);
  font-weight: bold;
}

.login:hover {
  color: var(--gray);
  background: #fff;
}

</style>