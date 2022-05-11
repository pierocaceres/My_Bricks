<template>
    <nav>
        <v-app-bar absolute elevate-on-scroll>
            <v-app-bar-nav-icon @click="showDrawer()" class='d-md-none'></v-app-bar-nav-icon>
            <v-app-bar-title class="text-uppercase" style="cursor: pointer;" >
                <span class="font-weight-light" @click="goHome()" :cursor='pointer'>My</span>
                <span @click="goHome()">Bricks</span>
            </v-app-bar-title>
            <v-spacer></v-spacer>

            <v-menu offset-y style='max-width: 50px'>
                <template v-slot:activator='{on}'>
                    <!-- <v-btn fab depressed x-small v-on='on'>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn> -->
                    <v-text-field label='search' v-model='search' solo dense rounded clearable v-if="user" prepend-inner-icon='mdi-magnify' class='py-3 mt-6' >
                    <template #append>
                        <v-btn fab depressed x-small v-on='on' color='white'>
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    </v-text-field>
                    
                </template>
                <v-list>
                    <v-list-item v-for='item in category' :key="item" @click='searchBy = item'>
                        {{item}}
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <PopUp />
            
            <!-- <v-tooltip bottom >
                <template v-slot:activator='{ on, attrs }'>
                    <v-btn class="mx-2" fab x-small depressed v-bind="attrs" v-on="on">
                        <v-icon dark>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </template>
                <span>Post a new lego set build</span>
            </v-tooltip> -->

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
import PopUp from './PopUp.vue'

export default {
    data: () => ({
        user: true,
        drawer: false,
        search: '',
        searchBy: 'Name',
        category: ['Name', 'Theme', 'Builder'],
        links: [
            {icon: 'mdi-account-box', text:'Profile', route: '/user/myprofile'},
            {icon: 'mdi-exit-to-app', text:'Sign Out', route: '/'},
        ]
    }),
    components: { PopUp },
    methods:{
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
    }
}
</script>
