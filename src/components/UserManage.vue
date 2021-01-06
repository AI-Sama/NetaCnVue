<template>
  <div class="user_manage_page">
    <div>
      <div style="display: flex; font-weight: bold; font-size: 1.5em">
        <div style="width: 20%">标识</div>
        <div style="width: 25%">账号</div>
        <div style="width: 25%">昵称</div>
        <div style="width: 30%">操作</div>
      </div>
      <a-divider />
    </div>
    <div v-for="(user, index) in userinfos">
      <div style="display: flex">
        <div style="width: 20%">
          {{
            user.userPower < 1
              ? "普通用户"
              : user.userPower < 5
              ? "管理员"
              : "超级管理员"
          }}
        </div>
        <div style="width: 25%">{{ user.userAccount }}</div>
        <div style="width: 25%">
          {{ user.userName == null ? user.userAccount : user.userName }}
        </div>
        <div style="width: 30%">
          <div v-if="loginPower >= user.userPower">
            <span v-if="loginPower > 5" @click="clickButton(1)"
              ><a clic>修改权限</a></span
            >
            <span>|<a>禁止登陆</a>|</span>
            <span><a>禁止上传</a>|</span>
            <span><a>重置密码</a>|</span>
          </div>
        </div>
      </div>
      <a-divider />
      <div
        style="margin-top: 15px; margin: auto; width: 50%; text-align: center"
      >
        <a-pagination :pageSize="pageSize" :total="total" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["loadComplete"],
  created() {
    if (this.loadComplete) {
      this.init();
    }
  },
  data() {
    return {
      loginPower: 0,
      userinfos: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  watch: {
    loadComplete: {
      handler(val) {
        if (val) {
          this.init();
        }
      },
    },
  },
  methods: {
    init() {
      this.loginPower = this.$root.userInfo.userPower;
      this.$axios({
        method: "get",
        url: "http://localhost:8080/user/getUsers",
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
      }).then((response) => {
        if (response.data.resultCode == 1) {
          this.userinfos = response.data.resultData.data;
          this.total = response.data.resultData.total;
          this.$forceUpdate();
        }
      });
    },
    clickButton(id) {},
  },
};
</script>
<style>
.user_manage_page {
  width: 50%;
  height: 1000px;
  margin-top: 1.5em;
  padding: 2em;
  background-color: white;
}
a {
  color: #40a9ff;
}
a:hover {
  color: red;
}
</style>