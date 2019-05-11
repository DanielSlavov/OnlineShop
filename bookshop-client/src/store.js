import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import productService from "./services/productService"

Vue.use(Vuex);

let store=({cart})=>{
  localStorage['cart']=cart
}
let load=()=>{
  return localStorage[localStorage['token']]
}

const getDefaultState = () => {
  return {
      filter:{},
      showLoginModal:false,
      showRegisterModal:false,
      products:[],
      currentProduct:false,
      cart:[],
      currentUser:false,
      sidebarSection:'books'
  }
}

export default new Vuex.Store({
    state: {
      filter:{},
      showLoginModal:false,
      showRegisterModal:false,
      products:[],
      currentProduct:false,
      cart:[],
      currentUser:false,
      sidebarSection:'books'
    },
    mutations: {
      showLoginModal(state){
        state.showLoginModal=true
      },
      hideLoginModal(state){
        state.showLoginModal=false;
      },
      showRegisterModal(state){
        state.showRegisterModal=true
      },
      hideRegisterModal(state){
        state.showRegisterModal=false;
      },
      addToCart(state,product){
        if(localStorage['token']){
          state.cart.push(product);
          store(state.cart);
          alert("added to cart")
         
        }else{
          //router.resolve('#login')
          router.push('login')
          //state.showLoginModal=true;
        }
      },
      setCurrentUser(state,user){
        state.currentUser=user
      },
      setCurrentProduct(state,id){
        console.log(id)
        state.currentProduct=state.products[id]//TODO
      },
      removeCurrentProduct(state){
        state.currentProduct=false;
      },
      removeCurrentUser(state){
        localStorage.clear()
        state.currentUser=false
      },
      removeFromCart(state,id){
        for(let i=0;i<state.cart.length;i++){
          if(state.cart[i].product_id==id){
            state.cart.splice(i, 1);
          }
        }
      },
      setSidebarSection(state,section){
        state.sidebarSection=section
      },
      resetState(state){
        Object.assign(state, getDefaultState())
      },
      fetchBooks(state,filter={authors:[],genres:[]}){
        console.log(filter.genres[0])
          productService.getBooks(filter.authors,filter.genres)
          .then(res=>{
            console.log(res.data)
            state.products=res.data
          })
      },

    },
    actions:{

    }
  })