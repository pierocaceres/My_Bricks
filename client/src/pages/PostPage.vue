<template>
    <v-container v-if="loggedUser != null">
        <v-layout column justify-center align-center class='mt-16'>
            <v-card flat width='75vw' class='my-10'>
                <v-flex row wrap>
                    <v-flex md6>
                        <!-- <v-img :src='legoSet.picture' height='250' contain ></v-img> -->
                        <v-carousel height='250px' hide-delimiters cycle interval="3000">
                            <v-carousel-item
                            v-for="(image,i) in legoSet.picture"
                            :key="i"
                            reverse-transition="fade-transition"
                            transition="fade-transition"
                            style="object-fit:cover"
                            >
                            <v-img :src="image" contain height='250px'></v-img>
                            </v-carousel-item>
                        </v-carousel>
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
            <v-card flat width='75vw' class='my-4'>
                <h2 class='text-center'>Comments</h2>
                <div class='d-flex' width='100vw'>
                    <v-avatar color='primary' size='52' >
                        <!-- <v-img ></v-img> -->
                        <span class="white--text">{{this.loggedUser.username[0].toUpperCase()}}</span>
                    </v-avatar>
                    <v-form style='width: 100%' class='pl-5' @submit="submitComment">
                        <v-text-field
                            v-model="message"
                            :append-outer-icon="message ? 'mdi-send' : ''"
                            filled
                            clearable
                            label="Leave a Comment"
                            type="text"
                            @click:append-outer='submitComment'
                        ></v-text-field>      
                    </v-form>
                </div>
                <div v-for='user in comments' :key='user.id' class="my-3" >
                    <CommentComp :user='user' style='width: 100%' :BASE_URL='BASE_URL' :loggedUser='loggedUser' @getSet='getSet' />
                </div>
            </v-card>
        </v-layout>
    </v-container>
    <div v-else>
        <PleaseLogIn />
    </div>
</template>

<script>
import axios from 'axios'
import CommentComp from '../components/CommentComp.vue'
import PleaseLogIn from "../components/PleaseLogIn.vue"


export default {
    name: 'PostPage',
    props: ['BASE_URL', 'loggedUser'],
    data: () => ({
        legoSet: [],
        comments: [],
        message: '',
    }),
    components: {
        CommentComp,
        PleaseLogIn
    },
    mounted() {
        this.getSet()
    },
    methods: {
        async getSet() {
            const setID = this.$route.params.set_id
            const set = await axios.get(`${this.BASE_URL}/app/lego_set/${setID}`)
            this.legoSet = set.data
            this.comments = set.data.Comments
        },
        async submitComment(e) {
            e.preventDefault()
            const payload = {
                response: this.message,
                user_id: this.loggedUser.id,
                lego_set_id: this.$route.params.set_id
            }
            await axios.post(`${this.BASE_URL}/app/comment/post`, payload)
            this.message = ''
            this.getSet()
        }
    }
}
</script>