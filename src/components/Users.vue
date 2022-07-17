<template>
   <v-container>
    <v-layout class="ma-2">
        <v-flex>
            <v-btn @click.stop="openUserDialog(selectedUser)" exact>新增人員</v-btn>
        </v-flex>
    </v-layout>
    <!-- Users list -->
    <v-simple-table>
      <thead>
        <tr>
          <!-- <th class="text-left" @click="sortBy('id')">No</th> -->
          <th>
               <v-checkbox v-model="selectedAll"></v-checkbox>
          </th>
          <th class="text-left">姓名</th>
          <th class="text-left">角色</th>
          <th class="text-left"></th>
        </tr>
      </thead>
       <tbody>
        <tr v-for="(user) in users" :key="user.id" >
            <!-- <td> {{index + 1 }}</td> -->
            <td>
               <v-checkbox v-model="selected" :value="user.id"></v-checkbox>
            </td>
            <td class="hand" @click.stop="openUserDialog(user)">
              {{ user.name}}
            </td>
            <td>{{ user.role}} </td>
            <td class="text-right">
                <v-icon @click="deleteUser(user)">fa-solid fa-xmark</v-icon>
            </td>
        </tr>
      </tbody>
    </v-simple-table>
    <UserDialog  :user="selectedUser" :visible="showUserDialog" @close="closeUserDialog" 
    @updateUser="updateUser"
    @createUser="createUser"
    />

    <v-snackbar v-model="snackbar" color="black" top="top" timeout="2000">{{ snackbarText }}</v-snackbar>
   </v-container>
</template>
<script>

import UserDialog from './UserDialog.vue'

export default {
  name: 'Users',
  data() {
    return {
      snackbar : false,
      snackbarText : '',
      showUserDialog : false,
      sortKey: 'id',
      selectedUser: {},
      selected: [],
      top: true,
    }
  },
   components: {
      UserDialog
  },
created() {
    this.$store.dispatch('getUsers')
  },
  methods: {
    openUserDialog(user){
        this.selectedUser = {...user};  // Spread Syntax deep clone
        this.showUserDialog = true
    },
    closeUserDialog(){
        this.selectedUser = {}
        this.showUserDialog = false
    },
    deleteUser(user){
      this.$store.dispatch('deleteUser', user)
      this.$store.dispatch('getUsers')
      this.snarkbarText = "刪除完成"
      this.snarkbar = true
    },
    updateUser(user){
      this.$store.dispatch('updateUser', user)
      this.selectedUser = {}
       this.showUserDialog=false
    },
    createUser(user){
      this.$store.dispatch('createUser', user)
      this.selectedUser = {}
      this.showUserDialog = false
      this.snarkbarText = "新增完成"
      this.snarkbar = true
    },
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    selectedAll: {
      set(val) {
        this.selected = []
        if (val) {
          this.users.forEach( user => {
            this.selected.push(user.id)
          })
        }
      },
      get() {
        if (this.users){
            return this.selected.length === this.users.length
        }
      }
    }
  }
}
</script>