import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default{ 

  state: {
    users: [],
    api_url : process.env.NODE_ENV == "development" ? "http://localhost:9000/public/api/user/" : "./api/user/",
  },
  getters: {
    users(state) {
      return state.users;
    },
    api_url(state) {
      return state.api_url;
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
      const response = await fetch(getters.api_url + 'read.php');

      const data = await response.json();
      commit('setUsers', data);
    },
    async createUser({  // cannot load from members - because it will not update , unless you preload
      commit,
      getters,
      dispatch
    },payload) {
      const response = await fetch(getters.api_url + 'create.php', {
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
     
      const response = await fetch(getters.api_url + 'delete.php', {
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
      console.log(payload)
      
      const response = await fetch(getters.api_url + 'update.php', {
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
  },

}
