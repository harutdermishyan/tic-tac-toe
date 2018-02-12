import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import jQuery from 'jquery'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import underscore from 'vue-underscore';
global.$ = jQuery;
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue);
Vue.use(underscore);
Vue.use(VueAxios, axios);

new Vue({
  el: '#app',
  render: h => h(App)
});
