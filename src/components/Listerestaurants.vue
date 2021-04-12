<template>
    <div>
        <b-container class="search">
            <b-row align-h="start">
            <b-col align-self="start" class="justify-content-start" lg="4">
                <label for="input-search">Restaurant name:</label>
                <b-form-input
                type='text'
                id="input-search"
                v-model="searchText"
                placeholder="search restaurant"/>
            </b-col>
            </b-row>
            <v-col cols="6">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Catégories
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-checkbox
                v-for="(item, i) in categories"
                :key="i"
                :label="item"
                :value="item"
                v-model="filtreBycatagorie"
              >
              </v-checkbox>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        </v-col>
            <input type="checkbox" id="checkbox"
             v-model="filtreCaseAcocher">  Close
         
             <b-row align-h="start">
                 <b-col align-self="start" class="justify-content-start" lg="4">
                 <label for="input-range">Searching Range:{{this.searchRange}}</label>
                 <b-form-input
                    type='range'
                    max="5"
                    min="1"
                    step="1"
                    id="input-range"
                    v-model="searchRange"
                    placeholder="Search restaurant"/>
            </b-col>
            </b-row>

            <b-row align-h="start">
                <b-col align-self="start" class="justify-content-start" lg="4">
                <b-button @click="grabInfo()">Search</b-button>
                 </b-col>
            </b-row>
        </b-container>  
            <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
        <v-container grid-list-sm fluid
        >
        <v-chip-group
                active-class="primary--text"
                column
              >
                <span class="title_categories">Catégories :</span> 
                <v-chip
                  v-for="item in filtreBycatagorie"
                  :key="item"
                  close
                  @click:close="removeCatego(item)"
                >
                  {{ item }}
                </v-chip>
              </v-chip-group>
        <v-layout row wrap>
     <v-flex  v-for="restaurant in restaurantList" :key="restaurant.id" xs4 >
            <v-hover>
    <template v-slot:default="{ hover }">
          <div v-if="restaurant.is_closed == filtreCaseAcocher && (restaurant.categories.some(r => filtreBycatagorie.includes(r.title)) || filtreBycatagorie.length == 0 )" >
      <v-card
        class="mx-auto"
        max-width="344"
      >
        <v-img  height="200px"
        :src="restaurant.image_url"></v-img>

        <v-card-text>
          <h4 class="title primary--text">
            {{restaurant.name}}
          </h4>
          {{restaurant.price}}
        </v-card-text>

        <v-card-title>
      <span class="grey--text text--lighten-2 caption mr-2">
        ({{ restaurant.rating}})
      </span>
          <v-rating
            :value="restaurant.rating"
            dense
            color="orange"
            background-color="orange"
            hover
            class="mr-2"
          ></v-rating>
        </v-card-title>

        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="#036358"
          >
            <v-btn @click="Detail(restaurant.alias)">Détail</v-btn>
            
          </v-overlay>
        </v-fade-transition>
      </v-card>
      </div>
    </template>
  </v-hover>
 
         </v-flex>  
         </v-layout>
        </v-container> 
        </v-card>
      </v-flex>
    </v-layout>  
        

      
    </div>
    
</template>


<script>
import {apiYelp} from '../api/yelp.js';

    export default {
       
        data() {
            return {

                filds:[
                    {key: 'name',sortable:false},
                    {key: 'image_url',sortable:false},
                    {key:'categories',sortable:true},
                    {key:'rating',sortable:true},
                    {key:'price',sortable:true},
                    {key:'location',sortable:false},
                    {key:'display_phone',sortable:false},
                ],
                restaurantList: [],
                searchText:"",
                searchRange: 5,
                categories:[],
                filtreCaseAcocher: false,
                filtreBycatagorie:[],
                errors:[]
            }
        },

        async  created(){       
            try{
                 const restaurantList = await apiYelp.get('businesses/search?term=delis&latitude=37.786882&longitude=-122.399972');
                this.restaurantList = restaurantList.data.businesses;
                console.log(this.restaurantList);
                const cats = await apiYelp.get('categories');
                this.cats = cats.data.categories;
                console.log(this.categories); 
                cats.data.categories.forEach(element => (element.parent_aliases.includes('food') ? this.categories.push(element.title) : ''));
                console.log(this.cats);
                } catch(e){
                    this.errors.push(e)
            } 
         },


        methods: {
            grabInfo(){
                if(this.searchText !=""){
                    apiYelp.get('businesses/search?term='+this.searchText+'&latitude=37.786882&longitude=-122.399972&radius='+this.searchRange+'&limit=40')
                    .then(res =>{
                    if(res){
                        this.restaurantList = res.data.businesses
                        this.searchText=""
                        console.log(this.restaurantList)
                    }
                }).catch(err => {
                    console.log(err)
                });
                }else{
                    alert('Serach bar is empty')
                }
            },
            Detail(id){

                 this.$router.push(`details/${id}`)
            },
            

        }

        }

    

    
</script>

<style lang="scss" scoped>

</style>