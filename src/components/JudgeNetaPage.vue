<template>
  <div class="center">
    <div class="shaixuan">
      <div>
        <a-checkbox v-model="qx" @click="allcheck"> 全选 </a-checkbox>
      </div>
      <div style="margin: 20px">
        <a-button type="primary" size="small" @click="buttonclick(1)"> 通过 </a-button>
      </div>
      <div>
        <a-button type="primary" size="small" @click="showModal"> 拒绝 </a-button>
      </div>
    </div>
    <div
      class="danyuange"
      v-for="(w, index) in wordList"
      @click="dyclick(index)"
    >
      <a-checkbox v-model="checkList[index]" @change="onChange(index)">
      </a-checkbox>
      <div class="word">
        <ruby>
          {{ w.netaWord }}<rt>{{ w.pinyin }}</rt>
        </ruby>
      </div>
      <div>
        <a-button type="primary" @click="jumpDetails(w.netaId)">
          详情
        </a-button>
      </div>
    </div>
    <a-modal v-model="visible" title="拒绝理由" @ok="buttonclick(-1)" cancelText="取消" okText="确定"> 
      <a-textarea
      v-model="refusevar"
      placeholder="请输入拒绝理由"
      :auto-size="{ minRows: 3, maxRows: 5 }"
    />
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      refusevar:"",
      visible:false,
      qx: false,
      wordList: [],
      checkList: [],
    };
  },
  mounted() {
    this.$axios({
      method: "get",
      url: "http://localhost:8080/neta/selectNeta",
      params: {
        statusCode: 0,
      },
    }).then((response) => {
      if (response.data.resultCode == 1) {
        this.wordList = response.data.resultData;
        for (let x = 0; x < this.wordList.length; x++) {
          this.checkList[x] = false;
        }
      }
    });
  },
  methods: {
    showModal(){
      this.visible=true;
    },
    buttonclick(status) {
      let sub = [];
      let y = 0;
      for (let x = 0; x < this.checkList.length; x++) {
        if (this.checkList[x]) {
          this.wordList[x].netaStatus = status;
          if(status==-1){
              this.wordList[x].reason=this.refusevar;
          }
          sub[y++] = this.wordList[x];
        }
      }
      console.log(sub);
      this.$axios({
        method: "post",
        url: "http://localhost:8080/neta/updateNetaStatus",
        data: sub,
      }).then((response) => {
        if (response.data.resultCode == 1) {
          this.$message.success("操作成功");
          for (let x = 0; x < this.checkList.length; x++) {
            if (this.checkList[x]) {  
              this.checkList.splice(x, 1);
              this.wordList.splice(x, 1);
              --x;
            }
          }
          this.$forceUpdate();
        }
        this.visible=false;
      });
    },
    dyclick(index) {
      this.checkList[index] = !this.checkList[index];
      this.$forceUpdate();
    },
    jumpDetails(id) {
      this.$router.push({
        path: "/ShowPage",
        query: {
          netaId: id,
        },
      });
    },
    allcheck() {
      for (let x = 0; x < this.checkList.length; x++) {
        this.checkList[x] = !this.qx;
      }
    },
    onChange(i) {},
  },
};
</script>
<style>
.center {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-start;
  width: 50%;
  flex-wrap: wrap;
  margin-top: 20px;
}

.danyuange {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 48%;
  height: 50px;
  margin: 1%;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: white;
}
.danyuange:hover {
  color: red;
  box-shadow: 0 12px 25px 0 rgba(0, 0, 0, 0.2);
}

.word {
  width: 60%;
  line-height: 60px;
  font-size: 1.3em;
  font-weight: bold;
  margin-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shaixuan {
  display: flex;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 50px;
  margin: 1%;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 5px;
  background-color: white;
}
</style>
