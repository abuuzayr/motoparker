import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import 'mapbox-gl/dist/mapbox-gl.css';

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    location: null
  },
  mutations: {
    setLocation: (state, location) => state.location = location,
  },
  actions: {
    setLocation ({ commit }, location) {
      commit('setLocation', location)
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
