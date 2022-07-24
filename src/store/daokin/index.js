import Vue from 'vue'
import Vuex from 'vuex'
import config from '../../config.js'

Vue.use(Vuex)

export default{ 

  state: {
    daokin:{},
    daokins: [],
  },
  getters: {
    daokins(state) {
      return state.daokins;
    },
    daokin(state) {
      return state.daokin;
    },
  },
  mutations: {
    setDaokin(state, payload) {
      state.daokin = payload
    },
    setDaokins(state, payload) {
      state.daokins = payload
    },
  },
  actions: {
    async getDaokins({
      commit,
      getters, 
      dispatch
    },payload) {
      const url = config.api_host + 'daokin/read.php?rite_id=' + payload
      const response = await fetch(url);
      const data = await response.json()
      commit('setDaokins', data);
    },
    async getDaokin({
      commit,
      getters, 
      dispatch
    },payload) {
      const url = config.api_host + 'daokin/single_read.php?id=' + payload
      const response = await fetch(url);
      var data = await response.json()
      commit('setDaokin', data);
    },
    async createDaokin({  
      commit,
      getters,
      dispatch
    },payload) {
      const response = await fetch(config.api_host + 'daokin/create.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      dispatch("getDaokins", payload.rite_id)
      const data = await response.json()
      console.log(data.message)
      commit('setMessage', data.message);

    },
    async deleteDaokin({  // cannot load from members - because it will not update , unless you preload
      commit,
      getters,
      dispatch
    },payload) {
     
      const response = await fetch(config.api_host + 'daokin/delete.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      dispatch("getDaokins", payload.rite_id)
      const data = await response.json()
      console.log(data.message)
      commit('setMessage', data.message);

    },
    async updateDaokin({  // cannot load from members - because it will not update , unless you preload
      commit,
      getters,
      dispatch
    },payload) {
      const response = await fetch(config.api_host + 'daokin/update.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json()
      console.log(data.message)
      commit('setMessage', data.message)
      dispatch("getDaokins", payload.rite_id)

    },
  },

}
