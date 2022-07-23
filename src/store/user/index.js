import Vue from 'vue'
import Vuex from 'vuex'
import config from '../../config.js'

Vue.use(Vuex)

export default{ 

  state: {
    users: [],
  },
  getters: {
    users(state) {
      return state.users;
    },
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload
    },
  },
  actions: {
    async getUsers({  // cannot load from members - because it will not update , unless you preload
      commit,
      getters,
      dispatch
    },payload) {
      const response = await fetch(config.api_host + 'user/read.php');
      const data = await response.json();
      commit('setUsers', data);
    },
    async createUser({  // cannot load from members - because it will not update , unless you preload
      commit,
      getters,
      dispatch
    },payload) {
      const response = await fetch(config.api_host + 'user/create.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      dispatch("getUsers")
      const data = await response.json()
      console.log(data.message)
    },
    async deleteUser({  // cannot load from members - because it will not update , unless you preload
      commit,
      getters,
      dispatch
    },payload) {
     
      const response = await fetch(config.api_host + 'user/delete.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      dispatch("getUsers")
      const data = await response.json()
      console.log(data.message)
    },
    async updateUser({  // cannot load from members - because it will not update , unless you preload
      commit,
      getters,
      dispatch
    },payload) {
      
      const response = await fetch(config.api_host  + 'user/update.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json()
      console.log(data.message)

      dispatch("getUsers")
    },
  },

}
