import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import 'mapbox-gl/dist/mapbox-gl.css'
import VueSlideoutPanel from 'vue2-slideout-panel'
import VModal from 'vue-js-modal'
import Toasted from 'vue-toasted';

// Load Inter typeface
require('typeface-inter')

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueSlideoutPanel);
Vue.use(VModal)
Vue.use(Toasted, {
  position: 'top-center',
  duration: 3000,
  theme: 'toasted-primary',
  className: 'toast'
})

const store = new Vuex.Store({
  state: {
    location: null,
    filters: ['free'],
    user: null,
    info: '',
    edit: false
  },
  mutations: {
    setLocation: (state, location) => state.location = location,
    addFilter: (state, filter) => state.filters = [...new Set([...state.filters, filter])],
    removeFilter: (state, filter) => state.filters = state.filters.filter(f => f !== filter),
    setUser: (state, user) => state.user = user,
    setInfo: (state, info) => state.info = info,
    setEdit: (state, edit) => state.edit = edit
  },
  actions: {
    setLocation ({ commit }, location) {
      commit('setLocation', location)
    },
    addFilter({ commit }, filter) {
      commit('addFilter', filter)
    },
    removeFilter({ commit }, filter) {
      commit('removeFilter', filter)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setInfo ({ commit }, info) {
      commit('setInfo', info)
    },
    setEdit ({ commit }, edit) {
      commit('setEdit', edit)
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
