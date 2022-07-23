 <template>
    <div>
        <v-row>
            <v-col cols="12">
                <label>{{ name }}</label><v-btn class="mx-2" @click="add"><v-icon>fa-solid fa-plus</v-icon></v-btn>
            </v-col>
        </v-row>
        <v-simple-table>
            <tbody>
                <tr v-for="(item, index) in items" :key="item.key" >
                    <td>{{ index + 1 }}</td>
                    <td>
                        <v-text-field v-model="items[index]"></v-text-field>
                    </td>
                    <td>
                        <v-btn class="mx-2" @click="remove(index)"><v-icon>fa-solid fa-xmark</v-icon></v-btn>
                    </td>
                </tr>
            </tbody>
        </v-simple-table>
    </div>
</template>
<script>
export default {
    props: ['name', 'items'],
    data(){
        return {
        }
    },
    methods:{
        add(){
            this.items.push("");
        },
        remove(index){
             this.items.splice(index,1)
        }
    }
}
</script>
