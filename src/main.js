import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import 'mapbox-gl/dist/mapbox-gl.css';
import VueSlideoutPanel from 'vue2-slideout-panel';

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueSlideoutPanel);

const store = new Vuex.Store({
  state: {
    location: null,
    filters: []
  },
  mutations: {
    setLocation: (state, location) => state.location = location,
    addFilter: (state, filter) => state.filters = [...new Set([...state.filters, filter])],
    removeFilter: (state, filter) => state.filters = state.filters.filter(f => f !== filter)
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
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
