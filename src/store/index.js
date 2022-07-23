import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import temple from './temple'
import rite from './rite'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    message:''
  },
  getters: {
    message(state) {
      return state.message;
    },
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload
    },
  },

  modules: {
    user,
    temple,
    rite,
  }
})