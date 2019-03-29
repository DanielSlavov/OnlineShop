import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.api="localhost:3002"
Vue.use(Vuex)

new Vue({
  render: h => h(App),
}).$mount('#app')
