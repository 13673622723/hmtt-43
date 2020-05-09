import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from "axios";

// 绑定到原型
Vue.prototype.$axios = axios;
// 给axios添加地址调用
axios.defaults.baseURL = "http://hmtoutiao-api.atlansic.com"
// axios.defaults.baseURL = "http://localhost:3000"
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
