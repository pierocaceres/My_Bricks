<template>
    <v-contianer fluid>
        <h2 class='text-center pt-3'>The Latest</h2>
        <v-layout row wrap justify-space-around>
            <v-row dense>
                <v-col xs12 s6 md4 lg3 v-for='set in legoSets' :key='set.id'>
                    <v-card class='mx-auto my-12' max-width='375' @click='goToSet(set.id)'>
                        <v-img height='200' contain :src='set.picture[0]' :position='center' :background-position='center'></v-img>
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

export default {
    name: 'FeedPage',
    props: ['legoSets'],
    data: () => ({

    }),
    components: {

    },
    mounted() {

    },
    methods: {
        goToSet(id){
            this.$router.push(`/set/${id}`)
        }
    }
}
</script>