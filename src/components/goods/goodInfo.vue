<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
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
            市场价:
            <del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp; 销售价:
            <span class="now_price">￥{{goodsInfo.sell_price}}</span>
          </p>购买数量:
          <number @getcount="getCount" :maxInfo="goodsInfo.stock_quantity"></number>
          <p></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addShopCar">加入购物车</mt-button>
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
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComm(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import number from "../subcomponents/number.vue";
import swipes from "../subcomponents/swipes.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotuList: [],
      goodsInfo: {},
      ballFlag: false,
      selectNum: 1
    };
  },
  created() {
    this.getlunbotu();
    this.getgoodsinfo();
  },

  methods: {
    getlunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotuList = result.body.message;
        }
      });
    },
    getgoodsinfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComm(id) {
      this.$router.push({ name: "goodscomm", params: { id } });
    },
    addShopCar() {
      this.ballFlag = !this.ballFlag;
      var goodsInfo = {
        id: this.id,
        number: this.selectNum,
        price: this.goodsInfo.sell_price,
        select: "true"
      };
      
      this.$store.commit("addtoCar",goodsInfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      const ball = this.$refs.ball.getBoundingClientRect();
      const badge = document.getElementById("badge").getBoundingClientRect();
      const x = badge.left - ball.left;
      const y = badge.top - ball.top;
      el.offsetWidth;
      el.style.transform = `translate(${x}px,${y}px)`;
      el.style.transition = "all 1s cubic-bezier(.25,.1,.25,1)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getCount(count) {
      this.selectNum = count;
    }
  },
  components: {
    swipes,
    number
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #ccc;
  overflow: hidden;
  .now_price {
    font-size: 16px;
    color: red;
    font-weight: bold;
  }
  .mui-card-header,
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    background-color: red;
    position: absolute;
    z-index: 99;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    top: 408px;
    left: 143px;
  }
}
</style>
