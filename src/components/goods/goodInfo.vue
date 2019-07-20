<template>
  <div class= "goodsinfo-container">
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <swipes :lunbotuList="lunbotuList" :isfull="false"></swipes>
					</div>
				</div>
			</div>
      <div class="mui-card">
				<div class="mui-card-header">{{goodsInfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
              市场价:<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp; 销售价:<span class="now_price">￥{{goodsInfo.sell_price}}</span>
            </p>
            
              购买数量: <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
                    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                    <input id="test" class="mui-input-numbox" type="number" value="5">
                    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                  </div>
            <p></p>
            <p>
              <mt-button type="primary" size = "small">立即购买 </mt-button>
              <mt-button type ="danger" size= "small">加入购物车</mt-button>
            </p>
					</div>
				</div>
				
			</div>
      <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
              <p>商品存货:{{goodsInfo.goods_no}}</p>
              <p>库存情况:{{goodsInfo.stock_quantity}}件</p>
              <p>上架时间:{{goodsInfo.add_time|dataFormat}}</p>
              
					</div>
				</div>
				<div class="mui-card-footer">
            <mt-button type="primary" size = "large" plain @click="goDesc(id)">图文介绍 </mt-button>
            <mt-button type ="danger" size= "large" plain @click="goComm(id)">商品评论</mt-button>
        </div>
			</div>
  </div>

</template>

<script>
import swipes from "../subcomponents/swipes.vue"
export default {
  data(){
    return{
      id:this.$route.params.id,
      lunbotuList:[],
      goodsInfo:{}
    }
  },
  created(){
    this. getlunbotu();
    this. getgoodsinfo();
  },
  methods:{
    getlunbotu(){
      this.$http.get('api/getthumimages/'+this.id).then(result=>{
        if(result.body.status===0){
          result.body.message.forEach(item => {
            item.img=item.src;
          });
          this.lunbotuList=result.body.message;
        }
      })
    },
    getgoodsinfo(){
      this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
        if(result.body.status===0){
           
            this.goodsInfo=result.body.message[0]

        }
      })
    },
    goDesc(id){
      this.$router.push({name:'goodsdesc',params:{id}})
    },
    goComm(id){
      this.$router.push({name:'goodscomm',params:{id}})
    },
  },
  components:{
    swipes
  }
}
</script>

<style lang="scss" scoped>
  .goodsinfo-container{
    background-color: #ccc;
    overflow: hidden;
    .now_price{
      font-size: 16px;
      color: red;
      font-weight: bold;
    }
    .mui-card-header, .mui-card-footer{
      display: block;
      button{
        margin: 15px 0;
      }
    }
  }
</style>
