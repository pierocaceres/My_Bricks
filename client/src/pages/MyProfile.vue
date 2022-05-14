<template>
    <div class='my-page ma-16 '>
        <div class='text-h1-subtitle-1'>My Profile</div>
        <v-container class='my-5'>
            <v-card v-for='set in legoSets' :key='set.id'  class='my-9'>
                <v-layout row wrap class='pa-3'>
                    <v-flex xs12 sm12 md4 class='py-3' @click='goToSet(set.id)' style="cursor: pointer;">
                        <!-- <div class='text-caption grey--text'>Image</div> -->
                        <v-img :src='set.picture[0]' max-height='100' contain />
                    </v-flex>
                    <v-flex xs12 sm4 md4 align-self-center @click='goToSet(set.id)' style="cursor: pointer;">
                        <div class='text-caption grey--text'>Lego Set Name</div>
                        <div>{{set.name}}</div>
                    </v-flex>
                    <v-flex xs12 sm4 md2 align-self-center @click='goToSet(set.id)' style="cursor: pointer;">
                        <div class='text-caption grey--text'>Theme</div>
                        <div>{{set.theme}}</div>
                    </v-flex>
                    <v-flex xs12 sm4 md2 align-self-center>
                        <!-- <v-btn fab depressed @click='editSet(set.id)' color='white'>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn> -->
                        <EditPopUp :id='set.id' :names='set.name' :pictures='set.picture' :difficultys='set.difficulty' :themes='set.theme' :build='set.build_progress'/>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>
    </div>
   
</template>

<script>
import axios from 'axios'
import EditPopUp from '../components/EditPopUp.vue'

const BASE_URL = 'http://localhost:3001'

export default {
    name: 'MyProfile',
    props: [],
    data: () =>({
        legoSets: [],
    }),
    components: {
        EditPopUp,
    },
    mounted() {
        this.getUserSets()
    },
    methods: {
        async getUserSets() {
            // save the logged in users id in a variable
            const sets = await axios.get(`${BASE_URL}/app/lego_set/user/1`)
            this.legoSets = sets.data
        },
        goToSet(id){
            this.$router.push(`/set/${id}`)
        },
        editSet(value){
            alert(`Edit set ${value}`)
            this.edit = true
        }
    }
}
</script>