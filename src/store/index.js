import Vue from 'vue'
import Vuex from 'vuex'
import createdPersistedState from 'vuex-persistedstate'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import muduleA from './mudules/muduleA'

Vue.use(Vuex)

const initState = {
  user: {},
  allOpenPage: [{
    icon: 'el-icon-data-analysis',
    label: '首页',
    path: '/main-view/home-page'
  }],
  collapse: false
}
const state = sessionStorage.getItem('vuex') ? JSON.parse(sessionStorage.getItem('vuex')) : initState;

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  mudules: {
    muduleA
  },
  plugins: [createdPersistedState({ storage: window.sessionStorage })]
})
