<template>
   <v-container>
    <v-row class="ma-2">
        <v-col cols="3">
            <v-text-field label="年份" v-model="filterYear" clearable></v-text-field>
        </v-col>
         <v-col cols="6">
            <v-autocomplete :items="temples" label="壇號" autocomplete hide-selected
                  v-model="filterTemple" return-object
                  :item-text="getFieldText" menu-props="auto" clearable>
            </v-autocomplete>
            <!-- <v-text-field label="佛壇" v-model="filterTemple" clearable></v-text-field> -->
        </v-col>
        <v-col cols="3" class="text-right">
            <v-btn text exact @click="getRites"><v-icon>fa-solid fa-angle-right</v-icon></v-btn>
            <v-btn text exact @click="createRite"><v-icon>fa-solid fa-plus</v-icon></v-btn>
        </v-col>
    </v-row>
    <!-- Rites list -->
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
          <th class="text-left">日期</th>
          <th class="text-left"></th>
        </tr>
      </thead>
       <tbody>
        <tr v-for="(rite) in rites" :key="rite.id" >
            <!-- <td> {{index + 1 }}</td> -->
            <td>
               <v-checkbox v-model="selected" :value="rite.id"></v-checkbox>
            </td>
             <td class="hand" @click.stop="openRite(rite.id)">{{ rite.id}} </td>
            <td>
              {{ rite.temple}}
            </td>
            <td>{{ rite.guarantor }} </td>
            <td>{{ rite.date_e }} </td>
            <td class="text-right">
                <v-icon @click="deleteRite(rite)">fa-solid fa-xmark</v-icon>
            </td>
        </tr>
      </tbody>
    </v-simple-table>
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
  name: 'Rites',
  data() {
    return {
      filterYear: this.$store.getters.filterYear,
      filterTemple: this.$store.getters.filterTemple,
      snackbar : false,
      sortKey: 'id',
      selected: [],
    }
  },
  async created(){
      await this.$store.dispatch('getYears')
      await this.$store.dispatch('getTemples')
  },
  methods: {
    getFieldText(item)
    {
      return `${item.id} ${item.name} - ${item.host[0]}`
    },
    openRite(id) {
      this.$router.push('/rite/' + id);
    },
    async getRites(){
        if (!this.filterYear && !this.filterTemple){
          this.$store.commit('setRites', [])
          return
        }
        // to convert null to empty string, vuetify clearable set to null
        if (!this.filterYear) this.filterYear = ""
        if (!this.filterTemple) this.filterTemple = {id:""}

        this.$store.commit('setFilterYear', this.filterYear)
        this.$store.commit('setFilterTemple', this.filterTemple.id)
        await this.$store.dispatch('getRites')
    },
    async deleteRite(rite){
      await this.$store.dispatch('deleteRite', rite)
      this.snackbar = true
    },
    async createRite(){
      if (!this.filterYear){
        alert("請輸入年份。")
        return
      }
      if (!this.filterTemple){
        alert("請輸入佛壇。")
      } 
      await this.getRites()
      const last_id = this.rites[0].id
      const new_id = this.filterYear + this.filterTemple + (Number(last_id.slice(-2)) + 1).toString().padStart(2, "0");
      const year_e = this.years.find( y => y.year == this.filterYear).year_e
      const year_c = this.years.find( y => y.year == this.filterYear).year_c
      const rite = {
        id : new_id,
        temple_id : this.filterTemple,
        year_e,
        year_c,
      }
      await this.$store.dispatch('createRite', rite)
    },
  },
  computed: {
    rites() {
        return this.$store.getters.rites
    },
    years() {
        return this.$store.getters.years
    },
    temples() {
        return this.$store.getters.temples
    },
    snackbarText() {
      return this.$store.getters.message
    },
    selectedAll: {
      set(val) {
        this.selected = []
        if (val) {
          this.rites.forEach( rite => {
            this.selected.push(rite.id)
          })
        }
      },
      get() {
        if (this.rites){
            return this.selected.length === this.rites.length
        }
      }
    }
  }
}
</script>