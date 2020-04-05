import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import muduleA from './mudules/muduleA'

Vue.use(Vuex)

const state = {
  // user 保存登录用户信息
  user: {}
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  mudules: {
    muduleA
  }
})
