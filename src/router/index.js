import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Users from '../components/Users.vue'
import Temples from '../components/Temples.vue'
import Rites from '../components/Rites.vue'
import Rite from '../components/Rite.vue'
import Find from '../components/Find.vue'
import SignIn from '../components/SignIn.vue'
import AuthGuard from './auth-guard';

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/users', name: 'users', component: Users, beforeEnter: AuthGuard },
  { path: '/temples', name: 'temples', component: Temples, beforeEnter: AuthGuard },
  { path: '/rites', name: 'rites', component: Rites, beforeEnter: AuthGuard},
  { path: '/rite/:id', name: 'rite', props: true, component: Rite, beforeEnter: AuthGuard},
  { path: '/find', name: 'find', component: Find, beforeEnter: AuthGuard },
  { path: '/signin', name: 'signin', component: SignIn },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
