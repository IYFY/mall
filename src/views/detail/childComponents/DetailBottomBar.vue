<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icom service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icom shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icom select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit('addCart');
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 49px;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.bar-item {
  display: flex;
  flex: 1;
}
.bar-item > div {
  flex: 1;
}
.bar-left .text {
  font-size: 13px;
  margin-left: 12px;
}
.bar-left .icom {
  display: block;
  width: 22px;
  height: 22px;
  margin: 3px auto 3px;
  /* background: url("~") 0 0/100%; */
}
.bar-left .service {
  /* background-position: 0 -54px; */
  background: url("~assets/img/detail/icon01.png") 0 0/100%;
}
.bar-left .shop {
  /* background-position: 0 -98px; */
  background: url("~assets/img/detail/icon02.png") 0 0/100%;
}
.bar-left .select {
  /* background-position: 0 -98px; */
  background: url("~assets/img/detail/icon03.png") 0 0/100%;
}
.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 49px;
}
.bar-right .cart {
  background-color: #ffe817;
  color: #333;
  text-align: center;
}
.bar-right .buy {
  background-color: #f69;
    text-align: center;
}
.sport-ball {
  position: absolute;
  left: 225px;
  bottom: 20px;
}
</style>
