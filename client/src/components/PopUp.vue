<template>
    <v-dialog v-model='dialog' persistent width='600px' >
        
        <template v-slot:activator='{ on, attrs }'>
            <v-btn class="mx-2 " fab x-small depressed v-bind="attrs" v-on="on">
                <v-icon >
                    mdi-plus
                </v-icon>
            </v-btn>
        </template>

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
                        <v-carousel height='200' hide-delimiters cycle interval="3000">
                            <v-carousel-item
                            v-for="(image,i) in images"
                            :key="i"
                            :src="image"
                            reverse-transition="fade-transition"
                            transition="fade-transition"
                            ></v-carousel-item>
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
                    @click="resetValues()"
                >
                    Close
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
    name: 'PopUp',
    props: ['BASE_URL', 'loggedUser'],
    data: () => ({
        dialog: false,
        name: '',
        theme: '',
        difficulty: 0,
        build_progress: '',
        image_path: '',
        file_path: null,
        data: null,
        images: [],
        image_count: 0,
    }),
    methods:{
        addImage() {
            this.images.push(this.image_path)
            this.image_count++
            this.image_path = ''
        },
        removeImage(index){
            this.images.splice(index, 1)
        },
        addFile() {

            if (!this.file_path) {this.data = "No File Chosen"}
            let reader = new FileReader();

            reader.readAsText(this.file_path);
            reader.onload = () => {
                this.data = reader.result;
            }

            this.images.push(this.data)
            this.image_count++
            this.file_path = ''
        },
        updateRating(value) {
            this.difficulty = value
        },
        resetValues() {
            this.dialog = false
            this.name = ''
            this.difficulty = 0
            this.theme = ''
            this.build_progress = ''
            this.image_path = ''
            this.images = []
            this.image_count = 0
        },
        async submitSet() {
            const payload = {
                name: this.name,
                picture: this.images,
                difficulty: this.difficulty,
                theme: this.theme,
                build_progress: this.build_progress,
                user_id: this.loggedUser.id
            }
            await axios.post(`${BASE_URL}/app/lego_set/create`, payload)
            this.dialog = false
        }
    }
}
</script>