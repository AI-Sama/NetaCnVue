<template>
  <div id="app">
    <div class="loginPage" v-if="islogin">
      <div>
        <a-tabs default-active-key="1" @change="loginCallback">
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
          <a-button @click="quedin" style="width: 40%; margin: 5%" type="primary">
            {{lgText}}
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
      <div>
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item  @click="caidan"  key="home"> <a-icon type="home" />主页 </a-menu-item>
          <a-menu-item  @click="caidan" key="tags"> <a-icon type="tags" />标签 </a-menu-item>
          <a-menu-item @click="caidan" key="plus"> <a-icon type="plus" />新增 </a-menu-item>
          </router-link>
          <!-- <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper"
              ><a-icon type="global" />言语</span
            >
              <a-menu-item key="1"> 中文 </a-menu-item>
              <a-menu-item key="2"> 日语 </a-menu-item>
          </a-sub-menu> -->
          <!-- <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper"
              ><a-icon type="stop" />限制</span
            >
              <a-menu-item key="1"> 开启 </a-menu-item>
              <a-menu-item key="2"> 关闭 </a-menu-item>
          </a-sub-menu> -->
        </a-menu>
      </div>
      <div>
        <a-button icon="global">日语</a-button>
        <a-button icon="stop">限制</a-button>
        
      </div>
      <div>
          <a @click="login"><a-avatar :size="50" icon="user" /></a>
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
      userName: "",
      password: "",
      lgText: "登录",
      current: ["home"],
      islogin: false,
    };
  },
  methods: {
    quedin() {
      if (this.lgText == "注册") {
        var scret = this.$md5(this.password + "7777777");
        this.$axios({
          method: "post",
          url: "http://localhost:8080/user/addUser",
          data: {
            userAccount: this.userName,
            userPassword: scret,
          },
        }).then(function (response) {
          console.log(response);
        });
      } else if (this.lgText == "登录") {
        //todo 登录
      }
    },
    loginCallback(e) {
      this.lgText = e == 1 ? "登录" : "注册";
    },
    caidan(e) {
      if (e["key"] == "home") {
        this.$router.push({ path: "/" });
      } else if (e["key"] == "tags") {
        this.$router.push({ path: "/" });
      } else if (e["key"] == "plus") {
        this.$router.push({ path: "/AddNetaPage" });
      }
      // console.log(e);
    },
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
