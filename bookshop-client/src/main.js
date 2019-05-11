import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store.js'
import router from './router'


Vue.config.productionTip = false 
Vue.config.api="localhost:3002"
Vue.use(Vuex)


// export NODE_ENV=development

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
