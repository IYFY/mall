<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="contentPullingUp"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 组件作为标签时，监听原生事件要加.native修饰符 -->
    <back-top @click.native="backClick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComponents/HomeSwiper";
import RecommendView from "./childComponents/RecommendView";
import FeatureView from "./childComponents/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isshow: false
    };
  },
  created() {
    // 组件创建完成时发送网络请求
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 事件
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      // 通过ref获取scroll组件对象
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo(0, 0, 800);
    },

    contentScroll(position) {
      if (position.y < -1000) {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
    },
    contentPullingUp() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    // 网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].page = res.data.page;
        this.goods[type].list.push(...res.data.list);
      });
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;

  height: 92vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-text);
  color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control {
  /* 粘性 */
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
/* .content {
  margin-top: 44px;
  height: calc(100% - 93px);
  overflow: hidden;
} */
</style>
