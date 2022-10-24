<template>
  <v-card class="elevation-0">
    <v-card-title>
        Lista de Invitados
        <v-spacer></v-spacer>
        <v-btn rounded color="black" dark class="elevation-0 ml-2" @click="activeSearch=!activeSearch">Buscar</v-btn>
        <v-btn rounded color="black" dark class="elevation-0 ml-2" @click="importDialog=true">Importar</v-btn>
    </v-card-title>
    <v-text-field
    @keydown.enter="getDataFromApi()"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        v-if="activeSearch"
        class="mb-6 mx-4"
    ></v-text-field>
    <v-data-table
        :items="invitations" 
        :headers="header"
        :footer-props="{'items-per-page-options':[15, 30, 50, totalInvitations]}"
        :options.sync="options"
        :server-items-length="totalInvitations"
        :loading="loading"
    >
    <template v-slot:[`item.is_confirmed`]="{ item }">
        <v-icon v-if="item.is_confirmed!=true" color="grey"> mdi-close </v-icon>
        <v-icon v-else color="primary"> mdi-check </v-icon>
    </template>
    <template v-slot:[`item.button`]="{ item }">
        <v-btn @click="copyInvitation(item)" small class="elevation-0"><v-icon class="mr-2" small>mdi-link</v-icon>Copiar Invitación</v-btn>
    </template>
    <template v-slot:[`item.reciever_phone`]="{ item }">
        <span @click="sendIvitation(item)">{{item.reciever_phone}}</span>
    </template>
    </v-data-table>
    <v-dialog v-model="importDialog">
        <v-card>
            <vue-dropzone v-if="importDialog" v-on:vdropzone-success="uploadSuccess"  ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        </v-card>
    </v-dialog>
    <v-snackbar :color="snackbar.color" v-model="snackbar.show">
        {{ snackbar.message }}
    </v-snackbar>
  </v-card>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import axios from "axios"
  export default {
    components: {
        vueDropzone: vue2Dropzone
    },
    data () {
      return {
        importDialog:false,
        totalInvitations: 0,
        invitations: [],
        loading: true,
        options: {},
        activeSearch: false,
        search: '',
        header: [
            {text:'Nombre', value:'receiver_name', sortable:false},
            {text:'Invitados', value:'guests_number'},
            {text:'Confirmado', value:'is_confirmed'},
            {text:'WhatsApp', value:'reciever_phone', sortable:false},
            {text:'Email', value:'receiver_email', sortable:false},
            {text:'Mensaje', value:'guest_additional_message', sortable:false},
            {text:'', value:'button', sortable:false},
        ],
        dropzoneOptions: {
            url: process.env.VUE_APP_BACKEND_ROUTE + 'api/v1/invitation/bulk-import',
            headers:{"Authorization":'Bearer ' + localStorage.getItem("session_token")},
            params:{'event_id': 1}
        },
        snackbar: {
            show: false,
            message: null,
            color: null
        },
      }
    },
    computed:{
        currentUser:{
            get(){
                return this.$store.state.currentUser.user;
            }
        }
    },
    watch: {
        options: {
            handler () {
                this.getDataFromApi()
            },
            deep: true,
        },
    },
    methods:{
        sendIvitation(invitation){
            var text1 = 'Hola,%20nos%20es%20grato%20brindarte%20una%20cordial%20invitación%20a%20nuestro%20evento'
            var text2 = 'Te%20agradecemos%20mucho,%20el%20que%20puedas%20confirmar%20en%20la%20misma%20tu%20asistencia.'
            var invitation_link = encodeURIComponent('https://ureinvited.com/rocioygabriela/?' + 'id=' + invitation.id + '&receiver_name=' + invitation.receiver_name + '&guests_number=' + invitation.guests_number)
            if( /Android|iPhone|BlackBerry/i.test(navigator.userAgent) ) {
                var link = "https://wa.me/521"+invitation.reciever_phone+'?text=' + text1 + '%0A%0A' + invitation_link + '%0A%0A' + text2
                location.replace(link, '_blank')
            }else if(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)){
                var link = "https://web.whatsapp.com/send?phone=521"+invitation.reciever_phone+'&text=' + text1 + '%0A%0A' + invitation_link + '%0A%0A' + text2
                location.replace(link, '_blank')
            }else{
                var link = "https://web.whatsapp.com/send?phone=521"+invitation.reciever_phone+'&text=' + text1 + '%0A%0A' + invitation_link + '%0A%0A' + text2
                window.open(link, '_blank')
            }
        },
        uploadSuccess(file, response) {
            this.importDialog = false
            this.getDataFromApi()
            this.snackbar = {
                message: 'Su lista de invitados ha sido importada',
                color: 'success',
                show: true
            }
        },
        getDataFromApi () {
            this.loading = true
            this.apiCall().then(data => {
                this.invitations = data.invitations
                this.totalInvitations = data.total
                this.loading = false
            })
        },
        copyInvitation(invitation){
            var invitation_link = 'https://ureinvited.com/rocioygabriela/?' + 'id=' + invitation.id + '&receiver_name=' + invitation.receiver_name + '&guests_number=' + invitation.guests_number
            navigator.clipboard.writeText(invitation_link);
            this.snackbar = {
                message: 'Invitación Copiada',
                color: 'primary',
                show: true
            }
        },
        apiCall () {
            return new Promise((resolve, reject) => {
                const { sortBy, sortDesc, page, itemsPerPage } = this.options
                var invitations = []
                var total = 0
                var link = ''
                if(sortBy.length === 1){
                    if(sortDesc[0]){
                        link = link + "sort=-" + sortBy[0] + '&'
                    }else{
                        link = link + "sort=" + sortBy[0] + '&'
                    }
                }
                if(this.search!=''){
                    link = link + 'filter[receiver_name]=' + this.search + '&'
                }
                axios.get(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/invitations?" + link + "page=" + page + "&itemsPerPage=" + itemsPerPage).then(response => {
                    console.log(response)
                    invitations = this.mapInvitations(response.data.data)
                    total = total = response.data.meta.total
                    resolve({
                        invitations,
                        total,
                    })
                })
            })
        },
        mapInvitations(items){
            return items
        }
    }
}
</script>

<style scoped>
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>