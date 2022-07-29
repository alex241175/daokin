<template>
    <div>
        <v-dialog v-model="show">
            <v-card>
                <v-card-title>
                <h4>修改求道人:{{ daokin.id }}</h4>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                        <v-text-field label="姓名" v-model="daokin.name" clearable></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select :items="['乾','坤','童','女']" autocomplete hide-selected
                            v-model="daokin.gender"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field label="引師" v-model="daokin.introducer" clearable></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="備註" v-model="daokin.remark" clearable></v-text-field>
                        </v-col>
                    </v-row>
                     <v-row>
                        <v-col cols="6">
                            <v-text-field label="輔導員" v-model="daokin.mentor" clearable></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="電話" v-model="daokin.contact" clearable></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field label="年齡" v-model="daokin.age" clearable></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="宗教" v-model="daokin.religion" clearable></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="職業" v-model="daokin.occupation" clearable></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-autocomplete :items="temples" label="學習佛壇" autocomplete hide-selected
                                v-model="daokin.temple_id" 
                                :item-text="getFieldText" item-value="id" menu-props="auto" clearable>
                            </v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  @click="updateDaokin"><v-icon>fa-solid fa-floppy-disk</v-icon></v-btn>
                    <v-btn @click.stop="closeDaokin"><v-icon>fa-solid fa-xmark</v-icon></v-btn>
                </v-card-actions>
          </v-card>
        </v-dialog>
    </div>
</template>
<script>

export default {
    props: ['visible','daokin'],
    data(){
        return {
        }
    },
    computed: {
        show: {
            get(){
                return this.visible
            },
            set(value){
                if (!value) {
                    this.$emit('close')
                }
            }
        },
        temples() {
            return this.$store.getters.temples
        },
        formIsValid() {
            this.daokin.name != '' 
        },
    },
    methods: {
        updateDaokin(){
            this.$emit('updateDaokin',this.daokin)
        },
        closeDaokin(){
            this.$emit('close')
        },
        getFieldText(item)
        {
            return `${item.id} ${item.name} - ${item.host[0]}`
        },
    }

}
</script>