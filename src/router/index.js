import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Users from '../components/Users.vue'
import Temples from '../components/Temples.vue'
import Rites from '../components/Rites.vue'
import Rite from '../components/Rite.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/users', name: 'users', component: Users },
  { path: '/temples', name: 'temples', component: Temples },
  { path: '/rites', name: 'rites', component: Rites },
  { path: '/rite/:id', name: 'rite', props: true, component: Rite},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
