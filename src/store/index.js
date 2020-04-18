import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import muduleA from './mudules/muduleA'

Vue.use(Vuex)

const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  mudules: {
    muduleA
  }
})
