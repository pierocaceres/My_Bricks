<template>
    <div class='d-inline-flex'>
        <v-avatar color='primary' size='52'>
            <span class="white--text">{{editUser.User.username[0].toUpperCase()}}</span>
        </v-avatar>
        <div class='pl-5' v-if="!edit">{{editUser.response}}</div>
        <!-- Change the user_id of the loggedin user -->
        <v-icon right v-if="editUser.user_id == 1 && !edit" @click="edit = !edit">mdi-pencil</v-icon>
        <v-form v-if='edit' style='width: 100%' class='pl-5' @submit="submitComment">
            <v-text-field
                v-model="editComment"
                :append-outer-icon="editComment ? 'mdi-delete' : ''"
                :append-icon="editComment ? 'mdi-send' : ''"
                filled
                clearable
                type="text"
                @click:clear='resetValue'
                @click:append='submitComment'
                @click:append-outer='deleteComment'
            ></v-text-field>      
        </v-form>
    </div>
    
</template>

<script>
import axios from "axios"

export default {
    name:'CommentComp',
    props: ['user', 'BASE_URL', 'getSet' ],
    data: () => ({
        edit: false,
        editUser: {},
        editComment: ''
    }),
    mounted() {
        this.initializeValue()
    },
    methods: {
        // getSet() {
        //     this.$emit('getSet')
        // },
        async initializeValue() {
            this.editUser = this.user
            this.editComment = this.editUser.response
        },
        resetValue() {
            this.editComment = this.editUser.response
            this.edit = !this.edit
        },
        async submitComment(){
            const payload = {
                response: this.editComment
            }
            await axios.put(`${this.BASE_URL}/app/comment/edit/${this.editUser.id}`, payload)

            // this.getSet()
            // this.edit = false
            window.location.reload()
            
        },
        async deleteComment() {
            await axios.delete(`${this.BASE_URL}/app/comment/delete/${this.editUser.id}`)
            this.getSet()
        }

    }
}
</script>