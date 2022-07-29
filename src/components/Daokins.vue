 <template>
    <div>
        <v-row>
            <v-col cols="12">
                <label class="title">求道人</label><v-btn class="mx-2" @click="addDaokin"><v-icon>fa-solid fa-plus</v-icon></v-btn>
            </v-col>
        </v-row>
        <v-simple-table class="mt-2" dense>
            <thead>
                <tr>
                    <th class="text-center">No</th>
                    <th class="text-center">ID</th>
                    <th class="text-center">性別</th>
                    <th class="text-center">姓名</th>
                    <th class="text-center">引師</th>
                    <th class="text-center">職業</th>
                    <th class="text-center">宗教</th>
                    <th class="text-center">年齡</th>
                    <th class="text-center">電話</th>
                    <th class="text-center"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in daokins" :key="item.key">
                    <td style="width: 5%;" class="pa-0">{{ index + 1 }}</td>
                    <td style="width: 10%;" class="pa-0 hand" @click.stop="openDaokinDialog(item)">{{ item.id }}</td>
                    <td style="width: 10%;" class="pa-0">  
                       <v-select :items="['乾','坤','童','女']" autocomplete hide-selected
                            v-model="item.gender" outlined ref="gender_ref"></v-select>
                    </td>
                    <td style="width: 10%;" class="pa-0">  
                        <v-text-field v-model="item.name" outlined ref="name_ref"></v-text-field>
                    </td>
                    <td style="width: 10%;" class="pa-0">  
                        <v-text-field v-model="item.introducer" outlined></v-text-field>
                    </td>
                    <td style="width: 10%;" class="pa-0">  
                        <v-text-field v-model="item.occupation" outlined></v-text-field>
                    </td>
                    <td style="width: 10%;" class="pa-0">  
                        <v-text-field v-model="item.religion" outlined></v-text-field>
                    </td>
                    <td style="width: 10%;" class="pa-0">  
                        <v-text-field v-model="item.age" outlined></v-text-field>
                    </td>
                    <td style="width: 10%;" class="pa-0">  
                        <v-text-field v-model="item.contact" outlined></v-text-field>
                    </td>
                    <td style="width: 15%;" class="pa-0">
                        <v-btn plain @click="updateDaokin(item)"><v-icon>fa-solid fa-floppy-disk fa-sm</v-icon></v-btn>
                        <v-btn plain @click="deleteDaokin(item)"><v-icon>fa-solid fa-xmark fa-sm</v-icon></v-btn>
                        <v-btn plain @click="copyNote(item)"><v-icon>fa-solid fa-note-sticky fa-sm</v-icon></v-btn>
                    </td>
                </tr>
            </tbody>
        </v-simple-table>
        <DaokinDialog  :daokin="selectedDaokin" :visible="showDaokinDialog" @close="closeDaokinDialog" @updateDaokin="updateDaokin"/>
    </div>
</template>
<script>

import DaokinDialog from './DaokinDialog.vue'

export default {
    props: ['rite_id', 'rite'],
    data(){
        return {
            selectedDaokin: {},
        }
    },
    async created(){
        await this.$store.dispatch('getDaokins', this.rite_id)
    },
    components: {
      DaokinDialog
    },
    computed: {
        daokins() {
            return this.$store.getters.daokins
        }
    },
    methods:{
        openDaokinDialog(daokin){
            this.selectedDaokin = {...daokin};  // Spread Syntax deep clone
            this.showDaokinDialog = true
        },
        closeDaokinDialog(){
            this.selectedDaokin = {}
            this.showDaokinDialog = false
        },
        async addDaokin(){
            var new_id = this.rite_id + "01"
            var new_index = 0;
            if (this.daokins.length > 0){
                const last_id = this.daokins.pop().id
                new_id = this.rite_id + (Number(last_id.slice(-2)) + 1).toString().padStart(2, "0");
                new_index = Number(last_id.slice(-2))
            }
            const daokin = {
                id : new_id,
                rite_id : this.rite_id
            }
            await this.$store.dispatch('createDaokin', daokin)
            // console.log('new_index', new_index)
            // this.nextTick(() => {
            //     this.$refs.gender_ref[new_index].focus();  // not working for new row
            // });
           

        },
        async deleteDaokin(daokin){
            await this.$store.dispatch('deleteDaokin', daokin)
            this.$emit("showMessage")
        },
        async updateDaokin(daokin){
            this.selectedDaokin = {}
            this.showDaokinDialog = false
            await this.$store.dispatch('updateDaokin', daokin)
            this.$emit("showMessage")
      },
      copyNote(item){
            var text = '求道人：' +item.gender + ' ' +  item.name + '\n'
            text += '日期（農曆）：公元' + this.rite.year_e + '歲次' + this.rite.year_c +  this.rite.month_c + '月' +  this.rite.day_c + '日' + this.rite.hour_c + '時\n'
            text += '日期（陽曆）：' + this.rite.date_e + '\n'
            text += '引師：' + item.introducer + '\n'
            text += '保師：' + this.rite.guarantor + '\n'
            text += '點傳師：' + this.rite.master + '\n'
            text += '佛壇：' + this.rite.temple
            this.copyToClipboard(text)
      },

        copyToClipboard(text) {
            
            /* write to the clipboard now */
            navigator.clipboard.writeText(text).then(function () {
                alert("Copied to clipboard!");
            })
            .catch(function (error) {
                alert(error);
            });
                    
        }

    }
}
</script>
<style>
.v-input {
  height: 54px !important;
}
</style>
