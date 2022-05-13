<template>
    <v-dialog v-model='dialog' persistent width='600px' >
        
        <template v-slot:activator='{ on, attrs }'>
            <v-btn fab depressed @click='editSet(set.id)' color='white' v-bind="attrs" v-on="on">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                <div class='text-h1-substitle-1'>Edit Your Lego Set</div>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4" >
                        <v-text-field
                        label="Name of Lego Set *"
                        v-model='name' 
                        :rules="[() => !!name || 'This field is required']"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">              
                        <v-text-field
                        label="Theme *"
                        v-model='theme'
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
                        @input='updateRating($event)'
                        size='15'
                        dense
                        ></v-rating>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                        label="Describe Your Build Progress *"
                        v-model='build_progress'
                        required
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-carousel height='200' hide-delimiters cycle>
                            <v-carousel-item
                            v-for="(image,i) in images"
                            :key="i"
                            reverse-transition="fade-transition"
                            transition="fade-transition"
                            style="object-fit:cover"
                            >
                            <v-img :src="image" contain height='200px'></v-img>
                            </v-carousel-item>
                        </v-carousel>
                    </v-col>
                    <v-col cols="12" sm="6" >
                        <v-text-field
                        label="Image URL of Lego Set *"
                        v-model='image_path' 
                        :rules="[() => image_count > 0 || 'This field is required']"
                        append-outer-icon='mdi-send'
                        @click:append-outer='addImage()'
                        required
                        ></v-text-field>
                        <!-- <template>
                        <v-file-input
                            accept="image/*"
                            label="Upload Images"
                            small-chips 
                            multiple
                            append-outer-icon='mdi-send'
                            @click:append-outer='addImage()'
                        ></v-file-input>
                        </template> -->
                        <v-chip
                        v-for="(image, i) in images"
                        :key="i"
                        class="ma-2"
                        close
                        color="red"
                        text-color="white"
                        @click:close="removeImage(i)"
                        >
                        Image {{i+1}}
                        </v-chip>
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
                    @click="close()"
                >
                    Close
                </v-btn>
                <v-btn
                    color="red darken-1"
                    text
                    @click="deleteSet()"
                >
                    Delete
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="submitSet()"
                >
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
import axios from "axios"

const BASE_URL = 'http://localhost:3001'

export default {
    name: 'EditPopUp',
    props: ['id', 'names', 'pictures', 'difficultys', 'themes', 'build'],
    data: () => ({
        dialog: false,
        name: '',
        theme: '',
        difficulty: 0,
        build_progress: '',
        image_path: '',
        images: [],
        image_count: 0,
    }),
    mounted() {
        this.setValues()
        this.initialImage()
    },
    methods:{
        initialImage() {
            this.images = this.image_path
            this.image_count = this.image_path.length
            this.image_path = []
        },
        updateRating(value) {
            this.difficulty = value
        },
        close() {
            this.dialog = false
        },
        async deleteSet() {
            await axios.delete(`${BASE_URL}/app/lego_set/delete/${this.id}`)
            this.dialog = false
        },
        setValues() {
            this.name =  this.names
            this.theme =  this.themes
            this.difficulty =  this.difficultys
            this.build_progress =  this.build
            this.image_path =  this.pictures
        },
        async submitSet() {
            const payload = {
                name: this.name,
                picture: this.images,
                difficulty: this.difficulty,
                theme: this.theme,
                build_progress: this.build_progress,
                user_id: 1
            }
            await axios.put(`${BASE_URL}/app/lego_set/update/${this.id}`, payload)
            this.dialog = false
        },
    }
}
</script>