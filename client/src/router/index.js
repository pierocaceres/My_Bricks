import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/HomePage.vue'
import About from '../pages/AboutPage.vue'
import Feed from '../pages/FeedPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/feed', name: 'feed', component: Feed},
  { path: '/about', name: 'about', component: About}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
