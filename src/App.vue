<template>
  <v-app>
    <v-main>
      <app v-if="token!=null"></app>
      <login v-else></login>
    </v-main>
    <v-snackbar top :value="updateExists" color="primary" timeout="999999999" style="margin-top:-72px;" content-class="py-1"><!--updateExists-->
      <span style="font-size:16px;">Hay una actualización disponible!</span>
      <v-btn class="ml-4 elevation-0" small style="margin-top:-4px;" color="white" light @click="refreshApp">
        Actualizar
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import update from './mixins/update'
import axios from "axios"
import App from "../src/views/App"
import Login from "../src/views/Login"
export default {
  mixins: [update],
  name: 'App',
  components:{ 
    'app':App, 
    'login':Login,
  },
  data: () => ({
    token:localStorage.getItem("session_token"),
  }),
  mounted(){
    axios.get(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/user/current").catch(error => {
      localStorage.removeItem("session_token");
      this.token = null
    });
  },
};
</script>
