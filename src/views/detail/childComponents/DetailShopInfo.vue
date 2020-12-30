<template>
  <div v-if="Object.keys(shop).length !== 0" class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" />
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{shop.sells | sellCountFlter}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}">{{item.isBetter ? '高' : '低'}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="enter">
       <div class="enter-shop">进店逛逛</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellCountFlter(value) {
      if(value < 10000) {
      return value;
      }else {
        return (value/10000).toFixed(1) + '万'
      }

    }
  }
};
</script>

<style scoped>
.shop-info {
    margin-top: 15px;
  padding: 0 8px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.shop-top {
  align-items: center;
  margin: 15px 10px;
}
.shop-top img {
  border-radius: 100%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  vertical-align: middle;
}
.shop-middle {
  display: flex;
  font-size: 12px;
  align-items: center;
  line-height: 22px;
}
.shop-middle-item {
  flex: 1;
}
.shop-middle-left {
  display: flex;
  border-right: 1px solid #ececec;
}
.shop-middle-left .info-sells, .info-goods  {
  flex: 1;
  text-align: center;
}
.sells-count ,.goods-count {
  font-size: 16px;
}
.shop-middle-right {
  padding-left: 40px;
}

.shop-middle-right .score {
  display: inline-block;
  width: 30px;
  color: #16a35d;
  margin-left: 5px;
}
.shop-middle-right .score-better {
  color: #880000;
}
.shop-middle-right .better {
  background-color: #16a35d;
  color: #fff;
  padding: 1px 4px;
  font-size: 12px;
  border-radius: 5px;

}
 .shop-middle-right .better-more {
  background-color: #880000;
}
.enter {
  text-align: center;
  margin: 6px 0;
}
.enter-shop {
  text-align: center;
  display: inline-block;
  background-color: #f2f2f2;
  font-size: 16px;
  padding: 8px 30px;
  border-radius: 100px;
}
</style>
