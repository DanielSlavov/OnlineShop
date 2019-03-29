<template>
<div class="container">   
  <div class=" columns is-multiline is-mobile">


    
    <div v-on:click="displayProduct(index)" v-for="(book,index) in books" :key="book.id" class="card column is-3">
      <div class="card-image">
        <figure class="image is-2by2">
          <img :src="api+'/img/'+book.image" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <strong class="is-4">{{book.name}}</strong>
          </div>
        </div>

        <div class="content">
          <div v-for="(author,index) in book.Authors" :key="index">{{author}}</div>
          <p>{{book.Genres[0]}}</p>
          <br>
          <p class="subtitle is-6">{{book.price}}.00 лв.</p>
        </div>
      </div>
    </div>




     </div>
  <product-view @hideProduct="hideProduct" :showProp="showModal" :product="productToShow"/>
  </div>
</template>

<script>
import productService from "../services/productService.js"
import config from "../../config.js"
import ProductView from "./ProductView.vue"

export default {
  name: "Products",
  components:{
    ProductView
  },
  data(){
      return{
          books:[],
          api:config.API_URL,
          showModal:false,
          productToShow:{}

      }
  },
  props: ['filter'],
  created(){
      this.fetchBooks()
  },
  watch:{
    filter:function(filter){
      console.log(filter)
      this.filter=filter
      this.fetchBooks(filter)
    }
  },
  methods:{
      fetchBooks(filter={authors:[],genres:[]}){
        console.log(filter.genres[0])
          productService.getBooks(filter.authors,filter.genres)
          .then(res=>{
            console.log(res.data)
            this.books=res.data
          })
      },
      displayProduct(index){
        this.productToShow=this.books[index]
        this.showModal=true;
      },
      hideProduct(){
        this.showModal=false;
        this.productToShow={}
      }
  }
};
</script>

<style scoped>

.card-content {
  font-size: 1vw;
  text-align: center;
}

.card{
   box-shadow: none;
   padding-left:2rem;
   padding-right:2rem;
   padding-top: 0;
   
   
}
img{
  /* pointer-events: none; */
  -webkit-user-select: none;
}
</style>
