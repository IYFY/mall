<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="#d4237a">
      <template v-slot:item-icon>
        <!-- DOM中使用别名前加上~ -->
        <img src="~assets/img/tabbar/home.svg" alt="这是一份房子图片" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div name="item-text">首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/classify" activeColor="#d4237a">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/classify.svg" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/classify_active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div name="item-text">分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="#d4237a">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/cart.svg" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/cart_active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div name="item-text">购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="#d4237a">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/profile.svg" />
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/profile_active.svg" alt />
      </template>
      <template v-slot:item-text>
        <div name="item-text">我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped>
</style>