import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import productService from "./services/productService"

Vue.use(Vuex);

let store = ( cart ) => {
  localStorage['cart'] = JSON.stringify(cart)
}
let load = () => {
  if(localStorage['cart']!=undefined)
    return JSON.parse(localStorage['cart'])
  return []
}


const getDefaultState = () => {
  return {
    filter: {},
    showLoginModal: false,
    showRegisterModal: false,
    products: [],
    currentProduct: false,
    cart: [],
    currentUser: false,
    category: false
  }
}

export default new Vuex.Store({
  state: {
    filter: {},
    showLoginModal: false,
    showRegisterModal: false,
    products: [],
    currentProduct: false,
    cart: load(),
    currentUser: false,
    category: false,
    section: "home"
  },
  mutations: {





    showLoginModal(state) {
      state.showLoginModal = true
    },
    hideLoginModal(state) {
      state.showLoginModal = false;
    },


    showRegisterModal(state) {
      state.showRegisterModal = true
    },
    hideRegisterModal(state) {
      state.showRegisterModal = false;
    },


    addToCart(state, product) {
      if (localStorage['token']) {
        state.cart.push(product);
        store(state.cart)
      }
    },

    setCategory(state, category) {
      state.category = category
      this.commit("fetchProducts")
    },

    setCurrentUser(state, user) {
      state.currentUser = user
    },
    setCurrentProduct(state, id) {
      console.log(id)
      console.log(state.products)
      if (id == false) {
        state.currentProduct = false;
        return true;
      }
      state.products.forEach(prod => {
        if (prod.id == id) {
          state.currentProduct = prod
          return true;
        }
      })
      return false;//
    },

    setSection(state, section) {
      if (section == 'home' || section == 'user')
        state.section = section
    },
    removeCurrentProduct(state) {
      state.currentProduct = false;
    },
    removeCurrentUser(state) {
      
      localStorage.clear()
      state.currentUser = false
      router.push('/')
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
      store(state.cart)
    },
    clearCart(state){
      state.cart=[]
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    },
    fetchProducts(state) {
      console.log(state.category)
      productService.getProducts(state.category)
        .then(res => {
          console.log(res.data)
          state.products = res.data
        })
    },
    fetchAllProducts(state) {
      state.category=false;
      productService.getProducts()
        .then(res => {
          console.log(res.data)
          state.products = res.data
        })
    }

  },
  actions: {

  }
})