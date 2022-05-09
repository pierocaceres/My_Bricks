<template>
    <v-contianer fluid>
        <h2 class='text-center pt-3'>The Latest</h2>
        <v-layout row wrap justify-space-around>
            <v-row dense>
                <v-col xs12 s6 md4 lg3 v-for='set in legoSets' :key='set.id'>
                    <v-card class='mx-auto my-12' max-width='375' >
                        <v-img height='auto' contain :src='set.picture' :position='center' :background-position='center'></v-img>
                        <v-divider></v-divider>
                        <v-card-title>{{set.name}}</v-card-title>
                        <v-card-text>
                            <v-row align='center' class='mx-1'>
                                <div class='my-4 text-subtitle-1' >Difficulty:</div> 
                                <v-rating :value='set.difficulty' color='amber' dense readonly size='15'></v-rating>
                            </v-row>
                            <div class='my-4 text-subtitle-1' >Builder: {{set.User.username}} </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-layout>
    </v-contianer>
</template>

<script>
import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export default {
    name: 'FeedPage',
    data: () => ({
        legoSets: [],
    }),
    components: {

    },
    mounted() {
        // Insert methods here by using: this.methodName()3
        this.getAllSets()
    },
    methods: {
        async getAllSets() {
            const sets = await axios.get(`${BASE_URL}/app/lego_set/all`)
            this.legoSets = sets.data
        }
    }
}
</script>