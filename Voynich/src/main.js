import Vue from 'vue'
import App from './App.vue'
import router from './routes/index';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueClipboard from 'vue-clipboard2';
import store from './store/index';



Vue.use(BootstrapVue);
Vue.use(VueClipboard);


Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.component('bottom-nav', require('./components/BottomNav').default);
Vue.component('top-nav', require('./components/TopNav').default);
Vue.component('left-nav', require('./components/LeftNav').default);
Vue.component('chat-box', require('./components/ChatBox').default);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app');
