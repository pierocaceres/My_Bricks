<template>
    <nav>
        <v-app-bar app elevate-on-scroll >
            <v-app-bar-nav-icon @click="showDrawer()" class='d-md-none'></v-app-bar-nav-icon>
            <v-app-bar-title class="text-uppercase" style="cursor: pointer;" >
                <span class="font-weight-light" @click="goHome()" :cursor='pointer'>My</span>
                <span @click="goHome()">Bricks</span>
            </v-app-bar-title>
            <v-spacer></v-spacer>

            <v-menu tyle="width: 60px" transition='slide-y-transition' open-on-hover >
                <template v-slot:activator='{on}'>
                    <v-form @submit="sendSearch">
                        <v-text-field :label='searchMessage()' v-model='search' solo dense rounded clearable v-if="user" prepend-inner-icon='mdi-magnify' class='py-3 mt-6' @click:prepend-inner="sendSearch">
                        <template #append>
                            <v-btn fab depressed x-small v-on='on' color='white'>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        </v-text-field>
                    </v-form>
                    
                </template>
                <v-list>
                    <v-list-item v-for='item in category' :key="item" @click='searchBy = item'>
                        {{item}}
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <PopUp />

            <div class='d-none d-md-flex' v-for='link in links' :key='link.text' >
                <v-btn plain v-if="user" @click="route(link.route)"> 
                    <span>{{link.text}}</span>
                    <v-icon right>{{link.icon}}</v-icon>
                </v-btn>
            </div>
        </v-app-bar>

        <v-navigation-drawer app temporary v-model="drawer" >
            <v-list>
                <v-list-item v-for='link in links' :key='link.text' router :to='link.route' @click="route(link.route)">
                    <v-list-item-action>
                        <v-icon left>{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-tile-title>{{link.text}}</v-list-tile-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import axios from 'axios'
import PopUp from './PopUp.vue'

const BASE_URL = 'http://localhost:3001'

export default {
    // props: ['legoSets'],
    data: () => ({
        user: true,
        drawer: false,
        search: '',
        category: ['Lego Set Name', 'Theme', 'Builder'],
        searchBy: 'Lego Set Name',
        message: ``,
        links: [
            {icon: 'mdi-account-box', text:'Profile', route: '/user/myprofile'},
            {icon: 'mdi-exit-to-app', text:'Sign Out', route: '/'},
        ],
        set: []
    }),
    components: { PopUp },
    mounted() {
        this.initialValue()
    },
    methods:{
        updateLegoSets(set) {
            this.$emit('updateLegoSets', set)
        },
        showDrawer(){
            if(this.drawer){this.drawer = false}
            else{ this.drawer = true}
        },
        goHome() {
            if(this.user){
                this.$router.push(`/feed`)
            }else{
                this.$router.push(`/`)
            }
        },
        route(path) {
             this.$router.push(path)
        },
        searchMessage(){
            return this.message = `Search by ${this.searchBy}`
        },
        async sendSearch(event) {
            event.preventDefault()

            if(this.search == ''){
                const sets = await axios.get(`${BASE_URL}/app/lego_set/all`)
                this.updateLegoSets(sets.data)
            }else if(this.searchBy == 'Lego Set Name'){
                const sets = await axios.get(`${BASE_URL}/app/search/set_name/${this.search}`)
                // console.log(sets.length)
                if(sets.data.length > 0){
                    this.updateLegoSets(sets.data)
                    this.$router.push(`/feed`)
                }
                this.search = ''
            }else if(this.searchBy == 'Theme'){
                const sets = await axios.get(`${BASE_URL}/app/search/theme/${this.search}`)
                if(sets.data.length > 0){
                    this.updateLegoSets(sets.data)
                    this.$router.push(`/feed`)
                }
                this.search = ''
            }else if(this.searchBy == 'Builder') {
                const sets = await axios.get(`${BASE_URL}/app/search/builder/${this.search}`)
                if(sets.data.length > 0){
                    this.updateLegoSets(sets.data)
                    this.$router.push(`/feed`)
                }
                this.search = ''
            }
        }
    }
}
</script>
