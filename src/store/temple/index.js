import Vue from 'vue'
import Vuex from 'vuex'
import config from '../../config.js'

Vue.use(Vuex)

export default{ 

  state: {
    temples: [],
  },
  getters: {
    temples(state) {
      return state.temples;
    },
  },
  mutations: {
    setTemples(state, payload) {
      state.temples = payload
    },
  },
  actions: {
    async getTemples({  // cannot load from members - because it will not update , unless you preload
      commit,
      getters,
      dispatch
    },payload) {
      const response = await fetch(config.api_host + 'temple/read.php');
      var data = await response.json();
      // convert json type to array
      data = data.map(item => {
        return {
          ...item, 
          host : item.host != "[]" ? JSON.parse(item.host.replace(/&quot;/g, "\"")) : [],
          address_c : item.address_c != "[]" ? JSON.parse(item.address_c.replace(/&quot;/g, "\"")) : [],
        }
      })
      commit('setTemples', data);
    },
    async createTemple({  
      commit,
      getters,
      dispatch
    },payload) {
       //convert js array object to json string
       payload.host = JSON.stringify(payload.host)
       payload.address_c = JSON.stringify(payload.address_c)
      const response = await fetch(config.api_host + 'temple/create.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      dispatch("getTemples")
      const data = await response.json()
      console.log(data.message)
      commit('setMessage', data.message);

    },
    async deleteTemple({  // cannot load from members - because it will not update , unless you preload
      commit,
      getters,
      dispatch
    },payload) {
     
      const response = await fetch(config.api_host + 'temple/delete.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      dispatch("getTemples")
      const data = await response.json()
      console.log(data.message)
      commit('setMessage', data.message);

    },
    async updateTemple({  // cannot load from members - because it will not update , unless you preload
      commit,
      getters,
      dispatch
    },payload) {
      //convert js array object to json string
      payload.host = JSON.stringify(payload.host)
      payload.address_c = JSON.stringify(payload.address_c)

      const response = await fetch(config.api_host + 'temple/update.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json()
      console.log(data.message)
      commit('setMessage', data.message);
      dispatch("getTemples")

    },
  },

}
