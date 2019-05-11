<template>
  <div id="app" >
    <router-view></router-view>
    <register-modal v-if="showRegisterModal"/>
    
    <navbar id="navbar" />
    <div id="wrapper" class="columns ">
      <sidebar id="sidebar" @changeFilter="changeFilter" class="column is-one-fifth"/>
      <products id="products" :filter="filter" class="column is-8"/>
    </div>
    <login-modal v-if="showLoginModal" />
    <register-modal v-if="showRegisterModal"/>
    
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Sidebar from "./components/Sidebar.vue";
import Products from "./components/Products.vue";
import LoginModal from "./components/LoginModal.vue"
import Navbar from "./components/Navbar.vue"
import RegisterModal from "./components/RegisterModal.vue"
import ProductView from "./components/ProductView.vue"

import userService from "./services/userService.js"

import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import router from './router'

export default {
  name: "app",
  components: {
    Sidebar,
    Products,
    LoginModal,
    Navbar,
    RegisterModal,
    ProductView

  },
  computed:mapState(['showLoginModal','showRegisterModal']),
  data(){
    return {
      filter:false
    }
  },
  methods:{
    ...mapMutations(['setCurrentUser']),
    changeFilter(filter){
      this.filter=filter 
    }
  },
  created(){
    if(localStorage['token']){
      this.setCurrentUser({})
      userService.getCurrentUser()
      .then(res=>{
        this.setCurrentUser(res.data)
      })
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
  margin-top: 10px;
}
#sidebar{
  margin-top:2vh;
}
#products{
  margin-top:10vh;
  margin-left:3vw;
}
</style>
