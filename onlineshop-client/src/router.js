import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import Products from "./views/Products.vue"
import Cart from "./views/Cart.vue"
import PastOrders from "./views/PastOrders.vue"
import ProductView from "./components/ProductView.vue"
import Orders from "./views/admin/Orders.vue"
import Sales from "./views/admin/Sales.vue"
import AddProduct from "./views/admin/AddProduct.vue"

function adminGuard(to, from, next) {
  if (!localStorage['token']) {
    store.commit("showLoginModal")
    next(from.path)
  }
  else if(store.state.currentUser.privilege==0){
    next('/');

  }else{
    next()
  }
}
function userGuard(to, from, next){
  if (!localStorage['token']) {
    store.commit("showLoginModal")
    next(from.path)
  }
  else if(store.state.currentUser.privilege==1){
    next('/');

  }else{
    next()
  }
}



Vue.use(Router);



export default new Router({

  routes: [
    {
      path: "/",
      name: "home",
      component: Products,
      // beforeEnter: (to, from, next) => {
      //   //store.commit('setCurrentProduct', false)
      //   // store.commit('setSection', 'home')
      //   next()
      // }
    },
    {
      path: "/user",
      component: {
        render(c) { return c('router-view') }
      },
      beforeEnter:userGuard,
      children: [
        {
          path: "/user/past-orders",
          component: PastOrders,
          beforeEnter:userGuard

        },
        {
          path: "/user/cart",
          component: Cart,
          beforeEnter:userGuard
        },
        {
          path:"/user/order",
          component:PastOrders,
          beforeEnter:userGuard
        }
      ]
    },{
      path: "/admin",
      component: {
        render(c) { return c('router-view') }
      },
      beforeEnter:adminGuard,
      children: [
        {
          path: "/admin/orders",
          component: Orders,
          beforeEnter:adminGuard

        },
        {
          path: "/admin/sales",
          component: Sales,
          beforeEnter:adminGuard
        },
        {
          path:"/admin/addproduct",
          component:AddProduct,
          beforeEnter:adminGuard
        }
      ]
    },

    {
      path: "/product/:id",
      name:"productView",
      components:{productView:ProductView},
      props:{productView:true}
    },
    {
      path: "/test",
      component: Products
    }
  ]
});