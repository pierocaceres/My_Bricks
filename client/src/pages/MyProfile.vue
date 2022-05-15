<template>
    <div class='my-page ma-16 ' v-if="loggedUser != null">
        <div class='text-h1-subtitle-1'>My Profile</div>
        <v-container class='my-5'>
            <v-card v-for='set in legoSets' :key='set.id'  class='my-9'>
                <v-layout row wrap class='pa-3'>
                    <v-flex xs12 sm12 md4 class='py-3' @click='goToSet(set.id)' style="cursor: pointer;">
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
                        <EditPopUp :id='set.id' :names='set.name' :pictures='set.picture' :difficultys='set.difficulty' :themes='set.theme' :build='set.build_progress' :loggedUser='loggedUser' @getUserSets='getUserSets'/>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>
    </div>
    <div v-else>
        <PleaseLogIn />
    </div>
</template>

<script>
import axios from 'axios'
import EditPopUp from '../components/EditPopUp.vue'
import PleaseLogIn from '../components/PleaseLogIn.vue'

export default {
    name: 'MyProfile',
    props: ['BASE_URL', 'loggedUser'],
    data: () =>({
        legoSets: [],
        id: null
    }),
    components: {
        EditPopUp,
        PleaseLogIn
    },
    mounted() {
        this.setId()
        this.getUserSets()
    },
    methods: {
        async setId(){
            this.id = this.loggedUser.id
        },
        async getUserSets() {
            const sets = await axios.get(`${this.BASE_URL}/app/lego_set/user/${this.id}`)
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