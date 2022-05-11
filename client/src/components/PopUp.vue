<template>
    <v-dialog v-model='dialog' persistent width='600px' >
        
        <!-- <v-tooltip bottom > -->
            <template v-slot:activator='{ on, attrs }'>
                <v-btn class="mx-2 " fab x-small depressed v-bind="attrs" v-on="on">
                    <v-icon >
                        mdi-plus
                    </v-icon>
                </v-btn>
            </template>
            <!-- <span>Post a new lego set build</span> -->
        <!-- </v-tooltip> -->

        <v-card>
            <v-card-title>
                <div class='text-h1-substitle-1'>Add Your Lego Set</div>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4" >
                        <v-text-field
                        label="Name of Lego Set *"
                        :v-model='name' 
                        :rules="[() => !!name || 'This field is required']"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">              
                        <v-text-field
                        label="Theme *"
                        hint="Star Wars, Disney, Marvel, etc."
                        persistent-hint
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <div class='text-overline ' >Build Difficulty</div>
                        <v-rating
                        :value='difficulty'
                        :rules="[() => difficulty > 0 || 'This field is required']"
                        size='15'
                        dense
                        ></v-rating>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                        label="Describe Your Build Progress *"
                        required
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                        :items="['0-17', '18-29', '30-54', '54+']"
                        label="Age*"
                        required
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" >
                        <v-autocomplete
                        :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                        label="Interests"
                        multiple
                        ></v-autocomplete>
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        name: '',
        picture: '',
        difficulty: 0,
        theme: '',
        build_progress: '',
        images: [],
    })
    
}
</script>