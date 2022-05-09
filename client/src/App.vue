<template>
  <v-app dark>
    <NavBar />
    <!-- <v-app-bar app color="primary" dark>
    </v-app-bar> -->

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',

  components: {NavBar},

  data: () => ({
    //
  }),
};
</script>
