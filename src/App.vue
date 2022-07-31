<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
       <v-toolbar-title>
         <v-btn plain to="/" x-large>道親系統</v-btn>
        </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text to="/find" exact>查找</v-btn>
      <v-btn text to="/rites" exact>儀式</v-btn>
      <v-btn text to="/temples" exact>佛壇</v-btn>
      <v-btn v-if="userIsAdmin" text to="/users" exact>人員</v-btn>
      <v-btn v-if="userIsAdmin" text to="/export" exact>Excel</v-btn>
      <v-btn v-if="!userIsAuthenticated" text to="/signin" exact>Sign In</v-btn>
      <v-btn v-if="userIsAuthenticated" text @click="signOut" exact>Sign Out</v-btn>
      <span v-if="userIsAuthenticated">{{ username }}</span>

    </v-app-bar>

    <v-main>
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
  created() {
    this.$store.dispatch('getTemples')
  },
   computed:{
    username(){
      return this.$store.getters.user.username
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsAdmin() {
      return (
        this.$store.getters.user !== null && this.$store.getters.user.role == 'admin'
      );
    },
  },
  methods:{
    signOut(){
        this.$store.dispatch('signOut')
        this.$router.push('/signin');
    }

  }
};
</script>
<style>
    .hand{
      cursor: pointer;
    }
    body {
      font-size: 0.8rem !important;
    }

</style>
