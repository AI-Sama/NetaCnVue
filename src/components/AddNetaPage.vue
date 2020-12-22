<template>
  <div class="myform">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="词语">
        <a-input v-model="form.name" />
      </a-form-model-item>

      <a-form-model-item label="拼音">
        <a-input v-model="form.pinyin" placeholder="多个拼音之间用空格隔开" />
        <div class="yinbiaozimu">
          <div class="yinbiaozu">
            <div class="ybzimu">ā</div>
            <div class="ybzimu">á</div>
            <div class="ybzimu">ǎ</div>
            <div class="ybzimu">à</div>
          </div>
          <div class="yinbiaozu">
            <div class="ybzimu">ō</div>
            <div class="ybzimu">ó</div>
            <div class="ybzimu">ǒ</div>
            <div class="ybzimu">ò</div>
          </div>
          <div class="yinbiaozu">
            <div class="ybzimu">ē</div>
            <div class="ybzimu">é</div>
            <div class="ybzimu">ě</div>
            <div class="ybzimu">è</div>
          </div>
          <div class="yinbiaozu">
            <div class="ybzimu">ī</div>
            <div class="ybzimu">í</div>
            <div class="ybzimu">ǐ</div>
            <div class="ybzimu">ì</div>
          </div>
          <div class="yinbiaozu">
            <div class="ybzimu">ū</div>
            <div class="ybzimu">ú</div>
            <div class="ybzimu">ǔ</div>
            <div class="ybzimu">ù</div>
          </div>
          <div class="yinbiaozu">
            <div class="ybzimu">ǖ</div>
            <div class="ybzimu">ǘ</div>
            <div class="ybzimu">ǚ</div>
            <div class="ybzimu">ǜ</div>
          </div>
        </div>
      </a-form-model-item>
      <a-form-model-item label="音译假名">
        <a-input v-model="form.jiaming" />
      </a-form-model-item>
      <a-form-model-item label="标签">
        <a-button @click="showDrawer" icon="plus">新标签</a-button>
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
      <a-form-model-item label="出现日期">
        <a-input-group compact>
          <a-input v-model="form.nian" style="width: 20%" placeholder="年" />
          <a-input
            v-model="form.yue"
            style="width: 20%"
            placeholder="月,可留空"
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
        :after-visible-change="afterVisibleChange"
        @close="onClose"
        width="500"
      >
        <div>
          <template v-for="(tag, index) in tags">
            <a-tag
              :key="tag"
              :closable="index !== 0"
              @close="() => handleClose(tag)"
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
            placeholder="input search text"
            style="width: 100%"
            @search="onSearch"
          />
          <div style="width:100%;height:20px">
            <!-- </br></br> -->
          </div>
          <a-tag> pink </a-tag>
          <a-tag> red </a-tag>
          <a-tag> orange </a-tag>
          <a-tag> green </a-tag>
          <a-tag> cyan </a-tag>
          <a-tag> blue </a-tag>
          <a-tag> purple </a-tag>
        </div>
        <a-divider />
        <div class="drawButton">
          <a-button size="large" type="primary"> 确定 </a-button>
          <a-button size="large"  type="danger"> 取消 </a-button>
        </div>
      </a-drawer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer_visible: false,
      tags: [],
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
    showDrawer() {
      this.drawer_visible = true;
    },
    handleClose(removedTag) {
      const tags = this.tags.filter((tag) => tag !== removedTag);
      console.log(tags);
      this.tags = tags;
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
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
.drawButton{
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>