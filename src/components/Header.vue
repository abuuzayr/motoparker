<template>
  <header>
    <div class="left">
        <img src="../assets/logo.png" class="icon">
      <h2>Motoparker</h2>
      <img src="../assets/sg.svg" class="icon flag">
    </div>
    <div class="right">
      <div class="mobile-hide">
        <div @click="addLocation">
          <font-awesome-icon :icon="['fas', 'plus']" size="1x" class="icon" />
          Add
        </div>
        <font-awesome-icon :icon="['fas', 'toggle-on']" size="2x" class="icon ura" @click="removeFilter('ura')" v-if="this.$store.state.filters.includes('ura')"/>
        <font-awesome-icon :icon="['fas', 'toggle-off']" size="2x" class="icon" @click="addFilter('ura')" v-else/>
        URA
        <font-awesome-icon :icon="['fas', 'toggle-on']" size="2x" class="icon free" @click="removeFilter('free')" v-if="this.$store.state.filters.includes('free')"/>
        <font-awesome-icon :icon="['fas', 'toggle-off']" size="2x" class="icon" @click="addFilter('free')" v-else/>
        Free
        <a href="#" class="login mobile-hide" @click="login" v-if="!this.$store.state.user">
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" size="1x" class="icon" v-if="!this.$store.state.user" />
          Sign In
        </a>
        <a href="#" class="login logged-in" @click="logout" v-else>
          {{name}}
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" size="1x" class="icon" @click="logout" />
        </a>
      </div>
      <font-awesome-icon :icon="['fas', 'bars']" size="lg" class="mobile-only icon" @click="showMenu" />
      <a href="https://github.com/abuuzayr/motoparker" target="_blank">
        <font-awesome-icon :icon="['fab', 'github']" size="2x" class="icon"/>
      </a>
    </div>
    <modal 
      name="menu"
      transition="fade"
      width="150"
      height="auto"
      :pivotY="pivotY"
    >
      <div class="menu">
        <div @click="addLocation">
          <font-awesome-icon :icon="['fas', 'plus']" size="1x" class="icon" />
          Add
        </div>
        <div>
          <font-awesome-icon :icon="['fas', 'toggle-on']" size="2x" class="icon ura" @click="removeFilter('ura')" v-if="this.$store.state.filters.includes('ura')"/>
          <font-awesome-icon :icon="['fas', 'toggle-off']" size="2x" class="icon" @click="addFilter('ura')" v-else/>
          URA
        </div>
        <div>
          <font-awesome-icon :icon="['fas', 'toggle-on']" size="2x" class="icon free" @click="removeFilter('free')" v-if="this.$store.state.filters.includes('free')"/>
          <font-awesome-icon :icon="['fas', 'toggle-off']" size="2x" class="icon" @click="addFilter('free')" v-else/>
          Free
        </div>
        <div v-if="!this.$store.state.user">
          <a href="#" class="login" @click="login">
            <font-awesome-icon :icon="['fas', 'sign-in-alt']" size="1x" class="icon" v-if="!this.$store.state.user" />
            Sign In
          </a>
        </div>
        <div v-else>
          <a href="#" class="login logged-in name" @click="logout">
            <span>{{name}}</span>
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" size="lg" class="icon" @click="logout" />
          </a>
        </div>
      </div>
    </modal>
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
        <p>This step is only for spam protection. Only your name will appear on locations if you edit or create them.</p>
      </div>
    </modal>
  </header>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faMotorcycle,
  faToggleOn,
  faToggleOff,
  faSignInAlt,
  faSignOutAlt,
  faBars,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faGithub,
  faMotorcycle,
  faToggleOn,
  faToggleOff,
  faGoogle,
  faFacebookF,
  faSignInAlt,
  faSignOutAlt,
  faBars,
  faPlus
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
      authToken: false,
      menu: false
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
    },
    pivotY: function () {
      return 75 / window.innerHeight
    }
  },
  methods: {
      login() {
          this.$modal.show('login')
      },
      logout() {
        if (confirm('Do you want to log out?')) {
          var a = document.createElement("a")
          a.setAttribute("href", this.logoutPath)
          a.style.display = "none"
          a.rel = "noreferrer noopener"
          document.body.appendChild(a)
          a.click()
        }
      },
      addFilter(filter) {
        this.$store.dispatch('addFilter', filter)
      },
      removeFilter(filter) {
        this.$store.dispatch('removeFilter', filter)
      },
      showMenu() {
          this.$modal.show('menu')
      },
      addLocation() {
        this.$modal.hide('menu')
        if (this.$store.state.user) {
          this.$store.dispatch('setEdit', 'new')
        } else {
          this.login()
        }        
      }
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
      if (response && response.data && response.data[0]) {
        this.$store.dispatch('setUser', {
          ...response.data[0],
          authToken: this.authToken
        })
      }
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

header .right .mobile-hide > div {
  display: inline-block;
  cursor: pointer;
  margin: 0 5px;
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

.login.logged-in .icon {
  margin-left: 10px;
  margin-right: 0;
  color: var(--gray);
}

.login .icon {
  color: #fff;
  margin: 0 10px 0 0;
}

.login:hover .icon {
  color: var(--gray);
}

.inner {
  padding: 0 20px 20px;
  text-align: center;
}

.inner p {
  font-size: 10px;
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

.flag {
  -webkit-box-shadow: 1px 1px 1px 0px rgba(200,200,200,1);
  -moz-box-shadow: 1px 1px 1px 0px rgba(200,200,200,1);
  box-shadow: 1px 1px 1px 0px rgba(200,200,200,1);
  width: 20px;
}

header .icon.ura {
  color: var(--orange);
}

header .icon.free {
  color: var(--green);
}

.menu {
  text-align: center;
  height: 200px;
}

.menu > div {
  padding: 10px 0;
  border-bottom: 1px solid var(--light-gray);
}

.menu .login {
  margin: 0;
  color: var(--gray);
  background: none;
  padding: 10px;
  border: none;
  line-height: 32px;
}

.menu .login .icon {
  color: var(--gray);
}

.menu .name span {
  max-width: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}

.menu .name .icon {
  display: inline-block;
}

@media screen and (max-width: 599px) {
  .mobile-hide {
    display: none !important;
  }
}

@media screen and (min-width: 600px) {
  .mobile-only {
    display: none !important;
  }
}

</style>

<style>
.v--modal-overlay[data-modal="menu"] {
  background: transparent;
}

@media screen and (min-width: 600px) {
  .v--modal-overlay[data-modal="menu"] {
    display: none;
  }
}
</style>