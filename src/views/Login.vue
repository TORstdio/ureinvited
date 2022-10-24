<template>
  <v-container class="ma-0 pa-0" style="max-width: 100vw;">
    <v-row class="ma-0">
      <v-col cols="5" style="height:100vh;" class="pa-0 background50">
        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_9ti102vm.json"  background="transparent"  speed="1"  style="width: 60vw; max-height: 100vh; margin-right:-10vw;"  loop autoplay></lottie-player>
      </v-col>
      <v-col cols="7" class="pl-12 bg-white">
        <v-container class="fill-height ml-4" fluid>
          <div class="mx-auto">
            <img width="250" class="mb-4 ml-3" style="filter: brightness(0);" src="logo_ureinvited_h.svg"/>
            <v-card class="pa-6" width="500">
              <v-card-title>Iniciar Sesión</v-card-title>
              <v-card-text class="px-0 pb-0">
                    <v-form>
                      <v-text-field 
                      :rules="[rules.required, rules.email]"
                      @keydown.enter="login" class="blanco" label="Correo Electrónico" name="login" type="email" v-model="user.email" aria-describedby="emailHelp" outlined></v-text-field>
                      <v-text-field 
                      class="blanco"
                      :rules="[rules.required]"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      name="password"
                      label="Contraseña"
                      @click:append="show1 = !show1"
                      @keydown.enter="login" v-model="user.password" outlined></v-text-field>
                    </v-form>
                  </v-card-text>
                  
                  <v-card-actions class="pa-0">
                    <v-spacer></v-spacer>
                    <v-btn block rounded dark color="#6e53cf" type="submit" @click="login" class="btn btn-primary px-4 "><strong>Acceder</strong></v-btn>
                  </v-card-actions>
            </v-card>
          </div>
        </v-container>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
export default {
  data:()=>({
    alerta: false,
    show: false,
    show1: false,
    password: 'Password',
    rules: {
        required: value => !!value || 'Contraseña requerida.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail inavlido.'
        }
    },
    user:{
        email: "",
        password: "",
    }
  }),
  methods:{
    login(){
      this.$store.dispatch('currentUser/loginUser', this.user );
      this.alerta = localStorage.getItem("nosepudo")
    }, 
  }
}
</script>

<style>
.background50{
    height: 100vh;
    background: #adabe1;
    background-image: url(https://www.umrahtrip.com/assets/images/about-akbar-left-bg.png);
    background-size: cover;
}
.bg-white {
    height: 100vh;
    background-image: url(/invitation.png);
    background-size: initial;
    background-position: bottom right;
    box-shadow: inset 0 0 0 1000px rgb(255 255 255 / 95%);
}
</style>