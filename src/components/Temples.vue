<template>
   <v-container>
    <v-row class="ma-2">
        <v-col cols="6">
            <v-text-field label=" 查詢佛壇" v-model="query" clearable></v-text-field>
        </v-col>
        <v-col cols="6" class="text-right">
            <v-btn text @click.stop="openTempleDialog({})" exact><v-icon>fa-solid fa-plus</v-icon></v-btn>
        </v-col>
    </v-row>
    <!-- Temples list -->
    <v-simple-table>
      <thead>
        <tr>
          <!-- <th class="text-left" @click="sortBy('id')">No</th> -->
          <th>
               <v-checkbox v-model="selectedAll"></v-checkbox>
          </th>
          <th class="text-left">ID</th>
          <th class="text-left">壇號</th>
          <th class="text-left">壇主姓名</th>
          <th class="text-left">生命體</th>
          <th class="text-left"></th>
        </tr>
      </thead>
       <tbody>
        <tr v-for="(temple) in temples" :key="temple.id" >
            <!-- <td> {{index + 1 }}</td> -->
            <td>
               <v-checkbox v-model="selected" :value="temple.id"></v-checkbox>
            </td>
             <td class="hand" @click.stop="openTempleDialog(temple)">{{ temple.id}} </td>
            <td>
              {{ temple.name}}
            </td>
            <td>{{ temple.host.join(",")}} </td>
            <td>{{ temple.school}} </td>
            <td class="text-right">
                <v-icon @click="deleteTemple(temple)">fa-solid fa-xmark</v-icon>
            </td>
        </tr>
      </tbody>
    </v-simple-table>
    <TempleDialog  :isNew="isNew" :temple="selectedTemple" :visible="showTempleDialog" @close="closeTempleDialog" 
    @updateTemple="updateTemple"
    @createTemple="createTemple"
    />

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

import TempleDialog from './TempleDialog.vue'

export default {
  name: 'Temples',
  data() {
    return {
      query: '',
      isNew: true,
      snackbar : false,
      showTempleDialog : false,
      sortKey: 'id',
      selectedTemple: {},
      defaultTemple: {
          id: '',
          name:'',
          host:['新壇主'],
          school:'',
          address_c:['新表文地址'],
      },
      selected: [],
      top: true,
    }
  },
   components: {
      TempleDialog
  },
  // created() {
  //   this.$store.dispatch('getTemples')
  // },
  methods: {
    openTempleDialog(temple){
        if (temple.id){  // editing
            this.selectedTemple = {...temple} // Spread Syntax deep clone
            this.isNew = false
        }else{   //new 
          this.selectedTemple = {...this.defaultTemple}
          this.isNew = true
        }
        this.showTempleDialog = true
    },
    closeTempleDialog(){
        this.showTempleDialog = false
    },
    async deleteTemple(temple){
      await this.$store.dispatch('deleteTemple', temple)
      this.snackbar = true
    },
    async updateTemple(temple){
      await this.$store.dispatch('updateTemple', temple)
      this.showTempleDialog=false
      this.snackbar = true
    },
    async createTemple(temple){
      await this.$store.dispatch('createTemple', temple)
      this.showTempleDialog = false
      this.snackbar = true
    },
  },
  computed: {
    temples() {
        return this.$store.getters.temples
        .filter( t => {
          if (this.query){
            return t.id.includes(this.query) || t.name.includes(this.query) || t.host.join(',').includes(this.query)
          } else{
            return true
          }
        })
    },
    snackbarText() {
      return this.$store.getters.message
    },
    selectedAll: {
      set(val) {
        this.selected = []
        if (val) {
          this.temples.forEach( temple => {
            this.selected.push(temple.id)
          })
        }
      },
      get() {
        if (this.temples){
            return this.selected.length === this.temples.length
        }
      }
    }
  }
}
</script>