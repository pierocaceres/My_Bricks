<template>
    <nav>
        <v-toolbar app>
            <v-app-bar-nav-icon @click="showDrawer()" class='d-md-none d-lg-flex'></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase">
                <span class="font-weight-light">My</span>
                <span>Bricks</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
                <div class='d-none d-md-flex' v-for='link in links' :key='link.text'>
                    <v-btn plain v-if="user"> 
                        <span>{{link.text}}</span>
                        <v-icon right>{{link.icon}}</v-icon>
                    </v-btn>
                </div>
        </v-toolbar>

        <v-navigation-drawer app temporary v-model="drawer" >
            <v-list>
                <v-list-item v-for='link in links' :key='link.text' router :to='link.route'>
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

export default {
    data: () => ({
        user: true,
        drawer: false,
        links: [
            {icon: 'mdi-account-box', text:'Profile', route: '/profile'},
            {icon: 'mdi-exit-to-app', text:'Sign Out', route: '/'},
        ]

    }),
    methods:{
        showDrawer(){
            if(this.drawer){this.drawer = false}
            else{ this.drawer = true}
        } 
    }
    
}
</script>
