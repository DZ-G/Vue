<template>
  <div class="photinfo-container">
    <h3>{{photoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoInfo.add_time|dataFormat}}</span>
      <span>点击:{{photoInfo.click}}次</span>
    </p>
    <hr>
    <div class="content" v-html="photoInfo.content"></div>
    <div class="thum">
    <vue-preview :slides="list" @close="handleClose"></vue-preview> 
    </div>
    <comment :id="this.id"></comment>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue"
export default {
  data(){
    return{
      id:this.$route.params.id,
      photoInfo:{},
      list:[]
    }
  },
  created(){
    this. getPhotoInfo();
    this.getThumbs();
  },
  methods:{
    getPhotoInfo(){
      this.$http.get("api/getimageInfo/"+this.id).then(result=>{
          if(result.body.status ===0){
            this.photoInfo=result.body.message[0];
          }
      })
    },
    getThumbs(){
      this.$http.get("api/getthumimages/"+this.id).then(result=>{
          if(result.body.status ===0){
            
            result.body.message.forEach((item,i) => {
              item.w= 600,
              item.h= 400,
              item.msrc='',
              item.alt='picture'+i,
              item.title= 'Image Caption'+i
            });
            this.list = result.body.message;
          }
      })
    },
    handleClose(){
      console.log('close event')
    }
  },
  components:{
    comment
  }
}
</script>

<style lang="scss" scoped>
  .photinfo-container{
    padding: 3px;
    h3{
      color: #26a2ff;
      font-size: 15px;
      text-align: center;
      margin: 15px 0;
    }
    .subtitle{
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }
    .content{
      font-size: 13px;
      line-height: 30px;
    }
  }
</style>

