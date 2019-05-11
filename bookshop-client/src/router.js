import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import ProductView from "./components/ProductView.vue"
import HelloWorld from "./components/HelloWorld.vue"


Vue.use(Router);

export default new Router({
    routes: [
      {
        path: "/login",
        beforeEnter: (to, from, next) => {
          if (!localStorage["token"]){
              store.commit('showLoginModal')
                next();
          }
          else next('');
        }
      },
      {
        path:"/",
        beforeEnter: (to, from, next) => {
            store.commit('setSidebarSection','books')
            next()
          }
      },
      {
          path:"/merch",
          beforeEnter:(to,from,next) => {
              store.commit('setSidebarSection','merch')
              next()
          }
      },
      {
          path:"/product/:id",
          component:ProductView,
          props:true
      },
      {
        path:"*" ,
        beforeEnter:(to,from,next)=>{
          store.commit('removeCurrentProduct')
          next('')
        }

      }
    ]
  });