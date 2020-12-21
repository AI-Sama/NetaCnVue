<template>
  <div id="app">
    <div class="loginPage" v-if="islogin">
      <div>
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="ログイン"> </a-tab-pane>
          <a-tab-pane key="2" tab="アカウント作成" force-render> </a-tab-pane>
        </a-tabs>
        <div>
          <a-input
            style="margin-left: 5%; width: 90%"
            v-model="userName"
            placeholder="账号,只能包含字母数字下划线"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
          <a-input
            style="margin-left: 5%; margin-top: 15px; width: 90%"
            v-model="password"
            placeholder="密码,只能包含字母数字"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </div>
        <div>
          <a-button style="width: 40%; margin: 5%" type="primary">
            登录
          </a-button>
          <a-button
            @click="quxiao"
            style="width: 40%; margin: 4%"
            type="danger"
          >
            取消
          </a-button>
        </div>
      </div>
    </div>
    <div id="head">
      <img src="@/assets/netacn.png" style="height: 25px" />
      <a-tabs default-active-key="1" @change="callback" size="large">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="home" />
            主页
          </span>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="home" />
            主页
          </span>
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab">
            <a-icon type="home" />
            主页
          </span>
        </a-tab-pane>
        <a-tab-pane key="4">
          <span slot="tab">
            <a-icon type="home" />
            主页
          </span>
        </a-tab-pane>
      </a-tabs>
      <div>
        <a-button icon="login" type="primary" @click="login"> 登录 </a-button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      islogin: false,
    };
  },
  methods: {
    quxiao() {
      this.islogin = false;
    },
    login() {
      this.islogin = true;
    },
  },
};
</script>

<style>
#app {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.loginPage {
  position: fixed;
  width: 300px;
  margin: auto;
  margin-top: 300px;
  background-color: white;
  border: 1px rgba(0, 0, 0, 0.075) solid;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  z-index: 10;
}
body {
  background-color: #f3f7f9;
}
#head {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
