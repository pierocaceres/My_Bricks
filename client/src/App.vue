<template>
  <v-app >
    <NavBar @updateLegoSets='updateLegoSets'/>
    
    <v-main>
      <router-view :legoSets="legoSets"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import NavBar from './components/NavBar.vue'

const BASE_URL = 'http://localhost:3001'

export default {
  name: 'App',

  components: {NavBar},

  data: () => ({
    legoSets: []
  }),
  mounted() {
        // Insert methods here by using: this.methodName()
        this.getAllSets()
  },
  methods: {
    async getAllSets() {
        const sets = await axios.get(`${BASE_URL}/app/lego_set/all`)
        this.legoSets = sets.data
    },
    updateLegoSets(sets) {
      this.legoSets = sets
    }
  }
};
</script>
