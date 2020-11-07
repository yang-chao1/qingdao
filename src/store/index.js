import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  state: {
    isshow: sessionStorage.getItem('show'),
    token: sessionStorage.getItem('token'),
    timestamp: sessionStorage.getItem('timestamp')
  },
  mutations: {
    show (state) {
      sessionStorage.setItem('show', 'true')
      state.isshow = sessionStorage.getItem('show')
    },
    none (state) {
      sessionStorage.setItem('show', 'false')
      state.isshow = sessionStorage.getItem('show')
    },
    gettoken (state, token) {
      sessionStorage.setItem('token', token)
      console.log(sessionStorage.getItem('token'))
    },
    gettimestamp (state, timestamp) {
      sessionStorage.setItem('timestamp', timestamp)
      console.log(sessionStorage.getItem('timestamp'))
    }
  },
  actions: {

  },
  getters
})
