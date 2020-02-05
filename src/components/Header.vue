<template>
  <header>
      <div class="left">
          <img src="../assets/logo.png" class="icon">
        <h2>Motoparker</h2>
      </div>
      <div class="right">
        <font-awesome-icon :icon="['fas', 'toggle-on']" size="2x" class="icon" @click="removeFilter('hdb')" v-if="this.$store.state.filters.includes('hdb')"/>
        <font-awesome-icon :icon="['fas', 'toggle-off']" size="2x" class="icon" @click="addFilter('hdb')" v-else/>
        HDB
        <font-awesome-icon :icon="['fas', 'toggle-on']" size="2x" class="icon" @click="removeFilter('ura')" v-if="this.$store.state.filters.includes('ura')"/>
        <font-awesome-icon :icon="['fas', 'toggle-off']" size="2x" class="icon" @click="addFilter('ura')" v-else/>
        URA
        <font-awesome-icon :icon="['fas', 'toggle-on']" size="2x" class="icon" @click="removeFilter('free')" v-if="this.$store.state.filters.includes('free')"/>
        <font-awesome-icon :icon="['fas', 'toggle-off']" size="2x" class="icon" @click="addFilter('free')" v-else/>
        Free
        <a href="#" class="login" @click="login" v-if="!this.$store.state.user">Sign In</a>
        <a href="#" class="login logged-in" @click="logout" v-else>{{name}}</a>
        <a href="https://github.com/abuuzayr/motoparker" target="_blank">
          <font-awesome-icon :icon="['fab', 'github']" size="2x" class="icon"/>
        </a>
      </div>
    <modal 
      name="login" 
      transition="fade"
      width="300"
      height="auto"
    >
      <div class="inner">
        <h3>Login to contribute</h3>
        <a class="social-login fb" 
          :href="fbLogin"
          rel="noreferrer noopener">
          <font-awesome-icon :icon="['fab', 'facebook-f']" size="1x" class="icon"/>
          Sign in with Facebook
        </a>
        <a class="social-login google" 
          :href="googleLogin"
          rel="noreferrer noopener">
          <font-awesome-icon :icon="['fab', 'google']" size="1x" class="icon"/>
          Sign in with Google
        </a>
      </div>
    </modal>
  </header>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMotorcycle, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faGithub,
  faMotorcycle,
  faToggleOn,
  faToggleOff,
  faGoogle,
  faFacebookF
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  name: 'Header',
  components: {
      FontAwesomeIcon
  },
  data() {
    return {
      filter: null,
      fbLogin: process.env.VUE_APP_PRE_LOGIN_PATH + 'login/facebook' + process.env.VUE_APP_POST_LOGIN_PATH,
      googleLogin: process.env.VUE_APP_PRE_LOGIN_PATH + 'login/google' + process.env.VUE_APP_POST_LOGIN_PATH,
      logoutPath: process.env.VUE_APP_PRE_LOGIN_PATH + 'logout' + process.env.VUE_APP_POST_LOGOUT_PATH,
      authToken: false
    }
  },
  computed: {
    name: function () {
      if (this.$store.state.user) {
        const { provider_name, user_claims, user_id } = this.$store.state.user
        if (provider_name === 'facebook') {
          return user_claims
            .filter(claim => claim.typ === 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name')[0]
            .val
        }
        if (provider_name === 'google') {
          return user_claims.filter(claim => claim.typ === 'name')[0].val
        }
        return user_id
      }
      return false
    }
  },
  methods: {
      login: function () {
          this.$modal.show('login')
      },
      logout: function () {
        if (confirm('Do you want to log out?')) {
          window.location = this.logoutPath
        }
      },
      addFilter: function (filter) {
        this.$store.dispatch('addFilter', filter)
      },
      removeFilter: function (filter) {
        this.$store.dispatch('removeFilter', filter)
      },
  },
	async mounted() {
    const url = new URL(window.location)
    if (url.searchParams.get('logged-in') === 'true') {
      if (url.hash && url.hash.includes('#token=')) {
        this.authToken = JSON.parse(decodeURI(url.hash.split('#token=')[1]).replace(/%3A/g,':').replace(/%2C/g,',')).authenticationToken
      }
    }
    try {
      const response = await axios.get(`${process.env.VUE_APP_PRE_LOGIN_PATH}me`, {
        headers: {'X-ZUMO-AUTH': this.authToken},
      })
      this.$store.dispatch('setUser', response && response.data && response.data[0])
    } catch (e) {
      this.$store.dispatch('setUser', null)
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
    max-width: 30px;
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

.login.logged-in {
  color: var(--gray);
  background: none;
  border-top: none;
  border-right: none;
  border-left: none;
}

.inner {
  padding: 0 20px 20px;
  text-align: center;
}

.social-login {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px 10px;
  border: 1px solid;
  margin-bottom: 10px;
  text-decoration: none;
  color: #fff;
}

.social-login.fb {
  background: #3b5998;
  border-color: #3b5998;
}

.social-login.fb:hover,
.social-login.fb:hover .icon {
  color: #3b5998;
  background: #fff;
}

.social-login.google {
  background: #de5246;
  border-color: #de5246;
}

.social-login.google:hover,
.social-login.google:hover .icon {
  color: #de5246;
  background: #fff;
}

.social-login .icon {
  color: #fff;
  vertical-align: middle;
}

</style>