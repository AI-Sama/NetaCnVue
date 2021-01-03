<template>
  <div id="center">
    <div class="shaixuan">
      <div>排序方式:&nbsp;&nbsp;&nbsp;</div>
      <div>
        <a-select
          default-value="lucy"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="jack"> 按上传时间 </a-select-option>
          <a-select-option value="lucy"> 按诞生时间 </a-select-option>
          <a-select-option value="Yiminghe"> 按热度 </a-select-option>
        </a-select>
        &nbsp;&nbsp;&nbsp;
      </div>
      <div>
        <a-pagination simple :default-current="2" :total="50" />
      </div>
    </div>
    <div class="gezhi" v-for="(card, index) in cardList">
      <div class="ciyu">
        <ruby>
          {{ card.netaWord }}
          <rt>{{ card.pinyin }}</rt>
        </ruby>
      </div>
      <div class="jiaming">{{ card.katakana }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cardList: [],
    };
  },
  mounted() {
    this.$axios({
      method: "get",
      url: "http://localhost:8080/neta/selectNeta",
      params: {
        statusCode: 1,
      },
    }).then((response) => {
      if (response.data.resultCode == 1) {
        this.cardList = response.data.resultData;
        console.log(this.cardList);
      }
    });
  },
  methods: {},
};
</script>
<style>
#center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  /* background-color: blue; */
  flex-wrap: wrap;
  margin-top: 20px;
}

.gezhi {
  /* width: 23%; */
  width: 300px;
  height: 180px;
  margin: 20px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: white;
}
.gezhi:hover {
  color: red;
  box-shadow: 0 12px 25px 0 rgba(0, 0, 0, 0.2);
}

.ciyu {
  margin-top: 15%;
  width: 100%;
  height: 45%;
  font-size: 2.8em;
  line-height: 100px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.jiaming {
  color: #909399;
  width: 100%;
  height: 28%;
  font-size: 0.8em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.shaixuan {
  padding: 20px;
  display: flex;
  align-items: center;
  width: 1000px;
  height: 50px;
  margin: 1%;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 5px;
  background-color: white;
}
</style>
