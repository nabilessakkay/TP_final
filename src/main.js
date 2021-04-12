import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
//import yelp from "../api/yelp";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//import cors from 'cors';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import router from './router'


//const cors= require('cors')
//Vue.use(cors());
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


  



