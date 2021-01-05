<template>
  <div class="user_info_page">
    <div style="margin: auto">
      <a-avatar :size="150" icon="user" :src="user_form.headImg" />
    </div>
    <a-divider />
    <a-form-model
      :model="user_form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :disabled="true"
    >
      <a-form-model-item label="账号">
        {{ user_form.userAccount }}
      </a-form-model-item>

      <a-form-model-item label="昵称">
        <a-input
          v-if="is_edit"
          v-model="user_form.userName"
          :disabled="disalbed"
        />
        <span v-if="!is_edit">{{ user_form.userName }}</span>
      </a-form-model-item>
      <a-form-model-item label="限制">
        <div>
          <a-switch
            v-model="user_form.wordLimit"
            checked-children="开"
            un-checked-children="关"
            :disabled="disalbed"
          />
        </div>
      </a-form-model-item>
      <a-form-model-item label="语言">
        <div>
          <a-switch
            v-model="user_form.userLanguage"
            checked-children="日"
            un-checked-children="中"
            :disabled="disalbed"
          />
        </div>
      </a-form-model-item>
    </a-form-model>
    <a-divider />
    <div class="button_block">
      <div>
        <a-button v-if="!is_edit" @click="edit_button" icon="edit"
          >修改</a-button
        >
      </div>
      <div>
        <a-button v-if="is_edit" @click="save_button" icon="edit"
          >保存</a-button
        >
      </div>
      <div>
        <a-button v-if="is_edit" @click="cancel_button" icon="edit"
          >取消</a-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      is_edit: false,
      disalbed: true,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      user_form: {
        userAccount: "",
        userName: "",
        wordLimit: false,
        userLanguage: false,
      },
    };
  },
  created() {
    if (this.$root.userInfo.userId != null) {
      this.data_push();
    }
  },
  methods: {
    data_push() {
      let user = this.$root.userInfo;
      this.user_form.userAccount = user.userAccount;
      if (!user.userName) {
        this.user_form.userName = user.userAccount;
      } else {
        this.user_form.userName = user.userName;
      }
      this.user_form.wordLimit = user.wordLimit == 0 ? false : true;
      this.user_form.userLanguage = user.userLanguage == 0 ? false : true;
      this.user_form.headImg = user.headImg;
    },
    edit_button() {
      this.is_edit = true;
      this.disalbed = false;
    },
    save_button() {
      this.$axios({
        method: "post",
        url: "http://localhost:8080/user/updateUser",
        data: {
          userAccount: this.user_form.userAccount,
          userName: this.user_form.userName,
          wordLimit: this.user_form.wordLimit == true ? 1 : 0,
          userLanguage: this.user_form.userLanguage == true ? 1 : 0,
        },
      })
        .then((response) => {
          if (response.data.resultCode == 1) {
            this.$message.success("修改成功");
            this.$root.userInfo.userName = this.user_form.userName;
            this.$root.userInfo.wordLimit = this.user_form.wordLimit;
            this.$root.userInfo.userLanguage = this.user_form.userLanguage;
            this.$root.pb = this.user_form.wordLimit;
            this.$root.lan = this.user_form.userLanguage;
            this.is_edit = false;
            this.disalbed = true;
            this.$forceUpdate();
          } else if (response.data.resultCode == 0) {
          }
        })
        .catch((error) => {
          this.$message.error("操作失败,请稍后重试");
          this.cancel_button();
        });
    },
    cancel_button() {
      this.data_push();
      this.is_edit = false;
      this.disalbed = true;
    },
  },
};
</script>
<style>
.user_info_page {
  display: flex;
  width: 50%;
  padding: 50px 100px;
  margin: 20px auto;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 5px;
}
.button_block {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
}
</style>