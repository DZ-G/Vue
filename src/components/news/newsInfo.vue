<template>
  <div class = "newsInfo-container">
    <h3 class= "title">{{newInfo.title}}</h3>
    <p class = "subtitle">
      <span>发表时间:{{newInfo.add_time | dataFormat}}</span>
      <span>点击:{{newInfo.click}}次</span>
    </p>
    <hr>
    <div class="content" v-html="newInfo.content"></div>
    <comment :id="this.id"></comment>
  </div>
</template>

<script>

import comment from "../subcomponents/comment.vue"

export default {
  data(){
    return{
      id:this.$route.params.id,
      newInfo:{}
    };
  },
  created(){
    this.getNewsInfo()
  },
  methods:{
    getNewsInfo(){
      this.$http.get('api/getnew/'+this.id).then(result=>{
        if(result.body.status===0){
          this.newInfo=result.body.message[0];
        }else{
          Toast('获取失败')
        }

      })
    }
  },
  components:{
      comment
  }
}
</script>


<style lang='scss' scoped>
.newsInfo-container{
  padding: 0 4px;
  .title{
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle{
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }

}
</style>
