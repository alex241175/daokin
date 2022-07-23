import Vue from 'vue'
import Vuex from 'vuex'
import config from '../../config.js'

Vue.use(Vuex)

export default{ 

  state: {
    rite:{},
    rites: [],
    years:[],
    filterYear:'',
    filterTemple:'',
    months:['壹','貳','叄','肆','伍','陸','柒','捌','玖','拾','拾壹','拾貳'],
    hours:['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'],
  },
  getters: {
    rites(state) {
      return state.rites;
    },
    rite(state) {
      return state.rite;
    },
    years(state) {
      return state.years;
    },
    months(state) {
      return state.months;
    },
    hours(state) {
      return state.hours;
    },
    filterYear(state) {
      return state.filterYear;
    },
    filterTemple(state) {
      return state.filterTemple;
    },
  },
  mutations: {
    setRites(state, payload) {
      state.rites = payload
    },
    setRite(state, payload) {
      state.rite = payload
    },
    setYears(state, payload) {
      state.years = payload
    },
    setFilterYear(state, payload) {
      state.filterYear = payload
    },
    setFilterTemple(state, payload) {
      state.filterTemple = payload
    },
  },
  actions: {
    async getRites({
      commit,
      getters, 
      dispatch
    },payload) {
      const url = config.api_host + 'rite/read.php?year=' + getters.filterYear + '&temple=' + getters.filterTemple
      const response = await fetch(url);
      const data = await response.json()
      commit('setRites', data);
    },
    async getRite({
      commit,
      getters, 
      dispatch
    },payload) {
      const url = config.api_host + 'rite/single_read.php?id=' + payload
      const response = await fetch(url);
      var data = await response.json()
      // convert to javascript date object
      if (data.date_e) {
        data.date_e = new Date(Date.parse(data.date_e.replace(/[-]/g,'/'))).toISOString().slice(0, 10)
      }
      commit('setRite', data);
    },
    async getYears({
      commit,
      getters, 
      dispatch
    },payload) {
      const url = config.api_host + 'rite/get_years.php'
      const response = await fetch(url);
      const data = await response.json()
      commit('setYears', data);
    },
    async createRite({  
      commit,
      getters,
      dispatch
    },payload) {
      const response = await fetch(config.api_host + 'rite/create.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      dispatch("getRites")
      const data = await response.json()
      console.log(data.message)
      commit('setMessage', data.message);

    },
    async deleteRite({  // cannot load from members - because it will not update , unless you preload
      commit,
      getters,
      dispatch
    },payload) {
     
      const response = await fetch(config.api_host + 'rite/delete.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      dispatch("getRites")
      const data = await response.json()
      console.log(data.message)
      commit('setMessage', data.message);

    },
    async updateRite({  // cannot load from members - because it will not update , unless you preload
      commit,
      getters,
      dispatch
    },payload) {
      const response = await fetch(config.api_host + 'rite/update.php', {
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
      dispatch("getRites")

    },
  },

}
