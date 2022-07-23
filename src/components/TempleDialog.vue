<template>
    <div>
        <v-dialog v-model="show">
            <v-card>
                <v-card-title>
                <h4>{{ isNew ? '新增佛壇' : '修改佛壇' }}</h4>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="ID" :disabled="!isNew" v-model="temple.id" clearable></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                            <v-col cols="12">
                            <v-text-field label="壇號" v-model="temple.name" clearable></v-text-field>
                            </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <CustomList name="壇主" :items="temple.host"></CustomList>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                        <v-text-field label="生命體" v-model="temple.school" clearable></v-text-field>
                        </v-col>
                    </v-row>
                     <v-row>
                        <v-col cols="12">
                            <CustomList name="表文地址" :items="temple.address_c"></CustomList>
                        </v-col>
                    </v-row>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  @click="updateTemple"><v-icon>fa-solid fa-floppy-disk</v-icon></v-btn>
                    <v-btn @click.stop="closeTemple"><v-icon>fa-solid fa-xmark</v-icon></v-btn>
                </v-card-actions>
          </v-card>
        </v-dialog>
    </div>
</template>
<script>

import CustomList from './CustomList.vue'

export default {
    props: ['visible','temple','isNew'],
    data(){
        return {
        }
    },
    components: {
      CustomList
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
        formIsValid() {
            this.temple.name != '' 
        },
    },
    methods: {
        updateTemple(){
            if (this.isNew){
                this.$emit('createTemple',this.temple)
            }else{
                this.$emit('updateTemple',this.temple)
            }
        },
        closeTemple(){
            this.$emit('close')
        }
    }

}
</script>