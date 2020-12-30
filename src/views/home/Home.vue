<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
    :titles="['流行', '新款', '精选']"
    @tabClick="tabClick" ref="tabControlfixed"
    class="tab-control"
    v-show="isTabFixed"></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="contentPullingUp"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
      @tabClick="tabClick" ref="tabControl"></tab-control>
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

import { debounce } from "common/utils";

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
      isshow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
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
  mounted() {
    // 获取tabControl组件的offseettop
    // 所有的组件都有一个$el属性：用于获取组件的元素
    this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;

    // 使用事件总线监听item的图片加载
    // 防抖处理
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    // 监听
    this.itemImgListener = () => {
      refresh();
    }
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    //离开时取 消itemImgLoad事件监听
    this.$bus.$off("itemImgLoad", this.itemImgListener)
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
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlfixed.currentIndex = index;
    },
    backClick() {
      // 通过ref获取scroll组件对象
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo(0, 0, 800);
    },

    contentScroll(position) {
      // 返回顶部按键是否显示
      this.isshow = (-position.y) > 1000;
      //tabControl的粘停吸顶（position: fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    contentPullingUp() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    //获取tabControl的位置，需要在图片加载完，位置是正确的
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
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
      //axios的getHomeGoods
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
  /* padding-top: 44px; */

  height: 92vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-text);
  color: #ffffff;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}

.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 0px;
  overflow: hidden;
}

</style>
