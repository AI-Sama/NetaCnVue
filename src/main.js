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
Vue.prototype.$getUserInfo = async function () {
  await this.$axios({
    method: "get",
    url: "http://localhost:8080/user/getUserInfo",
  }).then((response) => {
    if (response.data.resultCode == 1) {
      this.$root.userInfo = response.data.resultData;
      this.$root.pb = this.$root.userInfo.wordLimit == 1 ? true : false;
      this.$root.islogin = true;
      this.$root.loadComplete = true;
    }
  });
};
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
    if (response.data.resultCode == '-2') {
      localStorage.removeItem("mydata");
      alert("账号验证已过期，请退出后重新登陆");
      //token过期
    }
    return response
  });

/* eslint-disable no-new */
new Vue({
  created() {
    this.$getUserInfo();
  },
  data() {
    return {
      loadComplete:false,
      userInfo: {},
      pageNum:1,
      pb: true,
      lan: false,
      islogin: false,
    };
  },
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
