<template>
  <div id="center">
    <div class="shaixuan">
      <div>
        <a-select
          default-value="lucy"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="jack"> 按更新时间 </a-select-option>
          <a-select-option value="lucy"> 按出现时间 </a-select-option>
          <a-select-option value="Yiminghe"> 按热度 </a-select-option>
        </a-select>
        &nbsp;&nbsp;&nbsp;
      </div>
      <div style="width: 50%">
        <a-input-search
          placeholder="input search text"
          style="width: 100%"
          @search="onSearch"
        />
      </div>
      <div style="margin-left:15px">
        <a-switch
          checked-children="限制开启"
          un-checked-children="限制解除"
          :checked="this.pb"
        />
      </div>
    </div>
    <div
      class="gezhi"
      v-for="(card, index) in cardList"
      @click="jumpneta(card.netaId)"
      :title="card.netaWord"
    >
      <div class="jg">
        <div class="jgicon" v-if="card.wordShield">
          <a-icon type="warning" />
        </div>
      </div>
      <div class="ciyu">
        <ruby>
          {{ card.netaWord }}
          <rt>{{ card.pinyin }}</rt>
        </ruby>
      </div>
      <div class="jiaming">{{ card.katakana }}</div>
    </div>
    <div style="margin-top:15px;width:50%;text-align:center">
      <a-pagination  hideOnSinglePage=true pageSize=9 :total="500"  />
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
  methods: {
    jumpneta(id) {
      this.$router.push({
        path: "/ShowPage",
        query: {
          netaId: id,
        },
      });
    },
  },
};
</script>
<style>
#center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 60%;
  flex-wrap: wrap;
  margin-top: 20px;
}

.gezhi {
  width: 300px;
  height: 180px;
  margin: 20px;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: white;
}
.gezhi:hover {
  cursor: pointer;
  color: red;
  box-shadow: 0 12px 25px 0 rgba(0, 0, 0, 0.2);
}
.jg {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 22%;
}
.jgicon {
  margin-right: 1em;
  background-color: #d63031;
  color: #2d3436;
  text-align: center;
  line-height: 2em;
  width: 2em;
  height: 2em;
  border-radius: 0 0 5px 5px;
}
.ciyu {
  margin: auto;
  width: 90%;
  height: 45%;
  font-size: 2.8em;
  line-height: 100px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.jiaming {
  color: #909399;
  width: 100%;
  height: 30%;
  font-size: 1em;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.shaixuan {
  padding: 20px;
  display: flex;
  justify-content: center;
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
