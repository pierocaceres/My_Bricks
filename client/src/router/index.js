import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/HomePage.vue'
import Feed from '../pages/FeedPage.vue'
import PostPage from '../pages/PostPage.vue'
import MyProfile from '../pages/MyProfile.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'HomePage', component: Home },
  { path: '/feed', name: 'FeedPage', component: Feed },
  { path: '/set/:set_id', name: 'PostPage', component: PostPage },
  { path: '/user/myprofile', name: 'MyProfile',  component: MyProfile }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
