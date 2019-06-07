import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store.js'
import router from './router'
import Notifications from 'vue-notification'


Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}



Vue.config.productionTip = false 
Vue.config.api="localhost:3002"
Vue.use(Vuex)
Vue.use(Notifications)




// export NODE_ENV=development

new Vue({
  store:store,
  router,
  render: h => h(App)
}).$mount('#app')
