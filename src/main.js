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

// Register toasts
Vue.toasted.register('saving', 'Saving...', {
  type: 'info',
  duration: null
})
Vue.toasted.register('dragToast', 'Drag marker to edit map location', {
  type: 'info',
  duration: null,
  position: 'bottom-center'
})
Vue.toasted.register('newToast', 'Click on map to drop marker', {
  type: 'default',
  duration: null,
  position: 'bottom-center'
})
Vue.toasted.register('error', 'message', {
  type: 'error',
})
Vue.toasted.register('saved', 'Saved!', {
  type: 'success'
})

const store = new Vuex.Store({
  state: {
    location: null,
    locationData: {},
    filters: ['free'],
    user: null,
    info: '',
    edit: false
  },
  mutations: {
    setLocation: (state, location) => state.location = location,
    setLocationData: (state, data) => state.locationData = data,
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
    setLocationData({ commit }, data) {
      commit('setLocationData', data)
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
