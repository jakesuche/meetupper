  
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'
import moment from 'moment'
import store from './store/index'
import vuelidate from 'vuelidate'
import Toasted from 'vue-toasted'




Vue.config.productionTip = false

// Vue.config.devtools = false
// Vue.config.debug = false
// Vue.config.silent = true

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)

Vue.use(vuelidate)
Vue.use(Toasted)


Vue.filter('capitalize', function(value){
  if(value && typeof value === "string"){
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return ''
})



Vue.filter('formatDate', function(value,  formatType = "LL"){
  if(!value)return ""

  return moment(value).format(formatType)
})

new Vue({
  router,
 
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app')