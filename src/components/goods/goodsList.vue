<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodList" :key="item.id">
      <img :src="item.img_url" />
      <h1>{{item.title}}</h1>
      <div class="goodinfo">
        <p class="price">
          <span class="now">{{item.sell_price}}</span>
          <span class="old">{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>还剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size ="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageindex: 1,
      goodList: []
    };
  },
  created() {
    this.getGoodList();
  },
  methods: {
    getGoodList() {
      this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(result => {
        if (result.body.status === 0) {
          this.goodList = this.goodList.concat(result.body.message);
        }
      });
    },
    getMore(){
      this.pageindex++;
      this.getGoodList()
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 0 8px #ccc;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    h1 {
      font-size: 14px;
    }
    .goodinfo {
      p {
        margin: 0px;
        padding: 5px;
      }
      background-color: #eee;
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
