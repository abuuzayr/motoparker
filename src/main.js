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
