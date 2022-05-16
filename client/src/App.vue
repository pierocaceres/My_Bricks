<template>
  <v-app>
    <NavBar @updateLegoSets='updateLegoSets' @logOut='logOut' :getAllSets='getAllSets' :loggedUser="loggedUser"/>
    
    <v-main>
      <router-view :legoSets="legoSets" :BASE_URL="this.BASE_URL" :loggedUser='this.loggedUser' @setUser='setUser'></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import NavBar from './components/NavBar.vue'

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if(token){
            config.headers['authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default {
  name: 'App',

  components: {NavBar},

  data: () => ({
    legoSets: [],
    // BASE_URL: 'http://localhost:3001',
    BASE_URL: 'https://my-bricks-database.herokuapp.com',
    loggedUser: null,
  }),
  mounted() {
        // Insert methods here by using: this.methodName()
        this.checkToken()
        this.getAllSets()
  },
  methods: {
    async getAllSets() {
        const sets = await axios.get(`${this.BASE_URL}/app/lego_set/all`)
        this.legoSets = sets.data
    },
    updateLegoSets(sets) {
      this.legoSets = sets
    },
    setUser(user) {
      this.loggedUser = user
    },
    async checkToken() {
      const token = localStorage.getItem('token')
      if(token){
        const res = await axios.get(`${this.BASE_URL}/app/session`)
        console.log(res)
        this.loggedUser = res.data
      }
    },
    logOut() {
      this.loggedUser = null
      localStorage.clear()
    }
  }
};
</script>
