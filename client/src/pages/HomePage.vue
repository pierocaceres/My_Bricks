<template>
  <div>
    <v-layout row wrap justify-center align-center justify-space-around>
        <v-flex xs12 sm6 md6 class='d-flex justify-center'>
          <v-card flat>
            <v-img src='../assets/My Bricks-logos_black.png' height='auto' width='50vw' position='center center' contain></v-img>
          </v-card>
        </v-flex>
        <v-flex xs6 sm2 md2>
          <v-card class='d-flex flex-column' flat v-if='!signin && !register'>
            <v-btn class='ma-5' @click='changeSignIn()'>Sign In</v-btn>
            <v-btn class='ma-5' @click='changeRegister()'>Register</v-btn>
          </v-card>
          <div v-if='signin'>
            <SignIn @changeSignIn='changeSignIn()'/>
          </div>
          <div v-if='register'>
            <Register @changeRegister='changeRegister()' />
          </div>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import SignIn from '../components/SignIn.vue'
  import Register from '../components/Register.vue'

  export default {
    name: 'HomePage',
    data: () => ({
      signin: false,
      register: false,
    }),
    components: {
      SignIn,
      Register,
    },
    mouned() {

    },
    methods: {
      changeSignIn() {
        this.signin = !this.signin
      },
      changeRegister() {
        this.register = !this.register
      }
    }        
  }
</script>
