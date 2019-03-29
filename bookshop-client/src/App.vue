<template>
  <div id="app" class="columns">
    <sidebar @changeFilter="changeFilter" class="column is-2"/>
    <products :filter="filter" class="column is-8 is-offset-1"/>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Sidebar from "./components/Sidebar.vue";
import Products from "./components/Products.vue"

export default {
  name: "app",
  components: {
    Sidebar,
    Products
  },
  data(){
    return {
      filter:false
    }
  },
  methods:{
    changeFilter(filter){
      this.filter=filter 
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
