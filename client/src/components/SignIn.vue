<template>
  <v-row justify="center">
    <v-col
      cols="12"
      sm="10"
      md="8"
      lg="6"
    >
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            name="username"
            v-model="username"
            label="Username"
            placeholder="John Doe"
            required
          ></v-text-field>
          <v-text-field
            name="password"
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            label="Password"
            required
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-6"></v-divider>
        <v-card-actions>
          <v-btn text @click='changeSignIn()'>
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="handleSubmit()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios"

export default {
    name: 'SignIn',
    props: ['BASE_URL', 'loggedUser'],
    data: () => ({
        username: '',
        password: '',
        show: false,
    }),
    mounted() {

    },
    methods: {
      changeSignIn() {
          this.$emit('changeSignIn')
      },
      setUser(user){
        this.$emit('setUser', user)
      },
      async handleSubmit() {
          const payload = {
            username: this.username,
            password: this.password
          }

          const user = await axios.post(`${this.BASE_URL}/app/login`, payload)
          localStorage.setItem('token', user.data.token)
          this.setUser(user.data.user)
          this.username = ''
          this.password = ''
          this.$router.push('/feed')
      },
    }
}
</script>