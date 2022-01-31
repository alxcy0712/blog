import Vue from 'vue'
import VueRouter from 'vue-router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import routers from "./router.js";
import request from "./utils/request";


Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(elementUI)
Vue.use(VueRouter)
Vue.use(vueAxios, axios)


const router = new VueRouter({
  mode: 'history',
  routes: routers
})

const whiteWebsite = [
  "/register",
  "/mainPage"
];

function isInWhiteWebsite(l) {
  for (let i = 0; i < whiteWebsite.length; i++) {
    if (l === whiteWebsite[i]) {
      return true;
    }
  }
  return false;
}

router.beforeEach((to, from, next) => {
  //跳转前的登录拦截
  if (sessionStorage.getItem('user') && to.path !== '/logout') {
    next()
  } else {
     if(to.path === '/logout'){
       const user = sessionStorage.getItem("user");
       request.post("/logout", user);
      sessionStorage.removeItem('user');
      next('/login')
    }else{
      if (to.path === '/login') {
        next()
      } else if (isInWhiteWebsite(to.path)) {
        next()
      } else {
        next('/login')
      }
    }
  }

})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
})
