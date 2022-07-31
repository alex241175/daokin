import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store }  from './store'
import vuetify from './plugins/vuetify'
import '@fortawesome/fontawesome-free/css/all.css'
import VueExcelXlsx from "vue-excel-xlsx";

Vue.config.productionTip = false
// Vue.prototype.$api_host = process.env.NODE_ENV == "development" ? "http://localhost:9000/public/api/" : "./api/",

Vue.use(vuetify, {
  iconfont: 'fa'
 })
 Vue.use(VueExcelXlsx);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
