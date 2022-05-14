<template>
  <v-app >
    <NavBar @updateLegoSets='updateLegoSets' :getAllSets='getAllSets'/>
    
    <v-main>
      <router-view :legoSets="legoSets" :BASE_URL="BASE_URL"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import NavBar from './components/NavBar.vue'

// const BASE_URL = 'http://localhost:3001'

export default {
  name: 'App',

  components: {NavBar},

  data: () => ({
    legoSets: [],
    BASE_URL: 'http://localhost:3001'
  }),
  mounted() {
        // Insert methods here by using: this.methodName()
        this.getAllSets()
  },
  methods: {
    async getAllSets() {
        const sets = await axios.get(`${this.BASE_URL}/app/lego_set/all`)
        this.legoSets = sets.data
    },
    updateLegoSets(sets) {
      this.legoSets = sets
    }
  }
};
</script>
