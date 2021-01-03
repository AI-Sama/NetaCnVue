<template>
  <div class="b_page">
    <div class="up_user">
      <div class="user_lable">
        <a-icon type="user" />
        Aldnoah
      </div>
    </div>
    <div class="cyxq">
      <div class="wenzi">
        <ruby> 
          {{netaData.netaWord}}
          <rt>{{netaData.pinyin}}</rt>
          </ruby>
      </div>
      <div class="katakana">
        <span> 假名注音: </span>
        <span> {{netaData.katakana}} </span>
      </div>
    </div>
    <a-divider />
    <div>
      <a-tag color="#f50"> #f50 </a-tag>
      <a-tag color="#2db7f5"> #2db7f5 </a-tag>
      <a-tag color="#87d068"> #87d068 </a-tag>
      <a-tag color="#108ee9"> #108ee9 </a-tag>
    </div>
    <a-divider />
     <div v-if="netaData.netaDate">出现日期：{{parseInt(netaData.netaDate/100)}} 年 {{parseInt(netaData.netaDate%100)}} 月 </div>
     <div v-if="!netaData.netaDate">出现日期：不明 </div>
    <a-divider />
    <div>
      <a-collapse v-model="activeKey">
        <a-collapse-panel key="1" header="中文释义">
          <p>{{ netaData.cnExplanation }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="日语释义">
          <p>{{ netaData.jpExplanation }}</p>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div class="anniu">
      <div>
        <a-button icon="edit">修改</a-button>
        <a-button icon="delete">删除</a-button>
      </div>
      <div>
        <a-button icon="like">1000</a-button>
        <a-button icon="star">收藏</a-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      netaData:{},
      activeKey: ["1","2"],
    };
  },
  created(){
    let id=this.$route.query.netaId;
    this.$axios({
      method:"get",
      url:"http://localhost:8080/neta/selectFullNeta",
      params:{
        netaId:id,
      },
    }).then((response)=>{
      if(response.data.resultCode==1){
         console.log(response)
        this.netaData=response.data.resultData;
      }
    });
  },
  watch: {
    activeKey(key) {
      console.log(key);
    },
  },
  methods:{

  }
};
</script>
<style>
.b_page {
  width: 50%;
  margin: 20px auto;
  padding: 0 30px 30px 30px;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 5px;
}
.up_user {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 2em;
}
.user_lable {
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 1em;
  line-height: 2em;
  width: 10em;
  background-color: #f39c12;
  border-radius: 0 0 5px 5px;
}
.cyxq {
  width: 100%;
}
.wenzi {
  color: black;
  font-size: 4em;
  font-weight: bold;
}
.katakana {
  color: black;
  font-size: 1em;
  font-weight: bold;
}
.anniu {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
}
</style>