<template>
    <v-contianer >
        <v-card class='pa-3 mx-auto my-12' max-width='374' v-for='set in legoSets' :key='set.id'>
            <v-img height='auto' :src='set.picture' :position='center' :background-position='center'></v-img>
            <v-layout >
                <v-flex xs12 md12>
                    <v-card-title>{{set.name}}</v-card-title>
                    <v-rating :value='set.difficulty'></v-rating>
                    <div class='my-4 text-subtitle-1' >Builder: {{set.User.username}} </div>
                </v-flex>
            </v-layout>
        </v-card>
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