<template>
    <div>
        <v-card  class="ma-2 pa-2" outlined color="transparent">
            <v-card-title>
                <h4>儀式 {{ rite.id + ' [' + rite.temple_id + '-' + rite.temple + ']' }}</h4>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="2">
                        <v-select :items="years" label="公元" autocomplete hide-selected
                            v-model="rite.year_e" item-text="year_e" item-value="year_e"></v-select>
                    </v-col>
                    <v-col cols="2">
                        <v-combobox :items="years" label="歲次" autocomplete hide-selected 
                            v-model="rite.year_c" item-text="year_c" item-value="year_c" menu-props="auto">
                        </v-combobox>
                    </v-col>
                    <v-col cols="2">
                        <v-select :items="months" label="月" autocomplete hide-selected
                            v-model="rite.month_c"></v-select>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field label="日" v-model="rite.day_c"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-select :items="hours" label="時" autocomplete hide-selected
                            v-model="rite.hour_c"></v-select>
                    </v-col>
                    <v-col cols="2">
                         <v-text-field label="日期" type="date" v-model="rite.date_e"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2">
                         <v-text-field label="點傳師" v-model="rite.master"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                         <v-text-field label="保師" v-model="rite.guarantor"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                         <v-text-field label="上禮" v-model="rite.upline"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                         <v-text-field label="下禮" v-model="rite.downline"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                         <v-text-field label="前言" v-model="rite.introduction"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                         <v-text-field label="三寶" v-model="rite.three_treasure"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10">
                        <!-- <v-text-field label="表文地址" v-model="rite.address_c"></v-text-field> -->
                         <v-select :items="address_c" label="表文地址" autocomplete hide-selected
                            v-model="rite.address_c"></v-select>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field label="點數" v-model="rite.total"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  @click="updateRite"><v-icon>fa-solid fa-floppy-disk</v-icon></v-btn>
                <v-btn to="/rites"><v-icon>fa-solid fa-xmark</v-icon></v-btn>
            </v-card-actions>
        </v-card>
        <v-card class="ml-4 pa-2" outlined color="transparent">
            <Daokins :rite_id="id" @showMessage="snackbar=true"/>
        </v-card>
        <v-snackbar v-model="snackbar" color="black" bottom>{{ snackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="snackbar = false">
                <v-icon>fa-solid fa-xmark</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>

import Daokins from './Daokins.vue'

export default {
  name: 'Rite',
  props:  ['id'],
  data() {
    return {
        snackbar : false,
        months: this.$store.getters.months,
        hours: this.$store.getters.hours,
    }
  },
  async created(){
      await this.$store.dispatch('getRite', this.id)
  },
  components: {
      Daokins
  },
  methods: {
      async updateRite(){
            await this.$store.dispatch('updateRite', this.rite)
            this.snackbar = true
      },
  },
  computed: {
    rite() {
        return this.$store.getters.rite
    },
    years() {
        return this.$store.getters.years
    },
    address_c(){
        return this.$store.getters.temples.find(t=> t.id == this.rite.temple_id).address_c
    },
    snackbarText() {
      return this.$store.getters.message
    },

  }
}

</script>