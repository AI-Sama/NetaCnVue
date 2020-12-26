// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import md5 from 'js-md5';
import axios from 'axios';
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;
Vue.prototype.islogin = false;
Vue.use(Antd);
Vue.config.productionTip = false
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('mydata')) {
      //在请求头加入token
      config.headers.token = localStorage.getItem('mydata');
    }
    return config;
  });
  axios.interceptors.response.use(
    response => {
     // 定时刷新access-token
     if (response.data.resultCode == '-1') {
         //token过期
     }
     return response
    });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
