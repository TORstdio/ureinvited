<template>
    <v-container class="fill-height" fluid>
        <v-card class="mx-auto" width="700">
            <v-card-title>Mi Evento</v-card-title>
            <v-row class="ma-0 pa-4">
                Nombre del Evento
                <v-spacer/>
                Boda
            </v-row>
            <v-divider/>
            <v-row class="ma-0 pa-4">
                Nombre del Evento
                <v-spacer/>
                Boda
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            event:{
                event_name: '',
                title: '',
                category: '',
                main_event_hall_name: '',
                main_event_title: '',
                main_event_address: '',
                ceremony_address: '',
                dresscode: '',
                date: '',
                time: '',
                datetime: '',
                last_day_for_confirmation_date: '',
                user_id: '',
                featured_people:[],
                donations_bank_information:[]
            }
        }
    }
}
</script>

<style>

</style>