<template>
  <div id="app" >
    <!-- <register-modal v-if="showRegisterModal"/> -->
    <router-view name='productView'></router-view>
    <navbar id="navbar" />
    <div id="wrapper" class="columns ">
      <sidebar id="sidebar" @changeFilter="changeFilter" class="column is-one-fifth"/>
      <router-view id="view"  class="column is-8" />
    </div>
    <login-modal v-if="showLoginModal" />
    <register-modal v-if="showRegisterModal"/>
    <notifications position="top center" />
  </div>
</template>

<script>

import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import router from './router'


import Sidebar from "./components/Sidebar.vue";
import LoginModal from "./components/LoginModal.vue"
import Navbar from "./components/Navbar.vue"
import RegisterModal from "./components/RegisterModal.vue"
import ProductView from "./components/ProductView.vue"

import userService from "./services/userService.js"

// import {mapState} from 'vuex'
// import {mapMutations} from 'vuex'
// import router from './router'

export default {
  name: "app",
  components: {
    Sidebar,
    LoginModal,
    Navbar,
    RegisterModal,
    ProductView

  },
  computed:mapState(['showLoginModal','showRegisterModal','currentProduct','section']),
  data(){
    return {
      filter:false,
      location:location.hash
    }
  },
  methods:{
    ...mapMutations(['setCurrentUser','removeCurrentUser']),
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
      }).catch(err=>{
        this.removeCurrentUser()
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
#view{
  margin-top:5vh;
  margin-left:3vw;
}
</style>
