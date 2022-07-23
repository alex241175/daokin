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
      <v-btn text to="/rites" exact>儀式</v-btn>
      <v-btn text to="/temples" exact>佛壇</v-btn>
     <v-btn text to="/users" exact>人員</v-btn>
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
};
</script>
<style>
    .hand{
      cursor: pointer;
    }
    .v-data-table td {
      font-size: 1rem !important;
    }

</style>
