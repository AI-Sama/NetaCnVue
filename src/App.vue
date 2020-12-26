<template>
  <div id="app">
    <div class="loginPage" v-if="loginPage">
      <div>
        <a-tabs default-active-key="1" @change="loginCallback">
          <a-tab-pane key="1" tab="ログイン"> </a-tab-pane>
          <a-tab-pane key="2" tab="アカウント作成" force-render> </a-tab-pane>
        </a-tabs>
        <div>
          <a-input
            style="margin-left: 5%; width: 90%"
            v-model="userAccount"
            placeholder="账号,只能包含字母数字下划线"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
          <a-input-password
            style="margin-left: 5%; margin-top: 15px; width: 90%"
            v-model="password"
            placeholder="密码,只能包含字母数字"
          >
            <a-icon slot="prefix" type="lock" />
          </a-input-password>
        </div>
        <div>
          <a-button
            @click="quedin"
            style="width: 40%; margin: 5%"
            type="primary"
          >
            {{ lgText }}
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
          <a-menu-item @click="caidan" key="home">
            <a-icon type="home" />主页
          </a-menu-item>
          <a-menu-item @click="caidan" key="tags">
            <a-icon type="tags" />标签
          </a-menu-item>
          <a-menu-item @click="caidan" key="plus">
            <a-icon type="plus" />新增
          </a-menu-item>
        </a-menu>
      </div>
      <div>
        <a-button icon="global">日语</a-button>
        <a-button icon="stop">限制</a-button>
      </div>
      <div>
        <a-popover v-if="this.islogin" placement="bottom">
          <template slot="title">
            <div style="color: red; text-align: center">
              {{
                userInfo.userName == null
                  ? userInfo.userAccount
                  : userInfo.userName
              }}
            </div>
          </template>
          <template slot="content">
            <div class="user_operate">
              <a> 个人资料 </a>
            </div>
            <div class="user_operate">
              <a> 网站管理 </a>
            </div>
            <div class="user_operate">
              <a @click="login_out"> 退出登录 </a>
            </div>
          </template>
          <a @click="headClick"><a-avatar :size="63" icon="user" /></a>
        </a-popover>
        <a v-if="!this.islogin" @click="headClick"
          ><a-avatar :size="63" icon="user"
        /></a>
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
      userInfo: {},
      userAccount: "",
      password: "",
      lgText: "登录",
      current: ["home"],
      loginPage: false,
    };
  },
  mounted() {
    if (!sessionStorage.getItem("user")) {
      this.$axios({
        method: "get",
        url: "http://localhost:8080/user/getUserInfo",
      }).then((response) => {
        if (response.data.resultCode == 1) {
          sessionStorage.setItem(
            "user",
            JSON.stringify(response.data.resultData)
          );
          this.userInfo = response.data.resultData;
          this.islogin = true;
          this.$forceUpdate();
        }
      });
    } else {
      this.userInfo = JSON.parse(sessionStorage.getItem("user"));
      this.islogin = true;
      this.$forceUpdate();
    }
  },
  methods: {
    login_out() {
      localStorage.removeItem("mydata");
      sessionStorage.removeItem("user");
      this.islogin = false;
      this.$router.push({ path: "/" });
      location.reload();
    },
    quedin() {
      if (this.lgText == "注册") {
        var scret = this.$md5(this.password + "7777777");
        this.$axios({
          method: "post",
          url: "http://localhost:8080/user/addUser",
          data: {
            userAccount: this.userAccount,
            userPassword: scret,
          },
        })
          .then((response) => {
            if (response.data.resultCode == 1) {
              this.$message.success("注册成功");
            } else if (response.data.resultCode == 0) {
              this.$message.error("该账号已被注册");
            }
          })
          .catch((error) => {
            this.$message.error("注册失败，请稍后重试");
          });
      } else if (this.lgText == "登录") {
        //todo 登录
        var scret = this.$md5(this.password + "7777777");
        this.$axios({
          method: "post",
          url: "http://localhost:8080/user/userLogin",
          // method: "get",
          // url: "http://localhost:8080/user/test",
          data: {
            userAccount: this.userAccount,
            userPassword: scret,
          },
        })
          .then((response) => {
            if (response.data.resultCode == 1) {
              this.$message.success("登录成功");
              sessionStorage.setItem(
                "user",
                JSON.stringify(response.data.resultData)
              );
              localStorage.setItem("mydata", response.data.resultData.spare1);
              this.userInfo = response.data.resultData;
              this.loginPage = false;
              this.islogin = true;
            } else if (response.data.resultCode == 0) {
              this.$message.error("账号或密码错误");
              this.password = "";
            }
          })
          .catch((error) => {
            this.$message.error("登录失败，请稍后重试");
            this.password = "";
          });
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
    },
    quxiao() {
      this.loginPage = false;
    },
    headClick() {
      if (this.islogin == false) {
        this.loginPage = true;
      }
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
  height: 90px;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
.user_operate {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.user_operate :hover {
}
a {
  color: #212121;
}
</style>
