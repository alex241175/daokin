<template>
  <v-container>
    <v-row class="ma-2">
        <v-col cols="4">
            <v-text-field label="求道人" v-model="filterDaokin" clearable></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-text-field label="引師" v-model="filterIntroducer" clearable></v-text-field>
        </v-col>
        <v-col cols="4" class="text-right">
            <v-btn text exact @click="findDaokins"><v-icon>fa-solid fa-angle-right</v-icon></v-btn>
        </v-col>
    </v-row>
    <v-simple-table class="ma-4">
        <thead>
            <tr>
                <th class="text-center">No</th>
                <th class="text-center">ID</th>
                <th class="text-center">性別</th>
                <th class="text-center">姓名</th>
                <th class="text-center">引師</th>
                <th class="text-center">備註</th>
                <th class="text-center">電話</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in daokins" :key="item.key">
                <td style="width: 5%;">{{ index + 1 }}</td>
                <td style="width: 10%;" class="hand" @click.stop="openRite(item)">{{ item.id }}</td>
                <td style="width: 10%;" class="text-center">  
                   {{ item.gender  }}
                </td>
                <td style="width: 10%;" class="text-center">  
                    {{ item.name }} 
                </td>
                <td style="width: 10%;" class="text-center">  
                    {{ item.introducer }}
                </td>
                <td style="width: 15%;" class="text-center">  
                    {{ item.contact }}
                </td>
               <td style="width: 40%;" class="text-center">  
                    {{ item.remark }}
                </td>
            </tr>
        </tbody>
    </v-simple-table>

  </v-container>
</template>

<script>
  export default {
    name: 'Find',

    data: () => ({
        filterDaokin:'',
        filterIntroducer:'',
    
    }),
    computed: {
        daokins() {
            return this.$store.getters.foundDaokins
        }
    },
    methods:{
        async findDaokins(){
            if (!this.filterDaokin && !this.filterIntroducer){   //empty parameter
                this.$store.commit('setFoundDaokins', [])
                return
            }
            // to convert null to empty string, vuetify clearable set to null
            if (!this.filterDaokin) this.filterDaokin = ""
            if (!this.filterIntroducer) this.filterIntroducer = ""

            const query = {
                daokin : this.filterDaokin.trim(),
                introducer : this.filterIntroducer.trim()
            }
            await this.$store.dispatch('findDaokins', query)
        },
        openRite(item) {
            this.$router.push('/rite/' + item.id.slice(0,9));
        },
    }
  }
</script>