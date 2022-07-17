<template>
    <div>
        <v-dialog v-model="show">
            <v-card>
                <v-card-title>
                <h4>{{ user.id ? '修改' : '新增' }}</h4>
                </v-card-title>
                <v-card-text>
                    <v-row>
                            <v-col cols="12">
                            <v-text-field label="姓名" v-model="user.name" clearable></v-text-field>
                            </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                        <v-text-field label="Password" v-model="user.password" clearable></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                            <v-col cols="12">
                            <v-text-field label="角色" v-model="user.role" clearable></v-text-field>
                            </v-col>
                    </v-row>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  @click="updateUser"> {{ user.id ? '修改' : '新增' }}</v-btn>
                    <v-btn @click.stop="show = false">X</v-btn>
                </v-card-actions>
          </v-card>
        </v-dialog>
    </div>
</template>
<script>

export default {
    props: ['visible','user'],
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
        formIsValid() {
            this.user.name != '' 
        },
    },
    methods: {
        updateUser(){
            if (this.user.id){
                this.$emit('updateUser',this.user)
            }else{
                this.$emit('createUser',this.user)
            }
        }
    }

}
</script>