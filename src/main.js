import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "./vee-validate";
import router from "./router";
import store from "./store";
import axios from 'axios';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { apiUrl } from "./config.env"
import VueMask from 'v-mask'

Vue.use(VueMask);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// Vue.use(FadeTransition);

Vue.config.productionTip = false;

//AXIOS SETUP
Vue.prototype.$http = axios.create();
Vue.prototype.$http.defaults.baseURL = apiUrl;
//Интерцептор для обработки unauthorized response
Vue.prototype.$http.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // location.reload()
        console.error(
            `%c Unauthorized Http error %c`,
            "background:#bc1a1a ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
            "background:transparent"
        );
      }

      return Promise.reject(error);
    }
);

//Установка токена авторизации
const token = localStorage.getItem('user-token');
if (token)
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
