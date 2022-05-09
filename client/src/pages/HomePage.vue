<template>
  <div>
    <v-layout row justify-center align-center justify-space-around>
        <v-flex md6>
          <v-card flat>
            <v-img src='../assets/My Bricks-logos_black.png' height='auto' width='50vw' position='center center' contain></v-img>
          </v-card>
        </v-flex>
        <v-flex md2>
          <v-card class='d-flex flex-column' flat>
            <v-btn class='ma-5'>Sign In</v-btn>
            <v-btn class='ma-5'>Register</v-btn>
          </v-card>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>

  export default {
        
  }
</script>
