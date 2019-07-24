<template>
  <div class="shopCarContainer">
    <div class="goodslist">
      <div class="mui-card" v-for="(item , i) in goodsList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getSelect[item.id]" @change="selectChange(item.id,$store.getters.getSelect[item.id])"></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <number :num="$store.getters.getNum[item.id]" :goodsID="item.id"></number>
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>
                已勾选商品
                <span class="red">{{$store.getters.getCountPrice.count}}</span>件，总价
                <span class="red">￥{{$store.getters.getCountPrice.amount}}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import number from "../subcomponents/shopCarNumber.vue";
export default {
  data() {
    return {
      goodsList: {}
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodsList = result.body.message;
          }
        });
    },
    remove(id, index) {
      this.goodsList.splice(index, 1);
      this.$store.commit("removeFromCar", id);
    },
    selectChange(id,value){
      this.$store.commit("updateSelect",{id:id, select: value})
    }
  },
  components: {
    number
  }
};
</script>


<style lang ="scss" scoped>
.shopCarContainer {
  background-color: #eee;
  overflow: hidden;
  .goodslist {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }

  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>