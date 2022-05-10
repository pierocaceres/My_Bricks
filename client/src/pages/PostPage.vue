<template>
    <v-container>
        <v-layout column justify-center align-center class='mt-16'>
            <v-card flat width='75vw' class='my-10'>
                <v-flex row wrap>
                    <v-flex md6>
                        <v-img :src='legoSet.picture' height='250' contain ></v-img>
                    </v-flex>
                    <v-flex md6 class="pl-5">
                        <div class='text-h4 text-center font-weight-light'>{{legoSet.name}}</div>
                        <div class='text-subtitle-1 text--secondary my-2'>Built by {{legoSet.User.username}}</div>
                        <div class='text-body-1 text-decoration-underline font-weight-medium my-2'>Build Progress</div>
                        <div class='text-body-1'>{{legoSet.build_progress}}</div>
                        <div class='d-flex flex-row justify-space-between'>
                            <div class='d-flex flex-column my-2' row width='100vw'>
                                <div class='text-overline ' >Build Difficulty</div>
                                <v-rating :value='legoSet.difficulty' color='amber' dense readonly size='15'></v-rating>
                            </div>
                            <div class='d-flex flex-column my-2' row width='100vw'>
                                <div class='text-overline ' >Theme</div>
                                <div class='text-caption text-capitalized'>{{legoSet.theme}}</div>
                            </div>
                        </div>
                    </v-flex>
                </v-flex>
            </v-card>
            <v-card flat width='75vw' class=' my-4'>
                <h2 class='text-center'>Comments</h2>
                <v-form>
                    <v-avatar color='primary' size='52'>
                        <!-- <v-img ></v-img> -->
                        <span class="white--test"></span>
                    </v-avatar>
                    <v-text-field
                        v-model="message"
                        :append-outer-icon="message ? 'mdi-send' : ''"
                        :prepend-icon="icon"
                        filled
                        clear-icon="mdi-close-circle"
                        clearable
                        label="Leave a Comment"
                        type="text"
                    ></v-text-field>      
                </v-form>
                <div v-for='user in comments' :key='user.id'>
                    <v-avatar color='primary' size='52'>
                        <span class="white--text text-capitalized">{{user.User.username[0]}}</span>
                    </v-avatar>
                </div>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export default {
    name: 'PostPage',
    data: () => ({
        legoSet: [],
        comments: [],
        message: '',
    }),
    components: {
        
    },
    mounted() {
        this.getSet()
    },
    methods: {
        async getSet() {
            const setID = this.$route.params.set_id
            const set = await axios.get(`${BASE_URL}/app/lego_set/${setID}`)
            console.log(set.data)
            console.log(set.data.Comments)
            this.legoSet = set.data
            this.comments = set.data.Comments
        }
    }
}
</script>