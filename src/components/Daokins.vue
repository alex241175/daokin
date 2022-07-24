 <template>
    <div>
        <v-row>
            <v-col cols="12">
                <label>求道人</label><v-btn class="mx-2" @click="addDaokin"><v-icon>fa-solid fa-plus</v-icon></v-btn>
            </v-col>
        </v-row>
        <table>
            <tbody>
                <tr v-for="(item, index) in daokins" :key="item.key" >
                    <td style="width: 5%;">{{ index + 1 }}</td>
                    <td style="width: 10%;">{{ item.id }}</td>
                    <td style="width: 10%;">  
                       <v-select :items="['乾','坤','童','女']" label="性別" autocomplete hide-selected
                            v-model="item.gender"></v-select>
                    </td>
                    <td style="width: 10%;">  
                        <v-text-field label="姓名" v-model="item.name"></v-text-field>
                    </td>
                    <td style="width: 10%;">  
                        <v-text-field label="引師" v-model="item.introducer"></v-text-field>
                    </td>
                    <td style="width: 10%;">  
                        <v-text-field label="職業" v-model="item.occupation"></v-text-field>
                    </td>
                    <td style="width: 10%;">  
                        <v-text-field label="宗教" v-model="item.religion"></v-text-field>
                    </td>
                    <td style="width: 10%;">  
                        <v-text-field label="年齡" v-model="item.age"></v-text-field>
                    </td>
                    <td style="width: 10%;">  
                        <v-text-field label="電話" v-model="item.contact"></v-text-field>
                    </td>
                    <td style="width: 15%;">
                        <v-btn @click="updateDaokin(item)"><v-icon>fa-solid fa-floppy-disk fa-sm</v-icon></v-btn>
                        <v-btn class="mx-2" @click="deleteDaokin(item)"><v-icon>fa-solid fa-xmark fa-sm</v-icon></v-btn>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: ['rite_id'],
    data(){
        return {
        }
    },
    async created(){
        await this.$store.dispatch('getDaokins', this.rite_id)
    },
    computed: {
        daokins() {
            return this.$store.getters.daokins
        }
    },
    methods:{
        async addDaokin(){
            var new_id = this.rite_id + "01"
            if (this.daokins.length > 0){
                const last_id = this.daokins.pop().id
                new_id = this.rite_id + (Number(last_id.slice(-2)) + 1).toString().padStart(2, "0");
            }
            const daokin = {
                id : new_id,
                rite_id : this.rite_id
            }
            await this.$store.dispatch('createDaokin', daokin)
        },
        async deleteDaokin(daokin){
            await this.$store.dispatch('deleteDaokin', daokin)
            this.$emit("showMessage")
        },
        async updateDaokin(daokin){
            await this.$store.dispatch('updateDaokin', daokin)
            this.$emit("showMessage")
      },
    }
}
</script>
<style scoped>

</style>
