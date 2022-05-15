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
            ref="name"
            v-model="name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
            label="Full Name"
            placeholder="John Doe"
            required
          ></v-text-field>
          <v-text-field
            ref="username"
            v-model="username"
            :rules="[() => !!username ||'This field is required']"
            label="Username"
            placeholder="JDoe"
            counter="15"
            required
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            :rules="[() => !!password || 'This field is required']"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
            label="Password"
            required
          ></v-text-field>
          <v-text-field
            ref="confirmPassword"
            v-model="confirmPassword"
            :rules="[() => !!confirmPassword || 'This field is required', password == confirmPassword]"
            :append-icon="showConPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConPass ? 'text' : 'password'"
            @click:append="showConPass = !showConPass"
            label="Confirm Password"
            required
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text @click="changeRegister()">
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
    name: 'RegisterComp',
    props: ['BASE_URL'],
    data: () => ({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        showPass: false,
        showConPass: false,
    }),
    components: {
        
    },
    methods: {
        changeRegister() {
          this.$emit('changeRegister')
        },
        changeSignIn() {
            this.$emit('changeSignIn')
        },
        async handleSubmit() {
          const payload = {
            name: this.name,
            username: this.username,
            password: this.password
          }

          const serverResponse = await axios.post(`${this.BASE_URL}/app/register`, payload)

          if(serverResponse.data.message){
            alert(serverResponse.data.message)
          }else{
            this.name = ''
            this.username = ''
            this.password = ''
            this.confirmPassword = ''
            this.changeSignIn()
            this.changeRegister()
          }
        },
    }
    
}
</script>