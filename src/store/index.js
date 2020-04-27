import Vue from 'vue'
import Vuex from 'vuex'
/** 引入vuex-persistedstate插件，持久化vuex内容 */
import createdPersistedState from 'vuex-persistedstate'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import user from './mudules/user'

Vue.use(Vuex)

const initState = {
  user: {},
  allOpenPage: [{
    icon: 'el-icon-data-analysis',
    label: '首页',
    path: '/home-page'
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
    user
  },
  /** 使用vuex-persistedstate插件将vuex内容动态写入sessionStorage */
  plugins: [createdPersistedState({ storage: window.sessionStorage })]
})
