<template>
  <div class="myform">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="词语">
        <a-input v-model="form.name" />
      </a-form-model-item>

      <a-form-model-item label="拼音">
        <a-input v-model="form.pinyin" placeholder="多个拼音之间用空格隔开" />
        <div class="yinbiaozimu">
          <div class="yinbiaozu" v-for="(zu,x) in yb">
            <div class="ybzimu"  v-for="(ge,y) in zu" @click="ybclick(ge)">{{ge}}</div>
          </div>
        </div>
      </a-form-model-item>
      <a-form-model-item label="音译假名">
        <a-input v-model="form.jiaming" />
      </a-form-model-item>
      <a-form-model-item label="标签">
        <template v-for="(tag, index) in tags">
            <a-tag
              :key="tag"
              color="#2db7f5"
            >
              {{ tag }}
            </a-tag>
          </template>
        <a-button @click="showDrawer" icon="plus" size="small">新标签</a-button>
      </a-form-model-item>
      <a-form-model-item label="默认屏蔽">
        <div>
          <a-switch
            v-model="form.pinbi"
            checked-children="开"
            un-checked-children="关"
          />
        </div>
      </a-form-model-item>
      <a-form-model-item label="出现日期(可留空)">
        <a-input-group compact>
          <a-input v-model="form.nian" style="width: 20%" placeholder="年" />
          <a-input
            v-model="form.yue"
            style="width: 20%"
            placeholder="月"
          />
        </a-input-group>
      </a-form-model-item>
      <a-form-model-item label="中文释义">
        <a-input v-model="form.cnExplanation" type="textarea" />
      </a-form-model-item>
      <a-form-model-item label="日语释义">
        <a-input v-model="form.jpExplanation" type="textarea" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> 提交 </a-button>
        <a-button style="margin-left: 10px"> 取消 </a-button>
      </a-form-model-item>
    </a-form-model>
    <div>
      <a-drawer
        title="添加标签"
        placement="right"
        :closable="true"
        :visible="drawer_visible"
        @close="onClose"
        width="500"
      >
        <div>
          <template v-for="(tag, index) in tags">
            <a-tag
              :key="tag"
              :closable="true"
              @close="() => handleClose(tag)"
              color="#2db7f5"
            >
              {{ tag }}
            </a-tag>
          </template>
          <a-input
            v-if="inputVisible"
            ref="input"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            :value="inputValue"
            @change="handleInputChange"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
          <a-tag
            v-else
            style="background: #fff; borderstyle: dashed"
            @click="showInput"
          >
            <a-icon type="plus" /> 新标签
          </a-tag>
        </div>
        <a-divider />
        <div>
          <p>选择已有标签</p>
          <a-input-search
            v-model="search_word"
            placeholder="搜索标签"
            style="width: 100%"
            @search="onSearch"
          />
          <div style="width: 100%; height: 20px" />
          <a-tag
            v-for="(showtag, index) in show_tags"
            @click="label_click(showtag)"
            :key="index"
            ant-click-animating-without-extra-node="true"
          >
            {{ showtag.cnWord }}
          </a-tag>
        </div>
      </a-drawer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      yb:[
        ["ā","á","ǎ","à"],
        ["ō","ó","ǒ","ò"],
        ["ē","é","ě","è"],
        ["ī","í","ǐ","ì"],
        ["ū","ú","ǔ","ù"],
        ["ǖ","ǘ","ǚ","ǜ"]
      ],
      search_word: "",
      drawer_visible: false,
      tags: [],
      show_tags: [],
      inputVisible: false,
      inputValue: "",
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: "",
        pinyin: "",
        jiaming: "",
        nian: "",
        yue: "",
        cnExplanation: "",
        jpExplanation: "",
      },
    };
  },
  methods: {
    ybclick(ybzimu){
      this.form.pinyin+=ybzimu;
    },
    label_click(showtag) {
      var havatag = false;
      for (var x = 0; x < this.tags.length; x++) {
        if (this.tags[x] == showtag.cnWord) {
          havatag = true;
          break;
        }
      }
      if (!havatag) {
        this.tags[this.tags.length] = showtag.cnWord;
      }
      this.$forceUpdate();
    },
    onSearch() {
      this.$axios({
        method: "get",
        url: "http://localhost:8080/label/getLabel",
        params: {
          labelName: this.search_word,
        },
      }).then((response) => {
        if (response.data.resultCode == 1) {
          var arr = response.data.resultData;
          this.show_tags = [];
          for (var x = 0; x < arr.length; x++) {
            this.show_tags[x] = arr[x];
          }
          this.$forceUpdate();
        }
      });
    },
    showDrawer() {
      console.log(this.yb);
      this.drawer_visible = true;
      this.$axios({
        method: "get",
        url: "http://localhost:8080/label/getLabels",
      }).then((response) => {
        if (response.data.resultCode == 1) {
          var arr = response.data.resultData;
          for (var x = 0; x < arr.length; x++) {
            this.show_tags[x] = arr[x];
          }
          this.$forceUpdate();
        }
      });
    },
    handleClose(removedTag) {
      const tags = this.tags.filter((tag) => tag !== removedTag);
      console.log(tags);
      this.tags = tags;
    },
    showInput() {
      if (this.tags.length < 5) {
        this.inputVisible = true;
        this.$nextTick(function () {
          this.$refs.input.focus();
        });
      } else {
        alert("标签最多只能添加五个");
      }
    },
    handleInputChange(e) {
      this.inputValue = e.target.value;
    },
    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      //   console.log(tags);
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: "",
      });
    },
    onClose() {
      this.drawer_visible = false;
    },
    onSubmit() {
      console.log("submit!", this.form);
    },
  },
};
</script>
<style>
.myform {
  width: 50%;
  height: 100%;
  margin-top: 20px;
  padding: 20px;
  background-color: white;
}
.yinbiaozimu {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 80%;
  /* background-color: blue; */
}
.yinbiaozu {
  display: flex;
  width: 10em;
  height: 2.5em;
}
.ybzimu {
  border: #f3f7f9 1px solid;
  width: 2.5em;
  height: 2.5em;
  text-align: center;
  font-size: 1em;
  line-height: 2.5em;
}
.ybzimu:hover {
  border: #1890ff 1px solid;
  color: #1890ff;
}
</style>