<template>
  <div class="columns">
    <aside class="menu column">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <a class="is-active">Books</a>
        </li>
        <li>
          <a>Merch</a>
        </li>
      </ul>
      <p class="menu-label">Genres</p>
      <ul class="menu-list ">
        <li>
          <ul>
            <li class="genres">
              <a v-on:click="clearFilter" >All</a>
              <a v-for="genre in genres " v-on:click="changeFilter" :key="genre.id" :data-key="genre.id">{{genre.name}}</a>
            </li>
          </ul>
        </li>
      </ul>
      <p class="menu-label">Authors</p>
      <ul class="menu-list">
        <li>
          <a>Payments</a>
        </li>
        <li>
          <a>Transfers</a>
        </li>
        <li>
          <a>Balance</a>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import productService from "../services/productService.js";


export default {
  name: "Sidebar",

  data() {
    return {
      genres:[],
      fetched: false,
      active:false
      
    };
  },
  created() {
    this.fetchGenres();
    //this.fetchBooks();
  },
  methods: {
    // fetchBooks() {
    //   productService.getBooks().then(res => {
    //   });
    // },
    fetchGenres(){
      productService.getGenres()
      .then(res=>{
        this.genres=res.data
      })
    },
    changeFilter(event){
      this.active=event.target
      this.$emit('changeFilter', {genres:[event.target.dataset.key]})
    },
    clearFilter(event){
      this.active=event.target
      this.$emit('changeFilter')
    }
  },
  watch:{
    active:function(newEl,oldEl){
      if(oldEl){
        oldEl.classList.remove("is-active")
      }
      newEl.classList.add("is-active")
    }
  }
};
</script>

<style scoped>
/* ::-webkit-scrollbar {
      width:5px;
    } */
.genres{
  /* overflow-x: hidden; */
  overflow-y: scroll;
  height: 35rem;
}
.menu {
  /* width:15%; */
  /* float:left; */
}
</style>
