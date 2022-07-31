<template>
  <v-container>
    <v-row class="text-center">
        <v-col cols="6">
        <vue-excel-xlsx :data="daokins" :columns="daokins_columns" :file-name="'daokins'"
        :file-type="'xlsx'" :sheet-name="'sheetname'">下載 daokins</vue-excel-xlsx>
      </v-col>
      </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Export',
    data: () => ({
        daokins_columns : [
            { label: "ID",field: "id",},
            { label: "求道人姓名", field: "name",},
        ],
    }),
    created(){
        this.$store.dispatch('getAllDaokins')
    },
    computed: {
        daokins() {
            return this.$store.getters.daokins
        }
    },
  }
</script>