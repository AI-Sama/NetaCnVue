<template>
  <div class="user_info_page">
    <div>
      <a-avatar :size="150" icon="user" />
    </div>
    <a-divider />
    <a-form-model
      :model="user_form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="账号">
        {{ user_form.userAccount }}
      </a-form-model-item>

      <a-form-model-item label="昵称">
        <a-input
          v-model="user_form.userName"
          placeholder="多个拼音之间用空格隔开"
        />
      </a-form-model-item>
      <a-form-model-item label="限制">
        <div>
          <a-switch
            v-model="user_form.pinbi"
            checked-children="开"
            un-checked-children="关"
          />
        </div>
      </a-form-model-item>
      <a-form-model-item label="语言">
        <div>
          <a-switch
            v-model="user_form.language"
            checked-children="日"
            un-checked-children="中"
          />
        </div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      user_form: {
        userAccount: "11",
        userName: "",
        pinbi: 0,
        language: 0,
      },
    };
  },
  mounted() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.user_form.userAccount = user.userAccount;
    if (!user.userName) {
      this.user_form.userName = user.userAccount;
    } else {
      this.user_form.userName = user.userName;
    }
    this.user_form.pinbi = user.wordLimit;
    this.user_form.language = user.userLanguage;
  },
  methods: {},
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
</style>