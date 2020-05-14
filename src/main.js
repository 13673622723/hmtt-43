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

// 添加一个路由守卫
// to：即将要访问的页面
// from：即将要离开的页面
// next：必须要调用，next类似于nodejs的中间件，调用才会加载后面的
router.beforeEach((to, from, next) => {
  // 判断是否去的个人中心页 ,那么就要判断是否是登录状态，也就是是否有token，有token，就去个人中心，如果没有，就跳转到登录页
  // 如果不是去的个人中心页，就随便，不阻拦
  if (to.path === "/personal") {
    // 如果本地的数据就null，null是没有token，那么就给个判断，如果没有，就给个空对象
    // 空对象的话，肯定就没有token了，没有token就不会执行if判断，就会执行else，跳转到登录页
    const userJson = JSON.parse(localStorage.getItem('userInfo')) || {};
    // 判断是否有登录的状态，也就是有没有token
    if (userJson.token) {
      next()
    } else {
      // 跳转到登录也
      next('/login')
    }
  } else {
    next()
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
