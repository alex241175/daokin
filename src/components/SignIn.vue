<template>
  <v-container>
     <v-card color="transparent">
        <v-card-title>
        <h4>Sign In</h4>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="6">
                <v-text-field label="User" v-model="username" clearable></v-text-field>
                </v-col>
            </v-row>
              <v-row>
                <v-col cols="6">
                    <v-text-field label="Password" v-model="password" clearable></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="ma-2">
            <v-btn @click="signIn">Sign In</v-btn>
        </v-card-actions>
     </v-card>
    <v-snackbar v-model="snackbar" color="black" bottom>{{ snackbarText }}
       <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          <v-icon>fa-solid fa-xmark</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    name: 'SignIn',

    data: () => ({
      username :'',
      password:'',
      snackbar: false,
    
    }),
    methods: {
      async signIn(){
        const user = {
            username : this.username,
            password : this.password,
        }
        await this.$store.dispatch('signIn', user)
        if (this.snackbarText == "success"){
            this.$router.push('/home');
        }else{
            this.snackbar = true
        }
      },
    },
    computed:{
        snackbarText() {
            return this.$store.getters.message
        },
    }
  }
</script>