import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import 'mapbox-gl/dist/mapbox-gl.css'
import VueSlideoutPanel from 'vue2-slideout-panel'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueSlideoutPanel);
Vue.use(VModal)

const store = new Vuex.Store({
  state: {
    location: null,
    filters: ['free'],
    user: null,
    info: ''
  },
  mutations: {
    setLocation: (state, location) => state.location = location,
    addFilter: (state, filter) => state.filters = [...new Set([...state.filters, filter])],
    removeFilter: (state, filter) => state.filters = state.filters.filter(f => f !== filter),
    setUser: (state, user) => state.user = user,
    setInfo: (state, info) => state.info = info
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
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
