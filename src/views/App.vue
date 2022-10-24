<template>
  <v-app>
    <v-app-bar app color="white">
      <div class="d-flex align-center">
        <img height="40" class="ml-3" src="logo_ureinvited_h.svg"/>
      </div>

      <v-spacer></v-spacer>

      <!--v-btn text class="mx-2" to="/my-event">Mi Evento</v-btn>
      <v-btn text class="mx-2" to="/">Mis Invitados</v-btn-->

      <v-spacer></v-spacer>

      <v-btn @click="logout()" target="_blank" text>
        <v-icon>mdi-account</v-icon>
        <span class="ml-2">{{currentUser.name}}</span>
      </v-btn>
    </v-app-bar>

    <v-main class="px-12 py-6">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed:{
    currentUser:{
      get(){
        return this.$store.state.currentUser.user;
      }
    }
  },
  created(){
    this.$store.dispatch('currentUser/getUser')
  },
  methods:{
    logout(){
      this.$store.dispatch('currentUser/logoutUser')
    }
  }
};
</script>
