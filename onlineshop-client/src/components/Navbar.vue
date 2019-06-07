<template >
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand is-hidden-mobile">
      <figure class="image is-128x128">
        <img  src="../assets/banner.jpg" height="200">
      </figure>
    </div>
    <div class="is-hidden-desktop">
        <a v-if="!currentUser" @click="showRegisterModal" class="button is-link"> Регистрация </a>
        <a  v-if="!currentUser" @click="showLoginModal" class="button is-light">Вход</a>
        <a v-else @click="removeCurrentUser();" class="button is-light">Изход</a>
      </div>
  

    <div id="navbarBasicExample" class="navbar-menu">

     

      <div class="navbar-end">
        


        <div v-if="!currentUser" id="login-register" class="navbar-item">
          <div class="buttons">
            <a @click="showRegisterModal" class="button is-link">
              <strong>Ргистрация</strong>
            </a>
            <!-- <a @click="showLoginModal" class="button is-light">Вход</a> -->
            <a @click="showLoginModal" class="button is-light">Вход</a>
          </div>
        </div>

        <div v-else>
          <div v-if="currentUser.privilege==0" class="dropdown is-hoverable">   <!-- <div class="dropdown" > v-bind:class="{ 'is-active': cartDropdown}"> -->
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                <span class="icon">
                  <i @click="cartDropdown=!cartDropdown" class="fas fa-shopping-cart"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu8" role="menu">
              <div v-if="cart.length>0" class="dropdown-content">
                <div class="dropdown-item cart-item columns" v-for="(item,index) in cart" v-bind:item_id="item.product_id" v-bind:key="index">
                 <figure class="column is-4 image ">
                        <img :src="api+'/img/'+item.image" alt="Placeholder image">
                      </figure>
                      <p class="column is-6" >
                        {{item.name}}
                      </p>
                      <i @click="removeFromCart(index)" class="column is-1 fas fa-times"></i>
                </div>
              </div>
              <div v-else class="dropdown-content">
                <p > количката е празна</p>
              </div>
               
            </div>
          </div>
          Здравей  <a href="#/user/cart">{{currentUser.name}}   </a>
          <a @click="removeCurrentUser();" class="button is-light">изход</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import config from "../../config.js"
import userService from "../services/userService.js";


export default {
  name: "Navbar",
  data(){
    return{
      api:config.API_URL,
      cartDropdown:false
    }
  },
  computed: mapState(["currentUser", "cart"]),
  created() {},
  methods: mapMutations(["removeCurrentUser","showLoginModal","showRegisterModal","removeFromCart"])
};
</script>

<style>
.navbar {
  padding: 0 5%;
}
.cart-item *{
 border-bottom:1px solid gray;
}

.cart-item>i{
  color:red;

}
</style>
